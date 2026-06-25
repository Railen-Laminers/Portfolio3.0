import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { usePortfolio } from '../../context/PortfolioContext';
import { IconMap } from '../common/Icons';

const ProfileSection = ({ onEditProfile }) => {
    const { isAdmin } = useAuth();
    const { portfolio } = usePortfolio();

    if (!portfolio) return <div className="py-4 text-muted">Loading profile...</div>;

    const { firstName, middleInitial, lastName, username, profileImage, bio, skills, role } = portfolio;

    const fullName = [firstName, middleInitial ? middleInitial + '.' : '', lastName]
        .filter(Boolean)
        .join(' ') || username;

    const roleLabel = role === 'admin' ? 'Admin' : 'Guest';

    return (
        <section className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 py-2 relative">
            {/* Avatar */}
            <div className="relative w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px] rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden border border-accent-orange/15 bg-white/5 backdrop-blur-[18px]">
                {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                    <IconMap className="w-9 h-9 sm:w-11 sm:h-11 md:w-[52px] md:h-[52px] stroke-text-secondary stroke-[1.2] fill-none" />
                )}
            </div>

            {/* Details */}
            <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-[0.02em] leading-tight text-text-primary">
                        {fullName}
                    </h1>
                    {isAdmin && (
                        <button
                            onClick={onEditProfile}
                            className="p-1 text-text-secondary hover:text-accent-orange transition"
                            aria-label="Edit profile"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                            </svg>
                        </button>
                    )}
                </div>

                <div className="text-sm sm:text-base flex items-center justify-center sm:justify-start gap-2 mt-0.5 font-normal text-text-secondary">
                    <span>|||</span>
                </div>

                {skills && skills.length > 0 && (
                    <div className="flex gap-1.5 flex-wrap mt-2 justify-center sm:justify-start">
                        {skills.map((skill, idx) => (
                            <span
                                key={idx}
                                className="text-[10px] sm:text-xs px-3 py-1 rounded-full transition-all duration-300 font-normal tracking-[0.04em] bg-white/5 backdrop-blur-[18px] border border-accent-orange/15 text-muted hover:bg-white/10 hover:border-accent-orange/30 hover:text-text-primary"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProfileSection;