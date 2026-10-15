import type { Locale } from '@/shared/i18n/locales';

export type AnalyticsEvent =
    | { readonly name: 'cv_download'; readonly locale: Locale }
    | { readonly name: 'project_open'; readonly locale: Locale; readonly projectSlug: string }
    | { readonly name: 'contact_click'; readonly locale: Locale; readonly linkId: string };

export type MetricaCall =
    | readonly [
          counterId: number,
          method: 'init',
          options: {
              readonly defer: true;
              readonly webvisor: false;
              readonly trackLinks: false;
              readonly clickmap: false;
              readonly accurateTrackBounce: true;
          },
      ]
    | readonly [
          counterId: number,
          method: 'hit',
          path: string,
          options: { readonly title: string; readonly referer?: string },
      ]
    | readonly [
          counterId: number,
          method: 'reachGoal',
          name: AnalyticsEvent['name'],
          params: Omit<AnalyticsEvent, 'name'>,
      ];

export type MetricaTransport = (...args: MetricaCall) => void;

export interface MetricaTracker {
    visit(path: string, title: string): void;
    track(event: AnalyticsEvent): void;
}

export function getCounterId(value: string | undefined, production: boolean): number | undefined {
    if (!production || !value || !/^[1-9]\d*$/.test(value)) {
        return undefined;
    }

    const counterId = Number(value);

    return Number.isSafeInteger(counterId) ? counterId : undefined;
}

/** One instance lives for the browser document, including React effect replays. */
export function createMetricaTracker(counterId: number, send: MetricaTransport): MetricaTracker {
    let initialized = false;
    let previousPath: string | undefined;

    function dispatch(...args: MetricaCall): boolean {
        try {
            if (!initialized) {
                send(counterId, 'init', {
                    defer: true,
                    webvisor: false,
                    trackLinks: false,
                    clickmap: false,
                    accurateTrackBounce: true,
                });
                initialized = true;
            }

            send(...args);

            return true;
        } catch {
            // A blocked or unavailable analytics provider must not affect navigation.
            return false;
        }
    }

    return {
        visit(path, title) {
            if (path === previousPath) {
                return;
            }

            if (
                dispatch(counterId, 'hit', path, {
                    title,
                    ...(previousPath ? { referer: previousPath } : {}),
                })
            ) {
                previousPath = path;
            }
        },
        track(event) {
            const { name, ...params } = event;

            dispatch(counterId, 'reachGoal', name, params);
        },
    };
}
