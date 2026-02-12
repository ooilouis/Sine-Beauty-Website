
import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, Menu } from 'lucide-react';

interface HeaderProps {
  onNavigate: (page: string) => void;
}

type NavChild = {
  title: string;
  description?: string;
  page?: string;
  href?: string;
};

type MobileMenuItem = {
  label: string;
  type: 'accordion' | 'link';
  children?: NavChild[];
  page?: string;
  href?: string;
};

const aboutLinks: NavChild[] = [
  { title: 'Who We Are', description: 'Get to know more about Caring Skin', page: 'about' },
  { title: 'Customer Stories', description: 'Stories that speak to the heart of the brand', page: 'stories' },
  { title: 'Press & Media', description: 'Our achievement and featured press articles', href: '#' },
  { title: 'Blog', description: 'Diverse collection of insightful posts', page: 'blog' },
  { title: 'Locate Us', description: 'See and find all of our locations', page: 'contact' },
];

const skinConcerns: NavChild[] = [
  { title: 'Acne / Oily', page: 'active-acne' },
  { title: 'Acne Scars', page: 'acne-scars' },
  { title: 'Ageing', page: 'ageing-skin' },
  { title: 'Dry / Dehydrated', page: 'dry-skin' },
  { title: 'Congested / Large Pores', page: 'congested-skin' },
  { title: 'Sensitive', page: 'sensitive-skin' },
];

const treatmentGroups: Array<{ title: string; items: NavChild[] }> = [
  {
    title: 'Acne / Oily',
    items: [
      { title: 'Plantomer Soothing', page: 'treatment/plantomer-soothing' },
      { title: 'Plasma Treatment', page: 'treatment/plasma-treatment' },
      { title: 'Probiotic Treatment', page: 'treatment/probiotic-treatment' },
      { title: 'SensiVital Plus Treatment', page: 'treatment/sensivital-plus' },
      { title: 'ProSkin Medical Peel', page: 'treatment/proskin-medical-peel' },
    ],
  },
  {
    title: 'Acne Scars',
    items: [
      { title: 'Matricol Refiner', page: 'treatment/matricol-refiner' },
      { title: 'SHR Treatment', page: 'treatment/shr-treatment' },
      { title: 'Endymed FSR', page: 'treatment/endymed-fsr' },
      { title: 'NIR Cell Light', page: 'treatment/nir-cell-light' },
      { title: 'ProSkin Medical Peel', page: 'treatment/proskin-medical-peel' },
    ],
  },
  {
    title: 'Ageing',
    items: [
      { title: 'REJURAN® DEPGlow Treatment', page: 'treatment/rejuran-depglow' },
      { title: 'NIR Cell Light', page: 'treatment/nir-cell-light' },
    ],
  },
  {
    title: 'Dry / Dehydrated',
    items: [
      { title: 'Collagen Veil Plus', page: 'treatment/collagen-veil-plus' },
      { title: 'CS-Hydra Mesotherapy', page: 'treatment/cs-hydra-mesotherapy' },
      { title: 'REJURAN® DEPGlow Treatment', page: 'treatment/rejuran-depglow' },
      { title: 'HydraLock Swiss Therapy', page: 'treatment/hydralock-swiss' },
    ],
  },
  {
    title: 'Congested / Large Pores',
    items: [
      { title: 'H2 Infusion Treatment', page: 'treatment/h2-infusion' },
      { title: 'CelluGlow', page: 'treatment/celluglow' },
    ],
  },
  {
    title: 'Sensitive',
    items: [
      { title: 'Rosa C3 Treatment', page: 'treatment/rosa-c3' },
      { title: 'Probiotic Treatment', page: 'treatment/probiotic-treatment' },
      { title: 'Oxyvital Treatment', page: 'treatment/oxyvital' },
      { title: 'SensiVital Plus Treatment', page: 'treatment/sensivital-plus' },
    ],
  },
];

const mobileMenuData: MobileMenuItem[] = [
  {
    label: 'ABOUT',
    type: 'accordion',
    children: aboutLinks,
  },
  {
    label: 'TREATMENTS',
    type: 'accordion',
    children: skinConcerns,
  },
  {
    label: 'FAQ',
    type: 'link',
    page: 'faq',
  },
  {
    label: 'SHOP',
    type: 'link',
    page: 'shop',
  },
];

