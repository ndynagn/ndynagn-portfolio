import 'server-only';

import type { GalleryGroup, GalleryLabels } from '@/features/portfolio/gallery';
import type { Locale } from '@/shared/i18n/locales';

/** Archive-only gallery fixtures. OOMI screenshots belong to Potlucky. */
const archive = [
    {
        id: 'onetouch',
        name: 'OneTouch',
        groups: [
            {
                id: 'onetouch-0',
                title: {
                    ru: 'OneTouch GO · клиент',
                    en: 'OneTouch GO · client',
                },
                images: [
                    {
                        id: 'onetouch-0-0',
                        src: '/images/projects/onetouch/go-1.webp',
                        thumbnail: '/images/projects/onetouch/go-1-thumb.webp',
                        width: 924,
                        height: 2000,
                        caption: {
                            ru: 'Услуги и категории',
                            en: 'Services and categories',
                        },
                    },
                    {
                        id: 'onetouch-0-1',
                        src: '/images/projects/onetouch/go-2.webp',
                        thumbnail: '/images/projects/onetouch/go-2-thumb.webp',
                        width: 924,
                        height: 2000,
                        caption: {
                            ru: 'Адрес заказа на карте',
                            en: 'Order location on the map',
                        },
                    },
                    {
                        id: 'onetouch-0-2',
                        src: '/images/projects/onetouch/go-3.webp',
                        thumbnail: '/images/projects/onetouch/go-3-thumb.webp',
                        width: 924,
                        height: 2000,
                        caption: {
                            ru: 'Мои заказы',
                            en: 'My orders',
                        },
                    },
                    {
                        id: 'onetouch-0-3',
                        src: '/images/projects/onetouch/go-4.webp',
                        thumbnail: '/images/projects/onetouch/go-4-thumb.webp',
                        width: 924,
                        height: 2000,
                        caption: {
                            ru: 'Детали заказа',
                            en: 'Order details',
                        },
                    },
                    {
                        id: 'onetouch-0-4',
                        src: '/images/projects/onetouch/go-5.webp',
                        thumbnail: '/images/projects/onetouch/go-5-thumb.webp',
                        width: 942,
                        height: 2000,
                        caption: {
                            ru: 'Сообщения',
                            en: 'Messages',
                        },
                    },
                ],
            },
            {
                id: 'onetouch-1',
                title: {
                    ru: 'OneTouch PRO · исполнитель',
                    en: 'OneTouch PRO · professional',
                },
                images: [
                    {
                        id: 'onetouch-1-0',
                        src: '/images/projects/onetouch/pro-1.webp',
                        thumbnail: '/images/projects/onetouch/pro-1-thumb.webp',
                        width: 924,
                        height: 2000,
                        caption: {
                            ru: 'Профиль исполнителя',
                            en: 'Professional profile',
                        },
                    },
                    {
                        id: 'onetouch-1-1',
                        src: '/images/projects/onetouch/pro-2.webp',
                        thumbnail: '/images/projects/onetouch/pro-2-thumb.webp',
                        width: 924,
                        height: 2000,
                        caption: {
                            ru: 'Заказ на карте',
                            en: 'Order on the map',
                        },
                    },
                    {
                        id: 'onetouch-1-2',
                        src: '/images/projects/onetouch/pro-3.webp',
                        thumbnail: '/images/projects/onetouch/pro-3-thumb.webp',
                        width: 924,
                        height: 2000,
                        caption: {
                            ru: 'Список заказов',
                            en: 'Order list',
                        },
                    },
                    {
                        id: 'onetouch-1-3',
                        src: '/images/projects/onetouch/pro-4.webp',
                        thumbnail: '/images/projects/onetouch/pro-4-thumb.webp',
                        width: 924,
                        height: 2000,
                        caption: {
                            ru: 'Завершение заказа',
                            en: 'Completing an order',
                        },
                    },
                    {
                        id: 'onetouch-1-4',
                        src: '/images/projects/onetouch/pro-5.webp',
                        thumbnail: '/images/projects/onetouch/pro-5-thumb.webp',
                        width: 942,
                        height: 2000,
                        caption: {
                            ru: 'Чаты',
                            en: 'Chats',
                        },
                    },
                ],
            },
        ],
    },
    {
        id: 'potlucky',
        name: 'Potlucky / OOMI',
        groups: [
            {
                id: 'potlucky-0',
                title: {
                    ru: 'OOMI · интерфейсы приложения',
                    en: 'OOMI · app interfaces',
                },
                images: [
                    {
                        id: 'potlucky-0-0',
                        src: '/images/projects/potlucky/oomi-1.webp',
                        thumbnail: '/images/projects/potlucky/oomi-1-thumb.webp',
                        width: 924,
                        height: 2000,
                        caption: {
                            ru: 'Каталог OOMI',
                            en: 'OOMI catalogue',
                        },
                    },
                    {
                        id: 'potlucky-0-1',
                        src: '/images/projects/potlucky/oomi-2.webp',
                        thumbnail: '/images/projects/potlucky/oomi-2-thumb.webp',
                        width: 924,
                        height: 2000,
                        caption: {
                            ru: 'Адрес доставки',
                            en: 'Delivery address',
                        },
                    },
                    {
                        id: 'potlucky-0-2',
                        src: '/images/projects/potlucky/oomi-3.webp',
                        thumbnail: '/images/projects/potlucky/oomi-3-thumb.webp',
                        width: 924,
                        height: 2000,
                        caption: {
                            ru: 'Способ получения заказа',
                            en: 'Order fulfilment method',
                        },
                    },
                    {
                        id: 'potlucky-0-3',
                        src: '/images/projects/potlucky/oomi-4.webp',
                        thumbnail: '/images/projects/potlucky/oomi-4-thumb.webp',
                        width: 924,
                        height: 2000,
                        caption: {
                            ru: 'Товары и категории',
                            en: 'Products and categories',
                        },
                    },
                    {
                        id: 'potlucky-0-4',
                        src: '/images/projects/potlucky/oomi-5.webp',
                        thumbnail: '/images/projects/potlucky/oomi-5-thumb.webp',
                        width: 924,
                        height: 2000,
                        caption: {
                            ru: 'Корзина',
                            en: 'Shopping cart',
                        },
                    },
                ],
            },
        ],
    },
    {
        id: 'immergas',
        name: 'Immergas',
        groups: [
            {
                id: 'immergas-0',
                title: {
                    ru: 'Интерфейсы приложения',
                    en: 'App interfaces',
                },
                images: [
                    {
                        id: 'immergas-0-0',
                        src: '/images/projects/immergas/screens-2.webp',
                        thumbnail: '/images/projects/immergas/screens-2-thumb.webp',
                        width: 924,
                        height: 2000,
                        caption: {
                            ru: 'Вход в программу',
                            en: 'Programme welcome',
                        },
                    },
                    {
                        id: 'immergas-0-1',
                        src: '/images/projects/immergas/screens-3.webp',
                        thumbnail: '/images/projects/immergas/screens-3-thumb.webp',
                        width: 924,
                        height: 2000,
                        caption: {
                            ru: 'Личный кабинет',
                            en: 'Dashboard',
                        },
                    },
                    {
                        id: 'immergas-0-2',
                        src: '/images/projects/immergas/screens-4.webp',
                        thumbnail: '/images/projects/immergas/screens-4-thumb.webp',
                        width: 924,
                        height: 2000,
                        caption: {
                            ru: 'Мои установки',
                            en: 'My installations',
                        },
                    },
                    {
                        id: 'immergas-0-3',
                        src: '/images/projects/immergas/screens-5.webp',
                        thumbnail: '/images/projects/immergas/screens-5-thumb.webp',
                        width: 924,
                        height: 2000,
                        caption: {
                            ru: 'Сканирование QR-кода',
                            en: 'QR code scanning',
                        },
                    },
                ],
            },
        ],
    },
    {
        id: 'klimatprof',
        name: 'KlimatProf',
        groups: [
            {
                id: 'klimatprof-0',
                title: {
                    ru: 'Интерфейсы приложения',
                    en: 'App interfaces',
                },
                images: [
                    {
                        id: 'klimatprof-0-0',
                        src: '/images/projects/klimatprof/screens-2.webp',
                        thumbnail: '/images/projects/klimatprof/screens-2-thumb.webp',
                        width: 924,
                        height: 2000,
                        caption: {
                            ru: 'Главная и предложения',
                            en: 'Home and offers',
                        },
                    },
                    {
                        id: 'klimatprof-0-1',
                        src: '/images/projects/klimatprof/screens-3.webp',
                        thumbnail: '/images/projects/klimatprof/screens-3-thumb.webp',
                        width: 924,
                        height: 2000,
                        caption: {
                            ru: 'Каталог техники',
                            en: 'Equipment catalogue',
                        },
                    },
                    {
                        id: 'klimatprof-0-2',
                        src: '/images/projects/klimatprof/screens-4.webp',
                        thumbnail: '/images/projects/klimatprof/screens-4-thumb.webp',
                        width: 924,
                        height: 2000,
                        caption: {
                            ru: 'Корзина',
                            en: 'Shopping cart',
                        },
                    },
                    {
                        id: 'klimatprof-0-3',
                        src: '/images/projects/klimatprof/screens-5.webp',
                        thumbnail: '/images/projects/klimatprof/screens-5-thumb.webp',
                        width: 924,
                        height: 2000,
                        caption: {
                            ru: 'История заказов',
                            en: 'Order history',
                        },
                    },
                ],
            },
        ],
    },
    {
        id: 'checkai',
        name: { ru: 'Чекай', en: 'Chekai' },
        groups: [
            {
                id: 'checkai-0',
                title: {
                    ru: 'Интерфейсы приложения',
                    en: 'App interfaces',
                },
                images: [
                    {
                        id: 'checkai-0-0',
                        src: '/images/projects/checkai/screens-1.webp',
                        thumbnail: '/images/projects/checkai/screens-1-thumb.webp',
                        width: 1080,
                        height: 1920,
                        caption: {
                            ru: 'Магазины-партнёры',
                            en: 'Partner stores',
                        },
                    },
                    {
                        id: 'checkai-0-1',
                        src: '/images/projects/checkai/screens-2.webp',
                        thumbnail: '/images/projects/checkai/screens-2-thumb.webp',
                        width: 1080,
                        height: 1920,
                        caption: {
                            ru: 'Кешбэк за покупки',
                            en: 'Shopping cashback',
                        },
                    },
                    {
                        id: 'checkai-0-2',
                        src: '/images/projects/checkai/screens-3.webp',
                        thumbnail: '/images/projects/checkai/screens-3-thumb.webp',
                        width: 1080,
                        height: 1920,
                        caption: {
                            ru: 'Реферальная программа',
                            en: 'Referral programme',
                        },
                    },
                    {
                        id: 'checkai-0-3',
                        src: '/images/projects/checkai/screens-4.webp',
                        thumbnail: '/images/projects/checkai/screens-4-thumb.webp',
                        width: 1080,
                        height: 1920,
                        caption: {
                            ru: 'Условия начисления',
                            en: 'Earning conditions',
                        },
                    },
                    {
                        id: 'checkai-0-4',
                        src: '/images/projects/checkai/screens-5.webp',
                        thumbnail: '/images/projects/checkai/screens-5-thumb.webp',
                        width: 1080,
                        height: 1920,
                        caption: {
                            ru: 'Выплата кешбэка',
                            en: 'Cashback withdrawal',
                        },
                    },
                ],
            },
        ],
    },
    {
        id: 'galleria-minsk',
        name: 'Galleria Minsk',
        groups: [
            {
                id: 'galleria-minsk-0',
                title: {
                    ru: 'Интерфейсы приложения',
                    en: 'App interfaces',
                },
                images: [
                    {
                        id: 'galleria-minsk-0-0',
                        src: '/images/projects/galleria-minsk/screens-2.webp',
                        thumbnail: '/images/projects/galleria-minsk/screens-2-thumb.webp',
                        width: 916,
                        height: 2000,
                        caption: {
                            ru: 'Сканирование чека',
                            en: 'Receipt scanning',
                        },
                    },
                    {
                        id: 'galleria-minsk-0-1',
                        src: '/images/projects/galleria-minsk/screens-3.webp',
                        thumbnail: '/images/projects/galleria-minsk/screens-3-thumb.webp',
                        width: 924,
                        height: 2000,
                        caption: {
                            ru: 'Программа лояльности',
                            en: 'Loyalty programme',
                        },
                    },
                    {
                        id: 'galleria-minsk-0-2',
                        src: '/images/projects/galleria-minsk/screens-4.webp',
                        thumbnail: '/images/projects/galleria-minsk/screens-4-thumb.webp',
                        width: 924,
                        height: 2000,
                        caption: {
                            ru: 'Новости и акции',
                            en: 'News and offers',
                        },
                    },
                    {
                        id: 'galleria-minsk-0-3',
                        src: '/images/projects/galleria-minsk/screens-5.webp',
                        thumbnail: '/images/projects/galleria-minsk/screens-5-thumb.webp',
                        width: 924,
                        height: 2000,
                        caption: {
                            ru: 'События торгового центра',
                            en: 'Shopping centre events',
                        },
                    },
                ],
            },
        ],
    },
    {
        id: 'golden-plate',
        name: { ru: 'Золотая Плата', en: 'Golden Plate' },
        groups: [
            {
                id: 'golden-plate-0',
                title: {
                    ru: 'Интерфейсы приложения',
                    en: 'App interfaces',
                },
                images: [
                    {
                        id: 'golden-plate-0-0',
                        src: '/images/projects/golden-plate/screens-2.webp',
                        thumbnail: '/images/projects/golden-plate/screens-2-thumb.webp',
                        width: 924,
                        height: 2000,
                        caption: {
                            ru: 'Главная и предложения',
                            en: 'Home and offers',
                        },
                    },
                    {
                        id: 'golden-plate-0-1',
                        src: '/images/projects/golden-plate/screens-3.webp',
                        thumbnail: '/images/projects/golden-plate/screens-3-thumb.webp',
                        width: 924,
                        height: 2000,
                        caption: {
                            ru: 'Категории монет',
                            en: 'Coin categories',
                        },
                    },
                    {
                        id: 'golden-plate-0-2',
                        src: '/images/projects/golden-plate/screens-4.webp',
                        thumbnail: '/images/projects/golden-plate/screens-4-thumb.webp',
                        width: 924,
                        height: 2000,
                        caption: {
                            ru: 'Каталог и фильтры',
                            en: 'Catalogue and filters',
                        },
                    },
                    {
                        id: 'golden-plate-0-3',
                        src: '/images/projects/golden-plate/screens-5.webp',
                        thumbnail: '/images/projects/golden-plate/screens-5-thumb.webp',
                        width: 924,
                        height: 2000,
                        caption: {
                            ru: 'Карточка монеты',
                            en: 'Coin details',
                        },
                    },
                ],
            },
        ],
    },
    {
        id: 'aventin',
        name: { ru: 'Авентин', en: 'Aventin' },
        groups: [
            {
                id: 'aventin-0',
                title: {
                    ru: 'Интерфейсы приложения',
                    en: 'App interfaces',
                },
                images: [
                    {
                        id: 'aventin-0-0',
                        src: '/images/projects/aventin/screens-2.webp',
                        thumbnail: '/images/projects/aventin/screens-2-thumb.webp',
                        width: 924,
                        height: 2000,
                        caption: {
                            ru: 'Камеры дома',
                            en: 'Home cameras',
                        },
                    },
                    {
                        id: 'aventin-0-1',
                        src: '/images/projects/aventin/screens-3.webp',
                        thumbnail: '/images/projects/aventin/screens-3-thumb.webp',
                        width: 924,
                        height: 2000,
                        caption: {
                            ru: 'Прямой эфир',
                            en: 'Live video',
                        },
                    },
                    {
                        id: 'aventin-0-2',
                        src: '/images/projects/aventin/screens-4.webp',
                        thumbnail: '/images/projects/aventin/screens-4-thumb.webp',
                        width: 924,
                        height: 2000,
                        caption: {
                            ru: 'Обращения в поддержку',
                            en: 'Support requests',
                        },
                    },
                    {
                        id: 'aventin-0-3',
                        src: '/images/projects/aventin/screens-5.webp',
                        thumbnail: '/images/projects/aventin/screens-5-thumb.webp',
                        width: 924,
                        height: 2000,
                        caption: {
                            ru: 'Вызов домофона',
                            en: 'Intercom call',
                        },
                    },
                ],
            },
        ],
    },
] as const;

