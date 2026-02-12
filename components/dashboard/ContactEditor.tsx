import React, { useMemo, useState } from 'react';
import { Plus, Trash2, Edit2, Save, ArrowUp, ArrowDown, Upload } from 'lucide-react';
import { useContent } from '../../contexts/ContentContext';
import { ContentService, ContactOutlet } from '../../lib/content';
import { optimizeImageToDataUrl } from '../../lib/image-upload';

const ContactEditor: React.FC = () => {
    const { outlets, refreshContent } = useContent();
    const [editingId, setEditingId] = useState<number | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

    // Form state
    const [formData, setFormData] = useState<Partial<ContactOutlet>>({});
    const sortedOutlets = useMemo(
        () =>
            [...outlets].sort((a, b) => {
                const orderA = a.sort_order ?? 0;
                const orderB = b.sort_order ?? 0;
                if (orderA === orderB) return a.id - b.id;
                return orderA - orderB;
            }),
        [outlets]
    );

    const handleEdit = (outlet: ContactOutlet) => {
        setEditingId(outlet.id);
        setFormData(outlet);
        setIsCreating(false);
        setMessage(null);
    };

    const handleCreate = () => {
        setEditingId(null);
        setFormData({
            name: '',
            address: '',
            phone: '',
            image_url: 'https://picsum.photos/600/400',
            google_maps_url: '',
            sort_order: outlets.length
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

    const isValid = Boolean(
        (formData.name || '').trim() &&
        (formData.address || '').trim() &&
        (formData.phone || '').trim() &&
        (formData.image_url || '').trim()
    );

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        try {
            const dataUrl = await optimizeImageToDataUrl(file, { maxWidth: 1600, maxHeight: 900 });
            setFormData((prev) => ({ ...prev, image_url: dataUrl }));
            setMessage({ type: 'success', text: 'Outlet image uploaded.' });
        } catch (error) {
            console.error('Outlet image upload failed:', error);
            setMessage({ type: 'error', text: 'Image upload failed. Please try another file.' });
        } finally {
            event.target.value = '';
        }
    };

    const handleSave = async () => {
        if (!isValid) {
            setMessage({ type: 'error', text: 'Name, address, phone and image URL are required.' });
            return;
        }
        try {
            setLoading(true);
            setMessage(null);
            if (isCreating) {
                await ContentService.createOutlet({
                    ...formData,
                    name: formData.name?.trim() || '',
                    address: formData.address?.trim() || '',
                    phone: formData.phone?.trim() || '',
                    image_url: formData.image_url?.trim() || '',
                    google_maps_url: formData.google_maps_url?.trim() || '',
                } as Omit<ContactOutlet, 'id'>);
            } else if (editingId) {
                await ContentService.updateOutlet(editingId, {
                    ...formData,
                    name: formData.name?.trim(),
                    address: formData.address?.trim(),
                    phone: formData.phone?.trim(),
                    image_url: formData.image_url?.trim(),
                    google_maps_url: formData.google_maps_url?.trim(),
                });
            }
            await refreshContent();
            handleCancel();
            setMessage({ type: 'success', text: isCreating ? 'Outlet created.' : 'Outlet updated.' });
        } catch (error) {
            console.error('Failed to save outlet:', error);
            setMessage({ type: 'error', text: 'Failed to save outlet. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this outlet?')) return;
        try {
            setLoading(true);
            setMessage(null);
            await ContentService.deleteOutlet(id);
            await refreshContent();
            setMessage({ type: 'success', text: 'Outlet deleted.' });
        } catch (error) {
            console.error('Failed to delete outlet:', error);
            setMessage({ type: 'error', text: 'Failed to delete outlet. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    const handleMove = async (index: number, direction: 'up' | 'down') => {
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= sortedOutlets.length) return;

        const current = sortedOutlets[index];
        const target = sortedOutlets[targetIndex];
        const currentOrder = current.sort_order ?? index;
        const targetOrder = target.sort_order ?? targetIndex;

        try {
            setLoading(true);
            setMessage(null);
            await Promise.all([
                ContentService.updateOutlet(current.id, { sort_order: targetOrder }),
                ContentService.updateOutlet(target.id, { sort_order: currentOrder }),
            ]);
            await refreshContent();
            setMessage({ type: 'success', text: 'Outlet order updated.' });
        } catch (error) {
            console.error('Failed to reorder outlets:', error);
            setMessage({ type: 'error', text: 'Failed to reorder outlets.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Contact Outlets ({outlets.length})</h3>
                {!isCreating && !editingId && (
                    <button
                        onClick={handleCreate}
                        className="flex items-center space-x-2 bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
                    >
                        <Plus size={18} />
                        <span>Add Outlet</span>
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
                    <h4 className="font-bold mb-4">{isCreating ? 'New Outlet' : 'Edit Outlet'}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Outlet Name</label>
                            <input
                                type="text"
                                value={formData.name || ''}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                            <input
                                type="text"
                                value={formData.phone || ''}
                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                            <textarea
                                value={formData.address || ''}
                                onChange={e => setFormData({ ...formData, address: e.target.value })}
                                className="w-full p-2 border rounded h-20"
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
                                Upload outlet image
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(event) => void handleImageUpload(event)}
                                />
                            </label>
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Google Maps URL</label>
                            <input
                                type="text"
                                value={formData.google_maps_url || ''}
                                onChange={e => setFormData({ ...formData, google_maps_url: e.target.value })}
                                className="w-full p-2 border rounded"
                            />
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
                            {loading ? <span>Saving...</span> : <><Save size={18} /><span>Save Outlet</span></>}
                        </button>
                    </div>
                </div>
            )}

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sortedOutlets.map((outlet, index) => (
                    <div key={outlet.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="aspect-video mb-4 bg-gray-100 rounded overflow-hidden relative">
                            <img src={outlet.image_url} alt={outlet.name} className="w-full h-full object-cover" />
                            <div className="absolute top-2 right-2 flex space-x-1">
                                <button
                                    onClick={() => void handleMove(index, 'up')}
                                    disabled={loading || index === 0}
                                    className="p-2 bg-white/90 text-gray-700 hover:bg-white rounded-full shadow-sm disabled:opacity-40"
                                    title="Move up"
                                >
                                    <ArrowUp size={16} />
                                </button>
                                <button
                                    onClick={() => void handleMove(index, 'down')}
                                    disabled={loading || index === sortedOutlets.length - 1}
                                    className="p-2 bg-white/90 text-gray-700 hover:bg-white rounded-full shadow-sm disabled:opacity-40"
                                    title="Move down"
                                >
                                    <ArrowDown size={16} />
                                </button>
                                <button
                                    onClick={() => handleEdit(outlet)}
                                    className="p-2 bg-white/90 text-blue-600 hover:bg-white rounded-full shadow-sm"
                                >
                                    <Edit2 size={16} />
                                </button>
                                <button
                                    onClick={() => handleDelete(outlet.id)}
                                    className="p-2 bg-white/90 text-red-600 hover:bg-white rounded-full shadow-sm"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                        <h4 className="font-bold text-lg text-gray-800 mb-1">{outlet.name}</h4>
                        <div className="space-y-1 text-sm text-gray-600">
                            <p>{outlet.address}</p>
                            <p className="flex items-center space-x-1">
                                <span className="font-semibold">Tel:</span> <span>{outlet.phone}</span>
                            </p>
                            <a href={outlet.google_maps_url} target="_blank" rel="noreferrer" className="text-teal-600 text-xs hover:underline block mt-2">
                                View on Google Maps
                            </a>
                            <p className="text-xs text-gray-400">Order: {outlet.sort_order ?? index}</p>
                        </div>
                    </div>
                ))}
                {outlets.length === 0 && (
                    <div className="col-span-full text-center py-10 bg-gray-50 rounded text-gray-500">
                        No outlets yet. Add one to get started.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContactEditor;
