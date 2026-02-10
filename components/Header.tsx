
import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, X, Menu, ChevronDown, ChevronUp } from 'lucide-react';

interface HeaderProps {
    onNavigate: (page: string) => void;
}

const mobileMenuData = [
    {
        label: "ABOUT",
        type: "accordion",
        children: [
            { title: "Who We Are", description: "Get to know more about Caring Skin", page: "about" },
            { title: "Customer Stories", description: "Stories that speak to the heart of the brand", page: "stories" },
            { title: "Press & Media", description: "Our achievement and featured press articles", href: "#" },
            { title: "Blog", description: "Diverse collection of insightful posts", page: "blog" },
            { title: "Locate Us", description: "See and find all of our locations", page: "contact" },
        ]
    },
    {
        label: "TREATMENTS",
        type: "accordion",
        children: [
             { title: "Acne / Oily", page: "active-acne" },
             { title: "Acne Scars", page: "acne-scars" },
             { title: "Sensitive", page: "sensitive-skin" },
             { title: "Dry / Dehydrated", page: "dry-skin" },
             { title: "Ageing", page: "ageing-skin" },
             { title: "Congested / Large Pores", page: "congested-skin" },
        ]
    },
    {
        label: "FAQ",
        type: "link",
        href: "#"
    },
     {
        label: "SHOP",
        type: "link",
        page: "shop"
    }
];

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>('ABOUT');
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileItem = (label: string) => {
      setExpandedMobileItem(prev => prev === label ? null : label);
  };

  const handleNavClick = (e: React.MouseEvent, page: string) => {
      e.preventDefault();
      onNavigate(page);
      setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full z-40 flex flex-col font-sans transition-all duration-300">
      
      {/* Top Banner - White bar, dark grey text */}
      {showBanner && (
        <div className="bg-white text-gray-600 text-center text-sm py-2.5 px-4 relative z-50 border-b border-gray-100 flex justify-center items-center">
          <span className="font-normal tracking-wide">Free shipping on orders over $88</span>
          <button 
            onClick={() => setShowBanner(false)} 
            className="absolute right-4 text-gray-400 hover:text-gray-600 p-1"
            aria-label="Close banner"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Main Header */}
      <div className={`w-full bg-white transition-all duration-300 ${isScrolled ? 'shadow-md py-2' : 'py-4 border-b border-gray-100'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center relative">
            
            {/* Left Nav (Desktop) */}
            <nav className="hidden lg:flex items-center space-x-8">
            <div className="relative group">
                <button className="flex items-center gap-1 text-sm font-semibold tracking-widest text-gray-700 hover:text-teal-600 transition-colors uppercase">
                ABOUT <ChevronDown size={14} />
                </button>
                <div className="absolute top-full left-0 w-64 bg-white shadow-lg rounded-sm py-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50 border border-gray-100">
                    <a href="#" onClick={(e) => handleNavClick(e, 'about')} className="block px-6 py-2 hover:bg-gray-50">
                        <div className="text-gray-900 font-semibold">Who We Are</div>
                        <div className="text-xs text-gray-500">Get to know more about Caring Skin</div>
                    </a>
                    <a href="#" onClick={(e) => handleNavClick(e, 'stories')} className="block px-6 py-2 hover:bg-gray-50">
                        <div className="text-gray-900 font-semibold">Customer Stories</div>
                        <div className="text-xs text-gray-500">Stories that speak to the heart</div>
                    </a>
                    <a href="#" className="block px-6 py-2 hover:bg-gray-50">
                        <div className="text-gray-900 font-semibold">Press & Media</div>
                        <div className="text-xs text-gray-500">Our achievement and featured press articles</div>
                    </a>
                    <a href="#" onClick={(e) => handleNavClick(e, 'blog')} className="block px-6 py-2 hover:bg-gray-50">
                        <div className="text-gray-900 font-semibold">Blog</div>
                        <div className="text-xs text-gray-500">Diverse collection of insightful posts</div>
                    </a>
                    <a href="#" onClick={(e) => handleNavClick(e, 'contact')} className="block px-6 py-2 hover:bg-gray-50">
                        <div className="text-gray-900 font-semibold">Locate Us</div>
                        <div className="text-xs text-gray-500">See and find all of our locations</div>
                    </a>
                </div>
            </div>
            
            {/* TREATMENTS Menu - Changed to static group so absolute child positions relative to container */}
            <div className="group static">
                <button className="flex items-center gap-1 text-sm font-semibold tracking-widest text-gray-700 hover:text-teal-600 transition-colors uppercase">
                TREATMENTS <ChevronDown size={14} />
                </button>
                {/* Mega Menu - Absolute to container */}
                <div className="absolute left-0 top-full w-full bg-white shadow-lg border-t border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 mt-4">
                    <div className="container mx-auto px-4 py-8">
                        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
                            <h2 className="text-2xl font-serif text-gray-800">Treatments</h2>
                        </div>
                        <div className="grid grid-cols-6 gap-6">
                            {/* Acne / Oily */}
                            <div>
                                <h5 className="font-bold text-teal-700 mb-4 uppercase text-xs tracking-widest cursor-pointer hover:text-teal-900" onClick={(e) => handleNavClick(e, 'active-acne')}>Acne / Oily</h5>
                                <ul className="space-y-3 text-sm text-gray-600">
                                    <li><a href="#" onClick={(e) => handleNavClick(e, 'treatment/plantomer-soothing')} className="hover:text-teal-500 block">Plantomer Soothing</a></li>
                                    <li><a href="#" onClick={(e) => handleNavClick(e, 'treatment/plasma-treatment')} className="hover:text-teal-500 block">Plasma Treatment</a></li>
                                    <li><a href="#" onClick={(e) => handleNavClick(e, 'treatment/probiotic-treatment')} className="hover:text-teal-500 block">Probiotic Treatment</a></li>
                                    <li><a href="#" onClick={(e) => handleNavClick(e, 'treatment/sensivital-plus')} className="hover:text-teal-500 block">SensiVital Plus Treatment</a></li>
                                    <li><a href="#" onClick={(e) => handleNavClick(e, 'treatment/proskin-medical-peel')} className="hover:text-teal-500 block">ProSkin Medical Peel</a></li>
                                </ul>
                            </div>

                            {/* Acne Scars */}
                            <div>
                                <h5 className="font-bold text-teal-700 mb-4 uppercase text-xs tracking-widest cursor-pointer hover:text-teal-900" onClick={(e) => handleNavClick(e, 'acne-scars')}>Acne Scars</h5>
                                <ul className="space-y-3 text-sm text-gray-600">
                                    <li><a href="#" onClick={(e) => handleNavClick(e, 'treatment/matricol-refiner')} className="hover:text-teal-500 block">Matricol Refiner</a></li>
                                    <li><a href="#" onClick={(e) => handleNavClick(e, 'treatment/shr-treatment')} className="hover:text-teal-500 block">SHR Treatment</a></li>
                                    <li><a href="#" onClick={(e) => handleNavClick(e, 'treatment/endymed-fsr')} className="hover:text-teal-500 block">Endymed FSR</a></li>
                                    <li><a href="#" onClick={(e) => handleNavClick(e, 'treatment/nir-cell-light')} className="hover:text-teal-500 block">NIR Cell Light</a></li>
                                    <li><a href="#" onClick={(e) => handleNavClick(e, 'treatment/proskin-medical-peel')} className="hover:text-teal-500 block">ProSkin Medical Peel</a></li>
                                </ul>
                            </div>

                            {/* Ageing */}
                            <div>
                                <h5 className="font-bold text-teal-700 mb-4 uppercase text-xs tracking-widest cursor-pointer hover:text-teal-900" onClick={(e) => handleNavClick(e, 'ageing-skin')}>Ageing</h5>
                                <ul className="space-y-3 text-sm text-gray-600">
                                    <li><a href="#" onClick={(e) => handleNavClick(e, 'treatment/rejuran-depglow')} className="hover:text-teal-500 block">REJURAN® DEPGlow Treatment</a></li>
                                    <li><a href="#" onClick={(e) => handleNavClick(e, 'treatment/nir-cell-light')} className="hover:text-teal-500 block">NIR Cell Light</a></li>
                                </ul>
                            </div>

                            {/* Dry / Dehydrated */}
                            <div>
                                <h5 className="font-bold text-teal-700 mb-4 uppercase text-xs tracking-widest cursor-pointer hover:text-teal-900" onClick={(e) => handleNavClick(e, 'dry-skin')}>Dry / Dehydrated</h5>
                                <ul className="space-y-3 text-sm text-gray-600">
                                    <li><a href="#" onClick={(e) => handleNavClick(e, 'treatment/collagen-veil-plus')} className="hover:text-teal-500 block">Collagen Veil Plus</a></li>
                                    <li><a href="#" onClick={(e) => handleNavClick(e, 'treatment/cs-hydra-mesotherapy')} className="hover:text-teal-500 block">CS-Hydra Mesotherapy</a></li>
                                    <li><a href="#" onClick={(e) => handleNavClick(e, 'treatment/rejuran-depglow')} className="hover:text-teal-500 block">REJURAN® DEPGlow Treatment</a></li>
                                    <li><a href="#" onClick={(e) => handleNavClick(e, 'treatment/hydralock-swiss')} className="hover:text-teal-500 block">HydraLock Swiss Therapy</a></li>
                                </ul>
                            </div>

                            {/* Congested / Large Pores */}
                            <div>
                                <h5 className="font-bold text-teal-700 mb-4 uppercase text-xs tracking-widest cursor-pointer hover:text-teal-900" onClick={(e) => handleNavClick(e, 'congested-skin')}>Congested / Large Pores</h5>
                                <ul className="space-y-3 text-sm text-gray-600">
                                    <li><a href="#" onClick={(e) => handleNavClick(e, 'treatment/h2-infusion')} className="hover:text-teal-500 block">H2 Infusion Treatment</a></li>
                                    <li><a href="#" onClick={(e) => handleNavClick(e, 'treatment/celluglow')} className="hover:text-teal-500 block">CelluGlow</a></li>
                                </ul>
                            </div>

                            {/* Sensitive */}
                            <div>
                                <h5 className="font-bold text-teal-700 mb-4 uppercase text-xs tracking-widest cursor-pointer hover:text-teal-900" onClick={(e) => handleNavClick(e, 'sensitive-skin')}>Sensitive</h5>
                                <ul className="space-y-3 text-sm text-gray-600">
                                    <li><a href="#" onClick={(e) => handleNavClick(e, 'treatment/rosa-c3')} className="hover:text-teal-500 block">Rosa C3 Treatment</a></li>
                                    <li><a href="#" onClick={(e) => handleNavClick(e, 'treatment/probiotic-treatment')} className="hover:text-teal-500 block">Probiotic Treatment</a></li>
                                    <li><a href="#" onClick={(e) => handleNavClick(e, 'treatment/oxyvital')} className="hover:text-teal-500 block">Oxyvital Treatment</a></li>
                                    <li><a href="#" onClick={(e) => handleNavClick(e, 'treatment/sensivital-plus')} className="hover:text-teal-500 block">SensiVital Plus Treatment</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <a href="#" className="text-sm font-semibold tracking-widest text-gray-700 hover:text-teal-600 transition-colors uppercase">FAQ</a>
            <a href="#" onClick={(e) => handleNavClick(e, 'shop')} className="text-sm font-semibold tracking-widest text-gray-700 hover:text-teal-600 transition-colors uppercase">SHOP</a>
            </nav>

            {/* Center Logo */}
            <div className="flex-1 flex justify-center lg:flex-none lg:absolute lg:left-1/2 lg:-translate-x-1/2">
            <a href="/" onClick={(e) => handleNavClick(e, 'home')} className="block">
                <div className="flex flex-col items-center">
                        {/* Leaf Icon Simulation */}
                        <div className="text-teal-700 mb-1">
                            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
                                <path d="M12.001 2c-3.5 0-6.6 1.8-8.4 4.6 3.1 1.4 6 3.8 8.1 6.8 2.1-3 5-5.4 8.1-6.8-1.8-2.8-4.9-4.6-8.4-4.6zm-8.8 6c-2 2.8-2.6 6.4-1.2 9.6 1.9-2.3 4.3-4.1 7-5.3-2.6-1.5-5-3-5.8-4.3zm17.6 0c-.8 1.3-3.2 2.8-5.8 4.3 2.7 1.2 5.1 3 7 5.3 1.4-3.2.8-6.8-1.2-9.6zM12.001 22c-3.1 0-5.9-1.2-8-3.1 2.3-.9 4.4-2.3 6.1-4.1 1.7 1.8 3.8 3.2 6.1 4.1-2.1 1.9-4.9 3.1-8 3.1z"/>
                            </svg>
                        </div>
                        <span className="text-xl font-serif font-bold text-teal-900 leading-none">Caring Skin</span>
                        <span className="text-[0.6rem] tracking-[0.25em] text-teal-700 uppercase">Medispa</span>
                </div>
            </a>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4 lg:space-x-6">
                <a href="#" onClick={(e) => handleNavClick(e, 'contact')} className="hidden xl:block text-sm font-normal text-gray-600 hover:text-teal-600 transition-colors uppercase tracking-widest">
                    BOOK APPOINTMENT
                </a>
                <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="text-gray-900 hover:text-teal-600 transition-colors">
                    <Search size={22} strokeWidth={1.5} />
                </button>
                <a href="#" onClick={(e) => handleNavClick(e, 'create-account')} className="hidden md:block text-gray-900 hover:text-teal-600 transition-colors">
                    <User size={22} strokeWidth={1.5} />
                </a>
                <a href="#" className="flex items-center space-x-1 text-gray-900 hover:text-teal-600 transition-colors">
                    <ShoppingCart size={22} strokeWidth={1.5} />
                    <span className="text-sm font-normal hidden md:inline">(0)</span>
                </a>
                {/* Mobile Burger */}
                <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden text-gray-900">
                    <Menu size={24} />
                </button>
            </div>
        </div>
      </div>

      {/* Search Bar Overlay */}
      <div className={`absolute top-full left-0 w-full bg-white shadow-md overflow-hidden transition-all duration-300 ${isSearchOpen ? 'max-h-20 py-4 border-t border-gray-100' : 'max-h-0 py-0'}`}>
          <div className="container mx-auto px-4 flex items-center">
             <input type="text" placeholder="SEARCH HERE" className="w-full bg-transparent border-b border-gray-300 py-2 focus:outline-none focus:border-teal-500 text-gray-700 placeholder-gray-400" />
             <button className="ml-4 text-gray-400 hover:text-teal-500">
                 <Search size={20} />
             </button>
          </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-white z-50 transform transition-transform duration-300 overflow-y-auto ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
         {/* Mobile Header */}
         <div className="flex justify-between items-center p-6 border-b border-gray-100">
             <div className="flex flex-col">
                 <div className="flex items-center">
                     {/* Leaf Icon Simulation */}
                     <svg viewBox="0 0 24 24" className="w-6 h-6 text-teal-600 mr-2 fill-current">
                         <path d="M12.001 2c-3.5 0-6.6 1.8-8.4 4.6 3.1 1.4 6 3.8 8.1 6.8 2.1-3 5-5.4 8.1-6.8-1.8-2.8-4.9-4.6-8.4-4.6zm-8.8 6c-2 2.8-2.6 6.4-1.2 9.6 1.9-2.3 4.3-4.1 7-5.3-2.6-1.5-5-3-5.8-4.3zm17.6 0c-.8 1.3-3.2 2.8-5.8 4.3 2.7 1.2 5.1 3 7 5.3 1.4-3.2.8-6.8-1.2-9.6zM12.001 22c-3.1 0-5.9-1.2-8-3.1 2.3-.9 4.4-2.3 6.1-4.1 1.7 1.8 3.8 3.2 6.1 4.1-2.1 1.9-4.9 3.1-8 3.1z"/>
                     </svg>
                     <div className="flex flex-col">
                        <span className="text-lg font-serif font-bold text-teal-800 leading-none">Caring Skin</span>
                        <span className="text-[0.5rem] tracking-[0.2em] text-teal-600 uppercase">Medispa</span>
                     </div>
                 </div>
             </div>
             <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500 hover:text-gray-800 p-2">
                 <X size={28} />
             </button>
         </div>
         
         {/* Menu Items */}
         <div className="px-6 py-4 pb-20">
             {mobileMenuData.map((item, idx) => (
                 <div key={idx} className="border-b border-gray-100 last:border-0">
                    {item.type === 'link' ? (
                        <a 
                            href={item.href || '#'} 
                            onClick={(e) => item.page ? handleNavClick(e, item.page) : undefined}
                            className="block py-4 text-gray-800 font-medium uppercase tracking-wide hover:text-teal-600"
                        >
                            {item.label}
                        </a>
                    ) : (
                        <div>
                            <button 
                                onClick={() => toggleMobileItem(item.label)}
                                className="w-full flex justify-between items-center py-4 text-gray-800 font-medium uppercase tracking-wide focus:outline-none hover:text-teal-600"
                            >
                                <span>{item.label}</span>
                                {expandedMobileItem === item.label ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
                            </button>
                            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedMobileItem === item.label ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="pb-6 space-y-4">
                                    {item.children?.map((child: any, childIdx) => (
                                        <a 
                                            key={childIdx} 
                                            href={child.href || '#'} 
                                            onClick={(e) => child.page ? handleNavClick(e, child.page) : undefined}
                                            className="block group"
                                        >
                                            {item.label === "ABOUT" ? (
                                                <div className="bg-teal-50/50 p-3 -mx-3 rounded-lg hover:bg-teal-50 transition-colors">
                                                    <div className="text-[15px] font-medium text-teal-800 mb-0.5">{child.title}</div>
                                                    {child.description && (
                                                        <div className="text-xs text-gray-500 leading-snug">{child.description}</div>
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="py-1 px-2 text-gray-600 hover:text-teal-600 hover:bg-gray-50 rounded">
                                                    {child.title}
                                                </div>
                                            )}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                 </div>
             ))}
             
             <div className="mt-8">
                 <a href="#" className="block w-full text-center bg-teal-500 text-white font-bold py-3 px-6 rounded shadow-lg hover:bg-teal-600 transition-colors uppercase tracking-widest text-sm">
                     Book Appointment
                 </a>
             </div>
         </div>
      </div>
    </header>
  );
};

export default Header;