export function getGalleryFixtures(locale: Locale): readonly {
    readonly id: string;
    readonly name: string;
    readonly groups: readonly GalleryGroup[];
}[] {
    return archive.map((project) => ({
        id: project.id,
        name: typeof project.name === 'string' ? project.name : project.name[locale],
        groups: project.groups.map((group) => ({
            id: group.id,
            title: group.title[locale],
            images: group.images.map((image) => ({
                ...image,
                alt: group.title[locale] + ' — ' + image.caption[locale],
                caption: image.caption[locale],
                lightboxCaption:
                    project.groups.length > 1 || project.id === 'potlucky'
                        ? group.title[locale] + ' · ' + image.caption[locale]
                        : image.caption[locale],
            })),
        })),
    }));
}

export function getGalleryLabels(locale: Locale): GalleryLabels {
    const ru = locale === 'ru';
    return {
        enlarge: ru ? 'Увеличить' : 'Enlarge',
        scrollPrevious: ru ? 'Прокрутить галерею влево' : 'Scroll gallery left',
        scrollNext: ru ? 'Прокрутить галерею вправо' : 'Scroll gallery right',
        previous: ru ? 'Предыдущее изображение' : 'Previous image',
        next: ru ? 'Следующее изображение' : 'Next image',
        close: ru ? 'Закрыть галерею' : 'Close gallery',
        zoomIn: ru ? 'Увеличить' : 'Zoom in',
        zoomOut: ru ? 'Уменьшить' : 'Zoom out',
        description: ru ? 'Галерея проекта' : 'Project gallery',
        loading: ru ? 'Загрузка изображения…' : 'Loading image…',
        error: ru ? 'Не удалось загрузить изображение.' : 'The image could not be loaded.',
        retry: ru ? 'Повторить' : 'Try again',
    };
}
