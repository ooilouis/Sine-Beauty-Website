

import React, { useState } from 'react';
import { TreatmentPageData, TestimonialVideo } from '../types';
import { Play, Plus, Minus, Youtube } from 'lucide-react';
import Reviews from './Reviews';
import CmsManagedForm from './CmsManagedForm';

interface TreatmentTemplateProps {
    data: TreatmentPageData;
}

const TreatmentTemplate: React.FC<TreatmentTemplateProps> = ({ data }) => {
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    return (
        <div className="animate-in fade-in duration-500">
            {/* Masthead */}
            <section className="relative pt-32 pb-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-12 items-center">
                        <div className="lg:w-1/2">
                            <img 
                                src={data.masthead.image} 
                                alt={data.masthead.title} 
                                className="w-full h-auto rounded-lg shadow-lg"
                            />
                        </div>
                        <div className="lg:w-1/2">
                            <div className="uppercase tracking-widest text-sm text-gray-400 font-bold mb-4">
                                {data.masthead.title}
                            </div>
                            <h1 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">
                                {data.masthead.subtitle}
                            </h1>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                {data.masthead.description}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Causes */}
            <section className="py-20 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-16">
                        <div className="lg:w-1/2">
                            <div className="uppercase tracking-widest text-sm text-gray-400 font-bold mb-4">
                                {data.causes.subtitle}
                            </div>
                            <h2 className="text-3xl md:text-4xl font-serif font-medium text-gray-900 mb-6">
                                {data.causes.title}
                            </h2>
                            <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                {data.causes.description}
                            </p>
                        </div>
                        <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                            {data.causes.items.map((item, idx) => (
                                <div key={idx} className="flex flex-col">
                                    <div className="mb-4">
                                        <img src={item.icon} alt={item.title} className="w-12 h-12" />
                                    </div>
                                    <h4 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h4>
                                    <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Types */}
            <section className="py-20 bg-[#fcfcfc]">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12 max-w-3xl mx-auto">
                        <div className="uppercase tracking-widest text-sm text-gray-400 font-bold mb-4">
                            {data.types.subtitle}
                        </div>
                        <h2 className="text-3xl md:text-4xl font-serif font-medium text-gray-900 mb-6">
                            {data.types.title}
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            {data.types.description}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {data.types.items.map((item, idx) => (
                            <div key={idx} className="group relative overflow-hidden rounded-lg shadow-sm h-80">
                                <img 
                                    src={item.image} 
                                    alt={item.title} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-8 text-white">
                                    <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {item.tags?.map((tag, tIdx) => (
                                            <span key={tIdx} className="text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <p className="text-gray-200 text-sm leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Recommended Treatments */}
            <section className="py-20 bg-[#eff4f8]">
                 <div className="container mx-auto px-4">
                    <div className="mb-12">
                        <div className="uppercase tracking-widest text-sm text-gray-400 font-bold mb-4">
                            {data.treatments.subtitle}
                        </div>
                        <h2 className="text-3xl md:text-4xl font-serif font-medium text-gray-900 mb-6">
                            {data.treatments.title}
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed max-w-4xl">
                            {data.treatments.description}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {data.treatments.items.map((treatment, idx) => (
                            <div key={idx} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
                                <div className="relative h-64 overflow-hidden">
                                    <img 
                                        src={treatment.image} 
                                        alt={treatment.title} 
                                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                    />
                                    {treatment.tag && (
                                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold tracking-widest text-teal-600 uppercase">
                                            {treatment.tag}
                                        </div>
                                    )}
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{treatment.title}</h3>
                                    <p className="text-gray-600 text-sm mb-6 flex-grow">
                                        {treatment.description}
                                    </p>
                                    
                                    <div className="space-y-4 text-sm mb-6">
                                        <div>
                                            <span className="font-bold text-gray-800 block mb-1">For Skin Type:</span>
                                            <span className="text-gray-600">{treatment.forSkinType}</span>
                                        </div>
                                        <div>
                                            <span className="font-bold text-gray-800 block mb-1">Benefits:</span>
                                            <span className="text-gray-600">{treatment.benefits}</span>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-gray-100 grid grid-cols-2 gap-4">
                                        <div>
                                            <span className="font-bold text-gray-800 block text-xs uppercase mb-1">Price</span>
                                            <span className="text-gray-600 text-xs">{treatment.price}</span>
                                        </div>
                                        <div>
                                            <span className="font-bold text-gray-800 block text-xs uppercase mb-1">Duration</span>
                                            <span className="text-gray-600 text-xs">{treatment.duration}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-6 pt-4 text-center border-t border-gray-100">
                                         <button className="text-sm font-bold text-teal-600 hover:text-teal-800 tracking-widest uppercase transition-colors">
                                            Learn More
                                         </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Banner CTA */}
            <section className="relative py-24 bg-cover bg-center" style={{ backgroundImage: 'url(https://caringskin.com.sg/wp-content/uploads/2024/09/cs-medispa_website_banner_2448-x-640-px_green.jpg)' }}>
                 <div className="absolute inset-0 bg-black/20"></div>
                 <div className="container mx-auto px-4 relative z-10 text-center text-white">
                     <h2 className="text-3xl md:text-5xl font-serif font-bold mb-8">Get Started Today</h2>
                     <a href="#booking" className="inline-block border-2 border-white text-white py-3 px-10 text-sm font-bold tracking-widest hover:bg-white hover:text-teal-900 transition-colors uppercase">
                         Book An Appointment
                     </a>
                 </div>
            </section>

            {/* Testimonials (Optional) */}
            {data.testimonials && data.testimonials.videos && (
                <section className="py-20 bg-white">
                     <div className="container mx-auto px-4">
                         <div className="text-center mb-12">
                             <div className="uppercase tracking-widest text-sm text-gray-400 font-bold mb-4">
                                FEATURED TESTIMONIALS
                             </div>
                             <h2 className="text-3xl font-serif font-medium text-gray-900 mb-6">
                                Hear From Others
                             </h2>
                             <a href="https://www.youtube.com/@caringskin2013" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-red-500 text-red-500 px-6 py-2 rounded-full hover:bg-red-50 transition-colors text-sm font-bold tracking-widest uppercase">
                                <Youtube size={20} />
                                Watch on YouTube
                            </a>
                         </div>

                         <div className="flex overflow-x-auto gap-6 pb-8 px-4 scrollbar-hide snap-x snap-mandatory justify-start md:justify-center">
                            {data.testimonials.videos.map((video, idx) => (
                                <a 
                                    key={idx} 
                                    href={video.videoLink} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="min-w-[300px] md:min-w-[350px] bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 snap-center group"
                                >
                                    <div className="relative aspect-video overflow-hidden rounded-t-lg">
                                        <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                                            <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center pl-1 group-hover:scale-110 transition-transform">
                                                <Play size={20} className="text-teal-600 fill-teal-600" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-bold text-gray-800 text-sm line-clamp-2">{video.title}</h3>
                                        <span className="text-[10px] font-bold text-teal-600 mt-2 block tracking-widest">CARING SKIN</span>
                                    </div>
                                </a>
                            ))}
                         </div>
                     </div>
                </section>
            )}

            {/* Reviews */}
            <Reviews />

            {/* FAQ */}
            <section className="py-20 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <div className="uppercase tracking-widest text-sm text-gray-400 font-bold mb-4">
                            FREQUENTLY ASKED QUESTIONS
                        </div>
                        <h2 className="text-3xl font-serif font-medium text-gray-900">
                            Help & Support
                        </h2>
                    </div>
                    
                    <div className="max-w-3xl mx-auto space-y-4">
                        {data.faq.items.map((item, idx) => (
                            <div key={idx} className="bg-white border-b border-gray-200">
                                <button 
                                    onClick={() => toggleFaq(idx)}
                                    className="w-full flex justify-between items-center py-6 text-left focus:outline-none"
                                >
                                    <span className={`font-semibold text-lg ${openFaqIndex === idx ? 'text-teal-600' : 'text-gray-800'}`}>
                                        {item.question}
                                    </span>
                                    {openFaqIndex === idx ? <Minus size={20} className="text-teal-600" /> : <Plus size={20} className="text-gray-400" />}
                                </button>
                                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaqIndex === idx ? 'max-h-40 opacity-100 mb-6' : 'max-h-0 opacity-0'}`}>
                                    <p className="text-gray-600 leading-relaxed">
                                        {item.answer}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

             {/* Booking Form Section */}
             <section id="booking" className="py-20 bg-[#f9fafb]">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-12">
                         <div className="lg:w-1/2">
                            <div className="uppercase tracking-widest text-sm text-gray-400 font-bold mb-4">
                                GET STARTED TODAY
                            </div>
                            <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
                                Book An Appointment
                            </h2>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Take the first step towards clearer, healthier skin by booking an appointment with our experienced team at Caring Skin.
                            </p>
                        </div>
                        <div className="lg:w-1/2">
                            <CmsManagedForm
                                formKey="treatment-booking"
                                hideTitle
                                extraPayload={{ treatment: data.masthead.title }}
                            />
                        </div>
                    </div>
                </div>
             </section>
        </div>
    );
};

export default TreatmentTemplate;
