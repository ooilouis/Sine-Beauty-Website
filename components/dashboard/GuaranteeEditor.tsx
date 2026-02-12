import React, { useMemo, useState } from 'react';
import { Plus, Trash2, Edit2, Save, X, ArrowUp, ArrowDown } from 'lucide-react';
import { useContent } from '../../contexts/ContentContext';
import { ContentService, GuaranteeItem } from '../../lib/content';
import * as LucideIcons from 'lucide-react';

const iconOptions = ['ShieldCheck', 'Leaf', 'Clock', 'Award', 'Users', 'Sparkles', 'HeartHandshake'];

const GuaranteeEditor: React.FC = () => {
    const { guaranteeItems, refreshContent } = useContent();
    const [editingId, setEditingId] = useState<number | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Form state
    const [formData, setFormData] = useState<Partial<GuaranteeItem>>({});
    const sortedItems = useMemo(
        () =>
            [...guaranteeItems].sort((a, b) => {
                const orderA = a.sort_order ?? 0;
                const orderB = b.sort_order ?? 0;
                if (orderA === orderB) return a.id - b.id;
                return orderA - orderB;
            }),
        [guaranteeItems]
    );

    const handleEdit = (item: GuaranteeItem) => {
        setEditingId(item.id);
        setFormData(item);
        setIsCreating(false);
        setErrorMessage('');
        setSuccessMessage('');
    };

    const handleCreate = () => {
        setEditingId(null);
        setFormData({
            text: '',
            icon_name: 'ShieldCheck',
            sort_order: guaranteeItems.length
        });
        setIsCreating(true);
        setErrorMessage('');
        setSuccessMessage('');
    };

    const handleCancel = () => {
        setEditingId(null);
        setIsCreating(false);
        setFormData({});
    };

    const isFormValid = useMemo(() => {
        const text = (formData.text || '').trim();
        const icon = (formData.icon_name || '').trim();
        return text.length > 0 && icon.length > 0;
    }, [formData]);

    const handleSave = async () => {
        if (!isFormValid) {
            setErrorMessage('Text and icon name are required.');
            return;
        }

        try {
            setLoading(true);
            setErrorMessage('');
            setSuccessMessage('');
            if (isCreating) {
                await ContentService.createGuaranteeItem({
                    ...formData,
                    text: formData.text?.trim() || '',
                    icon_name: formData.icon_name?.trim() || 'ShieldCheck',
                } as Omit<GuaranteeItem, 'id'>);
            } else if (editingId) {
                await ContentService.updateGuaranteeItem(editingId, {
                    ...formData,
                    text: formData.text?.trim(),
                    icon_name: formData.icon_name?.trim(),
                });
            }
            await refreshContent();
            handleCancel();
            setSuccessMessage(isCreating ? 'Guarantee item created.' : 'Guarantee item updated.');
        } catch (error) {
            console.error('Failed to save guarantee item:', error);
            setErrorMessage('Failed to save guarantee item. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;
        try {
            setLoading(true);
            setErrorMessage('');
            setSuccessMessage('');
            await ContentService.deleteGuaranteeItem(id);
            await refreshContent();
            setSuccessMessage('Guarantee item deleted.');
        } catch (error) {
            console.error('Failed to delete item:', error);
            setErrorMessage('Failed to delete item. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleMove = async (index: number, direction: 'up' | 'down') => {
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= sortedItems.length) return;

        const current = sortedItems[index];
        const target = sortedItems[targetIndex];
        const currentOrder = current.sort_order ?? index;
        const targetOrder = target.sort_order ?? targetIndex;

        try {
            setLoading(true);
            setErrorMessage('');
            setSuccessMessage('');
            await Promise.all([
                ContentService.updateGuaranteeItem(current.id, { sort_order: targetOrder }),
                ContentService.updateGuaranteeItem(target.id, { sort_order: currentOrder }),
            ]);
            await refreshContent();
            setSuccessMessage('Guarantee item order updated.');
        } catch (error) {
            console.error('Failed to reorder guarantee items:', error);
            setErrorMessage('Failed to reorder guarantee items.');
        } finally {
            setLoading(false);
        }
    };

    const previewIcon = useMemo(() => {
        const iconName = formData.icon_name || 'ShieldCheck';
        // @ts-ignore - dynamic icon map access
        const IconComponent = LucideIcons[iconName] || LucideIcons.ShieldCheck;
        return <IconComponent size={20} />;
    }, [formData.icon_name]);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Our Promise Items ({guaranteeItems.length})</h3>
                {!isCreating && !editingId && (
                    <button
                        onClick={handleCreate}
                        className="flex items-center space-x-2 bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
                    >
                        <Plus size={18} />
                        <span>Add Item</span>
                    </button>
                )}
            </div>

            {errorMessage && (
                <div className="rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{errorMessage}</div>
            )}
            {successMessage && (
                <div className="rounded border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{successMessage}</div>
            )}

            {/* Editor Form */}
            {(isCreating || editingId) && (
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <h4 className="font-bold mb-4">{isCreating ? 'New Item' : 'Edit Item'}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Text</label>
                            <textarea
                                value={formData.text || ''}
                                onChange={e => setFormData({ ...formData, text: e.target.value })}
                                className="w-full p-2 border rounded h-20"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Icon Name (Lucide React)</label>
                            <input
                                type="text"
                                list="guarantee-icons"
                                value={formData.icon_name || ''}
                                onChange={e => setFormData({ ...formData, icon_name: e.target.value })}
                                className="w-full p-2 border rounded"
                            />
                            <datalist id="guarantee-icons">
                                {iconOptions.map((option) => (
                                    <option key={option} value={option} />
                                ))}
                            </datalist>
                            <p className="text-xs text-gray-500 mt-1">e.g. ShieldCheck, Clock, Award, Users</p>
                            <div className="mt-2 inline-flex items-center gap-2 rounded border border-gray-200 bg-gray-50 px-2 py-1 text-xs text-gray-700">
                                <span>Preview</span>
                                {previewIcon}
                            </div>
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
                            disabled={loading || !isFormValid}
                            className="px-4 py-2 bg-slate-900 text-white rounded hover:bg-slate-800 disabled:opacity-50 flex items-center space-x-2"
                        >
                            {loading ? <span>Saving...</span> : <><Save size={18} /><span>Save Item</span></>}
                        </button>
                    </div>
                </div>
            )}

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedItems.map((item, index) => (
                    <div key={item.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col items-center text-center">
                        <div className="w-12 h-12 bg-pink-50 rounded-full flex items-center justify-center text-teal-600 mb-4">
                            {/* Quick visual check for icon name */}
                            <span className="text-xs font-mono">{item.icon_name}</span>
                        </div>
                        <p className="font-semibold text-gray-800 mb-4 h-12 flex items-center">{item.text}</p>
                        <p className="text-xs text-gray-400 mb-4">Order: {item.sort_order ?? index}</p>

                        <div className="flex space-x-2 mt-auto">
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
                                disabled={loading || index === sortedItems.length - 1}
                                className="p-2 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-40"
                                title="Move down"
                            >
                                <ArrowDown size={16} />
                            </button>
                            <button
                                onClick={() => handleEdit(item)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                            >
                                <Edit2 size={18} />
                            </button>
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
                {guaranteeItems.length === 0 && (
                    <div className="col-span-full text-center py-10 bg-gray-50 rounded text-gray-500">
                        No guarantee items yet. Add one to get started.
                    </div>
                )}
            </div>
        </div>
    );
};

export default GuaranteeEditor;
