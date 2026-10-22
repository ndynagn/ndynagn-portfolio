export type ProjectCategory = 'all' | 'commerce' | 'service';

/** Unknown and repeated query values resolve to the unfiltered catalogue. */
export function parseProjectCategory(value: unknown): ProjectCategory {
    return value === 'commerce' || value === 'service' ? value : 'all';
}
