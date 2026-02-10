import React, { useState } from 'react';

interface BlogPost {
    id: number;
    title: string;
    date: string;
    category: string;
    image?: string;
    link?: string;
}

const allPosts: BlogPost[] = [
    {
        id: 1,
        title: "What To Do After Facial Extraction?",
        date: "29 Jan 2026",
        category: "Skincare Tips",
        image: "https://caringskin.com.sg/wp-content/uploads/2026/01/ai-generated-8626807_1280-e1769667821200.png"
    },
    {
        id: 2,
        title: "How to Keep Your Skin Glowing This Chinese New Year 2026",
        date: "22 Jan 2026",
        category: "Skincare Tips",
        image: "https://caringskin.com.sg/wp-content/uploads/2026/01/cnylady-e1769067405682.jpg"
    },
    {
        id: 3,
        title: "How to Achieve Radiant Skin with the Right Facial Treatment in Singapore",
        date: "13 Jan 2026",
        category: "Skincare Tips",
        image: "https://caringskin.com.sg/wp-content/uploads/2026/01/radiantskin-e1768293696987.jpg"
    },
    {
        id: 4,
        title: "New Year, New Look: Start 2026 With a Fresh Face and Renewed Confidence",
        date: "29 Dec 2025",
        category: "Skincare Tips",
        image: "https://caringskin.com.sg/wp-content/uploads/2025/11/Blog-Post_Why-Your-Skin-Suffers-After-a-Trip-to-Cold-Countries_facial_.jpg"
    },
    {
        id: 5,
        title: "How Do I Stop Acne on My Face? A Comprehensive Guide to Clear Skin",
        date: "16 Dec 2025",
        category: "Skincare Tips",
        image: "https://caringskin.com.sg/wp-content/uploads/2025/10/Blog-Post_How-a-Skin-Coach-Can-Help-You-Manage-Adult-Acne-Effectively_adult-acne_.jpg"
    },
    {
        id: 6,
        title: "Glow Up This Christmas: Your Guide to Radiant, Festive-Ready Skin",
        date: "04 Dec 2025",
        category: "Skincare Tips",
        image: "https://caringskin.com.sg/wp-content/uploads/2025/12/xmas-model-e1764819024335.jpg"
    },
    {
        id: 7,
        title: "Retinol in the Cold: How to Safely Use Active Ingredients When Your Skin is Sensitive",
        date: "26 Nov 2025",
        category: "Skincare Tips",
        image: "https://caringskin.com.sg/wp-content/uploads/2025/11/model15-e1764130578991.jpg"
    },
    {
        id: 8,
        title: "How a Skin Coach Uses Skin Analysis to Create a Personalised Treatment Plan",
        date: "20 Nov 2025",
        category: "Skincare Tips",
        image: "https://caringskin.com.sg/wp-content/uploads/2025/11/Blog-Post_Why-Your-Skin-Suffers-After-a-Trip-to-Cold-Countries_Skin-coach_.jpg"
    },
    {
        id: 9,
        title: "Can Deep Pore Cleansing Facials Help Reduce Whiteheads and Breakouts?",
        date: "17 Nov 2025",
        category: "Skincare Tips",
        image: "https://caringskin.com.sg/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-17-at-12.39.04-PM.jpeg"
    },
    // Promo Posts
    {
        id: 10,
        title: "Caring Skin’s Holiday Gift Guide",
        date: "20 Dec 2021",
        category: "Promo",
        image: "https://picsum.photos/800/600?random=10" // Placeholder as none provided in HTML snippet
    },
    {
        id: 11,
        title: "Caring Skin 12 Days of Christmas Giveaways",
        date: "12 Dec 2020",
        category: "Promo",
        image: "https://picsum.photos/800/600?random=11"
    },
    {
        id: 12,
        title: "4 Simple Ways To Go Green In The Bathroom",
        date: "19 Sep 2019",
        category: "Promo",
        image: "https://picsum.photos/800/600?random=12"
    },
    // Skinformation Posts
    {
        id: 13,
        title: "Top 6 Benefits of Rejuran Treatment in Singapore for Ageing Skin",
        date: "20 Aug 2025",
        category: "Skinformation",
        image: "https://caringskin.com.sg/wp-content/uploads/2025/08/Top-6-Benefits-of-Rejuran-Treatment-in-Singapore-for-Ageing-Skin-03.png"
    },
    {
        id: 14,
        title: "Celebrate Singapore’s 60th Birthday with Caring Skin’s $60 ActiveCare Trial Facial",
        date: "06 Aug 2025",
        category: "Skinformation",
        image: "https://caringskin.com.sg/wp-content/uploads/2025/08/1340e8f6-b83e-4274-a96f-d4db4c142095.png"
    },
    {
        id: 15,
        title: "Can Your Diet Be Causing Acne? Here are the 5 Reasons",
        date: "22 Jul 2025",
        category: "Skinformation",
        image: "https://caringskin.com.sg/wp-content/uploads/2025/07/2-e1753161188668.png"
    },
    {
        id: 16,
        title: "Restoring The Skin With Collagen",
        date: "11 Oct 2024",
        category: "Skinformation",
        image: "https://caringskin.com.sg/wp-content/uploads/2024/07/pexels-angela-roma-7479812.jpg"
    },
    {
        id: 17,
        title: "Is Your Makeup Causing Breakouts?",
        date: "27 Sep 2024",
        category: "Skinformation",
        image: "https://caringskin.com.sg/wp-content/uploads/2024/05/profile-of-a-person-adding-blush-to-her-cheeks-with-a-brush.jpg"
    },
    {
        id: 18,
        title: "The Truth About Skin Purging: What It Is and Why It Happens",
        date: "16 Sep 2024",
        category: "Skinformation",
        image: "https://caringskin.com.sg/wp-content/uploads/2024/07/pexels-olly-3771830.jpg"
    }
];

const Blog: React.FC = () => {
    const [activeTab, setActiveTab] = useState('All Articles');

    const tabs = [
        { name: "All Articles", count: 112 },
        { name: "Promo", count: 3 },
        { name: "Skinformation", count: 57 },
        { name: "Skincare Tips", count: 71 }
    ];

    const getFilteredPosts = () => {
        if (activeTab === 'All Articles') return allPosts.filter(p => p.category !== 'Promo' && p.category !== 'Skinformation').slice(0, 9); // Simulating "All" view with pagination limit
        return allPosts.filter(post => post.category === activeTab);
    };

    const filteredPosts = getFilteredPosts();

    return (
        <div className="animate-in fade-in duration-500">
            {/* Header Section */}
            <section className="pt-32 pb-12 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
                            Articles <sup className="text-2xl font-sans font-normal text-gray-500">(112)</sup>
                        </h1>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Explore a diverse collection of insightful articles, expert tips, and in-depth guides to empower and inspire you on your journey to radiant living.
                        </p>
                    </div>
                </div>
            </section>

            {/* Tabs */}
            <section className="bg-white border-b border-gray-200 sticky top-16 z-30">
                <div className="container mx-auto px-4 overflow-x-auto scrollbar-hide">
                    <div className="flex space-x-8 min-w-max">
                        {tabs.map((tab) => (
                            <button
                                key={tab.name}
                                onClick={() => setActiveTab(tab.name)}
                                className={`py-4 text-sm font-bold tracking-widest uppercase border-b-2 transition-colors duration-300 ${
                                    activeTab === tab.name 
                                    ? 'border-teal-500 text-teal-600' 
                                    : 'border-transparent text-gray-500 hover:text-gray-800'
                                }`}
                            >
                                {tab.name} ({tab.count})
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Content Grid */}
            <section className="py-16 bg-[#fcfcfc]">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPosts.map((post) => (
                            <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group border border-gray-100 flex flex-col h-full">
                                <div className="relative overflow-hidden aspect-[3/2]">
                                    <img 
                                        src={post.image || `https://picsum.photos/800/600?random=${post.id}`} 
                                        alt={post.title} 
                                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded text-xs font-bold text-teal-600 uppercase tracking-wider shadow-sm">
                                        {post.category}
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug group-hover:text-teal-600 transition-colors cursor-pointer">
                                        {post.title}
                                    </h3>
                                    <div className="mt-auto text-sm text-gray-400 font-medium">
                                        {post.date}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination (Visual) */}
                    <div className="mt-16 flex justify-center items-center gap-2">
                        <button className="px-4 py-2 text-sm font-bold text-gray-300 border border-gray-200 rounded cursor-not-allowed">PREV</button>
                        <button className="w-10 h-10 flex items-center justify-center rounded bg-teal-500 text-white font-bold shadow-md">1</button>
                        <button className="w-10 h-10 flex items-center justify-center rounded hover:bg-gray-100 text-gray-600 font-bold transition-colors">2</button>
                        <button className="w-10 h-10 flex items-center justify-center rounded hover:bg-gray-100 text-gray-600 font-bold transition-colors">3</button>
                        <span className="text-gray-400 font-bold px-2">...</span>
                        <button className="w-10 h-10 flex items-center justify-center rounded hover:bg-gray-100 text-gray-600 font-bold transition-colors">13</button>
                        <button className="px-4 py-2 text-sm font-bold text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors">NEXT</button>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
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

export default Blog;