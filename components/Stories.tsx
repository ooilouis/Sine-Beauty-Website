import React from 'react';
import { useContent } from '../contexts/ContentContext';

const Stories: React.FC = () => {
    const { stories, loading } = useContent();

    if (loading) {
        return (
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 text-center">Loading stories...</div>
            </section>
        );
    }

    // Use fetched stories, or fallback to empty array
    const displayStories = stories || [];

    if (displayStories.length === 0) {
        return null;
    }

    return (
        <section className="py-20 bg-white">
            <div className="bg-pink-100 py-16 mb-12">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-serif text-gray-800">Experience The Difference With Caring Skin</h2>
                </div>
            </div>

            <div className="container mx-auto px-4">
                <h3 className="text-sm font-bold text-gray-400 tracking-widest uppercase mb-8">CUSTOMER STORIES</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                    {displayStories.map((story) => (
                        <div key={story.id} className="group cursor-pointer">
                            <div className="aspect-[2/3] overflow-hidden rounded-lg mb-4 bg-gray-100">
                                <img
                                    src={story.image_url}
                                    alt={story.title}
                                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <h4 className="font-bold text-gray-900 leading-tight mb-2 group-hover:text-teal-600 transition-colors line-clamp-3">
                                {story.title}
                            </h4>
                            <span className="text-xs text-gray-400">{story.date}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stories;
