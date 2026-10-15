import {
    createMetricaTracker,
    getCounterId,
    type AnalyticsEvent,
    type MetricaCall,
    type MetricaTracker,
    type MetricaTransport,
} from './metrica';

/** The SDK mutates its pending-command queue and bootstrap timestamp. */
interface YandexMetrica extends MetricaTransport {
    a?: MetricaCall[];
    l?: number;
}

/** Document-scoped lifecycle state; tag failure permanently disables dispatch. */
interface BrowserAnalytics {
    readonly tracker: MetricaTracker;
    failed: boolean;
}

declare global {
    interface Window {
        ym?: YandexMetrica;
        portfolioMetrica?: BrowserAnalytics;
    }
}

export const counterId = getCounterId(
    process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID,
    process.env.NODE_ENV === 'production',
);

/** Lazily creates the document singleton and SDK queue; disabled builds have no side effects. */
export function getBrowserAnalytics(): BrowserAnalytics | undefined {
    if (typeof window === 'undefined' || !counterId) {
        return undefined;
    }
    if (window.portfolioMetrica) {
        return window.portfolioMetrica;
    }

    if (!window.ym) {
        const queued: YandexMetrica = (...args) => {
            queued.a?.push(args);
        };
        queued.a = [];
        queued.l = Date.now();
        window.ym = queued;
    }

    const state: BrowserAnalytics = {
        failed: false,
        tracker: createMetricaTracker(counterId, (...args) => {
            if (!state.failed) {
                window.ym?.(...args);
            }
        }),
    };

    window.portfolioMetrica = state;

    return state;
}

/** Call from user event handlers. Disabled builds do not create an SDK queue. */
export function trackEvent(event: AnalyticsEvent): void {
    getBrowserAnalytics()?.tracker.track(event);
}

export function disableBrowserAnalytics(): void {
    const state = window.portfolioMetrica;

    if (state) {
        state.failed = true;
    }
    if (window.ym?.a) {
        window.ym.a.length = 0;
    }
}
