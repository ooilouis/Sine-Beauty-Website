
export interface Slide {
  id: number;
  image: string;
  mobileImage: string;
  title: string;
  subtitle: string;
  buttonText: string;
  position: 'center' | 'left' | 'right';
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqCategory {
  title: string;
  items: FaqItem[];
}

export interface Story {
  title: string;
  date: string;
  image: string;
  link: string;
}

export interface Step {
  id: number;
  title: string;
  description: string;
  image: string;
}

// Treatment Page Types

export interface TreatmentCauseItem {
  title: string;
  description: string;
  icon: string; 
}

export interface TreatmentTypeItem {
  title: string;
  tags?: string[];
  description: string;
  image: string;
}

export interface RecommendedTreatmentItem {
  title: string;
  tag?: string;
  description: string;
  forSkinType: string;
  benefits: string;
  price: string;
  duration: string;
  image: string;
  link?: string;
}

export interface TestimonialVideo {
  title: string;
  thumbnail: string;
  videoLink: string;
}

export interface TreatmentPageData {
  id: string;
  masthead: {
    title: string;
    subtitle: string;
    description: string;
    image: string;
  };
  causes: {
    title: string;
    subtitle: string;
    description: string;
    items: TreatmentCauseItem[];
  };
  types: {
    title: string;
    subtitle: string;
    description: string;
    items: TreatmentTypeItem[];
  };
  treatments: {
    title: string;
    subtitle: string;
    description: string;
    items: RecommendedTreatmentItem[];
  };
  faq: {
    title: string;
    items: FaqItem[];
  };
  testimonials?: {
    videos?: TestimonialVideo[];
  };
}

// Single Treatment Page Types

export interface Ingredient {
  name: string;
  image: string;
  description: string[];
}

export interface TreatmentStep {
  number: string;
  title: string;
  description: string;
}

export interface SingleTreatmentPageData {
  id: string;
  category: string;
  title: string;
  recommendedFor: string;
  summary: string;
  heroImage: string;
  benefits: {
    didYouKnow: string;
    about: string;
  };
  featuredOn?: string[];
  howItWorks: {
    videoThumbnail: string;
    videoLink: string;
    steps: TreatmentStep[];
  };
  ingredients: Ingredient[];
  faq: {
    title: string;
    description?: string;
    items: FaqItem[];
  };
}

// Shop Types
export interface Product {
  id: string;
  name: string;
  image: string;
  isBestSeller: boolean;
  reviews: number;
  rating: number; // 0 to 5
  priceText: string;
}

export interface ProductIngredient {
  name: string;
  image: string;
  description: string[];
}

export interface ProductReview {
  name: string;
  initial: string;
  date: string;
  rating: number;
  text: string;
  age?: string;
}

export interface ProductDetailData extends Product {
  images: string[];
  categories: string[];
  recommendedFor: string;
  shortDescription: string;
  
  // Content Sections
  benefits: {
    whatItIs: string;
    whatItDoes: string[];
  };
  featuredOn?: string[];
  ingredients: {
    highlighted: ProductIngredient[];
    fullList: string;
  };
  safeForSkin: string;
  promises: {
    text: string;
  }[];
  directions: {
    howToUse: string;
    specialNote: string;
    routine: string;
  };
  faq: FaqItem[];
  reviewsList: ProductReview[];
}
