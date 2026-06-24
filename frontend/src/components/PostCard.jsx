import React, { useState, useRef, useEffect } from 'react';
import { IconMap, IconHeart, IconComment, IconShare } from './common/Icons';

const PostActions = ({ likes: initialLikes, comments }) => {
    const [liked, setLiked] = useState(false);
    const [count, setCount] = useState(initialLikes);

    const handleLike = (e) => {
        e.preventDefault();
        const newLiked = !liked;
        setLiked(newLiked);
        setCount(prev => newLiked ? prev + 1 : prev - 1);
    };

    return (
        <div className="flex gap-3 sm:gap-5 pt-3 border-t border-white/5">
            <button
                onClick={handleLike}
                className={`bg-none border-none text-xs sm:text-sm cursor-pointer flex items-center gap-1.5 px-2 py-1 rounded-full transition-all duration-300 font-sans text-muted hover:text-accent-orange hover:bg-accent-orange/5 ${liked ? 'text-accent-orange' : ''}`}
            >
                <IconHeart
                    className={`w-4 h-4 sm:w-[18px] sm:h-[18px] flex-shrink-0 stroke-current ${liked ? 'fill-accent-orange stroke-accent-orange' : ''}`}
                />
                <span className="min-w-4 text-left">{count}</span>
            </button>
            <button className="bg-none border-none text-xs sm:text-sm cursor-pointer flex items-center gap-1.5 px-2 py-1 rounded-full transition-all duration-300 font-sans text-muted hover:text-accent-orange hover:bg-accent-orange/5">
                <IconComment className="w-4 h-4 sm:w-[18px] sm:h-[18px] flex-shrink-0 stroke-current" />
                <span className="min-w-4 text-left">{comments}</span>
            </button>
            <button className="bg-none border-none text-xs sm:text-sm cursor-pointer flex items-center gap-1.5 px-2 py-1 rounded-full transition-all duration-300 font-sans text-muted hover:text-accent-orange hover:bg-accent-orange/5">
                <IconShare className="w-4 h-4 sm:w-[18px] sm:h-[18px] flex-shrink-0 stroke-current" />
            </button>
        </div>
    );
};

const PostCard = ({ post, delay = 0 }) => {
    const cardRef = useRef(null);

    useEffect(() => {
        if (cardRef.current) {
            cardRef.current.style.animationDelay = `${delay}s`;
        }
    }, [delay]);

    const isProject = post.type === 'project';

    return (
        <article
            ref={cardRef}
            className={`relative overflow-hidden bg-white/5 backdrop-blur-[18px] border border-accent-orange/15 rounded-card shadow-card p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover opacity-0 animate-fade-slide-up ${isProject ? 'bg-white/8 border-accent-orange/20' : ''
                }`}
        >
            <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-white/5 to-bg-primary border border-accent-orange/15 text-accent-orange text-base">
                    <IconMap className="w-5 h-5 stroke-accent-orange stroke-[1.4] fill-none" />
                </div>
                <div className="flex-1">
                    <div className="text-sm font-medium text-text-primary">{post.author}</div>
                    <div className="text-xs flex items-center gap-1 text-muted">
                        <span>{post.time}</span>
                        <span className="inline-block w-0.5 h-0.5 rounded-full bg-muted opacity-40" />
                        <span>{post.context}</span>
                    </div>
                </div>
            </div>

            {isProject && (
                <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] uppercase tracking-[0.1em] px-3 py-1 rounded-full mb-2 text-accent-orange bg-accent-orange/10 border border-accent-orange/10">
                    <span className="w-3.5 h-3.5 stroke-current fill-none">•</span>
                    Project
                </div>
            )}

            <div
                className="text-sm sm:text-base leading-relaxed mb-3.5 text-muted"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {post.tags && (
                <div className="flex gap-2 flex-wrap mb-3.5">
                    {post.tags.map(tag => (
                        <span
                            key={tag}
                            className="text-[10px] sm:text-[11px] px-2.5 py-0.5 sm:px-3 sm:py-0.5 rounded-full transition-all duration-300 tracking-[0.04em] bg-accent-orange/10 border border-accent-orange/10 text-accent-orange hover:bg-accent-orange/20 hover:-translate-y-0.5"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            )}

            {isProject && post.progress !== undefined && (
                <>
                    <div className="mt-3.5 rounded-full h-1 overflow-hidden bg-white/10">
                        <div
                            className="h-full rounded-full transition-[width] duration-[1.2s] bg-gradient-to-r from-accent-orange to-accent-amber"
                            style={{ width: `${post.progress}%` }}
                        />
                    </div>
                    <div className="flex flex-wrap justify-between mt-2 text-xs text-muted">
                        <span>{post.phase}</span>
                        <span>{post.contributors} contributors</span>
                        <span>Launch: {post.launch}</span>
                    </div>
                </>
            )}

            <PostActions likes={post.likes} comments={post.comments} />
        </article>
    );
};

export default PostCard;