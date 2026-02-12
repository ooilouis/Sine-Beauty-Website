import React, { createContext, useContext, useState, useEffect } from 'react';
import {
    ContentService,
    HeroSlide,
    CustomerStory,
    FAQCategory,
    FAQItem,
    GuaranteeItem,
    ContactOutlet,
    PopupSettings,
    SiteSettings
} from '../lib/content';

interface ContentContextType {
    heroSlides: HeroSlide[];
    stories: CustomerStory[];
    faq: (FAQCategory & { items: FAQItem[] })[];
    guaranteeItems: GuaranteeItem[];
    outlets: ContactOutlet[];
    popup: PopupSettings | null;
    settings: SiteSettings | null;
    loading: boolean;
    error: Error | null;
    refreshContent: () => Promise<void>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
    const [stories, setStories] = useState<CustomerStory[]>([]);
    const [faq, setFaq] = useState<(FAQCategory & { items: FAQItem[] })[]>([]);
    const [guaranteeItems, setGuaranteeItems] = useState<GuaranteeItem[]>([]);
    const [outlets, setOutlets] = useState<ContactOutlet[]>([]);
    const [popup, setPopup] = useState<PopupSettings | null>(null);
    const [settings, setSettings] = useState<SiteSettings | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchContent = async () => {
        try {
            setLoading(true);
            const [
                slidesData,
                storiesData,
                faqData,
                guaranteeData,
                outletsData,
                popupData,
                settingsData
            ] = await Promise.all([
                ContentService.getHeroSlides(),
                ContentService.getStories(),
                ContentService.getFAQ(),
                ContentService.getGuaranteeItems(),
                ContentService.getOutlets(),
                ContentService.getPopupSettings(),
                ContentService.getSiteSettings()
            ]);

            setHeroSlides(slidesData);
            setStories(storiesData);
            setFaq(faqData);
            setGuaranteeItems(guaranteeData);
            setOutlets(outletsData);
            setPopup(popupData);
            setSettings(settingsData);
        } catch (err) {
            console.error('Error fetching content:', err);
            setError(err instanceof Error ? err : new Error('Failed to fetch content'));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContent();
    }, []);

    return (
        <ContentContext.Provider value={{
            heroSlides,
            stories,
            faq,
            guaranteeItems,
            outlets,
            popup,
            settings,
            loading,
            error,
            refreshContent: fetchContent
        }}>
            {children}
        </ContentContext.Provider>
    );
};

export const useContent = () => {
    const context = useContext(ContentContext);
    if (context === undefined) {
        throw new Error('useContent must be used within a ContentProvider');
    }
    return context;
};
