'use client';

import type { JSX } from 'react';
import { Moon, Sun } from 'lucide-react';

import { GlassSurface } from '@/shared/styles/glass-surface';
import { toggleTheme } from '@/shared/theme/browser-theme';
import { useTheme } from '@/shared/theme/theme-observer';
import { Button } from '@/shared/ui/button';

interface ButtonActionsDemoProps {
    readonly label: string;
}

/** The fixture owns the action; the shared round button owns presentation only. */
export function ButtonActionsDemo({ label }: ButtonActionsDemoProps): JSX.Element {
    const theme = useTheme();

    return (
        <GlassSurface material="control" className="inline-flex w-fit rounded-full border-0">
            <Button
                variant="round"
                size="control"
                aria-label={label}
                onClick={(event) => void toggleTheme(event.currentTarget)}
            >
                {theme === 'dark' ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
            </Button>
        </GlassSurface>
    );
}
