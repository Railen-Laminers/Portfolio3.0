// components/LoadingScreen.jsx
import React, { useState, useEffect } from 'react';

function LoadingScreen({ onLoadingComplete }) {
    const [progress, setProgress] = useState(0);
    const [phase, setPhase] = useState('loading');

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 1;
            });
        }, 30);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (progress === 100) {
            const readyTimer = setTimeout(() => {
                setPhase('ready');
            }, 500);

            const fadeTimer = setTimeout(() => {
                setPhase('fadeout');
            }, 2000);

            const unmountTimer = setTimeout(() => {
                onLoadingComplete();
            }, 2800);

            return () => {
                clearTimeout(readyTimer);
                clearTimeout(fadeTimer);
                clearTimeout(unmountTimer);
            };
        }
    }, [progress, onLoadingComplete]);

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-bg-primary transition-opacity duration-700 ${
                phase === 'fadeout' ? 'opacity-0' : 'opacity-100'
            }`}
        >
            <div className="relative flex items-center justify-center min-w-[420px]">
                {/* Loading State */}
                <div
                    className={`relative transition-opacity duration-500 ${
                        phase === 'ready' ? 'opacity-0' : 'opacity-100'
                    }`}
                >
                    {/* Text */}
                    <div className="relative">
                        <span
                            className="text-6xl sm:text-7xl font-light tracking-[0.25em] text-secondary select-none"
                            style={{
                                opacity: Math.max(0.35, 1 - progress / 120),
                            }}
                        >
                            Loading
                        </span>

                        {/* Cursor */}
                        <span className="ml-2 text-secondary animate-pulse text-6xl sm:text-7xl">
                            _
                        </span>

                        {/* Strike Through */}
                        <div
                            className="absolute left-0 top-1/2 -translate-y-1/2 h-px bg-secondary"
                            style={{
                                width: `${progress}%`,
                                boxShadow:
                                    '0 0 6px rgba(212,168,67,0.25)',
                            }}
                        />
                    </div>

                    {/* Optional Percentage */}
                    <div className="mt-8 text-center">
                        <span className="text-text-muted text-sm tracking-[0.3em]">
                            {progress}%
                        </span>
                    </div>
                </div>

                {/* Ready State */}
                <div
                    className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
                        phase === 'ready'
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-2'
                    }`}
                >
                    <div className="flex items-center">
                        <span className="text-6xl sm:text-7xl font-light tracking-[0.25em] text-secondary">
                            Ready.
                        </span>

                        <span className="ml-2 text-secondary animate-pulse text-6xl sm:text-7xl">
                            _
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoadingScreen;