import React, { useState, useEffect } from 'react';
import PostCard from '../PostCard';
import PostCardSkeleton from '../PostCardSkeleton';
import { useAuth } from '../../context/AuthContext';

// Simulate fetching posts
const fetchPosts = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    type: 'post',
                    author: 'Elias Varen',
                    time: '4 hours ago',
                    context: 'studio',
                    content: 'Luminous architectures &mdash; exploring how light &amp; shadow can shape emotional resonance in digital spaces. The interplay between vibrant orangeand deep charcoal creates a threshold effect, like standing at the edge of an unknown realm.',
                    tags: ['ambient', 'lighting', 'worldbuilding'],
                    likes: 14,
                    comments: 6,
                },
                {
                    type: 'post',
                    author: 'Elias Varen',
                    time: '2 days ago',
                    context: 'in progress',
                    projectName: 'Nexus',
                    content: 'Nexus is an immersive spatial narrative engine &mdash; a WebGL-powered framework for crafting <strong>atmospheric</strong>, story-driven environments. Blending real-time 3D geometry, dynamic lighting, and reactive audio.',
                    progress: 68,
                    phase: 'phase 2',
                    contributors: 3,
                    launch: 'Q4',
                    likes: 23,
                    comments: 9,
                },
            ]);
        }, 1500);
    });
};

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { isAdmin } = useAuth();

    useEffect(() => {
        fetchPosts().then((data) => {
            setPosts(data);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <main className="flex-1 min-w-0 flex flex-col gap-5 sm:gap-7 pt-1">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3.5 border-b border-white/5">
                    <h3 className="text-base sm:text-lg font-medium tracking-[0.03em] text-white"></h3>
                    <div className="flex gap-2.5 w-full sm:w-auto">
                        <button className="px-3 sm:px-4 py-1.5 rounded-full text-xs border border-border-glass transition-all duration-300 font-sans cursor-pointer bg-bg-glass text-muted backdrop-blur-sm hover:bg-accent-orange/10 hover:border-accent-orange/20 hover:text-accent-orange">
                            filter
                        </button>
                        <button className="px-3 sm:px-4 py-1.5 rounded-full text-xs border border-border-glass transition-all duration-300 font-sans cursor-pointer bg-bg-glass text-muted backdrop-blur-sm hover:bg-accent-orange/10 hover:border-accent-orange/20 hover:text-accent-orange">
                            + new
                        </button>
                    </div>
                </div>
                {Array.from({ length: 5 }).map((_, index) => (
                    <PostCardSkeleton key={index} delay={0.1 + index * 0.08} />
                ))}
            </main>
        );
    }

    return (
        <main className="flex-1 min-w-0 flex flex-col gap-5 sm:gap-7 pt-1">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3.5 border-b border-white/5">
                <h3 className="text-base sm:text-lg font-medium tracking-[0.03em] text-white"></h3>
                <div className="flex gap-2.5 w-full sm:w-auto">
                    <button className="px-3 sm:px-4 py-1.5 rounded-full text-xs border border-border-glass transition-all duration-300 font-sans cursor-pointer bg-bg-glass text-muted backdrop-blur-sm hover:bg-accent-orange/10 hover:border-accent-orange/20 hover:text-accent-orange">
                        filter
                    </button>
                    {isAdmin && (
                        <button className="px-3 sm:px-4 py-1.5 rounded-full text-xs border border-border-glass transition-all duration-300 font-sans cursor-pointer bg-bg-glass text-muted backdrop-blur-sm hover:bg-accent-orange/10 hover:border-accent-orange/20 hover:text-accent-orange">
                            + new
                        </button>
                    )}
                </div>
            </div>

            {posts.map((post, index) => (
                <PostCard key={index} post={post} delay={0.2 + index * 0.1} />
            ))}
        </main>
    );
};

export default Feed;