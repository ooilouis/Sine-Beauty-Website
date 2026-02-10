
import React from 'react';
import { ProductDetailData } from '../types'; // Import ProductDetailData instead of Product
import { products } from '../data/products';
import { Star, ChevronDown } from 'lucide-react';

interface ShopProps {
    onNavigate?: (page: string) => void;
}

const Shop: React.FC<ShopProps> = ({ onNavigate }) => {
    
    const handleProductClick = (productId: string) => {
        if (onNavigate) {
            onNavigate(`product/${productId}`);
        }
    };

    return (
        <div className="animate-in fade-in duration-500 pt-20">
            {/* Masthead */}
            <section className="bg-white">
                <div className="container mx-auto">
                    <img 
                        src="https://caringskin.com.sg/wp-content/uploads/2024/10/cs-medispa_website_Products-banner_2560px-x-1004px_green_.jpg" 
                        alt="Shop Banner" 
                        className="w-full h-auto object-cover"
                    />
                </div>
            </section>

            {/* Filter Section */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row justify-between mb-8">
                        <div className="lg:w-2/3 mb-6 lg:mb-0">
                            <h1 className="text-3xl md:text-4xl font-serif text-gray-900 font-medium mb-4">
                                All Products <sup className="text-lg text-gray-500">({products.length})</sup>
                            </h1>
                            <p className="text-gray-600 leading-relaxed">
                                Discover our beauty essentials: Cleanser, Toner, Serums, Creams, Mask. All our plant-based formulas have been created to optimize the natural strength of all skin types, even the most sensitive ones!
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 border-t border-b border-gray-100 py-6">
                        <div className="flex flex-col lg:flex-row gap-4 w-full lg:w-auto">
                            <span className="text-sm font-bold uppercase tracking-widest text-gray-800 self-center hidden lg:block">Filter by:</span>
                            <div className="relative">
                                <select className="appearance-none bg-white border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-teal-500 w-full lg:w-48 text-sm">
                                    <option>SKIN CONCERNS</option>
                                    <option>Dry / Dehydrated</option>
                                    <option>Sensitive</option>
                                    <option>Acne / Oily</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <ChevronDown size={14} />
                                </div>
                            </div>
                            <div className="relative">
                                <select className="appearance-none bg-white border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-teal-500 w-full lg:w-48 text-sm">
                                    <option>PRODUCT TYPES</option>
                                    <option>Cleanser</option>
                                    <option>Toner</option>
                                    <option>Serum</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <ChevronDown size={14} />
                                </div>
                            </div>
                            <div className="relative">
                                <select className="appearance-none bg-white border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-teal-500 w-full lg:w-48 text-sm">
                                    <option>SERIES</option>
                                    <option>Hydra</option>
                                    <option>Acne Control</option>
                                    <option>UV Defense</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <ChevronDown size={14} />
                                </div>
                            </div>
                            <button className="text-xs font-bold text-gray-400 hover:text-teal-600 tracking-widest uppercase py-2">
                                RESET
                            </button>
                        </div>

                        <div className="flex items-center gap-4 w-full lg:w-auto">
                            <span className="text-sm font-bold uppercase tracking-widest text-gray-800">Sort by</span>
                            <div className="relative flex-grow lg:flex-grow-0">
                                <select className="appearance-none bg-white border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-teal-500 w-full lg:w-40 text-sm">
                                    <option>BEST SELLER</option>
                                    <option>NEWEST</option>
                                    <option>LOWEST PRICE</option>
                                    <option>HIGHEST PRICE</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <ChevronDown size={14} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Product Grid */}
            <section className="py-12 bg-white min-h-screen">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.map((product) => (
                            <div 
                                key={product.id} 
                                className="group cursor-pointer flex flex-col h-full"
                                onClick={() => handleProductClick(product.id)}
                            >
                                <div className="relative overflow-hidden mb-4 bg-gray-50 aspect-square flex items-center justify-center">
                                    {product.isBestSeller && (
                                        <div className="absolute top-0 left-0 bg-black/80 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest z-10">
                                            Best Seller
                                        </div>
                                    )}
                                    <img 
                                        src={product.image} 
                                        alt={product.name} 
                                        className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <div className="flex flex-col flex-grow text-center">
                                    <div className="flex justify-center items-center gap-2 mb-2">
                                        <div className="flex text-[#ddd]">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star 
                                                    key={star} 
                                                    size={12} 
                                                    className={`${star <= product.rating ? 'fill-black text-black' : 'fill-gray-200 text-gray-200'}`} 
                                                    strokeWidth={0}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-xs text-gray-400">{product.reviews} Reviews</span>
                                    </div>
                                    <h3 className="font-bold text-gray-900 text-sm mb-2 group-hover:text-teal-600 transition-colors">
                                        {product.name}
                                    </h3>
                                    <div className="mt-auto text-xs text-gray-500 font-medium">
                                        {product.priceText}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer CTA */}
            <section className="bg-teal-50 py-24 text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-8">
                        Book A Therapeutic Facial Today
                    </h2>
                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('contact'); }} className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 px-10 rounded shadow-lg transition-colors duration-300 uppercase tracking-widest text-sm">
                        Book Trial Session
                    </a>
                </div>
            </section>
        </div>
    );
};

export default Shop;
