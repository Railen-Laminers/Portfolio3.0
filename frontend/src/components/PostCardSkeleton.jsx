import React from 'react';

const PostCardSkeleton = ({ delay = 0 }) => {
    return (
        <article
            className="relative overflow-hidden bg-secondary/80 backdrop-blur-[18px] border border-border-glass rounded-card p-4"
            style={{ animationDelay: `${delay}s` }}
        >
            {/* Avatar + Author */}
            <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 animate-shimmer bg-gradient-to-r from-white/10 via-white/20 to-white/10 bg-[length:200%_100%]" />
                <div className="flex-1 space-y-1">
                    <div className="h-4 w-32 bg-white/10 rounded animate-shimmer bg-gradient-to-r from-white/10 via-white/20 to-white/10 bg-[length:200%_100%]" />
                    <div className="h-3 w-24 bg-white/10 rounded animate-shimmer bg-gradient-to-r from-white/10 via-white/20 to-white/10 bg-[length:200%_100%]" />
                </div>
            </div>

            {/* Content lines */}
            <div className="space-y-2 mb-3.5">
                <div className="h-4 w-full bg-white/10 rounded animate-shimmer bg-gradient-to-r from-white/10 via-white/20 to-white/10 bg-[length:200%_100%]" />
                <div className="h-4 w-5/6 bg-white/10 rounded animate-shimmer bg-gradient-to-r from-white/10 via-white/20 to-white/10 bg-[length:200%_100%]" />
                <div className="h-4 w-4/6 bg-white/10 rounded animate-shimmer bg-gradient-to-r from-white/10 via-white/20 to-white/10 bg-[length:200%_100%]" />
            </div>

            {/* Tags */}
            <div className="flex gap-2 flex-wrap mb-3.5">
                <div className="h-6 w-14 bg-white/10 rounded-full animate-shimmer bg-gradient-to-r from-white/10 via-white/20 to-white/10 bg-[length:200%_100%]" />
                <div className="h-6 w-16 bg-white/10 rounded-full animate-shimmer bg-gradient-to-r from-white/10 via-white/20 to-white/10 bg-[length:200%_100%]" />
                <div className="h-6 w-12 bg-white/10 rounded-full animate-shimmer bg-gradient-to-r from-white/10 via-white/20 to-white/10 bg-[length:200%_100%]" />
            </div>

            {/* Actions */}
            <div className="flex gap-3 sm:gap-5 pt-3 border-t border-white/5">
                <div className="h-6 w-16 bg-white/10 rounded-full animate-shimmer bg-gradient-to-r from-white/10 via-white/20 to-white/10 bg-[length:200%_100%]" />
                <div className="h-6 w-16 bg-white/10 rounded-full animate-shimmer bg-gradient-to-r from-white/10 via-white/20 to-white/10 bg-[length:200%_100%]" />
                <div className="h-6 w-12 bg-white/10 rounded-full animate-shimmer bg-gradient-to-r from-white/10 via-white/20 to-white/10 bg-[length:200%_100%]" />
            </div>
        </article>
    );
};

export default PostCardSkeleton;