const headerAssets = {
  close: 'https://caringskin.com.sg/wp-content/themes/caringskin-new/assets/images/ic-close.svg',
  search: 'https://caringskin.com.sg/wp-content/themes/caringskin-new/assets/images/ic-search.svg',
  searchSubmit: 'https://caringskin.com.sg/wp-content/themes/caringskin-new/assets/images/ic-arrow-right-grey.svg',
  user: 'https://caringskin.com.sg/wp-content/uploads/2023/09/icon-pp-white.svg',
  cart: 'https://caringskin.com.sg/wp-content/uploads/2023/09/icon-cart-white.svg',
  logo: 'https://caringskin.com.sg/wp-content/uploads/2025/12/02025_CS_Logo_verti_Full_color_.png',
};

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
    setExpandedMobileItem((prev) => (prev === label ? null : label));
  };

  const handleNavClick = (e: React.MouseEvent, page?: string) => {
    if (page) {
      e.preventDefault();
      onNavigate(page);
      setIsMobileMenuOpen(false);
      setIsSearchOpen(false);
    } else if ((e.currentTarget as HTMLAnchorElement).getAttribute('href') === '#') {
      e.preventDefault();
    }
  };

  return (
    <header className="fixed top-0 z-40 flex w-full flex-col font-sans transition-all duration-300">
      {showBanner && (
        <div className="relative z-50 flex items-center justify-center border-b border-gray-100 bg-white px-4 py-2.5 text-center text-sm text-gray-600">
          <span className="tracking-wide">Free shipping on orders over $88</span>
          <button
            onClick={() => setShowBanner(false)}
            className="absolute right-4 p-1 opacity-70 transition-opacity hover:opacity-100"
            aria-label="Close banner"
          >
            <img src={headerAssets.close} alt="" className="h-4 w-4 object-contain invert" />
          </button>
        </div>
      )}

      <div className={`w-full bg-white transition-all duration-300 ${isScrolled ? 'py-2 shadow-md' : 'border-b border-gray-100 py-3'}`}>
        <div className="container relative mx-auto flex items-center justify-between px-4">
          <nav className="hidden items-center gap-8 lg:flex">
            <div className="group relative">
              <button className="flex items-center gap-1 text-sm font-semibold uppercase tracking-[0.16em] text-gray-700 transition-colors hover:text-teal-600">
                ABOUT <ChevronDown size={14} />
              </button>
              <div className="invisible absolute left-0 top-full z-50 w-72 translate-y-2 border border-gray-100 bg-white py-3 opacity-0 shadow-lg transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                {aboutLinks.map((item) => (
                  <a
                    key={item.title}
                    href={item.href || '#'}
                    onClick={(e) => handleNavClick(e, item.page)}
                    className="block px-6 py-2 hover:bg-gray-50"
                  >
                    <div className="font-semibold text-gray-900">{item.title}</div>
                    {item.description && <div className="text-xs text-gray-500">{item.description}</div>}
                  </a>
                ))}
              </div>
            </div>

            <div className="group static">
              <button className="flex items-center gap-1 border-b-2 border-transparent py-5 text-sm font-semibold uppercase tracking-[0.16em] text-gray-700 transition-colors hover:text-teal-600 group-hover:border-teal-600">
                TREATMENTS <ChevronDown size={14} />
              </button>
              <div className="invisible absolute left-0 top-full z-50 w-full border-t border-gray-100 bg-white opacity-0 shadow-lg transition-all duration-300 group-hover:visible group-hover:opacity-100">
                <div className="container mx-auto px-4 py-8">
                  <div className="grid grid-cols-[260px,1fr] gap-10">
                    <div className="border-r border-gray-100 pr-8">
                      <h4 className="mb-5 font-serif text-xl text-gray-800">Skin Concerns</h4>
                      <ul className="space-y-3">
                        {skinConcerns.map((concern) => (
                          <li key={concern.title}>
                            <a
                              href={concern.href || '#'}
                              onClick={(e) => handleNavClick(e, concern.page)}
                              className="block font-medium text-gray-600 transition-colors hover:text-teal-600"
                            >
                              {concern.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="mb-5 font-serif text-xl text-gray-800">Treatments</h4>
                      <div className="grid grid-cols-2 gap-x-10 gap-y-8 xl:grid-cols-3">
                        {treatmentGroups.map((group) => (
                          <div key={group.title}>
                            <h5 className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-teal-700">{group.title}</h5>
                            <ul className="space-y-1.5">
                              {group.items.map((item) => (
                                <li key={item.title}>
                                  <a
                                    href={item.href || '#'}
                                    onClick={(e) => handleNavClick(e, item.page)}
                                    className="block text-sm text-gray-600 transition-colors hover:text-teal-600"
                                  >
                                    {item.title}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <a
              href="#"
              onClick={(e) => handleNavClick(e, 'faq')}
              className="text-sm font-semibold uppercase tracking-[0.16em] text-gray-700 transition-colors hover:text-teal-600"
            >
              FAQ
            </a>
            <a
              href="#"
              onClick={(e) => handleNavClick(e, 'shop')}
              className="text-sm font-semibold uppercase tracking-[0.16em] text-gray-700 transition-colors hover:text-teal-600"
            >
              SHOP
            </a>
          </nav>

          <div className="flex flex-1 justify-center lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:flex-none">
            <a href="/" onClick={(e) => handleNavClick(e, 'home')} className="block">
              <img src={headerAssets.logo} alt="Caring Skin" className="h-14 w-auto object-contain md:h-16" />
            </a>
          </div>

          <div className="flex items-center space-x-4 lg:space-x-6">
            <a
              href="#"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="hidden text-sm uppercase tracking-[0.14em] text-gray-600 transition-colors hover:text-teal-600 xl:block"
            >
              BOOK APPOINTMENT
            </a>
            <button
              onClick={() => setIsSearchOpen((open) => !open)}
              className="opacity-80 transition-opacity hover:opacity-100"
              aria-label="Open search"
            >
              <img src={headerAssets.search} alt="" className="h-5 w-5 object-contain" />
            </button>
            <a
              href="#"
              onClick={(e) => handleNavClick(e, 'create-account')}
              className="hidden opacity-80 transition-opacity hover:opacity-100 md:block"
            >
              <img src={headerAssets.user} alt="" className="h-5 w-5 object-contain invert" />
            </a>
            <a href="#" className="flex items-center space-x-1 opacity-80 transition-opacity hover:opacity-100">
              <img src={headerAssets.cart} alt="" className="h-5 w-5 object-contain invert" />
              <span className="hidden text-sm md:inline">(0)</span>
            </a>
            <button onClick={() => setIsMobileMenuOpen(true)} className="text-gray-900 lg:hidden" aria-label="Open mobile menu">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      <div
        className={`absolute left-0 top-full w-full overflow-hidden bg-white shadow-md transition-all duration-300 ${
          isSearchOpen ? 'max-h-24 border-t border-gray-100 py-4' : 'max-h-0 py-0'
        }`}
      >
        <div className="container mx-auto flex items-center gap-3 px-4">
          <img src={headerAssets.search} alt="" className="h-5 w-5 object-contain opacity-50" />
          <input
            type="text"
            placeholder="SEARCH HERE"
            className="w-full border-b border-gray-300 bg-transparent py-2 text-gray-700 placeholder-gray-400 focus:border-teal-500 focus:outline-none"
          />
          <button className="opacity-60 transition-opacity hover:opacity-100" aria-label="Submit search">
            <img src={headerAssets.searchSubmit} alt="" className="h-4 w-4 object-contain" />
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-50 overflow-y-auto bg-white transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-100 p-6">
          <img src={headerAssets.logo} alt="Caring Skin" className="h-12 w-auto object-contain" />
          <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 opacity-70 transition-opacity hover:opacity-100" aria-label="Close menu">
            <img src={headerAssets.close} alt="" className="h-6 w-6 object-contain invert" />
          </button>
        </div>

        <div className="px-6 pb-20 pt-4">
          {mobileMenuData.map((item) => (
            <div key={item.label} className="border-b border-gray-100 last:border-0">
              {item.type === 'link' ? (
                <a
                  href={item.href || '#'}
                  onClick={(e) => handleNavClick(e, item.page)}
                  className="block py-4 font-medium uppercase tracking-wide text-gray-800 transition-colors hover:text-teal-600"
                >
                  {item.label}
                </a>
              ) : (
                <div>
                  <button
                    onClick={() => toggleMobileItem(item.label)}
                    className="flex w-full items-center justify-between py-4 font-medium uppercase tracking-wide text-gray-800 transition-colors hover:text-teal-600"
                  >
                    <span>{item.label}</span>
                    {expandedMobileItem === item.label ? (
                      <ChevronUp size={20} className="text-gray-400" />
                    ) : (
                      <ChevronDown size={20} className="text-gray-400" />
                    )}
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      expandedMobileItem === item.label ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="space-y-4 pb-6">
                      {item.children?.map((child) => (
                        <a
                          key={`${item.label}-${child.title}`}
                          href={child.href || '#'}
                          onClick={(e) => handleNavClick(e, child.page)}
                          className="block"
                        >
                          {item.label === 'ABOUT' ? (
                            <div className="-mx-3 rounded-lg bg-teal-50/50 p-3 transition-colors hover:bg-teal-50">
                              <div className="mb-0.5 text-[15px] font-medium text-teal-800">{child.title}</div>
                              {child.description && <div className="text-xs leading-snug text-gray-500">{child.description}</div>}
                            </div>
                          ) : (
                            <div className="rounded px-2 py-1 text-gray-600 transition-colors hover:bg-gray-50 hover:text-teal-600">
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
            <a
              href="#"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="block w-full rounded bg-teal-500 px-6 py-3 text-center text-sm font-bold uppercase tracking-widest text-white shadow-lg transition-colors hover:bg-teal-600"
            >
              Book Appointment
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
