
import React, { createContext, useContext, useState, useEffect } from 'react';

// Initial Hardcoded Data (The "Default" Database)
const defaultContent = {
  "hero_slide_1_title": "Radiate Confidence With Clear & Healthy Skin",
  "hero_slide_1_subtitle": "Holistic Approach, Lasting Impact",
  "hero_slide_1_image": "https://picsum.photos/1920/1280?random=1",
  
  "hero_slide_2_title": "#1 Acne & Sensitive Skin Expert",
  "hero_slide_2_subtitle": "More Than 10,000 4.9-Star Reviews",
  "hero_slide_2_image": "https://picsum.photos/1920/1280?random=2",

  "hero_slide_3_title": "Caring From The Heart",
  "hero_slide_3_subtitle": "Our belief is in genuine care—not just for the skin, but for you.",
  "hero_slide_3_image": "https://picsum.photos/1920/1280?random=3",

  "contact_phone": "+65 8768 0183",
  "contact_email": "enquiry@caringskin.com.sg"
};

type ContentType = typeof defaultContent;

interface ContentContextType {
  content: ContentType;
  updateContent: (key: string, value: string) => void;
  isAdmin: boolean;
  toggleAdmin: () => void;
  resetContent: () => void;
  saveToDatabase: () => void; // Placeholder for real backend
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<ContentType>(defaultContent);
  const [isAdmin, setIsAdmin] = useState(false);

  // Load from LocalStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('site_content');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setContent({ ...defaultContent, ...parsed });
      } catch (e) {
        console.error("Failed to load content", e);
      }
    }
  }, []);

  const updateContent = (key: string, value: string) => {
    setContent(prev => {
      const newContent = { ...prev, [key]: value };
      // Auto-save to local storage (Simulating DB update)
      localStorage.setItem('site_content', JSON.stringify(newContent));
      return newContent;
    });
  };

  const toggleAdmin = () => setIsAdmin(prev => !prev);

  const resetContent = () => {
    if(window.confirm("Are you sure? This will revert all text to default.")) {
        setContent(defaultContent);
        localStorage.removeItem('site_content');
    }
  };

  const saveToDatabase = () => {
      alert("In a real app, this would send a JSON payload to your server/database.");
      console.log(JSON.stringify(content));
  }

  return (
    <ContentContext.Provider value={{ content, updateContent, isAdmin, toggleAdmin, resetContent, saveToDatabase }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
