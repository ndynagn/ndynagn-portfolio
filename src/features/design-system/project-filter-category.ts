export type ProjectFilterCategory = 'all' | 'commerce' | 'service';

export function parseProjectFilterCategory(
    value: string | null | undefined,
): ProjectFilterCategory {
    return value === 'commerce' || value === 'service' ? value : 'all';
}
