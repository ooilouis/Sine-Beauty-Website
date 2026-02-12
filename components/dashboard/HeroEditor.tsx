import React, { useMemo, useState } from 'react';
import { Plus, Trash2, Edit2, Save, ArrowUp, ArrowDown, Upload } from 'lucide-react';
import { useContent } from '../../contexts/ContentContext';
import { ContentService, HeroSlide } from '../../lib/content';
import { optimizeImageToDataUrl } from '../../lib/image-upload';

const HeroEditor: React.FC = () => {
    const { heroSlides, refreshContent } = useContent();
    const [editingId, setEditingId] = useState<number | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

    // Form state
    const [formData, setFormData] = useState<Partial<HeroSlide>>({});
    const sortedSlides = useMemo(
        () =>
            [...heroSlides].sort((a, b) => {
                const orderA = a.sort_order ?? 0;
                const orderB = b.sort_order ?? 0;
                if (orderA === orderB) return a.id - b.id;
                return orderA - orderB;
            }),
        [heroSlides]
    );

    const handleEdit = (slide: HeroSlide) => {
        setEditingId(slide.id);
        setFormData(slide);
        setIsCreating(false);
        setMessage(null);
    };

    const handleCreate = () => {
        setEditingId(null);
        setFormData({
            title: '',
            subtitle: '',
            button_text: 'BOOK APPOINTMENT',
            image_url: 'https://picsum.photos/1920/1280',
            mobile_image_url: 'https://picsum.photos/720/1280',
            position: 'center',
            sort_order: heroSlides.length
        });
        setIsCreating(true);
        setMessage(null);
    };

    const handleCancel = () => {
        setEditingId(null);
        setIsCreating(false);
        setFormData({});
        setMessage(null);
    };

    const isValid = Boolean((formData.title || '').trim() && (formData.image_url || '').trim());

    const handleImageUpload = async (
        event: React.ChangeEvent<HTMLInputElement>,
        field: 'image_url' | 'mobile_image_url'
    ) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            const dataUrl = await optimizeImageToDataUrl(file);
            setFormData((prev) => ({ ...prev, [field]: dataUrl }));
            setMessage({ type: 'success', text: `${field === 'image_url' ? 'Desktop' : 'Mobile'} image uploaded.` });
        } catch (error) {
            console.error('Image upload failed:', error);
            setMessage({ type: 'error', text: 'Image upload failed. Please try another file.' });
        } finally {
            event.target.value = '';
        }
    };

    const handleSave = async () => {
        if (!isValid) {
            setMessage({ type: 'error', text: 'Title and desktop image URL are required.' });
            return;
        }
        try {
            setLoading(true);
            setMessage(null);
            if (isCreating) {
                await ContentService.createHeroSlide({
                    ...formData,
                    title: formData.title?.trim() || '',
                    image_url: formData.image_url?.trim() || '',
                    mobile_image_url: formData.mobile_image_url?.trim() || formData.image_url?.trim() || '',
                } as Omit<HeroSlide, 'id'>);
            } else if (editingId) {
                await ContentService.updateHeroSlide(editingId, {
                    ...formData,
                    title: formData.title?.trim(),
                    image_url: formData.image_url?.trim(),
                    mobile_image_url: formData.mobile_image_url?.trim(),
                });
            }
            await refreshContent();
            handleCancel();
            setMessage({ type: 'success', text: isCreating ? 'Hero slide created.' : 'Hero slide updated.' });
        } catch (error) {
            console.error('Failed to save slide:', error);
            setMessage({ type: 'error', text: 'Failed to save slide. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this slide?')) return;
        try {
            setLoading(true);
            setMessage(null);
            await ContentService.deleteHeroSlide(id);
            await refreshContent();
            setMessage({ type: 'success', text: 'Hero slide deleted.' });
        } catch (error) {
            console.error('Failed to delete slide:', error);
            setMessage({ type: 'error', text: 'Failed to delete slide. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    const handleMove = async (index: number, direction: 'up' | 'down') => {
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= sortedSlides.length) return;

        const current = sortedSlides[index];
        const target = sortedSlides[targetIndex];
        const currentOrder = current.sort_order ?? index;
        const targetOrder = target.sort_order ?? targetIndex;

        try {
            setLoading(true);
            setMessage(null);
            await Promise.all([
                ContentService.updateHeroSlide(current.id, { sort_order: targetOrder }),
                ContentService.updateHeroSlide(target.id, { sort_order: currentOrder }),
            ]);
            await refreshContent();
            setMessage({ type: 'success', text: 'Slide order updated.' });
        } catch (error) {
            console.error('Failed to reorder slides:', error);
            setMessage({ type: 'error', text: 'Failed to reorder slides.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Hero Slides ({heroSlides.length})</h3>
                {!isCreating && !editingId && (
                    <button
                        onClick={handleCreate}
                        className="flex items-center space-x-2 bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
                    >
                        <Plus size={18} />
                        <span>Add Slide</span>
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

            {/* Editor Form */}
            {(isCreating || editingId) && (
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <h4 className="font-bold mb-4">{isCreating ? 'New Slide' : 'Edit Slide'}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input
                                type="text"
                                value={formData.title || ''}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                            <input
                                type="text"
                                value={formData.subtitle || ''}
                                onChange={e => setFormData({ ...formData, subtitle: e.target.value })}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
                            <input
                                type="text"
                                value={formData.button_text || ''}
                                onChange={e => setFormData({ ...formData, button_text: e.target.value })}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Text Position</label>
                            <select
                                value={formData.position || 'center'}
                                onChange={e => setFormData({ ...formData, position: e.target.value as any })}
                                className="w-full p-2 border rounded"
                            >
                                <option value="left">Left</option>
                                <option value="center">Center</option>
                                <option value="right">Right</option>
                            </select>
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Desktop Image URL</label>
                            <input
                                type="text"
                                value={formData.image_url || ''}
                                onChange={e => setFormData({ ...formData, image_url: e.target.value })}
                                className="w-full p-2 border rounded"
                            />
                            <label className="mt-2 inline-flex items-center gap-2 text-xs text-teal-700 cursor-pointer">
                                <Upload size={14} />
                                Upload desktop image
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(event) => void handleImageUpload(event, 'image_url')}
                                />
                            </label>
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Image URL</label>
                            <input
                                type="text"
                                value={formData.mobile_image_url || ''}
                                onChange={e => setFormData({ ...formData, mobile_image_url: e.target.value })}
                                className="w-full p-2 border rounded"
                            />
                            <label className="mt-2 inline-flex items-center gap-2 text-xs text-teal-700 cursor-pointer">
                                <Upload size={14} />
                                Upload mobile image
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(event) => void handleImageUpload(event, 'mobile_image_url')}
                                />
                            </label>
                        </div>
                    </div>
                    <div className="flex justify-end space-x-3">
                        <button
                            onClick={handleCancel}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={loading || !isValid}
                            className="px-4 py-2 bg-slate-900 text-white rounded hover:bg-slate-800 disabled:opacity-50 flex items-center space-x-2"
                        >
                            {loading ? <span>Saving...</span> : <><Save size={18} /><span>Save Slide</span></>}
                        </button>
                    </div>
                </div>
            )}

            {/* List */}
            <div className="grid gap-4">
                {heroSlides.length === 0 ? (
                    <div className="text-center py-10 bg-gray-50 rounded text-gray-500">
                        No slides yet. Add one to get started.
                    </div>
                ) : (
                    sortedSlides.map((slide, index) => (
                        <div key={slide.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center gap-4">
                            <img src={slide.image_url} alt={slide.title} className="w-24 h-16 object-cover rounded bg-gray-100" />
                            <div className="flex-1">
                                <h4 className="font-bold text-gray-800">{slide.title}</h4>
                                <p className="text-sm text-gray-500">{slide.subtitle}</p>
                                <p className="text-xs text-gray-400 mt-1">Order: {slide.sort_order ?? index}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => void handleMove(index, 'up')}
                                    disabled={loading || index === 0}
                                    className="p-2 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-40"
                                    title="Move up"
                                >
                                    <ArrowUp size={16} />
                                </button>
                                <button
                                    onClick={() => void handleMove(index, 'down')}
                                    disabled={loading || index === sortedSlides.length - 1}
                                    className="p-2 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-40"
                                    title="Move down"
                                >
                                    <ArrowDown size={16} />
                                </button>
                                <button
                                    onClick={() => handleEdit(slide)}
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                                >
                                    <Edit2 size={18} />
                                </button>
                                <button
                                    onClick={() => handleDelete(slide.id)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default HeroEditor;
