import React from 'react';

const stories = [
    {
        image: 'https://picsum.photos/400/600?random=50',
        title: "Caring Skin gave me more than clear skin",
        date: "10 Feb 2024"
    },
    {
        image: 'https://picsum.photos/400/600?random=51',
        title: "I’m more confident than before to walk out makeup-free",
        date: "22 Apr 2024"
    },
    {
        image: 'https://picsum.photos/400/600?random=52',
        title: "It felt like a miracle to me",
        date: "06 Jan 2024"
    },
    {
        image: 'https://picsum.photos/400/600?random=53',
        title: "It was an unregrettable experience",
        date: "10 Oct 2024"
    }
];

const Stories: React.FC = () => {
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
                {stories.map((story, idx) => (
                    <div key={idx} className="group cursor-pointer">
                        <div className="overflow-hidden rounded-lg mb-4">
                            <img 
                                src={story.image} 
                                alt={story.title} 
                                className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        <h4 className="font-bold text-gray-900 leading-tight mb-2 group-hover:text-teal-600 transition-colors">{story.title}</h4>
                        <span className="text-xs text-gray-400">{story.date}</span>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
};

export default Stories;
