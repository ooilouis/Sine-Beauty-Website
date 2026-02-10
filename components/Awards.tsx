import React from 'react';

const awards = [
  'https://picsum.photos/150/80?random=10',
  'https://picsum.photos/150/80?random=11',
  'https://picsum.photos/150/80?random=12',
  'https://picsum.photos/150/80?random=13',
  'https://picsum.photos/150/80?random=14',
  'https://picsum.photos/150/80?random=15',
];

const Awards: React.FC = () => {
  return (
    <section className="py-12 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-sm font-bold text-gray-400 tracking-widest uppercase mb-8">
          Award-Winning Singapore Facial Spa Brand
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
           {awards.map((src, i) => (
             <img key={i} src={src} alt="Award Logo" className="h-12 md:h-16 object-contain" />
           ))}
        </div>
      </div>
    </section>
  );
};

export default Awards;
