import React from 'react';
import * as LucideIcons from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

const fallbackGuarantees = [
  { id: 'g-1', text: 'Natural Ingredients', icon_name: 'Leaf' },
  { id: 'g-2', text: 'No Hard Selling', icon_name: 'ShieldCheck' },
  { id: 'g-3', text: 'Proven Results', icon_name: 'BadgeCheck' },
  { id: 'g-4', text: 'Certified Estheticians', icon_name: 'Award' },
];

const Guarantee: React.FC = () => {
    const { guaranteeItems, loading } = useContent();

    // Helper to dynamically get icon component
    const getIcon = (iconName: string) => {
        // @ts-ignore - Dynamic access to Lucide icons
        const IconComponent = LucideIcons[iconName] || LucideIcons.ShieldCheck;
        return <IconComponent size={32} />;
    };

    const items = guaranteeItems && guaranteeItems.length > 0 ? guaranteeItems : fallbackGuarantees;

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-sm font-bold text-gray-400 tracking-widest uppercase text-center mb-12">
                    SATISFACTION GUARANTEED
                </h2>
                <div className="flex flex-wrap justify-center gap-12">
                    {items.map((item) => (
                        <div key={item.id} className="flex flex-col items-center text-center w-40">
                            <div className="text-teal-500 mb-4 bg-teal-50 p-4 rounded-full">
                                {getIcon(item.icon_name)}
                            </div>
                            <span className="font-semibold text-gray-700 text-sm leading-tight text-balance">{item.text}</span>
                        </div>
                    ))}
                </div>
                {loading && guaranteeItems.length === 0 && (
                    <p className="mt-8 text-center text-xs tracking-wide text-gray-400 uppercase">Syncing guarantee items...</p>
                )}
            </div>
        </section>
    );
};

export default Guarantee;
