import React from 'react';
import { Play } from 'lucide-react';

const ValueProposition: React.FC = () => {
  return (
    <section className="py-20 bg-[#f9fafb]">
      <div className="container mx-auto px-4 mb-12">
         <div className="flex flex-col lg:flex-row gap-12">
             <div className="lg:w-1/2">
                 <h2 className="text-3xl md:text-4xl font-serif font-medium text-gray-900 leading-tight">
                    Get The Radiant & Healthy Skin You Deserve — Confident Inside Out
                 </h2>
             </div>
             <div className="lg:w-1/2 text-gray-600 leading-relaxed space-y-4">
                 <p>
                    You deserve healthy, glowing skin that looks stunning at every angle without any invasive oral or medical procedures.
                 </p>
                 <p>
                    At Caring Skin, we take the guesswork out of your skincare. Our team of dedicated estheticians deliver meticulous therapeutic treatments tailored to your unique skin profile.
                 </p>
                 <p>
                    We specialise in treating acne and sensitive skin, using all-natural ingredients that are highly effective yet gentle on the skin.
                 </p>
             </div>
         </div>
      </div>

      {/* Video Placeholder */}
      <div className="relative w-full h-[500px] bg-cover bg-center" style={{ backgroundImage: 'url(https://picsum.photos/1600/600?random=21)' }}>
         <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
             <button className="flex flex-col items-center group">
                 <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white group-hover:scale-110 transition-transform duration-300">
                     <Play size={32} className="fill-white text-white ml-1" />
                 </div>
                 <span className="mt-4 text-white font-bold tracking-widest text-sm uppercase">Our Brand Story</span>
             </button>
         </div>
      </div>
    </section>
  );
};

export default ValueProposition;
