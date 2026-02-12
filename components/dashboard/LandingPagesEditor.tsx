import React, { useMemo, useState } from 'react';
import { Plus, Trash2, Edit2, Save, ArrowUp, ArrowDown, Upload, GripVertical } from 'lucide-react';
import { useCmsData, type LandingPage } from '../../contexts/CmsDataContext';
import { optimizeImageToDataUrl } from '../../lib/image-upload';

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

const LandingPagesEditor: React.FC = () => {
  const { landingPages, setLandingPages } = useCmsData();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [draggedId, setDraggedId] = useState<number | null>(null);
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);
  const [formData, setFormData] = useState<Partial<LandingPage>>({});
  const [benefitsDraft, setBenefitsDraft] = useState('');
  const [trustDraft, setTrustDraft] = useState('');

  const sortedPages = useMemo(
    () =>
      [...landingPages].sort((a, b) => {
        const orderA = a.sort_order ?? 0;
        const orderB = b.sort_order ?? 0;
        if (orderA === orderB) return a.id - b.id;
        return orderA - orderB;
      }),
    [landingPages]
  );

  const isValid = Boolean(
    (formData.name || '').trim() &&
    (formData.slug || '').trim() &&
    (formData.headline || '').trim() &&
    (formData.heroImage || '').trim() &&
    (formData.ctaText || '').trim()
  );

  const handleCreate = () => {
    setIsCreating(true);
    setEditingId(null);
    setBenefitsDraft('');
    setTrustDraft('');
    setFormData({
      name: '',
      slug: '',
      headline: '',
      subheadline: '',
      heroImage: '',
      ctaText: 'Book Trial Session',
      ctaUrl: 'https://caringskin.com.sg/contact-us/',
      isActive: true,
      formEnabled: true,
      thankYouMessage: 'Thanks, our team will contact you shortly.',
      sort_order: sortedPages.length,
    });
    setMessage(null);
  };

  const handleEdit = (page: LandingPage) => {
    setIsCreating(false);
    setEditingId(page.id);
    setFormData(page);
    setBenefitsDraft((page.benefits || []).join('\n'));
    setTrustDraft((page.trustPoints || []).join('\n'));
    setMessage(null);
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingId(null);
    setFormData({});
    setBenefitsDraft('');
    setTrustDraft('');
  };

  const handleSave = () => {
    if (!isValid) {
      setMessage({ type: 'error', text: 'Name, slug, headline, hero image and CTA text are required.' });
      return;
    }

    const nextSlug = slugify(formData.slug || formData.name || '');
    const duplicate = sortedPages.find((page) => page.slug === nextSlug && page.id !== editingId);
    if (duplicate) {
      setMessage({ type: 'error', text: 'Slug already exists. Please use a unique slug.' });
      return;
    }

    setLoading(true);
    setMessage(null);
    const benefits = benefitsDraft.split('\n').map((line) => line.trim()).filter(Boolean);
    const trustPoints = trustDraft.split('\n').map((line) => line.trim()).filter(Boolean);

    if (isCreating) {
      const nextId = sortedPages.length > 0 ? Math.max(...sortedPages.map((page) => page.id)) + 1 : 1;
      const newPage: LandingPage = {
        id: nextId,
        name: formData.name?.trim() || '',
        slug: nextSlug,
        headline: formData.headline?.trim() || '',
        subheadline: formData.subheadline?.trim() || '',
        heroImage: formData.heroImage?.trim() || '',
        ctaText: formData.ctaText?.trim() || 'Book Trial Session',
        ctaUrl: formData.ctaUrl?.trim() || '',
        benefits,
        trustPoints,
        isActive: Boolean(formData.isActive),
        formEnabled: Boolean(formData.formEnabled),
        thankYouMessage: formData.thankYouMessage?.trim() || '',
        metaTitle: formData.metaTitle?.trim() || '',
        metaDescription: formData.metaDescription?.trim() || '',
        sort_order: sortedPages.length,
      };
      setLandingPages((prev) => [...prev, newPage]);
    } else if (editingId) {
      setLandingPages((prev) =>
        prev.map((page) =>
          page.id === editingId
            ? {
                ...page,
                ...formData,
                name: formData.name?.trim() || '',
                slug: nextSlug,
                headline: formData.headline?.trim() || '',
                subheadline: formData.subheadline?.trim() || '',
                heroImage: formData.heroImage?.trim() || '',
                ctaText: formData.ctaText?.trim() || '',
                ctaUrl: formData.ctaUrl?.trim() || '',
                benefits,
                trustPoints,
                isActive: Boolean(formData.isActive),
                formEnabled: Boolean(formData.formEnabled),
                thankYouMessage: formData.thankYouMessage?.trim() || '',
                metaTitle: formData.metaTitle?.trim() || '',
                metaDescription: formData.metaDescription?.trim() || '',
              }
            : page
        )
      );
    }

    handleCancel();
    setMessage({ type: 'success', text: isCreating ? 'Landing page created.' : 'Landing page updated.' });
    setLoading(false);
  };

  const handleDelete = (id: number) => {
    if (!window.confirm('Delete this landing page?')) return;
    setLandingPages((prev) =>
      prev
        .filter((page) => page.id !== id)
        .map((page, index) => ({ ...page, sort_order: index }))
    );
    setMessage({ type: 'success', text: 'Landing page deleted.' });
  };

  const reorder = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return;
    const next = [...sortedPages];
    const [moved] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moved);
    setLandingPages(next.map((page, index) => ({ ...page, sort_order: index })));
    setMessage({ type: 'success', text: 'Landing page order updated.' });
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await optimizeImageToDataUrl(file, { maxWidth: 1920, maxHeight: 1280 });
      setFormData((prev) => ({ ...prev, heroImage: dataUrl }));
      setMessage({ type: 'success', text: 'Hero image uploaded.' });
    } catch (error) {
      console.error('Landing page image upload failed:', error);
      setMessage({ type: 'error', text: 'Failed to upload image.' });
    } finally {
      event.target.value = '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Landing Pages ({sortedPages.length})</h3>
        {!isCreating && !editingId && (
          <button
            onClick={handleCreate}
            className="flex items-center space-x-2 rounded bg-teal-600 px-4 py-2 text-white hover:bg-teal-700"
          >
            <Plus size={18} />
            <span>Add Landing Page</span>
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
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h4 className="mb-4 font-bold">{isCreating ? 'New Landing Page' : 'Edit Landing Page'}</h4>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(event) => {
                  const name = event.target.value;
                  setFormData((prev) => ({ ...prev, name, slug: prev.slug || slugify(name) }));
                }}
                className="w-full rounded border p-2"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Slug</label>
              <input
                type="text"
                value={formData.slug || ''}
                onChange={(event) => setFormData((prev) => ({ ...prev, slug: slugify(event.target.value) }))}
                className="w-full rounded border p-2"
              />
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">Headline</label>
              <input
                type="text"
                value={formData.headline || ''}
                onChange={(event) => setFormData((prev) => ({ ...prev, headline: event.target.value }))}
                className="w-full rounded border p-2"
              />
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">Subheadline</label>
              <textarea
                value={formData.subheadline || ''}
                onChange={(event) => setFormData((prev) => ({ ...prev, subheadline: event.target.value }))}
                className="h-20 w-full rounded border p-2"
              />
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">Hero Image URL</label>
              <input
                type="text"
                value={formData.heroImage || ''}
                onChange={(event) => setFormData((prev) => ({ ...prev, heroImage: event.target.value }))}
                className="w-full rounded border p-2"
              />
              <label className="mt-2 inline-flex cursor-pointer items-center gap-2 text-xs text-teal-700">
                <Upload size={14} />
                Upload hero image
                <input type="file" accept="image/*" className="hidden" onChange={(event) => void handleImageUpload(event)} />
              </label>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">CTA Text</label>
              <input
                type="text"
                value={formData.ctaText || ''}
                onChange={(event) => setFormData((prev) => ({ ...prev, ctaText: event.target.value }))}
                className="w-full rounded border p-2"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">CTA URL</label>
              <input
                type="text"
                value={formData.ctaUrl || ''}
                onChange={(event) => setFormData((prev) => ({ ...prev, ctaUrl: event.target.value }))}
                className="w-full rounded border p-2"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Benefits (one per line)</label>
              <textarea value={benefitsDraft} onChange={(event) => setBenefitsDraft(event.target.value)} className="h-24 w-full rounded border p-2" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Trust Points (one per line)</label>
              <textarea value={trustDraft} onChange={(event) => setTrustDraft(event.target.value)} className="h-24 w-full rounded border p-2" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Meta Title</label>
              <input
                type="text"
                value={formData.metaTitle || ''}
                onChange={(event) => setFormData((prev) => ({ ...prev, metaTitle: event.target.value }))}
                className="w-full rounded border p-2"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Meta Description</label>
              <input
                type="text"
                value={formData.metaDescription || ''}
                onChange={(event) => setFormData((prev) => ({ ...prev, metaDescription: event.target.value }))}
                className="w-full rounded border p-2"
              />
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">Thank You Message</label>
              <textarea
                value={formData.thankYouMessage || ''}
                onChange={(event) => setFormData((prev) => ({ ...prev, thankYouMessage: event.target.value }))}
                className="h-20 w-full rounded border p-2"
              />
            </div>
            <div className="flex items-center gap-3">
              <input
                id="lp-active"
                type="checkbox"
                checked={Boolean(formData.isActive)}
                onChange={(event) => setFormData((prev) => ({ ...prev, isActive: event.target.checked }))}
                className="h-4 w-4"
              />
              <label htmlFor="lp-active" className="text-sm text-gray-700">Active (publicly accessible)</label>
            </div>
            <div className="flex items-center gap-3">
              <input
                id="lp-form"
                type="checkbox"
                checked={Boolean(formData.formEnabled)}
                onChange={(event) => setFormData((prev) => ({ ...prev, formEnabled: event.target.checked }))}
                className="h-4 w-4"
              />
              <label htmlFor="lp-form" className="text-sm text-gray-700">Enable lead form</label>
            </div>
          </div>

          <div className="mt-4 flex justify-end space-x-3">
            <button onClick={handleCancel} className="rounded px-4 py-2 text-gray-600 hover:bg-gray-100">
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={loading || !isValid}
              className="flex items-center space-x-2 rounded bg-slate-900 px-4 py-2 text-white hover:bg-slate-800 disabled:opacity-50"
            >
              <Save size={18} />
              <span>{loading ? 'Saving...' : 'Save Landing Page'}</span>
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {sortedPages.map((page, index) => (
          <div
            key={page.id}
            draggable
            onDragStart={() => setDraggedId(page.id)}
            onDragOver={(event) => event.preventDefault()}
            onDrop={() => {
              if (draggedId == null || draggedId === page.id) return;
              const from = sortedPages.findIndex((item) => item.id === draggedId);
              const to = sortedPages.findIndex((item) => item.id === page.id);
              reorder(from, to);
              setDraggedId(null);
            }}
            onDragEnd={() => setDraggedId(null)}
            className={`flex items-center gap-4 rounded-lg border bg-white p-4 shadow-sm ${
              draggedId === page.id ? 'border-teal-500 ring-1 ring-teal-200' : 'border-gray-200'
            }`}
          >
            <button className="cursor-grab text-gray-400">
              <GripVertical size={18} />
            </button>
            <img src={page.heroImage} alt={page.name} className="h-16 w-24 rounded object-cover bg-gray-100" />
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">{page.name}</h4>
              <p className="mt-1 text-xs text-gray-500">/lp/{page.slug}</p>
              <p className="mt-1 text-xs text-gray-400">
                {page.isActive ? 'Active' : 'Draft'} • Order: {page.sort_order ?? index}
              </p>
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
                onClick={() => reorder(index, Math.min(sortedPages.length - 1, index + 1))}
                disabled={index === sortedPages.length - 1}
                className="rounded p-2 text-gray-600 hover:bg-gray-100 disabled:opacity-40"
                title="Move down"
              >
                <ArrowDown size={16} />
              </button>
              <button onClick={() => handleEdit(page)} className="rounded p-2 text-blue-600 hover:bg-blue-50">
                <Edit2 size={16} />
              </button>
              <button onClick={() => handleDelete(page.id)} className="rounded p-2 text-red-600 hover:bg-red-50">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPagesEditor;

