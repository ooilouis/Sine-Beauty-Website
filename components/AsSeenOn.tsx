import React from 'react';

const logos = [
    'https://picsum.photos/120/60?random=60',
    'https://picsum.photos/120/60?random=61',
    'https://picsum.photos/120/60?random=62',
    'https://picsum.photos/120/60?random=63',
    'https://picsum.photos/120/60?random=64',
    'https://picsum.photos/120/60?random=65'
];

const AsSeenOn: React.FC = () => {
  return (
    <section className="py-12 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 text-center">
            <h3 className="text-sm font-bold text-gray-400 tracking-widest uppercase mb-8">AS SEEN ON</h3>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60">
                {logos.map((src, i) => (
                    <img key={i} src={src} alt="Media Logo" className="h-8 md:h-10 grayscale hover:grayscale-0 transition-all" />
                ))}
            </div>
        </div>
    </section>
  );
};

export default AsSeenOn;
