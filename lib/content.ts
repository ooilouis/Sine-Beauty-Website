import { supabase } from './supabase';

export interface HeroSlide {
    id: number;
    title: string;
    subtitle: string;
    button_text: string;
    image_url: string;
    mobile_image_url: string;
    position: 'left' | 'center' | 'right';
    sort_order: number;
}

export interface CustomerStory {
    id: number;
    title: string;
    date: string;
    image_url: string;
    sort_order: number;
}

export interface FAQCategory {
    id: number;
    title: string;
    sort_order: number;
}

export interface FAQItem {
    id: number;
    category_id: number;
    question: string;
    answer: string;
    sort_order: number;
}

export interface GuaranteeItem {
    id: number;
    text: string;
    icon_name: string;
    sort_order: number;
}

export interface ContactOutlet {
    id: number;
    name: string;
    address: string;
    phone: string;
    image_url: string;
    google_maps_url: string;
    sort_order: number;
}

export interface PopupSettings {
    id: number;
    is_enabled: boolean;
    image_url: string;
    link_url: string;
}

export interface SiteSettings {
    id: number;
    announcement_text: string;
    whatsapp_number: string;
    email: string;
    phone: string;
    facebook_url: string;
    instagram_url: string;
    youtube_url: string;
    twitter_url: string;
}

