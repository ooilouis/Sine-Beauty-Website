import React, { useMemo, useState } from 'react';
import {
  Plus,
  Trash2,
  Edit2,
  Save,
  ArrowUp,
  ArrowDown,
  Upload,
  GripVertical,
  Eye,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Tag,
} from 'lucide-react';
import type { BlogPost, BlogStatus } from '../../data/blogPosts';
import { useCmsData } from '../../contexts/CmsDataContext';
import { optimizeImageToDataUrl } from '../../lib/image-upload';

interface SeoCheck {
  id: string;
  label: string;
  passed: boolean;
}

interface SeoEvaluation {
  score: number;
  wordCount: number;
  checks: SeoCheck[];
  failures: SeoCheck[];
}

type SeoDraft = {
  focusKeyword: string;
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
};

const SEO_TITLE_MIN = 40;
const SEO_TITLE_MAX = 60;
const SEO_DESCRIPTION_MIN = 120;
const SEO_DESCRIPTION_MAX = 160;
const SEO_CONTENT_MIN_WORDS = 600;
const SEO_CONTENT_MAX_WORDS = 2500;
const STOP_WORDS = new Set([
  'a',
  'an',
  'and',
  'or',
  'the',
  'for',
  'of',
  'to',
  'in',
  'on',
  'with',
  'is',
  'are',
  'at',
  'by',
  'from',
  'this',
  'that',
  'your',
  'you',
  'how',
  'what',
  'why',
]);

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

const formatToday = () =>
  new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

const normalizeSeo = (seo?: BlogPost['seo']): SeoDraft => ({
  focusKeyword: seo?.focusKeyword || '',
  metaTitle: seo?.metaTitle || '',
  metaDescription: seo?.metaDescription || '',
  canonicalUrl: seo?.canonicalUrl || '',
  ogTitle: seo?.ogTitle || '',
  ogDescription: seo?.ogDescription || '',
  ogImage: seo?.ogImage || '',
});

const countWords = (text: string) => (text.match(/\b[\w'-]+\b/g) || []).length;

const includesKeyword = (source: string, keyword: string) => {
  const normalizedKeyword = keyword.trim().toLowerCase();
  if (!normalizedKeyword) return false;
  return source.toLowerCase().includes(normalizedKeyword);
};

const sectionsToText = (sections: BlogPost['content']) =>
  sections
    .flatMap((section) => [
      ...(section.heading ? [section.heading] : []),
      ...(section.paragraphs || []),
      ...(section.bullets || []),
    ])
    .join(' ')
    .trim();

const contentToDraft = (post: BlogPost) =>
  post.content
    .map((section) => {
      const lines = [
        ...(section.heading ? [`## ${section.heading}`] : []),
        ...(section.paragraphs || []),
        ...((section.bullets || []).map((bullet) => `- ${bullet}`)),
      ];
      return lines.join('\n');
    })
    .join('\n\n')
    .trim();

const draftToContent = (draft: string): BlogPost['content'] => {
  const lines = draft.replace(/\r/g, '').split('\n');
  const sections: BlogPost['content'] = [];

  let heading = '';
  let paragraphs: string[] = [];
  let bullets: string[] = [];

  const flushSection = () => {
    const hasContent = heading || paragraphs.length > 0 || bullets.length > 0;
    if (!hasContent) return;

    sections.push({
      heading: heading || undefined,
      paragraphs: paragraphs.length > 0 ? paragraphs : undefined,
      bullets: bullets.length > 0 ? bullets : undefined,
    });

    heading = '';
    paragraphs = [];
    bullets = [];
  };

  lines.forEach((rawLine) => {
    const line = rawLine.trim();
    if (!line) return;

    if (line.startsWith('## ')) {
      flushSection();
      heading = line.replace(/^##\s+/, '').trim();
      return;
    }

    if (line.startsWith('- ')) {
      const bullet = line.slice(2).trim();
      if (bullet) bullets.push(bullet);
      return;
    }

    paragraphs.push(line);
  });

  flushSection();

  if (sections.length === 0) {
    return [{ paragraphs: [] }];
  }

  return sections;
};

const evaluateSeo = (input: {
  title: string;
  slug: string;
  excerpt: string;
  contentText: string;
  imageAlt: string;
  seo: SeoDraft;
}): SeoEvaluation => {
  const focusKeyword = input.seo.focusKeyword.trim();
  const effectiveSeoTitle = (input.seo.metaTitle || input.title).trim();
  const effectiveSeoDescription = (input.seo.metaDescription || input.excerpt).trim();
  const introText = input.contentText.slice(0, 220);
  const wordCount = countWords(input.contentText);

  const checks: SeoCheck[] = [
    {
      id: 'focus-keyword',
      label: 'Focus keyword is set',
      passed: focusKeyword.length > 0,
    },
    {
      id: 'keyword-title',
      label: 'Focus keyword appears in SEO title',
      passed: includesKeyword(effectiveSeoTitle, focusKeyword),
    },
    {
      id: 'keyword-url',
      label: 'Focus keyword appears in URL slug',
      passed: includesKeyword(input.slug, focusKeyword),
    },
    {
      id: 'keyword-description',
      label: 'Focus keyword appears in meta description',
      passed: includesKeyword(effectiveSeoDescription, focusKeyword),
    },
    {
      id: 'keyword-intro',
      label: 'Focus keyword appears near the start of content',
      passed: includesKeyword(introText, focusKeyword),
    },
    {
      id: 'content-length',
      label: `Content length is between ${SEO_CONTENT_MIN_WORDS}-${SEO_CONTENT_MAX_WORDS} words`,
      passed: wordCount >= SEO_CONTENT_MIN_WORDS && wordCount <= SEO_CONTENT_MAX_WORDS,
    },
    {
      id: 'title-length',
      label: `SEO title length is ${SEO_TITLE_MIN}-${SEO_TITLE_MAX} characters`,
      passed: effectiveSeoTitle.length >= SEO_TITLE_MIN && effectiveSeoTitle.length <= SEO_TITLE_MAX,
    },
    {
      id: 'description-length',
      label: `Meta description length is ${SEO_DESCRIPTION_MIN}-${SEO_DESCRIPTION_MAX} characters`,
      passed:
        effectiveSeoDescription.length >= SEO_DESCRIPTION_MIN &&
        effectiveSeoDescription.length <= SEO_DESCRIPTION_MAX,
    },
    {
      id: 'image-alt',
      label: 'Featured image has alt text',
      passed: input.imageAlt.trim().length > 0,
    },
  ];

  const passedCount = checks.filter((check) => check.passed).length;
  const score = Math.round((passedCount / checks.length) * 100);

  return {
    score,
    wordCount,
    checks,
    failures: checks.filter((check) => !check.passed),
  };
};

const scoreBadgeClass = (score: number) => {
  if (score >= 80) return 'bg-emerald-100 text-emerald-700 border-emerald-200';
  if (score >= 60) return 'bg-amber-100 text-amber-700 border-amber-200';
  return 'bg-rose-100 text-rose-700 border-rose-200';
};

const toTitleCase = (text: string) =>
  text
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

const truncateAtWord = (text: string, maxLength: number) => {
  const normalized = text.replace(/\s+/g, ' ').trim();
  if (normalized.length <= maxLength) return normalized;

  const slice = normalized.slice(0, maxLength + 1);
  const lastSpace = slice.lastIndexOf(' ');
  const clipped = lastSpace > maxLength * 0.65 ? slice.slice(0, lastSpace) : slice.slice(0, maxLength);
  return clipped.trim().replace(/[.,;:!?-]+$/g, '');
};

const firstSentence = (text: string) => {
  const normalized = text.replace(/\s+/g, ' ').trim();
  if (!normalized) return '';
  const parts = normalized.split(/(?<=[.!?])\s+/);
  return parts.find(Boolean) || normalized;
};

const deriveFocusKeyword = (title: string) => {
  const tokens = title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((token) => token && !STOP_WORDS.has(token));

  const keyword = tokens.slice(0, 4).join(' ').trim();
  if (keyword) return keyword;
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 4)
    .join(' ')
    .trim();
};

const buildSeoTitle = (title: string, focusKeyword: string) => {
  let candidate = title.trim() || 'Skincare Guide';
  const niceKeyword = toTitleCase(focusKeyword);
  if (focusKeyword && !includesKeyword(candidate, focusKeyword)) {
    candidate = `${candidate} | ${niceKeyword}`;
  }

  const brandSuffix = ' | Caring Skin';
  if (!candidate.toLowerCase().includes('caring skin') && candidate.length + brandSuffix.length <= SEO_TITLE_MAX) {
    candidate += brandSuffix;
  }

  if (candidate.length < SEO_TITLE_MIN && !candidate.toLowerCase().includes('singapore')) {
    candidate = `${candidate} Singapore`;
  }

  candidate = truncateAtWord(candidate, SEO_TITLE_MAX);

  if (candidate.length < SEO_TITLE_MIN && !candidate.toLowerCase().includes('caring skin')) {
    candidate = truncateAtWord(`${candidate} | Caring Skin`, SEO_TITLE_MAX);
  }

  return candidate;
};

const buildMetaDescription = (focusKeyword: string, excerpt: string, contentText: string) => {
  let description = excerpt.trim() || firstSentence(contentText);

  if (!description) {
    description = `Learn practical tips for ${focusKeyword || 'healthier skin'} from Caring Skin Singapore.`;
  }

  if (focusKeyword && !includesKeyword(description, focusKeyword)) {
    const niceKeyword = toTitleCase(focusKeyword);
    description = `${niceKeyword}: ${description.charAt(0).toLowerCase()}${description.slice(1)}`;
  }

  const cta = 'Book a trial consultation with Caring Skin Singapore.';
  if (description.length < SEO_DESCRIPTION_MIN) {
    description = `${description} ${cta}`;
  }

  description = truncateAtWord(description, SEO_DESCRIPTION_MAX);

  if (description.length < SEO_DESCRIPTION_MIN) {
    description = truncateAtWord(
      `${description} Trusted care for acne and sensitive skin in Singapore.`,
      SEO_DESCRIPTION_MAX
    );
  }

  return description;
};

const BlogPostsEditor: React.FC = () => {
  const { blogPosts, setBlogPosts } = useCmsData();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [draggedId, setDraggedId] = useState<number | null>(null);
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);
  const [contentDraft, setContentDraft] = useState('');
  const [tagsDraft, setTagsDraft] = useState('');
  const [formData, setFormData] = useState<Partial<BlogPost>>({});

  const sortedPosts = useMemo(
    () =>
      [...blogPosts].sort((a, b) => {
        const orderA = a.sort_order ?? 0;
        const orderB = b.sort_order ?? 0;
        if (orderA === orderB) return a.id - b.id;
        return orderA - orderB;
      }),
    [blogPosts]
  );

  const categoryOptions = useMemo(() => {
    const categories = new Set(sortedPosts.map((post) => post.category).filter(Boolean));
    if (formData.category) categories.add(formData.category);
    return Array.from(categories);
  }, [formData.category, sortedPosts]);

  const currentSlug = slugify(formData.slug || formData.title || '');
  const contentWordCount = countWords(contentDraft);

  const seoEvaluation = useMemo(
    () =>
      evaluateSeo({
        title: formData.title?.trim() || '',
        slug: currentSlug,
        excerpt: formData.excerpt?.trim() || '',
        contentText: contentDraft,
        imageAlt: formData.imageAlt?.trim() || '',
        seo: normalizeSeo(formData.seo),
      }),
    [contentDraft, currentSlug, formData.excerpt, formData.imageAlt, formData.seo, formData.title]
  );

  const postSeoScores = useMemo(
    () =>
      Object.fromEntries(
        sortedPosts.map((post) => {
          const score = evaluateSeo({
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            contentText: sectionsToText(post.content),
            imageAlt: post.imageAlt || post.title,
            seo: normalizeSeo(post.seo),
          }).score;

          return [post.id, score];
        })
      ),
    [sortedPosts]
  );

  const handleCreate = () => {
    setIsCreating(true);
    setEditingId(null);
    setTagsDraft('');
    setContentDraft('');
    setFormData({
      title: '',
      slug: '',
      date: formatToday(),
      category: categoryOptions[0] || 'Skincare Tips',
      image: '',
      imageAlt: '',
      excerpt: '',
      content: [],
      tags: [],
      status: 'draft',
      seo: normalizeSeo(undefined),
      sort_order: sortedPosts.length,
    });
    setMessage(null);
  };

  const handleEdit = (post: BlogPost) => {
    setIsCreating(false);
    setEditingId(post.id);
    setFormData({
      ...post,
      status: post.status || 'published',
      tags: post.tags || [],
      imageAlt: post.imageAlt || post.title,
      seo: normalizeSeo(post.seo),
    });
    setTagsDraft((post.tags || []).join(', '));
    setContentDraft(contentToDraft(post));
    setMessage(null);
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingId(null);
    setFormData({});
    setContentDraft('');
    setTagsDraft('');
  };

  const handleDelete = (id: number) => {
    if (!window.confirm('Delete this blog post?')) return;
    setBlogPosts((prev) =>
      prev
        .filter((post) => post.id !== id)
        .map((post, index) => ({ ...post, sort_order: index }))
    );
    setMessage({ type: 'success', text: 'Blog post deleted.' });
  };

  const reorder = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return;
    const next = [...sortedPosts];
    const [moved] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moved);
    setBlogPosts(next.map((post, index) => ({ ...post, sort_order: index })));
    setMessage({ type: 'success', text: 'Blog post order updated.' });
  };

  const setSeo = (updates: Partial<SeoDraft>) => {
    setFormData((prev) => ({
      ...prev,
      seo: {
        ...normalizeSeo(prev.seo),
        ...updates,
      },
    }));
  };

  const handleAutoFillSeo = () => {
    const title = (formData.title || '').trim();
    if (!title) {
      setMessage({ type: 'error', text: 'Add a title before auto-filling SEO fields.' });
      return;
    }

    if (!currentSlug) {
      setMessage({ type: 'error', text: 'Slug is required before auto-filling SEO fields.' });
      return;
    }

    const existingSeo = normalizeSeo(formData.seo);
    const focusKeyword = existingSeo.focusKeyword.trim() || deriveFocusKeyword(title);
    const metaTitle = buildSeoTitle(title, focusKeyword);
    const metaDescription = buildMetaDescription(focusKeyword, formData.excerpt || '', contentDraft);
    const canonicalUrl = `${window.location.origin}/blog/${currentSlug}`;
    const ogImage = (formData.image || '').trim();

    setFormData((prev) => ({
      ...prev,
      excerpt: (prev.excerpt || '').trim() || metaDescription,
      seo: {
        ...normalizeSeo(prev.seo),
        focusKeyword,
        metaTitle,
        metaDescription,
        canonicalUrl,
        ogTitle: metaTitle,
        ogDescription: metaDescription,
        ogImage,
      },
    }));

    setMessage({ type: 'success', text: 'SEO fields auto-filled locally (0 AI tokens used).' });
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const dataUrl = await optimizeImageToDataUrl(file);
      setFormData((prev) => ({ ...prev, image: dataUrl, imageAlt: prev.imageAlt || prev.title || '' }));
      setMessage({ type: 'success', text: 'Blog image uploaded.' });
    } catch (error) {
      console.error('Blog image upload failed:', error);
      setMessage({ type: 'error', text: 'Failed to upload image.' });
    } finally {
      event.target.value = '';
    }
  };

  const handlePreview = () => {
    if (!currentSlug) {
      setMessage({ type: 'error', text: 'Add a title first so a preview URL can be generated.' });
      return;
    }

    window.open(`/blog/${currentSlug}?preview=1`, '_blank', 'noopener,noreferrer');
  };

  const savePost = async (targetStatus: BlogStatus) => {
    const title = (formData.title || '').trim();
    const normalizedSlug = slugify(formData.slug || title);

    if (!title) {
      setMessage({ type: 'error', text: 'Title is required.' });
      return;
    }

    if (!normalizedSlug) {
      setMessage({ type: 'error', text: 'Slug is required.' });
      return;
    }

    const duplicate = sortedPosts.find((post) => post.slug === normalizedSlug && post.id !== editingId);
    if (duplicate) {
      setMessage({ type: 'error', text: 'Slug already exists. Please use a unique slug.' });
      return;
    }

    const nextContent = draftToContent(contentDraft);
    const contentText = sectionsToText(nextContent);

    if (targetStatus === 'published') {
      if (!(formData.image || '').trim()) {
        setMessage({ type: 'error', text: 'Featured image is required before publishing.' });
        return;
      }
      if (!contentText.trim()) {
        setMessage({ type: 'error', text: 'Content is required before publishing.' });
        return;
      }
    }

    const nextExcerpt =
      (formData.excerpt || '').trim() ||
      contentText.slice(0, 170) ||
      'This article is currently being prepared. Please check back soon.';

    const nextTags: string[] = Array.from(
      new Set<string>(
        tagsDraft
          .split(',')
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0)
      )
    );

    const nextSeo = normalizeSeo(formData.seo);
    if (!nextSeo.metaTitle.trim()) nextSeo.metaTitle = title;
    if (!nextSeo.metaDescription.trim()) nextSeo.metaDescription = nextExcerpt;

    const finalDate = (formData.date || '').trim() || formatToday();

    const payload: BlogPost = {
      id: editingId || 0,
      slug: normalizedSlug,
      title,
      date: finalDate,
      category: (formData.category || 'Skincare Tips').trim(),
      image: (formData.image || '').trim(),
      imageAlt: (formData.imageAlt || title).trim(),
      excerpt: nextExcerpt,
      content: nextContent,
      tags: nextTags,
      status: targetStatus,
      seo: nextSeo,
      sort_order: formData.sort_order ?? sortedPosts.length,
      faqs: formData.faqs,
    };

    try {
      setLoading(true);
      setMessage(null);

      if (isCreating) {
        const nextId = sortedPosts.length > 0 ? Math.max(...sortedPosts.map((post) => post.id)) + 1 : 1;
        setBlogPosts((prev) => [...prev, { ...payload, id: nextId, sort_order: sortedPosts.length }]);
      } else if (editingId) {
        setBlogPosts((prev) =>
          prev.map((post) =>
            post.id === editingId
              ? {
                  ...post,
                  ...payload,
                  id: editingId,
                }
              : post
          )
        );
      }

      handleCancel();
      setMessage({
        type: 'success',
        text: targetStatus === 'published' ? 'Post published successfully.' : 'Draft saved successfully.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Blog Posts ({sortedPosts.length})</h3>
        {!isCreating && !editingId && (
          <button
            onClick={handleCreate}
            className="flex items-center space-x-2 rounded bg-teal-600 px-4 py-2 text-white hover:bg-teal-700"
          >
            <Plus size={18} />
            <span>Add Post</span>
          </button>
        )}
      </div>

      {message && (
        <div
          className={`rounded border px-4 py-3 text-sm ${
            message.type === 'error'
              ? 'border-red-200 bg-red-50 text-red-700'
              : 'border-emerald-200 bg-emerald-50 text-emerald-700'
          }`}
        >
          {message.text}
        </div>
      )}

      {(isCreating || editingId) && (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,2fr)_360px]">
          <div className="space-y-4">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h4 className="mb-4 text-xl font-bold text-gray-900">{isCreating ? 'Add Post' : 'Edit Post'}</h4>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    value={formData.title || ''}
                    onChange={(event) => {
                      const title = event.target.value;
                      setFormData((prev) => ({
                        ...prev,
                        title,
                        slug: prev.slug || slugify(title),
                        imageAlt: prev.imageAlt || title,
                      }));
                    }}
                    className="w-full rounded border p-2"
                    placeholder="Add title"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Slug</label>
                    <input
                      type="text"
                      value={formData.slug || ''}
                      onChange={(event) =>
                        setFormData((prev) => ({ ...prev, slug: slugify(event.target.value) }))
                      }
                      className="w-full rounded border p-2"
                      placeholder="post-url-slug"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Date</label>
                    <input
                      type="text"
                      value={formData.date || ''}
                      onChange={(event) => setFormData((prev) => ({ ...prev, date: event.target.value }))}
                      className="w-full rounded border p-2"
                      placeholder="e.g. 11 Feb 2026"
                    />
                  </div>
                </div>

                <div className="rounded border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-600">
                  Permalink:{' '}
                  <span className="font-medium text-gray-900">
                    {window.location.origin}/blog/{currentSlug || 'your-post-slug'}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-2 flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">Content</label>
                <span className="text-xs text-gray-500">{contentWordCount} words</span>
              </div>
              <textarea
                value={contentDraft}
                onChange={(event) => setContentDraft(event.target.value)}
                className="h-[440px] w-full rounded border p-3 font-mono text-sm"
                placeholder={
                  'Use markdown-style format:\n\n## Section Heading\nParagraph text...\n- Bullet point\n- Bullet point'
                }
              />
              <p className="mt-2 text-xs text-gray-500">
                Tip: use <code>##</code> for section headings and <code>- </code> for bullet lists.
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <label className="mb-2 block text-sm font-medium text-gray-700">Excerpt</label>
              <textarea
                value={formData.excerpt || ''}
                onChange={(event) => setFormData((prev) => ({ ...prev, excerpt: event.target.value }))}
                className="h-24 w-full rounded border p-2"
                placeholder="Short summary for listing and meta description fallback"
              />
            </div>
          </div>

          <div className="space-y-4 xl:sticky xl:top-24 xl:h-fit">
            <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
              <h5 className="mb-4 font-semibold text-gray-900">Publish</h5>
              <div className="mb-3 text-sm text-gray-600">
                Status:{' '}
                <span className="font-semibold text-gray-900 capitalize">
                  {(formData.status || 'draft') as string}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => void savePost('draft')}
                  disabled={loading}
                  className="flex items-center justify-center gap-2 rounded border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  <Save size={14} />
                  Save Draft
                </button>
                <button
                  onClick={() => void savePost('published')}
                  disabled={loading}
                  className="flex items-center justify-center gap-2 rounded bg-teal-600 px-3 py-2 text-sm font-semibold text-white hover:bg-teal-700 disabled:opacity-50"
                >
                  <Sparkles size={14} />
                  Publish
                </button>
              </div>
              <button
                onClick={handlePreview}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                <Eye size={14} />
                Preview
              </button>
              <button
                onClick={handleCancel}
                className="mt-2 w-full rounded px-3 py-2 text-sm text-gray-500 hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h5 className="font-semibold text-gray-900">SEO Assistant</h5>
                <span className={`rounded-full border px-2 py-1 text-xs font-bold ${scoreBadgeClass(seoEvaluation.score)}`}>
                  {seoEvaluation.score}/100
                </span>
              </div>

              <div className="mb-4 h-2 overflow-hidden rounded-full bg-gray-100">
                <div
                  className={`h-full ${seoEvaluation.score >= 80 ? 'bg-emerald-500' : seoEvaluation.score >= 60 ? 'bg-amber-500' : 'bg-rose-500'}`}
                  style={{ width: `${seoEvaluation.score}%` }}
                />
              </div>

              <button
                onClick={handleAutoFillSeo}
                className="mb-2 flex w-full items-center justify-center gap-2 rounded border border-teal-300 bg-teal-50 px-3 py-2 text-sm font-semibold text-teal-700 hover:bg-teal-100"
              >
                <Sparkles size={14} />
                Auto Fill SEO (No AI)
              </button>
              <p className="mb-4 text-xs text-gray-500">
                Uses local rules only. No API calls and no AI token usage.
              </p>

              <div className="mb-4 space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500">Snippet Preview</label>
                <div className="rounded border border-gray-200 bg-gray-50 p-3">
                  <p className="line-clamp-2 text-sm font-semibold text-blue-700">
                    {(formData.seo?.metaTitle || formData.title || 'Your SEO title') as string}
                  </p>
                  <p className="mt-1 break-all text-xs text-emerald-700">
                    {window.location.origin}/blog/{currentSlug || 'post-slug'}
                  </p>
                  <p className="mt-1 line-clamp-3 text-xs text-gray-600">
                    {(formData.seo?.metaDescription || formData.excerpt || 'Your meta description appears here.') as string}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Focus Keyword</label>
                  <input
                    type="text"
                    value={formData.seo?.focusKeyword || ''}
                    onChange={(event) => setSeo({ focusKeyword: event.target.value })}
                    className="w-full rounded border p-2"
                    placeholder="e.g. acne facial singapore"
                  />
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between text-sm font-medium text-gray-700">
                    <label>SEO Title</label>
                    <span className="text-xs text-gray-500">{(formData.seo?.metaTitle || formData.title || '').length}/{SEO_TITLE_MAX}</span>
                  </div>
                  <input
                    type="text"
                    value={formData.seo?.metaTitle || ''}
                    onChange={(event) => setSeo({ metaTitle: event.target.value })}
                    className="w-full rounded border p-2"
                    placeholder="SEO title"
                  />
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between text-sm font-medium text-gray-700">
                    <label>Meta Description</label>
                    <span className="text-xs text-gray-500">
                      {(formData.seo?.metaDescription || formData.excerpt || '').length}/{SEO_DESCRIPTION_MAX}
                    </span>
                  </div>
                  <textarea
                    value={formData.seo?.metaDescription || ''}
                    onChange={(event) => setSeo({ metaDescription: event.target.value })}
                    className="h-20 w-full rounded border p-2"
                    placeholder="Meta description"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Canonical URL</label>
                  <input
                    type="text"
                    value={formData.seo?.canonicalUrl || ''}
                    onChange={(event) => setSeo({ canonicalUrl: event.target.value })}
                    className="w-full rounded border p-2"
                    placeholder="https://example.com/blog/post"
                  />
                </div>
                <details className="rounded border border-gray-200 px-3 py-2">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700">Open Graph (Optional)</summary>
                  <div className="mt-3 space-y-2">
                    <input
                      type="text"
                      value={formData.seo?.ogTitle || ''}
                      onChange={(event) => setSeo({ ogTitle: event.target.value })}
                      className="w-full rounded border p-2"
                      placeholder="OG title"
                    />
                    <textarea
                      value={formData.seo?.ogDescription || ''}
                      onChange={(event) => setSeo({ ogDescription: event.target.value })}
                      className="h-16 w-full rounded border p-2"
                      placeholder="OG description"
                    />
                    <input
                      type="text"
                      value={formData.seo?.ogImage || ''}
                      onChange={(event) => setSeo({ ogImage: event.target.value })}
                      className="w-full rounded border p-2"
                      placeholder="OG image URL"
                    />
                  </div>
                </details>
              </div>

              <div className="mt-4 rounded border border-gray-200 bg-gray-50 p-3">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">SEO Checklist</p>
                <ul className="space-y-1 text-sm">
                  {seoEvaluation.checks.map((check) => (
                    <li key={check.id} className="flex items-start gap-2 text-gray-700">
                      {check.passed ? (
                        <CheckCircle2 size={14} className="mt-0.5 text-emerald-600" />
                      ) : (
                        <AlertCircle size={14} className="mt-0.5 text-rose-600" />
                      )}
                      <span>{check.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
              <h5 className="mb-3 font-semibold text-gray-900">Categories & Tags</h5>
              <div className="space-y-3">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Category</label>
                  <input
                    list="blog-categories"
                    value={formData.category || ''}
                    onChange={(event) => setFormData((prev) => ({ ...prev, category: event.target.value }))}
                    className="w-full rounded border p-2"
                    placeholder="Skincare Tips"
                  />
                  <datalist id="blog-categories">
                    {categoryOptions.map((category) => (
                      <option key={category} value={category} />
                    ))}
                  </datalist>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Tags (comma separated)</label>
                  <input
                    type="text"
                    value={tagsDraft}
                    onChange={(event) => setTagsDraft(event.target.value)}
                    className="w-full rounded border p-2"
                    placeholder="acne, sensitive skin, facial"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
              <h5 className="mb-3 font-semibold text-gray-900">Featured Image</h5>
              <div className="space-y-3">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Image URL</label>
                  <input
                    type="text"
                    value={formData.image || ''}
                    onChange={(event) => setFormData((prev) => ({ ...prev, image: event.target.value }))}
                    className="w-full rounded border p-2"
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Alt Text</label>
                  <input
                    type="text"
                    value={formData.imageAlt || ''}
                    onChange={(event) => setFormData((prev) => ({ ...prev, imageAlt: event.target.value }))}
                    className="w-full rounded border p-2"
                    placeholder="Describe the image for SEO and accessibility"
                  />
                </div>
                <label className="inline-flex cursor-pointer items-center gap-2 text-xs text-teal-700">
                  <Upload size={14} />
                  Upload blog image
                  <input type="file" accept="image/*" className="hidden" onChange={(event) => void handleImageUpload(event)} />
                </label>
                {formData.image && (
                  <img src={formData.image} alt={formData.imageAlt || 'Featured'} className="h-36 w-full rounded object-cover" />
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {sortedPosts.map((post, index) => {
          const status = post.status || 'published';
          const seoScore = postSeoScores[post.id] || 0;

          return (
            <div
              key={post.id}
              draggable
              onDragStart={() => setDraggedId(post.id)}
              onDragOver={(event) => event.preventDefault()}
              onDrop={() => {
                if (draggedId == null || draggedId === post.id) return;
                const from = sortedPosts.findIndex((item) => item.id === draggedId);
                const to = sortedPosts.findIndex((item) => item.id === post.id);
                reorder(from, to);
                setDraggedId(null);
              }}
              onDragEnd={() => setDraggedId(null)}
              className={`flex items-center gap-4 rounded-lg border bg-white p-4 shadow-sm ${
                draggedId === post.id ? 'border-teal-500 ring-1 ring-teal-200' : 'border-gray-200'
              }`}
            >
              <button className="cursor-grab text-gray-400" title="Drag to reorder">
                <GripVertical size={18} />
              </button>
              <img src={post.image} alt={post.imageAlt || post.title} className="h-16 w-24 rounded object-cover bg-gray-100" />
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="font-semibold text-gray-900">{post.title}</h4>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                      status === 'published' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {status}
                  </span>
                  <span className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${scoreBadgeClass(seoScore)}`}>
                    SEO {seoScore}
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-500">/blog/{post.slug}</p>
                <div className="mt-1 flex items-center gap-3 text-xs text-gray-400">
                  <span>Order: {post.sort_order ?? index}</span>
                  <span>Date: {post.date}</span>
                  <span className="inline-flex items-center gap-1">
                    <Tag size={12} />
                    {(post.tags || []).length}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => reorder(index, Math.max(0, index - 1))}
                  disabled={index === 0}
                  className="rounded p-2 text-gray-600 hover:bg-gray-100 disabled:opacity-40"
                  title="Move up"
                >
                  <ArrowUp size={16} />
                </button>
                <button
                  onClick={() => reorder(index, Math.min(sortedPosts.length - 1, index + 1))}
                  disabled={index === sortedPosts.length - 1}
                  className="rounded p-2 text-gray-600 hover:bg-gray-100 disabled:opacity-40"
                  title="Move down"
                >
                  <ArrowDown size={16} />
                </button>
                <button
                  onClick={() =>
                    window.open(
                      `/blog/${post.slug}${status === 'published' ? '' : '?preview=1'}`,
                      '_blank',
                      'noopener,noreferrer'
                    )
                  }
                  className="rounded p-2 text-slate-600 hover:bg-slate-50"
                  title="Preview post"
                >
                  <Eye size={16} />
                </button>
                <button onClick={() => handleEdit(post)} className="rounded p-2 text-blue-600 hover:bg-blue-50" title="Edit post">
                  <Edit2 size={16} />
                </button>
                <button onClick={() => handleDelete(post.id)} className="rounded p-2 text-red-600 hover:bg-red-50" title="Delete post">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BlogPostsEditor;
