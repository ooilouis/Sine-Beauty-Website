
import React, { useState } from 'react';
import { ProductDetailData } from '../types';
import { Star, Plus, Minus, Check } from 'lucide-react';

interface ProductTemplateProps {
    data: ProductDetailData;
    onNavigate: (page: string) => void;
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({ data, onNavigate }) => {
    const [openFaqIndex, setOpenFaqIndex] = useState<string | null>("0"); // Default open first
    const [showFullIngredients, setShowFullIngredients] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const toggleFaq = (index: number) => {
        setOpenFaqIndex(openFaqIndex === index.toString() ? null : index.toString());
    };

    return (
        <div className="animate-in fade-in duration-500 bg-white">
            {/* Breadcrumb */}
            <div className="container mx-auto px-4 pt-24 pb-4">
                <nav className="text-xs text-gray-500">
                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="hover:text-teal-600">Home</a>
                    <span className="mx-2">/</span>
                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('shop'); }} className="hover:text-teal-600">Shop</a>
                    <span className="mx-2">/</span>
                    <span className="text-gray-900 font-bold">{data.name}</span>
                </nav>
            </div>

            {/* Main Product Section */}
            <section className="container mx-auto px-4 pb-20">
                <div className="flex flex-col lg:flex-row gap-12">
                    
