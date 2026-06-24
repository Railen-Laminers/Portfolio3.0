import React from 'react';
import SocialBtn from '../common/SocialBtn';
import {
    IconLocation,
    IconEmail,
    IconPhoto,
    IconGithub,
    IconFacebook,
    IconIndeed,
} from '../common/Icons';

const Sidebar = () => {
    const cardClasses =
        "relative overflow-hidden bg-white/5 backdrop-blur-[18px] border border-accent-orange/15 rounded-card shadow-card p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover before:content-[''] before:absolute before:inset-0 before:pointer-events-none before:bg-[radial-gradient(circle_at_20%_10%,rgba(212,168,67,0.04),transparent_70%)]";

    return (
        <aside className="w-full max-w-[380px] flex-shrink-0 self-start lg:sticky lg:top-6 flex flex-col gap-4 sm:gap-5 mx-auto lg:mx-0">
            {/* Profile Card */}
            <div className={cardClasses}>
                <div className="text-[11px] sm:text-xs uppercase tracking-[0.08em] mb-3 font-medium text-muted">
                    Profile
                </div>

                <p className="text-[13px] sm:text-sm leading-relaxed mb-4 text-muted">
                    Crafting <span className="text-accent-orange">immersive</span>{' '}
                    digital experiences at the intersection of code, light,
                    and narrative. Explorer of{' '}
                    <span className="text-accent-orange">
                        atmospheric
                    </span>{' '}
                    aesthetics.
                </p>

                <div className="flex items-center gap-2.5 text-xs sm:text-sm mb-2 text-muted">
                    <IconLocation className="w-[18px] h-[18px] flex-shrink-0 stroke-muted" />
                    <span>Ethereal Nexus · Remote</span>
                </div>

                <div className="flex items-center gap-2.5 text-xs sm:text-sm mb-2 text-muted">
                    <IconEmail className="w-[18px] h-[18px] flex-shrink-0 stroke-muted" />
                    <span>elias.varen@nexus.studio</span>
                </div>

                <div className="flex gap-2 flex-wrap mt-3">
                    <SocialBtn
                        href="https://github.com"
                        icon={IconGithub}
                        label="GitHub"
                    />

                    <SocialBtn
                        href="https://facebook.com"
                        icon={IconFacebook}
                        label="Facebook"
                    />

                    <SocialBtn
                        href="https://indeed.com"
                        icon={IconIndeed}
                        label="Indeed"
                    />
                </div>
            </div>

            {/* Highlights Card */}
            <div className={cardClasses}>
                <div className="text-[11px] sm:text-xs uppercase tracking-[0.08em] mb-3 font-medium text-muted">
                    Highlights
                </div>

                <div className="grid grid-cols-3 gap-2">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="aspect-square rounded-[10px] relative flex items-center justify-center cursor-pointer transition-all duration-300 bg-gradient-to-br from-white/5 to-bg-primary border border-border-glass text-muted text-[11px] hover:border-accent-orange/20 hover:scale-105 hover:shadow-lg"
                        >
                            <IconPhoto className="w-6 h-6 sm:w-7 sm:h-7 stroke-muted stroke-[1.2] fill-none opacity-40" />

                            <span className="absolute bottom-1.5 right-2 text-[9px] px-2 py-0.5 rounded-full tracking-[0.04em] text-muted bg-black/50 backdrop-blur-sm">
                                {i}/6
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mini Status */}
            <div className={cardClasses + ' py-3 px-4'}>
                <div className="flex items-center gap-3 flex-wrap">
                    <span className="flex items-center gap-1.5 text-sm text-muted">
                        <span className="inline-block w-2 h-2 rounded-full bg-accent-orange animate-pulse" />
                        currently exploring
                    </span>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;