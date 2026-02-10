import React, { useState, useEffect, useRef } from 'react';
import { Step } from '../types';

const stepsData: Step[] = [
    {
        id: 1,
        title: "Book A Trial Facial",
        description: "Get started by booking a trial facial with us to experience our treatment at our Medispa. We ensure a relaxing and welcoming environment for your first visit.",
        image: "https://picsum.photos/800/1000?random=40"
    },
    {
        id: 2,
        title: "Get A VISIA Skin Analysis",
        description: "You'll receive a complimentary in-depth skin analysis that identifies key problem areas and provides an accurate diagnostic assessment of your skin health.",
        image: "https://picsum.photos/800/1000?random=41"
    },
    {
        id: 3,
        title: "Get A Personal Consultation",
        description: "Our experienced Skin Coach will provide a personalised consultation on your unique skin needs based on our proven skin transformation program.",
        image: "https://picsum.photos/800/1000?random=42"
    }
];

const Steps: React.FC = () => {
    const [activeStep, setActiveStep] = useState(0);
    const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = Number(entry.target.getAttribute('data-index'));
                        setActiveStep(index);
                    }
                });
            },
            {
                // Trigger when the element hits the middle of the viewport
                rootMargin: '-50% 0px -50% 0px',
                threshold: 0
            }
        );

        stepRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <section className="bg-[#f9fafb]">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row">
                    {/* Left Column: Scrollable Content */}
                    <div className="lg:w-1/2 lg:py-20 pt-20">
                         {/* Header */}
                        <div className="mb-12 lg:mb-20 px-4">
                           <h2 className="text-3xl md:text-4xl font-serif font-medium text-gray-900 leading-tight">
                                3 Simple Steps Towards <br/><span className="text-teal-600">Clear & Healthy Skin</span>
                            </h2>
                        </div>
                        
                        {/* Steps List */}
                        <div className="space-y-24 lg:space-y-0">
                            {stepsData.map((step, idx) => (
                                <div 
                                    key={step.id} 
                                    ref={el => stepRefs.current[idx] = el}
                                    data-index={idx}
                                    className={`transition-all duration-500 lg:min-h-[70vh] flex flex-col justify-center px-4 lg:pl-8 lg:border-l-4 ${activeStep === idx ? 'lg:border-teal-500 lg:opacity-100' : 'lg:border-gray-200 lg:opacity-30'}`}
                                >
                                    {/* Mobile Image (Visible only on small screens) */}
                                    <div className="lg:hidden mb-6 rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
                                        <img src={step.image} alt={step.title} className="w-full h-full object-cover" />
                                    </div>

                                    <span className="text-sm font-bold text-teal-600 font-mono mb-2">0{step.id}</span>
                                    <h3 className="text-2xl font-bold mb-4 text-gray-800">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-600 text-lg leading-relaxed max-w-md">
                                        {step.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                        {/* Spacer for desktop to allow scrolling past last item comfortably */}
                        <div className="hidden lg:block h-[30vh]"></div> 
                    </div>

                    {/* Right Column: Sticky Image (Desktop Only) */}
                    <div className="lg:w-1/2 hidden lg:block relative">
                         <div className="sticky top-0 h-screen flex items-center justify-center p-12 lg:p-24">
                            <div className="relative w-full h-full max-h-[700px] rounded-2xl overflow-hidden shadow-2xl bg-gray-200">
                                {stepsData.map((step, idx) => (
                                    <img 
                                        key={step.id}
                                        src={step.image} 
                                        alt={step.title}
                                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 transform ease-out ${activeStep === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
                                    />
                                ))}
                            </div>
                         </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Steps;