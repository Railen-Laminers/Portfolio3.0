import React from 'react';
import { IconMap } from '../common/Icons';

const ProfileSection = () => (
    <section className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 py-2">
        {/* Avatar */}
        <div className="relative w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px] rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden border border-accent-orange/15 bg-white/5 backdrop-blur-[18px]">
            <IconMap className="w-9 h-9 sm:w-11 sm:h-11 md:w-[52px] md:h-[52px] stroke-text-secondary stroke-[1.2] fill-none" />
        </div>

        {/* Details */}
        <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[0.02em] leading-tight text-text-primary">
                Elias Varen
            </h1>

            <div className="text-sm sm:text-base flex items-center justify-center sm:justify-start gap-2 mt-0.5 font-normal text-text-secondary">
                <span>Web Developer</span>
                <span className="inline-block w-1 h-1 rounded-full bg-white/30" />
                <span>Creative Technologist</span>
            </div>

            <div className="flex gap-1.5 flex-wrap mt-2 justify-center sm:justify-start">
                <span className="text-[10px] sm:text-xs px-3 py-1 rounded-full transition-all duration-300 font-normal tracking-[0.04em] bg-white/5 backdrop-blur-[18px] border border-accent-orange/15 text-muted hover:bg-white/10 hover:border-accent-orange/30 hover:text-text-primary">
                    Immersive
                </span>
                <span className="text-[10px] sm:text-xs px-3 py-1 rounded-full transition-all duration-300 font-normal tracking-[0.04em] bg-white/5 backdrop-blur-[18px] border border-accent-orange/15 text-muted hover:bg-white/10 hover:border-accent-orange/30 hover:text-text-primary">
                    WebGL
                </span>
                <span className="text-[10px] sm:text-xs px-3 py-1 rounded-full transition-all duration-300 font-normal tracking-[0.04em] bg-white/5 backdrop-blur-[18px] border border-accent-orange/15 text-muted hover:bg-white/10 hover:border-accent-orange/30 hover:text-text-primary">
                    Narrative
                </span>
            </div>
        </div>
    </section>
);

export default ProfileSection;