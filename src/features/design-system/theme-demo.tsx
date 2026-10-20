'use client';

import type { JSX } from 'react';

import { toggleTheme } from '@/shared/theme/browser-theme';
import { useTheme } from '@/shared/theme/theme-observer';
import { Button } from '@/shared/ui/button';

interface ThemeDemoProps {
    readonly label: string;
}

export function ThemeDemo({ label }: ThemeDemoProps): JSX.Element {
    const theme = useTheme();

    return (
        <div className="flex flex-wrap items-center gap-3">
            <Button data-theme-control onClick={(event) => void toggleTheme(event.currentTarget)}>
                {label}
            </Button>
            <output className="text-sm text-muted-foreground">{theme}</output>
        </div>
    );
}
