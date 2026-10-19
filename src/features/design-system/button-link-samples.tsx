import type { JSX } from 'react';
import { ArrowDown, ArrowUpRight, ChevronLeft, ChevronRight, Download } from 'lucide-react';

import type { Locale } from '@/shared/i18n/locales';
import { Button } from '@/shared/ui/button';
import { TextLink } from '@/shared/ui/text-link';

import { ButtonActionsDemo } from './button-actions-demo';

interface ButtonLinkSamplesProps {
    readonly locale: Locale;
}

const labels = {
    ru: {
        title: 'Кнопки и ссылки',
        action: 'Обсудим ваш проект',
        long: 'Обсудим ваш проект и все подробности будущего сотрудничества',
        hint: 'Технические образцы исходника. Наведите указатель или используйте Tab для состояний hover и focus. Неактивные кнопки показаны отдельно.',
        disabled: 'Недоступно',
        theme: 'Переключить тему',
        download: 'Скачать CV',
        inline: 'Подробнее о проекте',
        scroll: 'Листайте вниз',
        index: 'Все проекты',
        contact: 'Написать письмо',
        description: 'Обсудим задачи и сотрудничество',
        next: 'Следующий проект',
        document: 'Внешний документ',
        target: 'Локальная цель ссылок',
    },
    en: {
        title: 'Buttons and links',
        action: 'Let’s discuss your project',
        long: 'Let’s discuss your project and all the details of our future collaboration',
        hint: 'Technical source fixtures. Hover or use Tab to inspect hover and focus states. Disabled buttons are shown separately.',
        disabled: 'Unavailable',
        theme: 'Toggle theme',
        download: 'Download CV',
        inline: 'More about the project',
        scroll: 'Scroll to explore',
        index: 'All projects',
        contact: 'Send an email',
        description: 'Let’s discuss your ideas and collaboration',
        next: 'Next project',
        document: 'External document',
        target: 'Local link destination',
    },
};

export function ButtonLinkSamples({ locale }: ButtonLinkSamplesProps): JSX.Element {
    const copy = labels[locale];

    return (
        <section
            aria-labelledby="buttons-links"
            className="grid min-w-0 gap-8"
            data-button-link-samples
        >
            <h2 id="buttons-links" className="text-2xl">
                {copy.title}
            </h2>
            <p className="max-w-[75ch] text-sm text-muted-foreground">{copy.hint}</p>
            <div className="flex min-w-0 flex-wrap items-center gap-6">
                <Button variant="pill" size="action" asChild>
                    <a href="#button-link-target">
                        {copy.action}
                        <ArrowUpRight aria-hidden="true" />
                    </a>
                </Button>
                <Button variant="pill" size="action" disabled>
                    {copy.disabled}
                    <ArrowUpRight aria-hidden="true" />
                </Button>
            </div>
            <div className="min-w-0 max-w-md">
                <Button variant="pill" size="action" asChild>
                    <a href="#button-link-target">
                        {copy.long}
                        <ArrowUpRight aria-hidden="true" />
                    </a>
                </Button>
            </div>
            <div className="flex flex-wrap items-center gap-6">
                <div className="grid justify-items-start gap-3">
                    <span className="text-xs">control · 33 / 37 px · blur 15 px</span>
                    <ButtonActionsDemo label={copy.theme} />
                </div>
                <div className="grid justify-items-start gap-3">
                    <span className="text-xs">gallery · 44 px</span>
                    <Button variant="round" size="gallery" asChild>
                        <a href="#button-link-target" aria-label={copy.inline}>
                            <ChevronRight aria-hidden="true" />
                        </a>
                    </Button>
                </div>
                <Button variant="round" size="gallery" disabled aria-label={copy.disabled}>
                    <ChevronLeft aria-hidden="true" />
                </Button>
                <div className="grid justify-items-start gap-3">
                    <span className="text-xs">orb · 63 / 100 / 125 px</span>
                    <Button variant="round" size="orb" asChild>
                        <a href="#button-link-target" aria-label={copy.contact}>
                            <ArrowUpRight aria-hidden="true" />
                        </a>
                    </Button>
                </div>
            </div>
            <div className="flex flex-wrap items-center gap-6">
                <TextLink
                    variant="underlined"
                    href="/documents/gennady-nagibin-resume.pdf"
                    download
                    icon={<Download />}
                >
                    {copy.download}
                </TextLink>
                <TextLink
                    variant="underlined"
                    href="https://swing-carry-82362385.figma.site/"
                    target="_blank"
                    rel="noopener noreferrer"
                    icon={<ArrowUpRight />}
                >
                    {copy.document}
                </TextLink>
                <TextLink variant="inline" href="#button-link-target" icon={<ArrowUpRight />}>
                    {copy.inline}
                </TextLink>
                <TextLink variant="scroll" href="#button-link-target" icon={<ArrowDown />}>
                    {copy.scroll}
                </TextLink>
            </div>
            <div className="grid min-w-0 gap-8">
                <TextLink
                    variant="index"
                    data-cursor={copy.index}
                    href="#button-link-target"
                    count={8}
                    icon={<ArrowUpRight />}
                >
                    {copy.index}
                </TextLink>
                <TextLink
                    variant="contact"
                    href="#button-link-target"
                    description={copy.description}
                    icon={<ArrowUpRight />}
                >
                    {copy.contact}
                </TextLink>
                <TextLink
                    variant="next"
                    data-cursor={copy.next}
                    href="#button-link-target"
                    eyebrow={copy.next.toLocaleUpperCase(locale)}
                    icon={<ArrowUpRight />}
                >
                    OneTouch
                </TextLink>
                <TextLink
                    variant="contact"
                    href="#button-link-target"
                    description={copy.description}
                    icon={<ArrowUpRight />}
                >
                    {copy.long}
                </TextLink>
            </div>
            <p
                id="button-link-target"
                tabIndex={-1}
                className="text-sm text-muted-foreground outline-offset-4"
            >
                {copy.target}
            </p>
        </section>
    );
}
