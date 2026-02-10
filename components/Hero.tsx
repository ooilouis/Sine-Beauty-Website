import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Slide } from '../types';

const slides: Slide[] = [
  {
    id: 1,
    image: 'https://picsum.photos/1920/1280?random=1',
    mobileImage: 'https://picsum.photos/720/1280?random=1',
    title: 'Radiate Confidence With Clear & Healthy Skin',
    subtitle: 'Holistic Approach, Lasting Impact',
    buttonText: 'BOOK AN APPOINTMENT',
    position: 'center'
  },
  {
    id: 2,
    image: 'https://picsum.photos/1920/1280?random=2',
    mobileImage: 'https://picsum.photos/720/1280?random=2',
    title: '#1 Acne & Sensitive Skin Expert',
    subtitle: 'More Than 10,000 4.9-Star Reviews',
    buttonText: 'ACNE TREATMENTS',
    position: 'left'
  },
  {
    id: 3,
    image: 'https://picsum.photos/1920/1280?random=3',
    mobileImage: 'https://picsum.photos/720/1280?random=3',
    title: 'Caring From The Heart',
    subtitle: 'Our belief is in genuine care—not just for the skin, but for you.',
    buttonText: 'OUR STORY',
    position: 'right'
  }
];

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0 bg-black/30 z-10"></div>
          <img
            src={slide.image}
            alt={slide.title}
            className="hidden md:block w-full h-full object-cover"
          />
           <img
            src={slide.mobileImage}
            alt={slide.title}
            className="block md:hidden w-full h-full object-cover"
          />

          {/* Content */}
          <div className={`absolute inset-0 z-20 container mx-auto px-4 flex flex-col justify-center h-full text-white ${
            slide.position === 'center' ? 'items-center text-center' : slide.position === 'left' ? 'items-start text-left' : 'items-end text-right'
          }`}>
             <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight max-w-3xl drop-shadow-lg">
               {slide.title}
             </h1>
             <p className="text-lg md:text-xl mb-8 max-w-2xl drop-shadow-md font-light">
               {slide.subtitle}
             </p>
             <a href="#" className="inline-block border-2 border-white text-white py-3 px-8 text-sm font-bold tracking-widest hover:bg-white hover:text-black transition-colors uppercase">
               {slide.buttonText}
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
