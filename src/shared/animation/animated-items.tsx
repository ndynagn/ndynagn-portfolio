'use client';

import { useEffect, useLayoutEffect, type JSX, type ReactNode, type Ref } from 'react';
import {
    AnimatePresence,
    MotionConfig,
    motion,
    useAnimationControls,
    usePresence,
    useResetProjection,
} from 'motion/react';

import { useReducedMotion } from './use-reduced-motion';

interface AnimatedItem {
    readonly id: string;
    readonly content: ReactNode;
}

interface AnimatedItemsProps {
    readonly items: readonly AnimatedItem[];
}

interface PresenceItemProps {
    readonly children: ReactNode;
    readonly ref?: Ref<HTMLDivElement>;
}

function PresenceItem({ children, ref }: PresenceItemProps): JSX.Element {
    // Exiting children retain their last props, so they subscribe to the preference themselves.
    const reduced = useReducedMotion();
    const [present, remove] = usePresence();
    const controls = useAnimationControls();

    useLayoutEffect(() => {
        let current = true;

        if (reduced) {
            controls.stop();
            controls.set({ opacity: present ? 1 : 0, scale: 1 });
            return;
        }

        void controls.start({ opacity: present ? 1 : 0, scale: present ? 1 : 0.96 }).then(() => {
            if (current && !present) {
                remove?.();
            }
        });

        return () => {
            current = false;
            controls.stop();
        };
    }, [controls, present, reduced, remove]);

    useEffect(() => {
        if (reduced && !present) {
            // AnimatePresence registers exiting keys in its parent layout effect.
            // Completion must follow that bookkeeping even though values settle before paint.
            remove?.();
        }
    }, [present, reduced, remove]);

    return (
        <motion.div
            ref={ref}
            layout="position"
            initial={reduced ? false : { opacity: 0, scale: 0.96 }}
            animate={controls}
            transition={{
                layout: {
                    type: reduced ? false : undefined,
                    duration: reduced ? 0 : 0.48,
                    ease: [0.22, 1, 0.36, 1],
                },
                opacity: { duration: reduced ? 0 : 0.18 },
                scale: { duration: reduced ? 0 : 0.24, ease: 'easeOut' },
            }}
            inert={!present}
            aria-hidden={!present || undefined}
            className="min-w-0"
        >
            {children}
        </motion.div>
    );
}

/** Initial SSR content stays visible. Inputs are display nodes, never a content catalogue. */
export function AnimatedItems({ items }: AnimatedItemsProps): JSX.Element {
    const reduced = useReducedMotion();
    const resetProjection = useResetProjection();

    useLayoutEffect(() => {
        if (reduced) {
            // The OS preference applies document-wide. This public Motion API stops every
            // active layout projection; AnimatedItems currently owns all such consumers.
            resetProjection();
        }
    }, [reduced, resetProjection]);

    return (
        // Motion captures its preference and projection options at mount. This owner keeps
        // projection mounted and applies the live preference through controls and transitions.
        <MotionConfig reducedMotion="never">
            <div className="relative grid grid-cols-2 gap-4 md:grid-cols-4">
                <AnimatePresence initial={false} mode="popLayout">
                    {items.map((item) => (
                        <PresenceItem key={item.id}>{item.content}</PresenceItem>
                    ))}
                </AnimatePresence>
            </div>
        </MotionConfig>
    );
}
