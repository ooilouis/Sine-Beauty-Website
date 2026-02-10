
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import CustomerStories from './components/CustomerStories';
import Blog from './components/Blog';
import ContactUs from './components/ContactUs';
import TreatmentTemplate from './components/TreatmentTemplate';
import SingleTreatmentTemplate from './components/SingleTreatmentTemplate';
import Shop from './components/Shop';
import ProductTemplate from './components/ProductTemplate';
import CreateAccount from './components/CreateAccount';
import Footer from './components/Footer';
import MobileBottomBar from './components/MobileBottomBar';
import PopupModal from './components/PopupModal';
import AdminPanel from './components/AdminPanel';
import { ContentProvider } from './contexts/ContentContext';
import { treatmentPages } from './data/treatments';
import { singleTreatmentPages } from './data/singleTreatments';
import { products } from './data/products';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Only show popup on home page
    if (currentPage === 'home') {
        const timer = setTimeout(() => {
          setShowPopup(true);
        }, 2000);
        return () => clearTimeout(timer);
    }
  }, [currentPage]);

  const navigate = (page: string) => {
      window.scrollTo(0, 0);
      setCurrentPage(page);
  };

  const renderPage = () => {
      if (currentPage.startsWith('treatment/')) {
        const treatmentId = currentPage.split('/')[1];
        if (singleTreatmentPages[treatmentId]) {
            return <SingleTreatmentTemplate data={singleTreatmentPages[treatmentId]} />;
        }
      }

      if (currentPage.startsWith('product/')) {
        const productId = currentPage.split('/')[1];
        const productData = products.find(p => p.id === productId);
        if (productData) {
            return <ProductTemplate data={productData} onNavigate={navigate} />;
        }
      }

      if (treatmentPages[currentPage]) {
          return <TreatmentTemplate data={treatmentPages[currentPage]} />;
      }
      
      switch (currentPage) {
          case 'home': return <Home />;
          case 'about': return <AboutUs />;
          case 'stories': return <CustomerStories />;
          case 'blog': return <Blog />;
          case 'contact': return <ContactUs />;
          case 'shop': return <Shop onNavigate={navigate} />;
          case 'create-account': return <CreateAccount />;
          default: return <Home />;
      }
  };

  return (
    <ContentProvider>
        <div className="min-h-screen bg-white text-gray-800 relative">
        <Header onNavigate={navigate} />
        
        <main>
            {renderPage()}
        </main>

        <Footer onNavigate={navigate} />
        <MobileBottomBar onNavigate={navigate} />
        <AdminPanel />
        
        {showPopup && <PopupModal onClose={() => setShowPopup(false)} />}
        
        {/* WhatsApp Floating Button */}
        <a 
            href="https://wa.me/6587680183" 
            target="_blank" 
            rel="noreferrer"
            className="hidden md:flex fixed bottom-8 right-8 w-14 h-14 bg-[#25D366] rounded-full items-center justify-center shadow-lg hover:shadow-xl transition-all z-50 group"
        >
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span className="absolute right-16 bg-[#f5f7f9] text-gray-700 text-sm py-2 px-3 rounded shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            Chat with us
            </span>
        </a>
        </div>
    </ContentProvider>
  );
};

export default App;
