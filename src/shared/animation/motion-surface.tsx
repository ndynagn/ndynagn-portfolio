'use client';

import type { JSX, ReactNode } from 'react';
import { MotionConfig, motion, useReducedMotion } from 'motion/react';

interface MotionSurfaceProps {
    readonly children: ReactNode;
    readonly className?: string;
}

/** Content is visible in server HTML; only an optional hover treatment is animated. */
export function MotionSurface({ children, className }: MotionSurfaceProps): JSX.Element {
    const reducedMotion = useReducedMotion();

    return (
        <MotionConfig reducedMotion="user">
            <motion.div
                initial={false}
                whileHover={reducedMotion ? undefined : { y: -2 }}
                transition={{ duration: 0.2 }}
                className={className}
            >
                {children}
            </motion.div>
        </MotionConfig>
    );
}
