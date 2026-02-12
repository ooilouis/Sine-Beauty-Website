import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';
import type { HeroSlide } from '../lib/content';

const fallbackSlides: HeroSlide[] = [
  {
    id: -1,
    title: 'Radiate Confidence\nWith Clear & Healthy Skin',
    subtitle: 'Discover award-winning facials for acne and sensitive skin in Singapore.',
    button_text: 'BOOK APPOINTMENT',
    image_url: 'https://caringskin.com.sg/wp-content/uploads/2024/10/cs-medispa_website_main-banner_1920px-x-1280px_-1-min.jpg',
    mobile_image_url: 'https://caringskin.com.sg/wp-content/uploads/2024/10/founder-cs-medispa_website_main-banner_720px-x-1280px_-min.jpg',
    position: 'center',
    sort_order: 0,
  },
];

const Hero: React.FC = () => {
  const { heroSlides, loading } = useContent();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Filter out any potential invalid slides if necessary, or just use as is
  const slides = heroSlides && heroSlides.length > 0 ? heroSlides : fallbackSlides;

  const nextSlide = () => {
    if (slides.length === 0) return;
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    if (slides.length === 0) return;
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (slides.length === 0) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  if (loading) {
    return <div className="h-screen w-full bg-gray-100 flex items-center justify-center">Loading...</div>;
  }

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0 bg-black/30 z-10"></div>
          <img
            src={slide.image_url}
            alt={slide.title}
            className="hidden md:block w-full h-full object-cover"
          />
          <img
            src={slide.mobile_image_url || slide.image_url}
            alt={slide.title}
            className="block md:hidden w-full h-full object-cover"
          />

          {/* Content */}
          <div className={`absolute inset-0 z-20 container mx-auto px-4 flex flex-col justify-center h-full text-white ${slide.position === 'center' ? 'items-center text-center' : slide.position === 'left' ? 'items-start text-left' : 'items-end text-right'
            }`}>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight max-w-3xl drop-shadow-lg">
              {slide.title}
            </h1>
            {slide.subtitle && (
              <p className="text-lg md:text-xl mb-8 max-w-2xl drop-shadow-md font-light">
                {slide.subtitle}
              </p>
            )}
            {slide.button_text && (
              <a href="#" className="inline-block border-2 border-white text-white py-3 px-8 text-sm font-bold tracking-widest hover:bg-white hover:text-black transition-colors uppercase">
                {slide.button_text}
              </a>
            )}
          </div>
        </div>
      ))}

      {/* Controls */}
      {slides.length > 1 && (
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
      )}
    </section>
  );
};

export default Hero;
