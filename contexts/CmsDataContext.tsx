import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { blogPostsAll, type BlogPost } from '../data/blogPosts';

export interface LandingPage {
  id: number;
  name: string;
  slug: string;
  headline: string;
  subheadline: string;
  heroImage: string;
  ctaText: string;
  ctaUrl: string;
  benefits: string[];
  trustPoints: string[];
  isActive: boolean;
  formEnabled: boolean;
  thankYouMessage: string;
  metaTitle?: string;
  metaDescription?: string;
  sort_order?: number;
}

export type CmsFormFieldType = 'text' | 'email' | 'tel' | 'textarea' | 'select';

export interface CmsFormField {
  id: number;
  name: string;
  label: string;
  type: CmsFormFieldType;
  placeholder?: string;
  required: boolean;
  options?: string[];
  sort_order?: number;
}

export type CmsFormSubmitMode = 'none' | 'mailto' | 'whatsapp';

export interface CmsForm {
  id: number;
  key: string;
  name: string;
  title: string;
  description?: string;
  buttonText: string;
  successMessage: string;
  submitMode: CmsFormSubmitMode;
  submitTarget?: string;
  isActive: boolean;
  fields: CmsFormField[];
  sort_order?: number;
}

interface CmsDataContextType {
  blogPosts: BlogPost[];
  landingPages: LandingPage[];
  forms: CmsForm[];
  setBlogPosts: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  setLandingPages: React.Dispatch<React.SetStateAction<LandingPage[]>>;
  setForms: React.Dispatch<React.SetStateAction<CmsForm[]>>;
}

const BLOG_STORAGE_KEY = 'cms_blog_posts_v1';
const LANDING_STORAGE_KEY = 'cms_landing_pages_v1';
const FORMS_STORAGE_KEY = 'cms_forms_v1';

const defaultLandingPages: LandingPage[] = [
  {
    id: 1,
    name: 'Acne Trial Facial',
    slug: 'acne-trial-facial',
    headline: 'Clear & Healthy Skin Starts Here',
    subheadline: 'Book your first-time therapeutic trial facial from $68 with our certified skin coaches.',
    heroImage: 'https://caringskin.com.sg/wp-content/uploads/2024/10/cs-medispa_website_main-banner_1920px-x-1280px_-1-min.jpg',
    ctaText: 'Book Trial Session',
    ctaUrl: 'https://caringskin.com.sg/contact-us/',
    benefits: ['Gentle extraction techniques', 'No hard selling policy', 'Personalised treatment plan'],
    trustPoints: ['10,000+ 5-star reviews', 'Award-winning facial spa in Singapore', 'Certified estheticians'],
    isActive: true,
    formEnabled: true,
    thankYouMessage: 'Thanks, our team will contact you shortly.',
    metaTitle: 'Acne Trial Facial Singapore | Caring Skin',
    metaDescription: 'Book your first-time acne and sensitive skin trial facial in Singapore from $68.',
    sort_order: 0,
  },
];

