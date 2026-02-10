
import React from 'react';
import { Facebook, Instagram, Youtube, Twitter } from 'lucide-react';

interface FooterProps {
    onNavigate: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNavClick = (e: React.MouseEvent, page: string) => {
      e.preventDefault();
      onNavigate(page);
  };

  return (
    <footer className="bg-white pt-16 pb-8 border-t border-gray-200">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                {/* About Us */}
                <div>
                    <h4 className="font-bold text-gray-900 mb-4">About Us</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                        <li><a href="#" onClick={(e) => handleNavClick(e, 'about')} className="hover:text-teal-600">Who We Are</a></li>
                        <li><a href="#" onClick={(e) => handleNavClick(e, 'stories')} className="hover:text-teal-600">Customer Stories</a></li>
                        <li><a href="#" className="hover:text-teal-600">Press & Media</a></li>
                        <li><a href="#" onClick={(e) => handleNavClick(e, 'blog')} className="hover:text-teal-600">Blog</a></li>
                        <li><a href="#" onClick={(e) => handleNavClick(e, 'contact')} className="hover:text-teal-600">Locate Us</a></li>
                    </ul>
                </div>

                {/* Treatments */}
                <div>
                    <h4 className="font-bold text-gray-900 mb-4">Treatments</h4>
                     <ul className="space-y-2 text-sm text-gray-600">
                        <li><a href="#" onClick={(e) => handleNavClick(e, 'active-acne')} className="hover:text-teal-600">Acne / Oily</a></li>
                        <li><a href="#" onClick={(e) => handleNavClick(e, 'acne-scars')} className="hover:text-teal-600">Acne Scars</a></li>
                        <li><a href="#" onClick={(e) => handleNavClick(e, 'ageing-skin')} className="hover:text-teal-600">Ageing</a></li>
                        <li><a href="#" onClick={(e) => handleNavClick(e, 'dry-skin')} className="hover:text-teal-600">Dry / Dehydrated</a></li>
                        <li><a href="#" onClick={(e) => handleNavClick(e, 'congested-skin')} className="hover:text-teal-600">Congested / Large Pores</a></li>
                        <li><a href="#" onClick={(e) => handleNavClick(e, 'sensitive-skin')} className="hover:text-teal-600">Sensitive</a></li>
                    </ul>
                </div>

                {/* Connect */}
                <div>
                    <h4 className="font-bold text-gray-900 mb-4">Connect With Us</h4>
                    <div className="flex space-x-4 text-gray-400 mb-6">
                        <a href="#" className="hover:text-teal-600"><Facebook size={20} /></a>
                        <a href="#" className="hover:text-teal-600"><Instagram size={20} /></a>
                        <a href="#" className="hover:text-teal-600"><Youtube size={20} /></a>
                        <a href="#" className="hover:text-teal-600"><Twitter size={20} /></a>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">For Enquiries</h4>
                    <p className="text-sm text-gray-600">enquiry@caringskin.com.sg</p>
                    <p className="text-sm text-gray-600">+65 8768 0183</p>
                </div>

                {/* Brand Info */}
                <div>
                    <h4 className="font-bold text-gray-900 mb-4">Certified Estheticians</h4>
                    <p className="text-sm text-gray-600 mb-4">
                        Caring Skin, Singapore’s top sensitive and acne skin specialist, offers a holistic approach to transform your skin.
                    </p>
                    <div className="flex space-x-4">
                        <img src="https://caringskin.com.sg/wp-content/uploads/2023/10/Cibtac-Logo.png" alt="CIBTAC" className="h-12 w-12 object-contain" />
                        <img src="https://caringskin.com.sg/wp-content/uploads/2023/10/Cidesco-Logo.png" alt="CIDESCO" className="h-12 w-12 object-contain" />
                    </div>
                </div>
            </div>
            
            <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                <div className="flex space-x-4 mb-4 md:mb-0">
                    <a href="#" className="hover:text-gray-900">Data Privacy</a>
                    <a href="#" className="hover:text-gray-900">Terms of Services</a>
                </div>
                <div>© 2026. Caring Group Pte Ltd</div>
            </div>
        </div>
    </footer>
  );
};

export default Footer;
