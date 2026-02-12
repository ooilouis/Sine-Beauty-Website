import React, { useRef } from 'react';
import { Play, ChevronLeft, ChevronRight, Youtube } from 'lucide-react';
import Reviews from './Reviews';

const videoStories = [
    {
        title: "Zahirah | Caring Skin Success Story | No More Painful Breakouts in 9 Months",
        thumbnail: "https://caringskin.com.sg/wp-content/uploads/2024/09/Zahirah-thumbnail.png",
        link: "https://youtu.be/YQerIwPQi2w"
    },
    {
        title: "Leona | Caring Skin Success Story | Clear & Glowy Skin in 6 Months",
        thumbnail: "https://caringskin.com.sg/wp-content/uploads/2024/09/Leona-thumbnail.png",
        link: "https://youtu.be/QZjGNwjitFI"
    },
    {
        title: "Mario | Caring Skin Success Story | As My Skin Healed, My Smile Returns",
        thumbnail: "https://caringskin.com.sg/wp-content/uploads/2024/05/mario_thumbnail_youtube_.jpg",
        link: "https://youtu.be/mzCMv_UpqQc"
    },
    {
        title: "Huiying | Caring Skin Success Story | Acne-Free in 6 Months",
        thumbnail: "https://caringskin.com.sg/wp-content/uploads/2024/05/Huiying_Thumbnail-Cover_.jpg",
        link: "https://youtu.be/AAAZ9er0Lcs"
    },
    {
        title: "Jooyee | Caring Skin Success Story | Acne-Free in 6 Months",
        thumbnail: "https://caringskin.com.sg/wp-content/uploads/2024/03/Jooyee_COVER_-min-scaled.jpg",
        link: "https://youtu.be/3_1lMO_bDNw"
    },
    {
        title: "Nazmi | Caring Skin Success Story | Acne-Free in 11 Months",
        thumbnail: "https://caringskin.com.sg/wp-content/uploads/2023/12/Nazmi_269px-x-165px_.jpg",
        link: "https://www.youtube.com/ZiHpF9AKkFE"
    },
    {
        title: "Eka | Caring Skin Success Story | Skin Miracle in 3 Sessions",
        thumbnail: "https://caringskin.com.sg/wp-content/uploads/2023/12/Eka_269px-x-165px_.jpg",
        link: "https://www.youtube.com/sxcP1PEdX_k"
    },
    {
        title: "Xener | Caring Skin Success Story | Acne-Free in 7 Weeks",
        thumbnail: "https://caringskin.com.sg/wp-content/uploads/2023/12/Xener_269px-x-165px_.jpg",
        link: "https://www.youtube.com/watch?v=76D9qaRKH3c"
    }
];

const writtenStories = [
    {
        title: "Caring Skin gave me more than clear skin",
        date: "10 Feb 2024",
        image: "https://caringskin.com.sg/wp-content/uploads/2024/03/Nazmi_COVER_1080px-x-1920px_thumbnail_insta_.jpg"
    },
    {
        title: "I’m more confident than before to walk out makeup-free",
        date: "22 Apr 2024",
        image: "https://caringskin.com.sg/wp-content/uploads/2024/03/Jooyee_COVER_1080px-x-1920px_-copy-copy.jpg"
    },
    {
        title: "It felt like a miracle to me",
        date: "06 Jan 2024",
        image: "https://caringskin.com.sg/wp-content/uploads/2024/03/Eka_COVER_1080px-x-1920px_-2.jpg"
    },
    {
        title: "It was an unregrettable experience",
        date: "10 Oct 2024",
        image: "https://caringskin.com.sg/wp-content/uploads/2024/10/Justin-success-story-thumbnail-portrait.png"
    },
    {
        title: "My classmates used to make fun of me",
        date: "25 Oct 2023",
        image: "https://caringskin.com.sg/wp-content/uploads/2023/10/lemuel.jpg"
    },
    {
        title: "My saviour, partner & teacher – Caring Skin",
        date: "25 Oct 2023",
        image: "https://caringskin.com.sg/wp-content/uploads/2023/10/vanessa.jpg"
    },
    {
        title: "Outbreak always happen when I’m stressed",
        date: "25 Oct 2023",
        image: "https://caringskin.com.sg/wp-content/uploads/2023/10/yanqing.jpg"
    },
    {
        title: "Skin gets really sensitive during certain seasons",
        date: "25 Oct 2023",
        image: "https://caringskin.com.sg/wp-content/uploads/2023/10/airin.jpg"
    }
];

