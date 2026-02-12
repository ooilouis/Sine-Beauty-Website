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

interface CmsDataContextType {
  blogPosts: BlogPost[];
  landingPages: LandingPage[];
  setBlogPosts: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  setLandingPages: React.Dispatch<React.SetStateAction<LandingPage[]>>;
}

const BLOG_STORAGE_KEY = 'cms_blog_posts_v1';
const LANDING_STORAGE_KEY = 'cms_landing_pages_v1';

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

const CmsDataContext = createContext<CmsDataContextType | undefined>(undefined);

export const CmsDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [landingPages, setLandingPages] = useState<LandingPage[]>([]);

  useEffect(() => {
    const storedBlogPosts = safeRead<BlogPost[]>(BLOG_STORAGE_KEY, []);
    const storedLandingPages = safeRead<LandingPage[]>(LANDING_STORAGE_KEY, []);

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
  }, []);

  useEffect(() => {
    if (blogPosts.length > 0) {
      safeWrite(BLOG_STORAGE_KEY, normalizeBlogPosts(blogPosts));
    }
  }, [blogPosts]);

  useEffect(() => {
    if (landingPages.length > 0) {
      safeWrite(LANDING_STORAGE_KEY, normalizeLandingPages(landingPages));
    }
  }, [landingPages]);

  const contextValue = useMemo(
    () => ({
      blogPosts: normalizeBlogPosts(blogPosts),
      landingPages: normalizeLandingPages(landingPages),
      setBlogPosts,
      setLandingPages,
    }),
    [blogPosts, landingPages]
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