export const ContentService = {
    // Hero Slides
    async getHeroSlides() {
        const { data, error } = await supabase
            .from('hero_slides')
            .select('*')
            .order('sort_order', { ascending: true });
        if (error) throw error;
        return data as HeroSlide[];
    },

    async updateHeroSlide(id: number, updates: Partial<HeroSlide>) {
        const { data, error } = await supabase
            .from('hero_slides')
            .update(updates)
            .eq('id', id)
            .select()
            .single();
        if (error) throw error;
        return data as HeroSlide;
    },

    async createHeroSlide(slide: Omit<HeroSlide, 'id'>) {
        const { data, error } = await supabase
            .from('hero_slides')
            .insert(slide)
            .select()
            .single();
        if (error) throw error;
        return data as HeroSlide;
    },

    async deleteHeroSlide(id: number) {
        const { error } = await supabase.from('hero_slides').delete().eq('id', id);
        if (error) throw error;
    },

    // Stories
    async getStories() {
        const { data, error } = await supabase
            .from('customer_stories')
            .select('*')
            .order('sort_order', { ascending: true });
        if (error) throw error;
        return data as CustomerStory[];
    },

    async createStory(story: Omit<CustomerStory, 'id'>) {
        const { data, error } = await supabase
            .from('customer_stories')
            .insert(story)
            .select()
            .single();
        if (error) throw error;
        return data as CustomerStory;
    },

    async updateStory(id: number, updates: Partial<CustomerStory>) {
        const { data, error } = await supabase
            .from('customer_stories')
            .update(updates)
            .eq('id', id)
            .select()
            .single();
        if (error) throw error;
        return data as CustomerStory;
    },

    async deleteStory(id: number) {
        const { error } = await supabase.from('customer_stories').delete().eq('id', id);
        if (error) throw error;
    },

    // FAQ
    async getFAQ() {
        const { data: categories, error: catError } = await supabase
            .from('faq_categories')
            .select('*')
            .order('sort_order', { ascending: true });

        if (catError) throw catError;

        const { data: items, error: itemError } = await supabase
            .from('faq_items')
            .select('*')
            .order('sort_order', { ascending: true });

        if (itemError) throw itemError;

        return categories.map((cat: FAQCategory) => ({
            ...cat,
            items: items.filter((item: FAQItem) => item.category_id === cat.id)
        }));
    },

    async createFAQCategory(category: Omit<FAQCategory, 'id'>) {
        const { data, error } = await supabase
            .from('faq_categories')
            .insert(category)
            .select()
            .single();
        if (error) throw error;
        return data as FAQCategory;
    },

    async updateFAQCategory(id: number, updates: Partial<FAQCategory>) {
        const { data, error } = await supabase
            .from('faq_categories')
            .update(updates)
            .eq('id', id)
            .select()
            .single();
        if (error) throw error;
        return data as FAQCategory;
    },

    async deleteFAQCategory(id: number) {
        const { error } = await supabase.from('faq_categories').delete().eq('id', id);
        if (error) throw error;
    },

    async createFAQItem(item: Omit<FAQItem, 'id'>) {
        const { data, error } = await supabase
            .from('faq_items')
            .insert(item)
            .select()
            .single();
        if (error) throw error;
        return data as FAQItem;
    },

    async updateFAQItem(id: number, updates: Partial<FAQItem>) {
        const { data, error } = await supabase
            .from('faq_items')
            .update(updates)
            .eq('id', id)
            .select()
            .single();
        if (error) throw error;
        return data as FAQItem;
    },

    async deleteFAQItem(id: number) {
        const { error } = await supabase.from('faq_items').delete().eq('id', id);
        if (error) throw error;
    },

    // Guarantee
    async getGuaranteeItems() {
        const { data, error } = await supabase
            .from('guarantee_items')
            .select('*')
            .order('sort_order', { ascending: true });
        if (error) throw error;
        return data as GuaranteeItem[];
    },

    async createGuaranteeItem(item: Omit<GuaranteeItem, 'id'>) {
        const { data, error } = await supabase
            .from('guarantee_items')
            .insert(item)
            .select()
            .single();
        if (error) throw error;
        return data as GuaranteeItem;
    },

    async updateGuaranteeItem(id: number, updates: Partial<GuaranteeItem>) {
        const { data, error } = await supabase
            .from('guarantee_items')
            .update(updates)
            .eq('id', id)
            .select()
            .single();
        if (error) throw error;
        return data as GuaranteeItem;
    },

    async deleteGuaranteeItem(id: number) {
        const { error } = await supabase.from('guarantee_items').delete().eq('id', id);
        if (error) throw error;
    },

    // Outlets
    async getOutlets() {
        const { data, error } = await supabase
            .from('contact_outlets')
            .select('*')
            .order('sort_order', { ascending: true });
        if (error) throw error;
        return data as ContactOutlet[];
    },

    async createOutlet(outlet: Omit<ContactOutlet, 'id'>) {
        const { data, error } = await supabase
            .from('contact_outlets')
            .insert(outlet)
            .select()
            .single();
        if (error) throw error;
        return data as ContactOutlet;
    },

    async updateOutlet(id: number, updates: Partial<ContactOutlet>) {
        const { data, error } = await supabase
            .from('contact_outlets')
            .update(updates)
            .eq('id', id)
            .select()
            .single();
        if (error) throw error;
        return data as ContactOutlet;
    },

    async deleteOutlet(id: number) {
        const { error } = await supabase.from('contact_outlets').delete().eq('id', id);
        if (error) throw error;
    },

    // Popup
    async getPopupSettings() {
        const { data, error } = await supabase
            .from('popup_settings')
            .select('*')
            .single();

        if (error && error.code !== 'PGRST116') throw error; // Ignore 'row not found'
        return data as PopupSettings | null;
    },

    async updatePopupSettings(settings: Partial<PopupSettings>) {
        // Upsert: update if exists, otherwise insert
        const { data: existing } = await supabase.from('popup_settings').select('id').single();

        if (existing) {
            const { data, error } = await supabase
                .from('popup_settings')
                .update(settings)
                .eq('id', existing.id)
                .select()
                .single();
            if (error) throw error;
            return data as PopupSettings;
        } else {
            const { data, error } = await supabase
                .from('popup_settings')
                .insert(settings)
                .select()
                .single();
            if (error) throw error;
            return data as PopupSettings;
        }
    },

    // Site Settings
    async getSiteSettings() {
        const { data, error } = await supabase
            .from('site_settings')
            .select('*')
            .single();

        if (error && error.code !== 'PGRST116') throw error;
        return data as SiteSettings | null;
    },

    async updateSiteSettings(settings: Partial<SiteSettings>) {
        // Upsert logic
        const { data: existing } = await supabase.from('site_settings').select('id').single();

        if (existing) {
            const { data, error } = await supabase
                .from('site_settings')
                .update(settings)
                .eq('id', existing.id)
                .select()
                .single();
            if (error) throw error;
            return data as SiteSettings;
        } else {
            const { data, error } = await supabase
                .from('site_settings')
                .insert(settings)
                .select()
                .single();
            if (error) throw error;
            return data as SiteSettings;
        }
    }
};
