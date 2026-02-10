import React from 'react';

const treatments = [
    {
        title: "Oxyvital Treatment",
        description: "This treatment facilitates direct oxygen diffusion into the skin to promote cell repair, regeneration, and wound healing.",
        image: "https://picsum.photos/500/700?random=30"
    },
    {
        title: "Collagen Veil Plus",
        description: "This treatment not only boosts collagen production but also highlights hydration, plumping, and brightening to give you a youthful glow.",
        image: "https://picsum.photos/500/700?random=31"
    },
    {
        title: "SensiVital Plus",
        description: "Perfect for sensitive skin, focusing on soothing irritation and restoring the skin barrier.",
        image: "https://picsum.photos/500/700?random=32"
    }
];

const SignatureTreatments: React.FC = () => {
  return (
    <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-serif text-center mb-12 text-gray-900">Our Signature Treatments</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {treatments.map((item, idx) => (
                    <div key={idx} className="group relative overflow-hidden h-[500px] rounded-lg cursor-pointer">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                             <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                             <p className="text-sm text-gray-200 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                 {item.description}
                             </p>
                             <span className="text-sm font-bold uppercase tracking-widest border-b border-transparent group-hover:border-white inline-block w-max">
                                 Learn More
                             </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
};

export default SignatureTreatments;
