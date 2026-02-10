import React from 'react';
import { Star } from 'lucide-react';

const reviewsData = [
    {
        name: "Marianna Bt Mohamad ...",
        date: "9 days ago",
        avatarColor: "bg-orange-500",
        initial: "M",
        stars: 5,
        text: "I've always feel welcomed and comfortable. The place is well-maintained and all the staff are very friendly. Special mention to Pevlyn, who has been very gentl..."
    },
    {
        name: "kaltun mohamed",
        date: "9 days ago",
        avatarColor: "bg-orange-600",
        initial: "K",
        stars: 5,
        text: "Experience best facial of my life with Ella 10/10"
    },
    {
        name: "Toh Rui Xuan",
        date: "9 days ago",
        avatarColor: "bg-green-600",
        initial: "T",
        stars: 5,
        text: "Very professional and thorough analysis of my skin condition. The facial process was also very comfortable and not harsh on the skin."
    },
    {
        name: "Yasmin Habib Nooh",
        date: "10 days ago",
        image: "https://picsum.photos/100/100?random=101",
        stars: 5,
        text: "Appreciate session with Apple today! feels good to be pampered again!"
    },
    {
        name: "Yoon Mhi Mhi Kyaw",
        date: "10 days ago",
        image: "https://picsum.photos/100/100?random=102",
        stars: 5,
        text: "I received facial treatment at the Caring Skin Centre at 321 Clementi. I am pleased to have the service and booked next appointment as well. Really..."
    },
    {
        name: "Vanessa Soh",
        date: "10 days ago",
        image: "https://picsum.photos/100/100?random=103",
        stars: 5,
        text: "have been coming here for the past 5 years and they are great!"
    },
    {
        name: "Tan Xuanqi",
        date: "10 days ago",
        image: "https://picsum.photos/100/100?random=104", 
        stars: 5,
        text: "The process is soothing, comfortable and relaxing! Learnt more about my skin too!"
    },
    {
        name: "Zoe Sim",
        date: "10 days ago",
        image: "https://picsum.photos/100/100?random=105",
        stars: 5,
        text: "Pleasant facial experience, and Jaycee was very friendly and gentle throughout the whole session too! Was enjoyable and will consider coming back again :)"
    }
];

const GoogleLogo = () => (
    <span className="font-bold text-2xl tracking-tighter mr-2">
        <span className="text-[#4285F4]">G</span>
        <span className="text-[#EA4335]">o</span>
        <span className="text-[#FBBC05]">o</span>
        <span className="text-[#4285F4]">g</span>
        <span className="text-[#34A853]">l</span>
        <span className="text-[#EA4335]">e</span>
    </span>
);

const VerifiedIcon = () => (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-[#4285F4] ml-1" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
);

const GoogleIconSmall = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
         <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
         <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
         <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
         <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
);

const Reviews: React.FC = () => {
  return (
    <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
            
            <div className="text-center mb-10">
                 <h2 className="text-3xl font-serif text-gray-900 mb-4">Over 10,000 4.9-Star Reviews</h2>
                 <p className="text-gray-600 italic max-w-2xl mx-auto">
                    "Delivering happiness, sensitive to your needs" – our motto in treating each and every one of our valued clients to ensure 100% customer satisfaction.
                 </p>
            </div>

            {/* Google Reviews Widget Header */}
            <div className="bg-[#eff7f5] rounded-xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center mb-8 shadow-sm">
                <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
                    <div className="flex items-center mb-1">
                        <GoogleLogo />
                        <span className="text-2xl text-gray-700">Reviews</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-xl font-medium text-gray-800">4.9</span>
                        <div className="flex gap-1">
                            {[1,2,3,4,5].map(i => <Star key={i} size={20} className="fill-[#FBBC05] text-[#FBBC05] border-none" strokeWidth={0} />)}
                        </div>
                        <span className="text-gray-400 text-sm">(2,482)</span>
                    </div>
                </div>
                
                <a href="#" className="bg-[#dcaea9] hover:bg-[#d49998] text-white px-6 py-2.5 rounded shadow-sm text-sm font-medium transition-colors">
                    Review us on Google
                </a>
            </div>

            {/* Reviews Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {reviewsData.map((review, idx) => (
                    <div key={idx} className="bg-white p-5 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col h-full">
                        {/* User Info Header */}
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-start gap-3">
                                {review.image ? (
                                    <img src={review.image} alt={review.name} className="w-10 h-10 rounded-full object-cover" />
                                ) : (
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium text-lg ${review.avatarColor}`}>
                                        {review.initial}
                                    </div>
                                )}
                                <div className="min-w-0">
                                    <div className="flex items-center gap-1">
                                        <h4 className="text-sm font-bold text-gray-900 truncate max-w-[120px]">{review.name}</h4>
                                        <VerifiedIcon />
                                    </div>
                                    <div className="text-xs text-gray-400">{review.date}</div>
                                </div>
                            </div>
                            <GoogleIconSmall />
                        </div>
                        
                        {/* Stars */}
                        <div className="flex gap-0.5 mb-3">
                             {[...Array(review.stars)].map((_, i) => (
                                <Star key={i} size={16} className="fill-[#FBBC05] text-[#FBBC05] border-none" strokeWidth={0} />
                             ))}
                        </div>

                        {/* Review Text */}
                        <div className="flex-grow">
                             <p className="text-gray-600 text-sm leading-relaxed mb-2">
                                {review.text}
                            </p>
                            {review.text.length > 50 && (
                                <button className="text-gray-400 text-sm hover:underline">Read more</button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            
        </div>
    </section>
  );
};

export default Reviews;