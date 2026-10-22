'use client';

import type { JSX, ReactNode } from 'react';
import { usePathname } from 'next/navigation';

import { CursorBoundary } from '@/shared/animation/cursor-boundary';

interface PortfolioCursorProps {
    readonly children: ReactNode;
}

/** Keep pointer state across public route commits; the workbench owns its local boundary. */
export function PortfolioCursor({ children }: PortfolioCursorProps): JSX.Element {
    const pathname = usePathname();

    return pathname.endsWith('/design-system') ? (
        <>{children}</>
    ) : (
        <CursorBoundary>{children}</CursorBoundary>
    );
}
