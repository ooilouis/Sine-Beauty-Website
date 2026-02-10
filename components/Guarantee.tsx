import React from 'react';
import { CheckCircle2, ShieldCheck, Leaf, Sparkles, Activity } from 'lucide-react';

const items = [
    { icon: <CheckCircle2 size={32} />, text: "Signature Gentle Extraction" },
    { icon: <ShieldCheck size={32} />, text: "Zero Hard Sell Policy" },
    { icon: <Leaf size={32} />, text: "Plant-Based Formulation" },
    { icon: <Sparkles size={32} />, text: "Non-Invasive Procedures" },
    { icon: <Activity size={32} />, text: "Clinically Proven & Effective" }
];

const Guarantee: React.FC = () => {
  return (
    <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
            <h2 className="text-sm font-bold text-gray-400 tracking-widest uppercase text-center mb-12">
                SATISFACTION GUARANTEED
            </h2>
            <div className="flex flex-wrap justify-center gap-12">
                {items.map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center text-center w-40">
                        <div className="text-teal-500 mb-4 bg-teal-50 p-4 rounded-full">
                            {item.icon}
                        </div>
                        <span className="font-semibold text-gray-700 text-sm leading-tight">{item.text}</span>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
};

export default Guarantee;
