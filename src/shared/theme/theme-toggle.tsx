'use client';

import type { JSX } from 'react';
import { Moon, Sun } from 'lucide-react';

import { GlassSurface } from '@/shared/styles/glass-surface';
import { Button } from '@/shared/ui/button';

import { toggleTheme } from './browser-theme';
import { useTheme } from './theme-observer';

interface ThemeToggleProps {
    readonly lightLabel: string;
    readonly darkLabel: string;
}

/** Presentation for the existing document theme owner; no independent preference state. */
export function ThemeToggle({ lightLabel, darkLabel }: ThemeToggleProps): JSX.Element {
    const theme = useTheme();

    return (
        <GlassSurface material="control" className="inline-flex shrink-0 rounded-full border-0">
            <Button
                variant="round"
                size="control"
                aria-label={theme === 'dark' ? lightLabel : darkLabel}
                onClick={(event) => void toggleTheme(event.currentTarget)}
                data-theme-toggle
            >
                {theme === 'dark' ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
            </Button>
        </GlassSurface>
    );
}
