import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FaqCategory } from '../types';

const faqData: FaqCategory[] = [
    {
        title: "General",
        items: [
            { question: "Why choose Caring Skin?", answer: "Caring Skin specializes in providing results-driven facial treatments and holistic skincare solutions backed by science, specializing in sensitive and inflammatory acne skin concerns." },
            { question: "Do I need to take medication?", answer: "Absolutely not. We believe in offering result-driven treatments that are gentle and delicate on your skin, coupled with a holistic skincare approach." },
            { question: "What should I expect during my first visit?", answer: "During your first visit, you will experience a thorough consultation and skin analysis using VISIA technology." }
        ]
    },
    {
        title: "Treatment",
        items: [
            { question: "What skin problems do you treat?", answer: "We address a variety of skin concerns including acne, sensitive skin, acne scars, dry/dehydrated skin, congested pores, and ageing." },
            { question: "Are treatments suitable for all skin types?", answer: "Yes, we offer a wide range of treatments designed to cater to various skin types and concerns." }
        ]
    }
];

const FAQ: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<string | null>(null);

    const toggle = (id: string) => {
        setOpenIndex(openIndex === id ? null : id);
    };

    return (
        <section className="py-20 bg-[#f9fafb]">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-serif text-center mb-12 text-gray-900">Frequently Asked Questions</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {faqData.map((category, catIdx) => (
                        <div key={catIdx}>
                            <h3 className="text-lg font-bold uppercase text-gray-400 tracking-widest mb-6 border-b pb-2">{category.title}</h3>
                            <div className="space-y-4">
                                {category.items.map((item, itemIdx) => {
                                    const id = `${catIdx}-${itemIdx}`;
                                    const isOpen = openIndex === id;
                                    
                                    return (
                                        <div key={itemIdx} className="bg-white rounded shadow-sm border border-gray-100 overflow-hidden">
                                            <button 
                                                className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-50 transition-colors"
                                                onClick={() => toggle(id)}
                                            >
                                                <span className={`font-semibold ${isOpen ? 'text-teal-600' : 'text-gray-800'}`}>
                                                    {item.question}
                                                </span>
                                                {isOpen ? <Minus size={16} className="text-teal-500" /> : <Plus size={16} className="text-gray-400" />}
                                            </button>
                                            <div 
                                                className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40 p-4 pt-0 opacity-100' : 'max-h-0 opacity-0'}`}
                                            >
                                                <p className="text-gray-600 text-sm">{item.answer}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
