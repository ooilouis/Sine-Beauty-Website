import React, { useMemo, useState } from 'react';
import { Plus, Trash2, Edit2, Save, ArrowUp, ArrowDown, Upload } from 'lucide-react';
import { useContent } from '../../contexts/ContentContext';
import { ContentService, CustomerStory } from '../../lib/content';
import { optimizeImageToDataUrl } from '../../lib/image-upload';

const StoriesEditor: React.FC = () => {
    const { stories, refreshContent } = useContent();
    const [editingId, setEditingId] = useState<number | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

    // Form state
    const [formData, setFormData] = useState<Partial<CustomerStory>>({});
    const sortedStories = useMemo(
        () =>
            [...stories].sort((a, b) => {
                const orderA = a.sort_order ?? 0;
                const orderB = b.sort_order ?? 0;
                if (orderA === orderB) return a.id - b.id;
                return orderA - orderB;
            }),
        [stories]
    );

    const handleEdit = (story: CustomerStory) => {
        setEditingId(story.id);
        setFormData(story);
        setIsCreating(false);
        setMessage(null);
    };

    const handleCreate = () => {
        setEditingId(null);
        setFormData({
            title: '',
            date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            image_url: 'https://picsum.photos/400/600',
            sort_order: stories.length
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

    const isValid = Boolean((formData.title || '').trim() && (formData.date || '').trim() && (formData.image_url || '').trim());

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        try {
            const dataUrl = await optimizeImageToDataUrl(file, { maxWidth: 1200, maxHeight: 1600 });
            setFormData((prev) => ({ ...prev, image_url: dataUrl }));
            setMessage({ type: 'success', text: 'Story image uploaded.' });
        } catch (error) {
            console.error('Story image upload failed:', error);
            setMessage({ type: 'error', text: 'Image upload failed. Please try another file.' });
        } finally {
            event.target.value = '';
        }
    };

    const handleSave = async () => {
        if (!isValid) {
            setMessage({ type: 'error', text: 'Title, date and image URL are required.' });
            return;
        }
        try {
            setLoading(true);
            setMessage(null);
            if (isCreating) {
                await ContentService.createStory({
                    ...formData,
                    title: formData.title?.trim() || '',
                    date: formData.date?.trim() || '',
                    image_url: formData.image_url?.trim() || '',
                } as Omit<CustomerStory, 'id'>);
            } else if (editingId) {
                await ContentService.updateStory(editingId, {
                    ...formData,
                    title: formData.title?.trim(),
                    date: formData.date?.trim(),
                    image_url: formData.image_url?.trim(),
                });
            }
            await refreshContent();
            handleCancel();
            setMessage({ type: 'success', text: isCreating ? 'Story created.' : 'Story updated.' });
        } catch (error) {
            console.error('Failed to save story:', error);
            setMessage({ type: 'error', text: 'Failed to save story. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this story?')) return;
        try {
            setLoading(true);
            setMessage(null);
            await ContentService.deleteStory(id);
            await refreshContent();
            setMessage({ type: 'success', text: 'Story deleted.' });
        } catch (error) {
            console.error('Failed to delete story:', error);
            setMessage({ type: 'error', text: 'Failed to delete story. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    const handleMove = async (index: number, direction: 'up' | 'down') => {
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= sortedStories.length) return;

        const current = sortedStories[index];
        const target = sortedStories[targetIndex];
        const currentOrder = current.sort_order ?? index;
        const targetOrder = target.sort_order ?? targetIndex;

        try {
            setLoading(true);
            setMessage(null);
            await Promise.all([
                ContentService.updateStory(current.id, { sort_order: targetOrder }),
                ContentService.updateStory(target.id, { sort_order: currentOrder }),
            ]);
            await refreshContent();
            setMessage({ type: 'success', text: 'Story order updated.' });
        } catch (error) {
            console.error('Failed to reorder stories:', error);
            setMessage({ type: 'error', text: 'Failed to reorder stories.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Customer Stories ({stories.length})</h3>
                {!isCreating && !editingId && (
                    <button
                        onClick={handleCreate}
                        className="flex items-center space-x-2 bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
                    >
                        <Plus size={18} />
                        <span>Add Story</span>
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
                    <h4 className="font-bold mb-4">{isCreating ? 'New Story' : 'Edit Story'}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title (Quote)</label>
                            <input
                                type="text"
                                value={formData.title || ''}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                            <input
                                type="text"
                                value={formData.date || ''}
                                onChange={e => setFormData({ ...formData, date: e.target.value })}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                            <input
                                type="text"
                                value={formData.image_url || ''}
                                onChange={e => setFormData({ ...formData, image_url: e.target.value })}
                                className="w-full p-2 border rounded"
                            />
                            <label className="mt-2 inline-flex items-center gap-2 text-xs text-teal-700 cursor-pointer">
                                <Upload size={14} />
                                Upload story image
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(event) => void handleImageUpload(event)}
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
                            {loading ? <span>Saving...</span> : <><Save size={18} /><span>Save Story</span></>}
                        </button>
                    </div>
                </div>
            )}

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedStories.map((story, index) => (
                    <div key={story.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="aspect-[2/3] mb-4 bg-gray-100 rounded overflow-hidden">
                            <img src={story.image_url} alt={story.title} className="w-full h-full object-cover" />
                        </div>
                        <h4 className="font-bold text-gray-800 mb-1 line-clamp-2 min-h-[3rem]">{story.title}</h4>
                        <div className="flex justify-between items-center mt-4">
                            <div>
                                <p className="text-sm text-gray-500">{story.date}</p>
                                <p className="text-xs text-gray-400">Order: {story.sort_order ?? index}</p>
                            </div>
                            <div className="flex space-x-1">
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
                                    disabled={loading || index === sortedStories.length - 1}
                                    className="p-2 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-40"
                                    title="Move down"
                                >
                                    <ArrowDown size={16} />
                                </button>
                                <button
                                    onClick={() => handleEdit(story)}
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                                >
                                    <Edit2 size={18} />
                                </button>
                                <button
                                    onClick={() => handleDelete(story.id)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                {stories.length === 0 && (
                    <div className="col-span-full text-center py-10 bg-gray-50 rounded text-gray-500">
                        No stories yet. Add one to get started.
                    </div>
                )}
            </div>
        </div>
    );
};

export default StoriesEditor;
