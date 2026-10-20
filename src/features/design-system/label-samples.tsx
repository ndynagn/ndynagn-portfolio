import type { JSX } from 'react';

import { FlutterBadge } from '@/features/portfolio/visual';
import type { Locale } from '@/shared/i18n/locales';
import { CurrentLabel } from '@/shared/ui/current-label';
import { StatusLabel } from '@/shared/ui/status-label';
import { TechnologyTag } from '@/shared/ui/technology-tag';

import { FlutterBadgeDemo } from './flutter-badge-demo';

interface LabelSamplesProps {
    readonly locale: Locale;
}

const labels = {
    ru: {
        title: 'Метки',
        hint: 'Технические образцы исходника, а не публичные сведения о профиле. Метки статичны и не получают фокус.',
        technologies: 'Технологические теги',
        longTag: 'Проектирование архитектуры кроссплатформенных приложений',
        status: 'Статус с точкой',
        available: 'Открыт к предложениям',
        portfolio: 'Постоянно в развитии',
        contact: 'Рассматриваю удалённую работу',
        longStatus:
            'Рассматриваю предложения удалённой работы и долгосрочного сотрудничества с международными командами',
        currentTitle: 'Отметка текущего места работы',
        current: 'Сейчас',
        longCurrent: 'Текущее место работы и долгосрочное сотрудничество',
        caption: 'в основе',
        photo: 'Flutter-бейдж над фотографией',
        opaque: 'Непрозрачный fallback',
        failure: 'Фотография недоступна',
        errorAction: 'Проверить ошибку фотографии',
        restoreAction: 'Восстановить фотографию',
    },
    en: {
        title: 'Labels',
        hint: 'Technical source fixtures, not published profile information. Labels are static and do not receive focus.',
        technologies: 'Technology tags',
        longTag: 'Cross-platform application architecture and system design',
        status: 'Status with a dot',
        available: 'Open to opportunities',
        portfolio: 'Always evolving',
        contact: 'Open to remote work',
        longStatus:
            'Open to remote opportunities and long-term collaboration with international product teams',
        currentTitle: 'Current workplace label',
        current: 'Current',
        longCurrent: 'Current workplace and long-term collaboration',
        caption: 'at the core',
        photo: 'Flutter badge over a photograph',
        opaque: 'Opaque fallback',
        failure: 'Photograph unavailable',
        errorAction: 'Test photograph failure',
        restoreAction: 'Restore photograph',
    },
};

export function LabelSamples({ locale }: LabelSamplesProps): JSX.Element {
    const copy = labels[locale];

    return (
        <section aria-labelledby="labels" className="grid min-w-0 gap-8" data-label-samples>
            <h2 id="labels" className="text-2xl">
                {copy.title}
            </h2>
            <p className="max-w-[75ch] text-sm text-muted-foreground">{copy.hint}</p>
            <div className="grid min-w-0 gap-4">
                <h3 className="text-base">{copy.technologies}</h3>
                <div className="flex min-w-0 flex-wrap gap-[7px] md:gap-[9px]" data-tag-group>
                    {['Flutter', 'Dart', 'TypeScript', copy.longTag].map((tag) => (
                        <TechnologyTag key={tag}>{tag}</TechnologyTag>
                    ))}
                </div>
            </div>
            <div className="grid min-w-0 justify-items-start gap-4">
                <h3 className="text-base">{copy.status}</h3>
                {(['default', 'hero', 'portfolio', 'contact'] as const).map((variant) => (
                    <div
                        key={variant}
                        className="grid min-w-0 max-w-full justify-items-start gap-2"
                    >
                        <p className="text-xs text-muted-foreground">{variant}</p>
                        <StatusLabel variant={variant} data-status-variant={variant}>
                            {variant === 'portfolio'
                                ? copy.portfolio
                                : variant === 'contact'
                                  ? copy.contact
                                  : copy.available}
                        </StatusLabel>
                    </div>
                ))}
                <StatusLabel variant="contact" data-long-status>
                    {copy.longStatus}
                </StatusLabel>
            </div>
            <div className="grid min-w-0 justify-items-start gap-4">
                <h3 className="text-base">{copy.currentTitle}</h3>
                <CurrentLabel data-current-label>{copy.current}</CurrentLabel>
                <CurrentLabel>{copy.longCurrent}</CurrentLabel>
            </div>
            <div className="grid min-w-0 items-start gap-8 lg:grid-cols-2">
                <div className="grid min-w-0 gap-4">
                    <h3 className="text-base">{copy.photo}</h3>
                    <FlutterBadgeDemo
                        caption={copy.caption}
                        failureLabel={copy.failure}
                        errorAction={copy.errorAction}
                        restoreAction={copy.restoreAction}
                    />
                </div>
                <div className="grid min-w-0 justify-items-start gap-4">
                    <h3 className="text-base">{copy.opaque}</h3>
                    <FlutterBadge caption={copy.caption} opaque />
                </div>
            </div>
        </section>
    );
}