                    {/* Left Column: Images + Detailed Content */}
                    <div className="lg:w-1/2">
                        {/* Image Gallery */}
                        <div className="mb-12">
                            <div className="relative aspect-square bg-gray-50 overflow-hidden mb-4">
                                <img 
                                    src={data.images[currentImageIndex]} 
                                    alt={data.name} 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {data.images.length > 1 && (
                                <div className="flex gap-2 overflow-x-auto">
                                    {data.images.map((img, idx) => (
                                        <button 
                                            key={idx}
                                            onClick={() => setCurrentImageIndex(idx)}
                                            className={`w-20 h-20 border-2 ${currentImageIndex === idx ? 'border-teal-500' : 'border-transparent'} overflow-hidden`}
                                        >
                                            <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Detailed Sections (Benefits, Ingredients, Directions) */}
                        <div className="space-y-12">
                            {/* Benefits */}
                            <div>
                                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">Benefits</h3>
                                <div className="prose prose-sm max-w-none text-gray-600">
                                    <h5 className="font-bold text-gray-800 uppercase text-xs tracking-widest mb-2">WHAT IT IS?</h5>
                                    <p className="mb-6">{data.benefits.whatItIs}</p>
                                    
                                    <h5 className="font-bold text-gray-800 uppercase text-xs tracking-widest mb-2">WHAT IT DOES?</h5>
                                    <ul className="list-disc pl-5 space-y-1">
                                        {data.benefits.whatItDoes.map((item, idx) => (
                                            <li key={idx}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Featured On */}
                            {data.featuredOn && (
                                <div>
                                    <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">Featured On</h3>
                                    <div className="space-y-2 text-sm text-gray-600">
                                        {data.featuredOn.map((feature, idx) => (
                                            <p key={idx}>{feature}</p>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Ingredients */}
                            <div>
                                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">Ingredients</h3>
                                <h5 className="font-bold text-gray-800 mb-6 text-lg">Decode the ingredients</h5>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                                    {data.ingredients.highlighted.map((ing, idx) => (
                                        <div key={idx} className="flex flex-col items-center text-center p-4 bg-gray-50 rounded">
                                            <img src={ing.image} alt={ing.name} className="w-32 h-32 object-contain mb-4 mix-blend-multiply" />
                                            <h6 className="font-bold text-gray-900 mb-2">{ing.name}</h6>
                                            <ul className="text-xs text-gray-600 list-disc list-inside">
                                                {ing.description.map((desc, dIdx) => (
                                                    <li key={dIdx}>{desc}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>

                                <button 
                                    onClick={() => setShowFullIngredients(!showFullIngredients)}
                                    className="text-teal-600 font-bold text-sm hover:underline mb-6 block"
                                >
                                    {showFullIngredients ? 'Hide ingredients list -' : 'Full ingredients list +'}
                                </button>
                                
                                {showFullIngredients && (
                                    <div className="p-4 bg-gray-50 text-xs text-gray-600 mb-6 leading-relaxed border border-gray-100 rounded">
                                        {data.ingredients.fullList}
                                    </div>
                                )}

                                <div className="mb-8">
                                    <h5 className="font-bold text-gray-800 mb-2">Safe for your skin</h5>
                                    <p className="text-sm text-gray-600">{data.safeForSkin}</p>
                                </div>

                                <div>
                                    <h5 className="font-bold text-gray-800 mb-4">Our Promise</h5>
                                    <div className="flex flex-wrap gap-4">
                                        {data.promises.map((promise, idx) => (
                                            <div key={idx} className="flex items-center gap-2 bg-teal-50 px-4 py-2 rounded-full text-teal-800 text-xs font-bold">
                                                <Check size={14} />
                                                <span>{promise.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Directions */}
                            <div>
                                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">Directions</h3>
                                <div className="space-y-6 text-sm text-gray-600">
                                    <div>
                                        <h5 className="font-bold text-gray-800 uppercase text-xs tracking-widest mb-2">HOW TO USE</h5>
                                        <p>{data.directions.howToUse}</p>
                                    </div>
                                    {data.directions.specialNote && (
                                        <div>
                                            <h5 className="font-bold text-gray-800 uppercase text-xs tracking-widest mb-2">SPECIAL NOTE</h5>
                                            <p>{data.directions.specialNote}</p>
                                        </div>
                                    )}
                                    {data.directions.routine && (
                                        <div>
                                            <h5 className="font-bold text-gray-800 uppercase text-xs tracking-widest mb-2">ROUTINE</h5>
                                            <div className="whitespace-pre-line">{data.directions.routine}</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Sticky Sidebar Info */}
                    <div className="lg:w-1/2">
                        <div className="sticky top-28 bg-white p-8 border border-gray-200 rounded-lg shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                {data.isBestSeller && (
                                    <span className="bg-black text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest">
                                        Best Seller
                                    </span>
                                )}
                                <div className="flex items-center gap-1">
                                    <div className="flex text-[#ddd]">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star 
                                                key={star} 
                                                size={12} 
                                                className={`${star <= data.rating ? 'fill-black text-black' : 'fill-gray-200 text-gray-200'}`} 
                                                strokeWidth={0}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-xs text-gray-500 ml-1">{data.reviews} Reviews</span>
                                </div>
                            </div>

                            <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">{data.name}</h1>
                            
                            <div className="flex flex-wrap gap-2 mb-6">
                                {data.categories.map((cat, idx) => (
                                    <span key={idx} className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                                        {cat}{idx < data.categories.length - 1 ? ',' : ''}
                                    </span>
                                ))}
                            </div>

                            <div className="mb-6">
                                <span className="text-xs text-gray-400 font-bold uppercase tracking-widest block mb-1">Recommended For</span>
                                <span className="text-sm font-medium text-pink-500">{data.recommendedFor}</span>
                            </div>

                            <p className="text-gray-600 text-sm leading-relaxed mb-8">
                                {data.shortDescription}
                            </p>

                            <div className="border-t border-gray-100 pt-6">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-xs font-bold text-green-600 uppercase tracking-widest flex items-center gap-1">
                                        <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span> In Stock
                                    </span>
                                </div>
                                
                                <div className="flex gap-4">
                                    <input 
                                        type="number" 
                                        min="1" 
                                        value={quantity}
                                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                                        className="w-16 border border-gray-300 rounded px-3 py-2 text-center"
                                    />
                                    <div className="flex-grow flex items-center justify-center bg-gray-100 text-gray-500 text-sm font-medium px-4 py-2 rounded cursor-not-allowed">
                                        {data.priceText}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Reviews Section */}
            <section className="py-20 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center mb-12">
                        <h2 className="text-3xl font-serif font-bold text-gray-900">
                            {data.name}’s Reviews
                        </h2>
                        <button className="border border-gray-800 text-gray-800 px-6 py-2 text-sm font-bold tracking-widest uppercase hover:bg-gray-800 hover:text-white transition-colors">
                            Write A Review
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {data.reviewsList.map((review, idx) => (
                            <div key={idx} className="bg-gray-50 p-6 rounded-lg">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold">
                                            {review.initial}
                                        </div>
                                        <div>
                                            <div className="font-bold text-gray-900 text-sm">{review.name}</div>
                                            <div className="text-xs text-gray-400">{review.date}</div>
                                        </div>
                                    </div>
                                    <div className="flex text-[#ddd]">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star 
                                                key={star} 
                                                size={12} 
                                                className={`${star <= review.rating ? 'fill-black text-black' : 'fill-gray-200 text-gray-200'}`} 
                                                strokeWidth={0}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed">{review.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-[#eff4f8]">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Common Questions</h2>
                        <p className="text-gray-600">We’ve listed some frequently asked questions to help you find the answers you’re looking for.</p>
                    </div>
                    
                    <div className="max-w-3xl mx-auto space-y-4">
                        {data.faq.map((item, idx) => (
                            <div key={idx} className="bg-white border border-gray-100 rounded shadow-sm">
                                <button 
                                    onClick={() => toggleFaq(idx)}
                                    className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                                >
                                    <span className={`font-semibold ${openFaqIndex === idx.toString() ? 'text-teal-600' : 'text-gray-800'}`}>
                                        {item.question}
                                    </span>
                                    {openFaqIndex === idx.toString() ? <Minus size={20} className="text-teal-600" /> : <Plus size={20} className="text-gray-400" />}
                                </button>
                                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaqIndex === idx.toString() ? 'max-h-40 opacity-100 px-6 pb-6' : 'max-h-0 opacity-0 px-6'}`}>
                                    <p className="text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
                                        {item.answer}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProductTemplate;
