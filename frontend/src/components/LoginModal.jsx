// components/LoginModal.jsx
import React, { useState, useEffect } from 'react';

function LoginModal({ isOpen, onClose }) {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
        }
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Replace with real authentication
        alert(`Logging in with:\nIdentifier: ${identifier}\nPassword: ${password}`);
        onClose();
    };

    if (!isOpen) return null;

    return (
        // Overlay backdrop
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={onClose} // click outside closes
        >
            {/* Modal container */}
            <div
                className="relative bg-secondary/95 backdrop-blur-md rounded-2xl shadow-2xl border border-border-glass w-full max-w-md mx-4 p-6 sm:p-8"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button (×) */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-4 text-text-secondary/60 hover:text-text-secondary transition"
                    aria-label="Close modal"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <h2 className="text-2xl font-semibold text-text-secondary mb-6 text-center">
                    Welcome Back
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email / Username */}
                    <div>
                        <label htmlFor="identifier" className="block text-sm font-medium text-text-secondary/80 mb-1">
                            Email or Username
                        </label>
                        <input
                            id="identifier"
                            type="text"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            className="w-full px-4 py-2.5 bg-white/5 border border-border-glass rounded-lg text-text-secondary placeholder-text-secondary/40 focus:outline-none focus:ring-2 focus:ring-accent-orange/60 focus:border-transparent transition"
                            placeholder="you@example.com or username"
                            required
                        />
                    </div>

                    {/* Password with Show/Hide */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-text-secondary/80 mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2.5 bg-white/5 border border-border-glass rounded-lg text-text-secondary placeholder-text-secondary/40 focus:outline-none focus:ring-2 focus:ring-accent-orange/60 focus:border-transparent transition pr-12"
                                placeholder="••••••••"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-secondary/60 hover:text-accent-orange transition"
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? (
                                    // Eye-slash icon (Hide)
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                    </svg>
                                ) : (
                                    // Eye icon (Show)
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full py-2.5 px-4 bg-accent-orange hover:bg-accent-orange/90 text-black font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent-orange/60 focus:ring-offset-2 focus:ring-offset-secondary"
                    >
                        Log In
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginModal;