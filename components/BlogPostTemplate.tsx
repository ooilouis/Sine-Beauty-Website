import React, { useEffect } from 'react';
import type { BlogPost } from '../data/blogPosts';

interface BlogPostTemplateProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
  onNavigate: (page: string) => void;
}

const shareIcons = {
  facebook: 'https://caringskin.com.sg/wp-content/themes/caringskin-new/assets/images/ic-share-article-1.svg',
  x: 'https://caringskin.com.sg/wp-content/themes/caringskin-new/assets/images/ic-share-article-2.svg',
  linkedin: 'https://caringskin.com.sg/wp-content/themes/caringskin-new/assets/images/ic-share-article-3.svg',
};

const BlogPostTemplate: React.FC<BlogPostTemplateProps> = ({ post, relatedPosts, onNavigate }) => {
  const postUrl = `${window.location.origin}/blog/${post.slug}`;

  useEffect(() => {
    const seoTitle = post.seo?.metaTitle?.trim() || `${post.title} | Caring Skin`;
    const seoDescription = post.seo?.metaDescription?.trim() || post.excerpt || '';
    const canonicalUrl = post.seo?.canonicalUrl?.trim() || postUrl;
    const ogTitle = post.seo?.ogTitle?.trim() || seoTitle;
    const ogDescription = post.seo?.ogDescription?.trim() || seoDescription;
    const ogImage = post.seo?.ogImage?.trim() || post.image;
    const previousTitle = document.title;
    document.title = seoTitle;

    const cleanupFns: Array<() => void> = [];

    const setMetaTag = (attribute: 'name' | 'property', value: string, content: string) => {
      let tag = document.querySelector(`meta[${attribute}="${value}"]`) as HTMLMetaElement | null;
      const created = !tag;
      const previousContent = tag?.getAttribute('content') || '';

      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attribute, value);
        document.head.appendChild(tag);
      }

      tag.setAttribute('content', content);

      cleanupFns.push(() => {
        if (!tag) return;
        if (created) tag.remove();
        else tag.setAttribute('content', previousContent);
      });
    };

    setMetaTag('name', 'description', seoDescription);
    setMetaTag('property', 'og:title', ogTitle);
    setMetaTag('property', 'og:description', ogDescription);
    setMetaTag('property', 'og:type', 'article');
    setMetaTag('property', 'og:url', postUrl);
    if (ogImage) {
      setMetaTag('property', 'og:image', ogImage);
    }

    let canonicalTag = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    const createdCanonical = !canonicalTag;
    const previousCanonicalHref = canonicalTag?.getAttribute('href') || '';

    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', canonicalUrl);

    return () => {
      document.title = previousTitle;
      cleanupFns.forEach((cleanup) => cleanup());
      if (!canonicalTag) return;
      if (createdCanonical) canonicalTag.remove();
      else canonicalTag.setAttribute('href', previousCanonicalHref);
    };
  }, [post.excerpt, post.image, post.seo, post.title, postUrl]);

  return (
    <div className="animate-in fade-in duration-500 bg-white">
      <section className="pt-32 pb-10">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900">{post.title}</h1>
            <div className="mt-5 flex items-center gap-4 text-sm">
              <span className="rounded-full bg-teal-50 px-3 py-1 font-semibold uppercase tracking-wide text-teal-700">{post.category}</span>
              <span className="text-gray-500">{post.date}</span>
              {post.tags && post.tags.length > 0 && (
                <span className="text-gray-400">{post.tags.join(' • ')}</span>
              )}
            </div>
          </div>
          <div className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-lg">
            <img src={post.image} alt={post.imageAlt || post.title} className="h-auto w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl space-y-6 text-gray-700">
            {post.content.map((section, index) => (
              <div key={`${post.slug}-section-${index}`} className="space-y-4">
                {section.heading && <h2 className="text-2xl font-serif text-gray-900">{section.heading}</h2>}
                {section.paragraphs?.map((paragraph, pIndex) => (
                  <p key={`${post.slug}-p-${index}-${pIndex}`} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="list-disc space-y-2 pl-6">
                    {section.bullets.map((bullet, bIndex) => (
                      <li key={`${post.slug}-b-${index}-${bIndex}`}>{bullet}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            {post.faqs && post.faqs.length > 0 && (
              <div className="space-y-4 border-t border-gray-200 pt-8">
                <h3 className="text-center text-2xl font-serif text-gray-900">FAQs</h3>
                {post.faqs.map((faq, index) => (
                  <div key={`${post.slug}-faq-${index}`}>
                    <h4 className="font-semibold text-gray-900">{index + 1}. {faq.question}</h4>
                    <p className="mt-2 text-gray-700">{faq.answer}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-10 flex items-center gap-4 border-t border-gray-200 pt-6">
              <span className="text-sm font-semibold text-gray-700">Share this article</span>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`} target="_blank" rel="noreferrer">
                <img src={shareIcons.facebook} alt="Share on Facebook" className="h-5 w-5" />
              </a>
              <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(post.title)}`} target="_blank" rel="noreferrer">
                <img src={shareIcons.x} alt="Share on X" className="h-5 w-5" />
              </a>
              <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(postUrl)}&title=${encodeURIComponent(post.title)}`} target="_blank" rel="noreferrer">
                <img src={shareIcons.linkedin} alt="Share on LinkedIn" className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {relatedPosts.length > 0 && (
        <section className="border-t border-gray-200 bg-[#fcfcfc] py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-serif text-gray-900 text-center mb-10">Related Articles</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {relatedPosts.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(`blog/${item.slug}`)}
                  className="group overflow-hidden rounded-lg border border-gray-200 bg-white text-left"
                >
                  <img src={item.image} alt={item.imageAlt || item.title} className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="p-5">
                    <p className="text-xs uppercase tracking-widest text-teal-600 font-bold">{item.category}</p>
                    <h3 className="mt-2 text-lg font-bold text-gray-900 group-hover:text-teal-600 transition-colors">{item.title}</h3>
                    <p className="mt-2 text-sm text-gray-500">{item.date}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogPostTemplate;
