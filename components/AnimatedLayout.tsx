'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, ReactNode, useEffect, useState } from 'react';

/* ═══════════════════════════════════════════════════════
   SCROLL REVEAL — Animates children when scrolled into view
   ═══════════════════════════════════════════════════════ */
export function ScrollReveal({
    children,
    className = '',
    delay = 0,
    direction = 'up',
}: {
    children: ReactNode;
    className?: string;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right';
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    const directionMap = {
        up: { y: 50, x: 0 },
        down: { y: -50, x: 0 },
        left: { x: -60, y: 0 },
        right: { x: 60, y: 0 },
    };

    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{
                opacity: 0,
                ...directionMap[direction],
                filter: 'blur(8px)',
            }}
            animate={isInView ? {
                opacity: 1,
                x: 0,
                y: 0,
                filter: 'blur(0px)',
            } : {}}
            transition={{
                duration: 0.8,
                delay,
                ease: [0.25, 0.46, 0.45, 0.94],
            }}
        >
            {children}
        </motion.div>
    );
}

/* ═══════════════════════════════════════════════════════
   STAGGER CONTAINER & ITEM — Staggered list animations
   ═══════════════════════════════════════════════════════ */
export function StaggerContainer({
    children,
    className = '',
    staggerDelay = 0.08,
}: {
    children: ReactNode;
    className?: string;
    staggerDelay?: number;
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    return (
        <motion.div
            ref={ref}
            className={className}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={{
                hidden: {},
                visible: {
                    transition: {
                        staggerChildren: staggerDelay,
                    },
                },
            }}
        >
            {children}
        </motion.div>
    );
}

export function StaggerItem({
    children,
    className = '',
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <motion.div
            className={className}
            variants={{
                hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
                visible: {
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
                },
            }}
        >
            {children}
        </motion.div>
    );
}

/* ═══════════════════════════════════════════════════════
   GLOW CARD — Holographic glass card with mouse-tracking glow
   ═══════════════════════════════════════════════════════ */
export function GlowCard({
    children,
    className = '',
    glowColor = 'cyan',
}: {
    children: ReactNode;
    className?: string;
    glowColor?: 'cyan' | 'purple' | 'gold' | 'rose';
}) {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        cardRef.current.style.setProperty('--mouse-x', `${x}%`);
        cardRef.current.style.setProperty('--mouse-y', `${y}%`);
    };

    const glowConfig = {
        cyan: 'rgba(0, 240, 255, 0.08)',
        purple: 'rgba(168, 85, 247, 0.08)',
        gold: 'rgba(255, 215, 0, 0.08)',
        rose: 'rgba(244, 63, 94, 0.08)',
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            className={`holo-card shimmer ${className}`}
            style={{
                '--glow-inner': glowConfig[glowColor],
            } as React.CSSProperties}
        >
            {children}
        </div>
    );
}

/* ═══════════════════════════════════════════════════════
   ANIMATED COUNTER — Count-up number animation
   ═══════════════════════════════════════════════════════ */
export function AnimatedCounter({
    value,
    className = '',
    duration = 1.5,
}: {
    value: number;
    className?: string;
    duration?: number;
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        if (!isInView) return;
        let startTime: number;
        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            setDisplayValue(Math.round(eased * value));
            if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }, [isInView, value, duration]);

    return (
        <span ref={ref} className={className}>
            {displayValue}
        </span>
    );
}

/* ═══════════════════════════════════════════════════════
   FLIP DIGIT — 3D flip animation for countdown digits
   ═══════════════════════════════════════════════════════ */
export function FlipDigit({ value, className = '' }: { value: string; className?: string }) {
    return (
        <div className={`relative overflow-hidden ${className}`} style={{ perspective: '200px' }}>
            <AnimatePresence mode="popLayout">
                <motion.span
                    key={value}
                    className="block tabular-nums"
                    initial={{ rotateX: -90, opacity: 0, filter: 'blur(4px)' }}
                    animate={{ rotateX: 0, opacity: 1, filter: 'blur(0px)' }}
                    exit={{ rotateX: 90, opacity: 0, filter: 'blur(4px)' }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    style={{ transformOrigin: 'center center', backfaceVisibility: 'hidden' }}
                >
                    {value}
                </motion.span>
            </AnimatePresence>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════
   PARTICLE FIELD — Decorative floating particles
   ═══════════════════════════════════════════════════════ */
export function ParticleField({ count = 20 }: { count?: number }) {
    const particles = Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 8 + 6,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.3 + 0.1,
    }));

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full bg-white"
                    style={{
                        left: p.left,
                        top: p.top,
                        width: p.size,
                        height: p.size,
                        opacity: p.opacity,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        opacity: [p.opacity, p.opacity * 1.5, p.opacity],
                    }}
                    transition={{
                        duration: p.duration,
                        delay: p.delay,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </div>
    );
}

/* ═══════════════════════════════════════════════════════
   MAGNETIC HOVER WRAPPER — Subtle magnetic pull effect
   ═══════════════════════════════════════════════════════ */
export function MagneticHover({
    children,
    className = '',
    strength = 10,
}: {
    children: ReactNode;
    className?: string;
    strength?: number;
}) {
    const ref = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * strength;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * strength;
        ref.current.style.transform = `translate(${x}px, ${y}px)`;
    };

    const handleMouseLeave = () => {
        if (!ref.current) return;
        ref.current.style.transform = 'translate(0, 0)';
    };

    return (
        <div
            ref={ref}
            className={`transition-transform duration-300 ease-out ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </div>
    );
}
