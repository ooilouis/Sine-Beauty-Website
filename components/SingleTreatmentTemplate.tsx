
import React, { useState } from 'react';
import { SingleTreatmentPageData } from '../types';
import { Play, Plus, Minus } from 'lucide-react';
import Reviews from './Reviews';
import CmsManagedForm from './CmsManagedForm';

interface SingleTreatmentTemplateProps {
    data: SingleTreatmentPageData;
}

const SingleTreatmentTemplate: React.FC<SingleTreatmentTemplateProps> = ({ data }) => {
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    return (
        <div className="animate-in fade-in duration-500 bg-white">
            <div className="container mx-auto px-4 pt-32 pb-20">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sticky Sidebar */}
                    <div className="lg:w-1/3">
                        <div className="sticky top-28 bg-[#f9fafb] p-8 rounded-lg border border-gray-100">
                            <span className="text-teal-600 font-bold tracking-widest text-xs uppercase block mb-2">{data.category}</span>
                            <h1 className="text-3xl font-serif font-bold text-gray-900 mb-6 leading-tight">{data.title}</h1>
                            
                            <div className="mb-6">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Recommended For</span>
                                <p className="text-sm font-medium text-gray-800">{data.recommendedFor}</p>
                            </div>
                            
                            <p className="text-gray-600 text-sm leading-relaxed mb-8">
                                {data.summary}
                            </p>
                            
                            <a href="#booking" className="block w-full text-center bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 px-6 rounded transition-colors uppercase tracking-widest text-sm">
                                Book Appointment
                            </a>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:w-2/3">
                        {/* Hero Image */}
                        <div className="mb-16 rounded-lg overflow-hidden shadow-md">
                            <img src={data.heroImage} alt={data.title} className="w-full h-auto object-cover" />
                        </div>

                        {/* Benefits */}
                        <div className="mb-16">
                            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">Benefits</h3>
                            <div className="prose prose-gray max-w-none">
                                <h5 className="font-bold text-gray-800 text-lg mb-2">Did You Know?</h5>
                                <p className="text-gray-600 leading-relaxed mb-6">{data.benefits.didYouKnow}</p>
                                
                                <h5 className="font-bold text-gray-800 text-lg mb-2">About this Treatment</h5>
                                <p className="text-gray-600 leading-relaxed">{data.benefits.about}</p>
                            </div>
                        </div>

                        {/* Featured On */}
                        {data.featuredOn && data.featuredOn.length > 0 && (
                            <div className="mb-16 border-t border-gray-100 pt-8">
                                <h3 className="text-xl font-serif font-bold text-gray-900 mb-6">Featured On</h3>
                                <div className="flex gap-6">
                                    {data.featuredOn.map((img, idx) => (
                                        <img key={idx} src={img} alt="Featured On" className="h-16 object-contain opacity-80" />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* How It Works */}
                        <div className="mb-16 border-t border-gray-100 pt-16">
                            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-8">How It Works</h3>
                            
                            <div className="relative rounded-lg overflow-hidden shadow-lg mb-12 group cursor-pointer">
                                <img src={data.howItWorks.videoThumbnail} alt="How It Works" className="w-full h-auto" />
                                <a 
                                    href={data.howItWorks.videoLink} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center"
                                >
                                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center pl-1 group-hover:scale-110 transition-transform">
                                        <Play size={24} className="text-teal-600 fill-teal-600" />
                                    </div>
                                </a>
                            </div>

                            <div className="space-y-8">
                                {data.howItWorks.steps.map((step, idx) => (
                                    <div key={idx} className="flex gap-6">
                                        <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full border-2 border-teal-100 text-teal-600 font-bold font-mono">
                                            {step.number}
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h4>
                                            <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Ingredients */}
                        <div className="mb-16 border-t border-gray-100 pt-16">
                            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-8">Decode The Ingredients</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {data.ingredients.map((item, idx) => (
                                    <div key={idx} className="bg-gray-50 p-6 rounded-lg">
                                        <img src={item.image} alt={item.name} className="w-20 h-20 object-contain mb-4" />
                                        <h4 className="font-bold text-gray-900 mb-3">{item.name}</h4>
                                        <ul className="list-disc pl-5 space-y-1">
                                            {item.description.map((desc, dIdx) => (
                                                <li key={dIdx} className="text-xs text-gray-600">{desc}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews */}
            <div className="bg-[#fcfcfc] border-t border-gray-100">
                <Reviews />
            </div>

            {/* FAQ */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-serif font-medium text-gray-900 mb-4">{data.faq.title}</h2>
                        {data.faq.description && <p className="text-gray-500">{data.faq.description}</p>}
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
                                    <p className="text-gray-600 leading-relaxed text-sm">
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
                                extraPayload={{ treatment: data.title }}
                            />
                        </div>
                    </div>
                </div>
             </section>
        </div>
    );
};

export default SingleTreatmentTemplate;
