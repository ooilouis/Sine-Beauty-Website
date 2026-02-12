export interface BlogContentSection {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface BlogFaqItem {
  question: string;
  answer: string;
}

export type BlogStatus = 'draft' | 'published';

export interface BlogSeo {
  focusKeyword?: string;
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  date: string;
  category: string;
  image: string;
  excerpt: string;
  content: BlogContentSection[];
  faqs?: BlogFaqItem[];
  status?: BlogStatus;
  tags?: string[];
  imageAlt?: string;
  seo?: BlogSeo;
  sort_order?: number;
}

const posts: BlogPost[] = [
  {
    id: 1,
    slug: 'what-to-do-after-facial-extraction',
    title: 'What To Do After Facial Extraction?',
    date: '29 Jan 2026',
    category: 'Skincare Tips',
    image: 'https://caringskin.com.sg/wp-content/uploads/2026/01/ai-generated-8626807_1280-e1769667821200.png',
    excerpt: 'Learn what to do after facial extraction to reduce redness, prevent breakouts, and speed up healing with Caring Skin Singapore.',
    content: [
      {
        paragraphs: [
          'Facial extraction is one of the most effective ways to remove stubborn blackheads, whiteheads, and clogged pores. But what many people do not realise is this: what you do after extraction is just as important as the facial itself.',
          'Proper aftercare helps calm your skin, prevent breakouts, and ensure you get the best results from your treatment.',
        ],
      },
      {
        heading: 'Why Post-Extraction Care Matters',
        paragraphs: [
          'During extraction, pressure is applied to remove impurities trapped inside your pores. Even with professional techniques, your skin goes through mild stress and becomes more sensitive temporarily.',
          'Without proper care, post-extraction skin may experience:',
        ],
        bullets: [
          'Redness and inflammation',
          'Breakouts caused by bacteria',
          'Delayed healing',
          'Post-inflammatory pigmentation',
        ],
      },
      {
        heading: '1. Avoid Touching Your Face',
        paragraphs: ['After extraction, your pores are more open than usual. Touching your face with unclean hands can transfer bacteria, leading to new breakouts or infection.'],
        bullets: [
          'Let your skin rest for at least 24 hours',
          'Avoid picking or squeezing any remaining spots',
          'Change your pillowcase that night for extra hygiene',
        ],
      },
      {
        heading: '2. Skip Makeup for at Least 24 Hours',
        paragraphs: ['It may be tempting to cover up redness, but applying makeup too soon can clog freshly extracted pores and slow down healing.'],
        bullets: [
          'Avoid foundation, concealer, and heavy powders for 24 hours',
          'If needed, use only light, non-comedogenic sunscreen',
        ],
      },
      {
        heading: '3. Focus on Hydration and Soothing Products',
        paragraphs: [
          'Your skin barrier needs time to recover. The goal after extraction is calming, hydrating, and repairing.',
          'Avoid active ingredients like retinol, AHA/BHA, or vitamin C for at least 48 hours unless advised by a professional skin coach.',
        ],
        bullets: ['Aloe vera', 'Hyaluronic acid', 'Centella asiatica', 'Panthenol'],
      },
      {
        heading: '4. Stay Away from Heat and Sweating',
        paragraphs: ['Heat can worsen redness and irritation after extraction. For the next 24 to 48 hours, avoid:'],
        bullets: ['Sauna and steam rooms', 'Hot yoga or intense workouts', 'Long hot showers'],
      },
      {
        heading: '5. Always Apply Sunscreen',
        paragraphs: [
          'Post-extraction skin is more prone to pigmentation. Skipping sunscreen can undo all the benefits of your facial treatment.',
          'Use a lightweight, broad-spectrum SPF 30 or above, even if you are indoors most of the day.',
        ],
      },
      {
        heading: '6. Follow a Consistent Homecare Routine',
        paragraphs: ['Extraction facials work best when combined with proper homecare. Using harsh cleansers or over-exfoliating can cause your pores to clog again.'],
        bullets: [
          'The right cleanser for your skin type',
          'Whether you need calming or oil-control products',
          'How often you should return for extraction',
        ],
      },
      {
        heading: 'Final Thoughts: Let Your Skin Heal and Glow',
        paragraphs: [
          'Facial extraction can dramatically improve skin clarity, but only when paired with the right aftercare and gentle techniques.',
          'If you are looking for a safe and effective extraction facial in Singapore, Caring Skin is here to guide you every step of the way.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How long does skin take to recover after facial extraction?',
        answer: 'Most skin redness settles within 24 to 48 hours. Full recovery usually takes 3 to 5 days depending on skin sensitivity and extraction depth.',
      },
      {
        question: 'Can I wash my face after an extraction facial?',
        answer: 'Yes, but wait at least 6 to 8 hours and use a gentle cleanser. Avoid exfoliating cleansers, scrubs, or active acids for 2 days.',
      },
      {
        question: 'When can I wear makeup after extraction?',
        answer: 'It is best to avoid makeup for at least 24 hours to prevent fresh pores from clogging.',
      },
    ],
  },
  {
    id: 2,
    slug: 'how-to-keep-your-skin-glowing-this-chinese-new-year-2026',
    title: 'How to Keep Your Skin Glowing This Chinese New Year 2026',
    date: '22 Jan 2026',
    category: 'Skincare Tips',
    image: 'https://caringskin.com.sg/wp-content/uploads/2026/01/cnylady-e1769067405682.jpg',
    excerpt: 'Get festive-ready skin with simple, practical skincare habits that maintain glow through celebrations.',
    content: [],
  },
  {
    id: 3,
    slug: 'how-to-achieve-radiant-skin-with-the-right-facial-treatment-in-singapore',
    title: 'How to Achieve Radiant Skin with the Right Facial Treatment in Singapore',
    date: '13 Jan 2026',
    category: 'Skincare Tips',
    image: 'https://caringskin.com.sg/wp-content/uploads/2026/01/radiantskin-e1768293696987.jpg',
    excerpt: 'Understand how to choose the right facial treatment based on your skin profile and goals.',
    content: [],
  },
  {
    id: 4,
    slug: 'new-year-new-look-start-2026-with-a-fresh-face-and-renewed-confidence',
    title: 'New Year, New Look: Start 2026 With a Fresh Face and Renewed Confidence',
    date: '29 Dec 2025',
    category: 'Skincare Tips',
    image: 'https://caringskin.com.sg/wp-content/uploads/2025/11/Blog-Post_Why-Your-Skin-Suffers-After-a-Trip-to-Cold-Countries_facial_.jpg',
    excerpt: 'Kick off 2026 with a healthy skin reset plan that balances treatment and daily care.',
    content: [],
  },
  {
    id: 5,
    slug: 'how-do-i-stop-acne-on-my-face-a-comprehensive-guide-to-clear-skin',
    title: 'How Do I Stop Acne on My Face? A Comprehensive Guide to Clear Skin',
    date: '16 Dec 2025',
    category: 'Skincare Tips',
    image: 'https://caringskin.com.sg/wp-content/uploads/2025/10/Blog-Post_How-a-Skin-Coach-Can-Help-You-Manage-Adult-Acne-Effectively_adult-acne_.jpg',
    excerpt: 'A practical breakdown of acne triggers, treatment options, and consistent homecare routines.',
    content: [],
  },
  {
    id: 6,
    slug: 'glow-up-this-christmas-your-guide-to-radiant-festive-ready-skin',
    title: 'Glow Up This Christmas: Your Guide to Radiant, Festive-Ready Skin',
    date: '04 Dec 2025',
    category: 'Skincare Tips',
    image: 'https://caringskin.com.sg/wp-content/uploads/2025/12/xmas-model-e1764819024335.jpg',
    excerpt: 'Prepare your skin for year-end events with a timeline that keeps it calm, hydrated, and bright.',
    content: [],
  },
];

const defaultSections = (post: BlogPost): BlogContentSection[] => [
  {
    paragraphs: [
      post.excerpt,
      'This article is presented in our standard blog layout so every post remains consistent, readable, and easy to navigate.',
    ],
  },
  {
    heading: 'What You Will Learn',
    bullets: [
      'How this topic affects skin health',
      'Simple steps you can apply immediately',
      'When to seek professional guidance',
    ],
  },
  {
    heading: 'Practical Guidance',
    paragraphs: [
      'Healthy skin outcomes come from consistency. Focus on gentle cleansing, hydration, sun protection, and treatment choices that match your skin condition.',
      'If your skin concerns persist, a structured consultation can help identify the right plan with fewer trial-and-error products.',
    ],
  },
];

const withBlogDefaults = (post: BlogPost, index: number): BlogPost => ({
  ...post,
  content: post.content.length > 0 ? post.content : defaultSections(post),
  status: post.status ?? 'published',
  tags: post.tags ?? [],
  imageAlt: post.imageAlt ?? post.title,
  seo: {
    focusKeyword: post.seo?.focusKeyword ?? '',
    metaTitle: post.seo?.metaTitle ?? '',
    metaDescription: post.seo?.metaDescription ?? '',
    canonicalUrl: post.seo?.canonicalUrl ?? '',
    ogTitle: post.seo?.ogTitle ?? '',
    ogDescription: post.seo?.ogDescription ?? '',
    ogImage: post.seo?.ogImage ?? '',
  },
  sort_order: post.sort_order ?? index,
});

export const blogPosts: BlogPost[] = posts.map((post, index) => withBlogDefaults(post, index));

export const blogPostsAll: BlogPost[] = [
  ...blogPosts,
  {
    id: 7,
    slug: 'retinol-in-the-cold-how-to-safely-use-active-ingredients-when-your-skin-is-sensitive',
    title: 'Retinol in the Cold: How to Safely Use Active Ingredients When Your Skin is Sensitive',
    date: '26 Nov 2025',
    category: 'Skincare Tips',
    image: 'https://caringskin.com.sg/wp-content/uploads/2025/11/model15-e1764130578991.jpg',
    excerpt: 'Use active ingredients safely during colder weather while keeping the skin barrier calm.',
    content: defaultSections({
      id: 7, slug: '', title: '', date: '', category: '', image: '', excerpt: 'Use active ingredients safely during colder weather while keeping the skin barrier calm.', content: []
    } as BlogPost),
  },
  {
    id: 8,
    slug: 'how-a-skin-coach-uses-skin-analysis-to-create-a-personalised-treatment-plan',
    title: 'How a Skin Coach Uses Skin Analysis to Create a Personalised Treatment Plan',
    date: '20 Nov 2025',
    category: 'Skincare Tips',
    image: 'https://caringskin.com.sg/wp-content/uploads/2025/11/Blog-Post_Why-Your-Skin-Suffers-After-a-Trip-to-Cold-Countries_Skin-coach_.jpg',
    excerpt: 'See how professional skin analysis translates into a clear treatment and homecare strategy.',
    content: defaultSections({
      id: 8, slug: '', title: '', date: '', category: '', image: '', excerpt: 'See how professional skin analysis translates into a clear treatment and homecare strategy.', content: []
    } as BlogPost),
  },
  {
    id: 9,
    slug: 'can-deep-pore-cleansing-facials-help-reduce-whiteheads-and-breakouts',
    title: 'Can Deep Pore Cleansing Facials Help Reduce Whiteheads and Breakouts?',
    date: '17 Nov 2025',
    category: 'Skincare Tips',
    image: 'https://caringskin.com.sg/wp-content/uploads/2025/11/WhatsApp-Image-2025-11-17-at-12.39.04-PM.jpeg',
    excerpt: 'Understand what deep pore cleansing does and how it supports acne-prone skin management.',
    content: defaultSections({
      id: 9, slug: '', title: '', date: '', category: '', image: '', excerpt: 'Understand what deep pore cleansing does and how it supports acne-prone skin management.', content: []
    } as BlogPost),
  },
].map((post, index) => withBlogDefaults(post, index));
