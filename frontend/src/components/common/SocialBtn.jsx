import React from 'react';

const SocialBtn = ({ href, icon: Icon, label }) => (
    <a
        href={href}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-normal no-underline transition-all duration-300 bg-bg-glass border border-border-glass text-muted backdrop-blur-sm hover:bg-accent-orange/10 hover:border-accent-orange/20 hover:text-accent-orange hover:-translate-y-1 hover:shadow-social-hover"
        aria-label={label}
    >
        <Icon className="w-4 h-4 flex-shrink-0 stroke-current" />
        {label}
    </a>
);

export default SocialBtn;