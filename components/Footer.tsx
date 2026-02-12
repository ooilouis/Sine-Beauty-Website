import React from 'react';
import { useContent } from '../contexts/ContentContext';

interface FooterProps {
  onNavigate: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { settings } = useContent();

  const handleNavClick = (e: React.MouseEvent, page?: string) => {
    if (page) {
      e.preventDefault();
      onNavigate(page);
    } else if ((e.currentTarget as HTMLAnchorElement).getAttribute('href') === '#') {
      e.preventDefault();
    }
  };

  const socialLinks = [
    {
      label: 'Facebook',
      href: settings?.facebook_url || 'https://web.facebook.com/CaringSkin/',
      icon: 'https://caringskin.com.sg/wp-content/uploads/2023/09/ic-footer-sosmed-1.svg',
    },
    {
      label: 'Instagram',
      href: settings?.instagram_url || 'https://www.instagram.com/caringskin/',
      icon: 'https://caringskin.com.sg/wp-content/uploads/2023/09/ic-footer-sosmed-2.svg',
    },
    {
      label: 'TikTok',
      href: 'https://www.tiktok.com/@caringskin.sg',
      icon: 'https://caringskin.com.sg/wp-content/uploads/2023/09/ic-footer-sosmed-3.svg',
    },
    {
      label: 'YouTube',
      href: settings?.youtube_url || 'https://www.youtube.com/@caringskin2013/',
      icon: 'https://caringskin.com.sg/wp-content/uploads/2023/09/ic-footer-sosmed-4.svg',
    },
    {
      label: 'Xiaohongshu',
      href: settings?.twitter_url || 'https://www.xiaohongshu.com/user/profile/62909b670000000021026e31',
      icon: 'https://caringskin.com.sg/wp-content/uploads/2024/09/Xiao-Hong-Shu-Icon-2-1.svg',
    },
  ];

  return (
    <footer className="border-t border-gray-200 bg-white pb-8 pt-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-5">
          <div>
            <h4 className="mb-4 font-bold text-gray-900">About Us</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" onClick={(e) => handleNavClick(e, 'about')} className="hover:text-teal-600">Who We Are</a></li>
              <li><a href="#" onClick={(e) => handleNavClick(e, 'stories')} className="hover:text-teal-600">Customer Stories</a></li>
              <li><a href="#" onClick={(e) => handleNavClick(e)} className="hover:text-teal-600">Press & Media</a></li>
              <li><a href="#" onClick={(e) => handleNavClick(e, 'blog')} className="hover:text-teal-600">Blog</a></li>
              <li><a href="#" onClick={(e) => handleNavClick(e, 'contact')} className="hover:text-teal-600">Locate Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-bold text-gray-900">Treatments</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" onClick={(e) => handleNavClick(e, 'active-acne')} className="hover:text-teal-600">Acne / Oily</a></li>
              <li><a href="#" onClick={(e) => handleNavClick(e, 'acne-scars')} className="hover:text-teal-600">Acne Scars</a></li>
              <li><a href="#" onClick={(e) => handleNavClick(e, 'ageing-skin')} className="hover:text-teal-600">Ageing</a></li>
              <li><a href="#" onClick={(e) => handleNavClick(e, 'dry-skin')} className="hover:text-teal-600">Dry / Dehydrated</a></li>
              <li><a href="#" onClick={(e) => handleNavClick(e, 'congested-skin')} className="hover:text-teal-600">Congested / Large Pores</a></li>
              <li><a href="#" onClick={(e) => handleNavClick(e, 'sensitive-skin')} className="hover:text-teal-600">Sensitive</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-bold text-gray-900">Customer Care</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" onClick={(e) => handleNavClick(e, 'faq')} className="hover:text-teal-600">FAQ</a></li>
              <li><a href="#" onClick={(e) => handleNavClick(e, 'shop')} className="hover:text-teal-600">Shop Skincare</a></li>
              <li><a href="#" onClick={(e) => handleNavClick(e, 'create-account')} className="hover:text-teal-600">My Account</a></li>
              <li><a href="#" onClick={(e) => handleNavClick(e, 'contact')} className="hover:text-teal-600">Contact Us | Book a Facial Consultation in Singapore</a></li>
              <li><a href="#" onClick={(e) => handleNavClick(e)} className="hover:text-teal-600">Ingredients</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-bold text-gray-900">Connect With Us</h4>
            <div className="space-y-2 text-sm text-gray-600">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-teal-600"
                >
                  <img src={social.icon} alt="" className="h-4 w-4 object-contain" />
                  <span>{social.label}</span>
                </a>
              ))}
            </div>
            <h4 className="mb-2 mt-6 font-bold text-gray-900">For Enquiries</h4>
            <p className="text-sm text-gray-600">{settings?.email || 'enquiry@caringskin.com.sg'}</p>
            <p className="text-sm text-gray-600">{settings?.phone || '+65 8768 0183'}</p>
          </div>

          <div>
            <h4 className="mb-4 font-bold text-gray-900">Certified Estheticians With Caring Skin</h4>
            <p className="mb-4 text-sm text-gray-600">
              Caring Skin, Singapore’s top sensitive and acne skin specialist, offers a holistic approach to transform your skin. Achieve lasting results through our award-winning facials and expert care from our certified, experienced estheticians.
            </p>
            <div className="flex space-x-4">
              <img src="https://caringskin.com.sg/wp-content/uploads/2023/10/Cibtac-Logo.png" alt="CIBTAC" className="h-14 w-14 object-contain" />
              <img src="https://caringskin.com.sg/wp-content/uploads/2023/10/Cidesco-Logo.png" alt="CIDESCO" className="h-14 w-14 object-contain" />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between border-t border-gray-100 pt-8 text-xs text-gray-500 md:flex-row">
          <div className="mb-4 flex space-x-4 md:mb-0">
            <a href="#" onClick={(e) => handleNavClick(e)} className="hover:text-gray-900">Data Privacy</a>
            <a href="#" onClick={(e) => handleNavClick(e)} className="hover:text-gray-900">Terms of Services</a>
          </div>
          <div>© 2026. Caring Group Pte Ltd</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