const defaultForms: CmsForm[] = [
  {
    id: 1,
    key: 'contact-us',
    name: 'Contact Us Main Form',
    title: 'Send Us a Message',
    description: 'Share your enquiry and our team will get back to you shortly.',
    buttonText: 'Send Enquiry',
    successMessage: 'Thanks. Your email app has been opened with your enquiry details.',
    submitMode: 'mailto',
    submitTarget: 'enquiry@caringskin.com.sg',
    isActive: true,
    sort_order: 0,
    fields: [
      { id: 1, name: 'full_name', label: 'Full Name', type: 'text', placeholder: 'Your name', required: true, sort_order: 0 },
      { id: 2, name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+65', required: true, sort_order: 1 },
      { id: 3, name: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com', required: true, sort_order: 2 },
      {
        id: 4,
        name: 'preferred_outlet',
        label: 'Preferred Outlet',
        type: 'select',
        placeholder: 'Select outlet',
        required: false,
        options: ['321 Clementi', 'Heartland Mall', 'Ngee Ann City', 'Bedok'],
        sort_order: 3,
      },
      { id: 5, name: 'message', label: 'Message', type: 'textarea', placeholder: 'Tell us your skin concern', required: true, sort_order: 4 },
    ],
  },
  {
    id: 2,
    key: 'treatment-booking',
    name: 'Treatment Booking Form',
    title: 'Book Your Appointment',
    description: 'Complete this quick form and continue on WhatsApp to confirm your slot.',
    buttonText: 'Continue to WhatsApp',
    successMessage: 'Great. Your WhatsApp chat has been opened.',
    submitMode: 'whatsapp',
    submitTarget: '6587680183',
    isActive: true,
    sort_order: 1,
    fields: [
      { id: 1, name: 'full_name', label: 'Full Name', type: 'text', placeholder: 'Your name', required: true, sort_order: 0 },
      { id: 2, name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+65', required: true, sort_order: 1 },
      { id: 3, name: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com', required: false, sort_order: 2 },
      {
        id: 4,
        name: 'preferred_outlet',
        label: 'Preferred Outlet',
        type: 'select',
        placeholder: 'Select outlet',
        required: false,
        options: ['321 Clementi', 'Heartland Mall', 'Ngee Ann City', 'Bedok'],
        sort_order: 3,
      },
      { id: 5, name: 'skin_concern', label: 'Skin Concern', type: 'textarea', placeholder: 'What do you need help with?', required: true, sort_order: 4 },
    ],
  },
  {
    id: 3,
    key: 'landing-lead',
    name: 'Landing Lead Form',
    title: 'Get Your Personalised Plan',
    description: 'Leave your details and we will contact you shortly.',
    buttonText: 'Submit Lead',
    successMessage: 'Thanks. Our team will contact you shortly.',
    submitMode: 'none',
    submitTarget: '',
    isActive: true,
    sort_order: 2,
    fields: [
      { id: 1, name: 'full_name', label: 'Full Name', type: 'text', placeholder: 'Your name', required: true, sort_order: 0 },
      { id: 2, name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+65', required: true, sort_order: 1 },
      { id: 3, name: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com', required: false, sort_order: 2 },
      { id: 4, name: 'concern', label: 'Skin Concern', type: 'textarea', placeholder: 'Tell us your concern', required: false, sort_order: 3 },
    ],
  },
];

const safeRead = <T,>(key: string, fallbackValue: T): T => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallbackValue;
    const parsed = JSON.parse(raw) as T;
    return parsed || fallbackValue;
  } catch {
    return fallbackValue;
  }
};

const safeWrite = (key: string, value: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Failed to persist ${key}`, error);
  }
};

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

const normalizeBlogPosts = (posts: BlogPost[]) =>
  [...posts]
    .map((post, index) => ({
      ...post,
      content: post.content || [],
      status: post.status || 'published',
      tags: Array.isArray(post.tags) ? post.tags : [],
      imageAlt: post.imageAlt || post.title,
      seo: {
        focusKeyword: post.seo?.focusKeyword || '',
        metaTitle: post.seo?.metaTitle || '',
        metaDescription: post.seo?.metaDescription || '',
        canonicalUrl: post.seo?.canonicalUrl || '',
        ogTitle: post.seo?.ogTitle || '',
        ogDescription: post.seo?.ogDescription || '',
        ogImage: post.seo?.ogImage || '',
      },
      sort_order: post.sort_order ?? index,
    }))
    .sort((a, b) => {
      const orderA = a.sort_order ?? 0;
      const orderB = b.sort_order ?? 0;
      if (orderA === orderB) return a.id - b.id;
      return orderA - orderB;
    });

const normalizeLandingPages = (pages: LandingPage[]) =>
  [...pages]
    .map((page, index) => ({
      ...page,
      sort_order: page.sort_order ?? index,
      benefits: page.benefits || [],
      trustPoints: page.trustPoints || [],
    }))
    .sort((a, b) => {
      const orderA = a.sort_order ?? 0;
      const orderB = b.sort_order ?? 0;
      if (orderA === orderB) return a.id - b.id;
      return orderA - orderB;
    });

const normalizeForms = (forms: CmsForm[]) =>
  [...forms]
    .map((form, index) => ({
      ...form,
      key: toSlug(form.key || form.name || `form-${index + 1}`),
      name: form.name || `Form ${index + 1}`,
      title: form.title || form.name || 'Form',
      description: form.description || '',
      buttonText: form.buttonText || 'Submit',
      successMessage: form.successMessage || 'Thanks. Your form has been submitted.',
      submitMode: form.submitMode || 'none',
      submitTarget: form.submitTarget || '',
      isActive: form.isActive !== false,
      sort_order: form.sort_order ?? index,
      fields: [...(form.fields || [])]
        .map((field, fieldIndex) => ({
          ...field,
          name: toSlug(field.name || field.label || `field-${fieldIndex + 1}`),
          label: field.label || `Field ${fieldIndex + 1}`,
          type: field.type || 'text',
          placeholder: field.placeholder || '',
          required: Boolean(field.required),
          options: field.type === 'select' ? field.options || [] : undefined,
          sort_order: field.sort_order ?? fieldIndex,
        }))
        .sort((a, b) => {
          const orderA = a.sort_order ?? 0;
          const orderB = b.sort_order ?? 0;
          if (orderA === orderB) return a.id - b.id;
          return orderA - orderB;
        }),
    }))
    .sort((a, b) => {
      const orderA = a.sort_order ?? 0;
      const orderB = b.sort_order ?? 0;
      if (orderA === orderB) return a.id - b.id;
      return orderA - orderB;
    });

const CmsDataContext = createContext<CmsDataContextType | undefined>(undefined);

export const CmsDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [landingPages, setLandingPages] = useState<LandingPage[]>([]);
  const [forms, setForms] = useState<CmsForm[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const storedBlogPosts = safeRead<BlogPost[]>(BLOG_STORAGE_KEY, []);
    const storedLandingPages = safeRead<LandingPage[]>(LANDING_STORAGE_KEY, []);
    const storedForms = safeRead<CmsForm[]>(FORMS_STORAGE_KEY, []);

    if (storedBlogPosts.length === 0) {
      const seeded = normalizeBlogPosts(blogPostsAll);
      setBlogPosts(seeded);
      safeWrite(BLOG_STORAGE_KEY, seeded);
    } else {
      setBlogPosts(normalizeBlogPosts(storedBlogPosts));
    }

    if (storedLandingPages.length === 0) {
      const seeded = normalizeLandingPages(defaultLandingPages);
      setLandingPages(seeded);
      safeWrite(LANDING_STORAGE_KEY, seeded);
    } else {
      setLandingPages(normalizeLandingPages(storedLandingPages));
    }

    if (storedForms.length === 0) {
      const seeded = normalizeForms(defaultForms);
      setForms(seeded);
      safeWrite(FORMS_STORAGE_KEY, seeded);
    } else {
      setForms(normalizeForms(storedForms));
    }

    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      safeWrite(BLOG_STORAGE_KEY, normalizeBlogPosts(blogPosts));
    }
  }, [blogPosts, hydrated]);

  useEffect(() => {
    if (hydrated) {
      safeWrite(LANDING_STORAGE_KEY, normalizeLandingPages(landingPages));
    }
  }, [landingPages, hydrated]);

  useEffect(() => {
    if (hydrated) {
      safeWrite(FORMS_STORAGE_KEY, normalizeForms(forms));
    }
  }, [forms, hydrated]);

  const contextValue = useMemo(
    () => ({
      blogPosts: normalizeBlogPosts(blogPosts),
      landingPages: normalizeLandingPages(landingPages),
      forms: normalizeForms(forms),
      setBlogPosts,
      setLandingPages,
      setForms,
    }),
    [blogPosts, landingPages, forms]
  );

  return <CmsDataContext.Provider value={contextValue}>{children}</CmsDataContext.Provider>;
};

export const useCmsData = () => {
  const context = useContext(CmsDataContext);
  if (!context) {
    throw new Error('useCmsData must be used within CmsDataProvider');
  }
  return context;
};