const CustomerStories: React.FC = () => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = 300;
            if (direction === 'left') {
                current.scrollLeft -= scrollAmount;
            } else {
                current.scrollLeft += scrollAmount;
            }
        }
    };

    return (
        <div className="animate-in fade-in duration-500">
            {/* Intro */}
            <section className="pt-36 pb-20 bg-white">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">Hear What They Say</h1>
                    <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
                        Welcome to our Reviews Page, a heartfelt showcase of genuine customer experiences and stories that speak to the heart of our brand.
                    </p>
                </div>
            </section>

            {/* Google Reviews */}
            <Reviews />

            {/* Video Stories Carousel */}
            <section className="py-20 bg-[#f5f7f9] relative">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-serif text-gray-900 mb-6">Customer Success Stories</h2>
                        <a href="https://www.youtube.com/@caringskin2013" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-red-500 text-red-500 px-6 py-2 rounded-full hover:bg-red-50 transition-colors text-sm font-bold tracking-widest uppercase">
                            <Youtube size={20} />
                            Watch on YouTube
                        </a>
                    </div>

                    <div className="relative group">
                        {/* Arrows */}
                        <button 
                            onClick={() => scroll('left')} 
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-all hidden md:flex"
                        >
                            <ChevronLeft size={24} className="text-gray-700" />
                        </button>
                        <button 
                            onClick={() => scroll('right')} 
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-all hidden md:flex"
                        >
                            <ChevronRight size={24} className="text-gray-700" />
                        </button>

                        {/* Scrolling Container */}
                        <div 
                            ref={scrollRef}
                            className="flex overflow-x-auto gap-6 pb-8 px-4 scrollbar-hide scroll-smooth snap-x snap-mandatory"
                        >
                            {videoStories.map((story, idx) => (
                                <a 
                                    key={idx} 
                                    href={story.link} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="min-w-[300px] md:min-w-[400px] bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 snap-center group/card"
                                >
                                    <div className="relative aspect-video overflow-hidden rounded-t-lg">
                                        <img src={story.thumbnail} alt={story.title} className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105" />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover/card:bg-black/40 transition-colors">
                                            <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center pl-1 group-hover/card:scale-110 transition-transform">
                                                <Play size={20} className="text-teal-600 fill-teal-600" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-bold text-gray-800 text-sm md:text-base line-clamp-2">{story.title}</h3>
                                        <span className="text-[10px] font-bold text-teal-600 mt-2 block tracking-widest">CARING SKIN</span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4"><hr className="border-gray-200" /></div>

            {/* Written Stories Grid */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-serif text-center mb-12 text-gray-900">Experience The Difference With Caring Skin</h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {writtenStories.map((story, idx) => (
                            <div key={idx} className="group cursor-pointer flex flex-col h-full">
                                <div className="overflow-hidden rounded-lg mb-4 aspect-[2/3]">
                                    <img 
                                        src={story.image} 
                                        alt={story.title} 
                                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                                <div className="flex-grow">
                                    <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-1 block">Customer Stories</span>
                                    <h4 className="font-bold text-gray-900 text-lg leading-tight mb-2 group-hover:text-teal-600 transition-colors">{story.title}</h4>
                                </div>
                                <span className="text-xs text-gray-400 mt-2 block">{story.date}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-[#f5f7f9] py-16 text-center border-t border-gray-200">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-serif mb-6 text-gray-800">Book A Therapeutic Facial Today</h2>
                    <a href="#" className="inline-block bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 uppercase tracking-wide">
                        Book Trial Session
                    </a>
                </div>
            </section>
        </div>
    );
};

export default CustomerStories;
