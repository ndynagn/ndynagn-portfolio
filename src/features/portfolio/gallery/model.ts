export interface GalleryImage {
    readonly id: string;
    readonly src: string;
    readonly thumbnail: string;
    readonly width: number;
    readonly height: number;
    readonly alt: string;
    readonly caption: string;
    readonly lightboxCaption: string;
}

export interface GalleryGroup {
    readonly id: string;
    readonly title: string;
    readonly images: readonly GalleryImage[];
}

export interface GalleryLabels {
    readonly enlarge: string;
    readonly scrollPrevious: string;
    readonly scrollNext: string;
    readonly previous: string;
    readonly next: string;
    readonly close: string;
    readonly zoomIn: string;
    readonly zoomOut: string;
    readonly description: string;
    readonly loading: string;
    readonly error: string;
    readonly retry: string;
}
