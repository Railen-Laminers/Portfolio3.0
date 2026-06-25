import React, { useState, useRef, useEffect } from 'react';
import { useLenis } from 'lenis/react';
import { useAuth } from '../context/AuthContext';

function Navbar({ onLoginClick }) {
    const lenis = useLenis();
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const navbarContainerRef = useRef(null);
    const { user, logout, isAuthenticated } = useAuth();

    const scrollToTop = () => {
        if (lenis) {
            lenis.scrollTo(0, { duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
        }
    };

    const togglePanel = () => setIsPanelOpen(!isPanelOpen);

    // Close panel when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navbarContainerRef.current && !navbarContainerRef.current.contains(event.target)) {
                setIsPanelOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        setIsPanelOpen(false);
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-secondary/80 backdrop-blur-md border-b border-border-glass shadow-sm">
            <div
                ref={navbarContainerRef}
                className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between relative"
            >
                {/* Logo */}
                <button
                    onClick={scrollToTop}
                    className="text-xl font-semibold tracking-tight text-text-secondary hover:text-accent-orange transition-colors"
                    aria-label="Scroll to top"
                >
                    <span className="font-serif italic">MyLogo</span>
                </button>

                {/* Burger */}
                <button
                    onClick={togglePanel}
                    className="flex flex-col items-center justify-center w-8 h-8 space-y-1.5 group focus:outline-none relative z-10"
                    aria-label="Toggle panel"
                >
                    <span
                        className={`block w-6 h-0.5 bg-accent-orange transition-all duration-300 ${isPanelOpen ? 'rotate-45 translate-y-2' : ''
                            }`}
                    />
                    <span
                        className={`block w-6 h-0.5 bg-accent-orange transition-all duration-300 ${isPanelOpen ? 'opacity-0' : ''
                            }`}
                    />
                    <span
                        className={`block w-6 h-0.5 bg-accent-orange transition-all duration-300 ${isPanelOpen ? '-rotate-45 -translate-y-2' : ''
                            }`}
                    />
                </button>

                {/* Dropdown panel */}
                <div
                    className={`absolute top-full right-0 mt-2 w-48 bg-secondary/95 backdrop-blur-md rounded-lg shadow-lg border border-border-glass transition-all duration-300 origin-top-right overflow-hidden ${isPanelOpen
                            ? 'scale-100 opacity-100 pointer-events-auto'
                            : 'scale-95 opacity-0 pointer-events-none'
                        }`}
                >
                    <div className="py-2 flex flex-col">
                        {!isAuthenticated ? (
                            <button
                                onClick={() => {
                                    onLoginClick();
                                    setIsPanelOpen(false);
                                }}
                                className="px-4 py-2 text-sm text-text-secondary hover:bg-accent-orange/10 transition text-left"
                            >
                                Login
                            </button>
                        ) : (
                            <>
                                <div className="px-4 py-2 text-sm text-text-secondary/70 border-b border-border-glass">
                                    <span className="block font-medium">{user?.username}</span>
                                    <span className="text-xs text-muted">{user?.role}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition text-left"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                        <button
                            onClick={() => {
                                alert('Settings clicked');
                                setIsPanelOpen(false);
                            }}
                            className="px-4 py-2 text-sm text-text-secondary hover:bg-accent-orange/10 transition text-left"
                        >
                            Settings
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;