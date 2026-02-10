
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { EditableText, EditableImage } from './Editable';

const slides = [1, 2, 3]; // We keep IDs static for the CMS keys

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 8000); // Increased time slightly for easier editing
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {slides.map((id, index) => (
        <div
          key={id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0 bg-black/30 z-10 pointer-events-none"></div>
          
          <div className="hidden md:block w-full h-full relative">
             <EditableImage 
                id={`hero_slide_${id}_image`} 
                alt="Hero Background"
                className="w-full h-full object-cover"
             />
          </div>
           <div className="block md:hidden w-full h-full relative">
             <EditableImage 
                id={`hero_slide_${id}_image`} 
                alt="Hero Background"
                className="w-full h-full object-cover"
             />
          </div>

          {/* Content */}
          <div className={`absolute inset-0 z-20 container mx-auto px-4 flex flex-col justify-center h-full text-white items-center text-center`}>
             <div className="max-w-3xl">
                <EditableText 
                    id={`hero_slide_${id}_title`}
                    tag="h1"
                    className="text-4xl md:text-6xl font-bold mb-4 leading-tight drop-shadow-lg"
                />
             </div>
             <div className="max-w-2xl">
                <EditableText 
                    id={`hero_slide_${id}_subtitle`}
                    tag="p"
                    className="text-lg md:text-xl mb-8 drop-shadow-md font-light"
                />
             </div>
             <a href="#" className="inline-block border-2 border-white text-white py-3 px-8 text-sm font-bold tracking-widest hover:bg-white hover:text-black transition-colors uppercase">
               BOOK AN APPOINTMENT
             </a>
          </div>
        </div>
      ))}

      {/* Controls */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30 flex items-center space-x-8">
         <button onClick={prevSlide} className="text-white hover:text-teal-400 transition-colors">
            <ChevronLeft size={32} />
         </button>
         
         <div className="flex space-x-2">
            {slides.map((_, idx) => (
                <div key={idx} className={`h-1 rounded-full transition-all duration-300 ${currentSlide === idx ? 'bg-white w-8' : 'bg-white/50 w-2'}`}></div>
            ))}
         </div>

         <button onClick={nextSlide} className="text-white hover:text-teal-400 transition-colors">
            <ChevronRight size={32} />
         </button>
      </div>
    </section>
  );
};

export default Hero;
