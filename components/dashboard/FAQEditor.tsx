import React, { useMemo, useState } from 'react';
import { Plus, Trash2, Edit2, Save, X, ChevronDown, ChevronRight, ArrowUp, ArrowDown } from 'lucide-react';
import { useContent } from '../../contexts/ContentContext';
import { ContentService, FAQCategory, FAQItem } from '../../lib/content';

const FAQEditor: React.FC = () => {
    const { faq, refreshContent } = useContent();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

    // Category State
    const [editingCatId, setEditingCatId] = useState<number | null>(null);
    const [isCreatingCat, setIsCreatingCat] = useState(false);
    const [catFormData, setCatFormData] = useState<Partial<FAQCategory>>({});

    // Item State
    const [editingItemId, setEditingItemId] = useState<number | null>(null);
    const [isCreatingItem, setIsCreatingItem] = useState(false);
    const [selectedCatId, setSelectedCatId] = useState<number | null>(null); // For creating new item
    const [itemFormData, setItemFormData] = useState<Partial<FAQItem>>({});

    const [expandedCats, setExpandedCats] = useState<number[]>([]);
    const sortedFaq = useMemo(
        () =>
            [...faq]
                .sort((a, b) => {
                    const orderA = a.sort_order ?? 0;
                    const orderB = b.sort_order ?? 0;
                    if (orderA === orderB) return a.id - b.id;
                    return orderA - orderB;
                })
                .map((category) => ({
                    ...category,
                    items: [...category.items].sort((a, b) => {
                        const orderA = a.sort_order ?? 0;
                        const orderB = b.sort_order ?? 0;
                        if (orderA === orderB) return a.id - b.id;
                        return orderA - orderB;
                    }),
                })),
        [faq]
    );

    const toggleCat = (id: number) => {
        setExpandedCats(prev =>
            prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
        );
    };

    // --- Category Handlers ---

    const handleCreateCat = () => {
        setEditingCatId(null);
        setCatFormData({ title: '', sort_order: faq.length });
        setIsCreatingCat(true);
        setMessage(null);
    };

    const handleEditCat = (cat: FAQCategory) => {
        setEditingCatId(cat.id);
        setCatFormData(cat);
        setIsCreatingCat(false);
        setMessage(null);
    };

    const handleSaveCat = async () => {
        if (!(catFormData.title || '').trim()) {
            setMessage({ type: 'error', text: 'Category title is required.' });
            return;
        }
        try {
            setLoading(true);
            setMessage(null);
            if (isCreatingCat) {
                await ContentService.createFAQCategory({
                    ...catFormData,
                    title: catFormData.title?.trim() || '',
                } as Omit<FAQCategory, 'id'>);
            } else if (editingCatId) {
                await ContentService.updateFAQCategory(editingCatId, {
                    ...catFormData,
                    title: catFormData.title?.trim(),
                });
            }
            await refreshContent();
            setIsCreatingCat(false);
            setEditingCatId(null);
            setCatFormData({});
            setMessage({ type: 'success', text: isCreatingCat ? 'Category created.' : 'Category updated.' });
        } catch (error) {
            console.error('Failed to save category:', error);
            setMessage({ type: 'error', text: 'Failed to save category.' });
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteCat = async (id: number) => {
        if (!window.confirm('Delete this category? All items inside it will be deleted too.')) return;
        try {
            setLoading(true);
            setMessage(null);
            await ContentService.deleteFAQCategory(id);
            await refreshContent();
            setMessage({ type: 'success', text: 'Category deleted.' });
        } catch (error) {
            console.error('Failed to delete category:', error);
            setMessage({ type: 'error', text: 'Failed to delete category.' });
        } finally {
            setLoading(false);
        }
    };

    const handleMoveCategory = async (index: number, direction: 'up' | 'down') => {
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= sortedFaq.length) return;

        const current = sortedFaq[index];
        const target = sortedFaq[targetIndex];
        const currentOrder = current.sort_order ?? index;
        const targetOrder = target.sort_order ?? targetIndex;

        try {
            setLoading(true);
            setMessage(null);
            await Promise.all([
                ContentService.updateFAQCategory(current.id, { sort_order: targetOrder }),
                ContentService.updateFAQCategory(target.id, { sort_order: currentOrder }),
            ]);
            await refreshContent();
            setMessage({ type: 'success', text: 'Category order updated.' });
        } catch (error) {
            console.error('Failed to reorder categories:', error);
            setMessage({ type: 'error', text: 'Failed to reorder categories.' });
        } finally {
            setLoading(false);
        }
    };

    // --- Item Handlers ---

    const handleCreateItem = (catId: number) => {
        setEditingItemId(null);
        setSelectedCatId(catId);
        setItemFormData({
            question: '',
            answer: '',
            category_id: catId,
            sort_order: faq.find(c => c.id === catId)?.items.length || 0
        });
        setIsCreatingItem(true);
        setMessage(null);
    };

    const handleEditItem = (item: FAQItem) => {
        setEditingItemId(item.id);
        setSelectedCatId(item.category_id);
        setItemFormData(item);
        setIsCreatingItem(false);
        setMessage(null);
    };

    const handleSaveItem = async () => {
        if (!(itemFormData.question || '').trim() || !(itemFormData.answer || '').trim()) {
            setMessage({ type: 'error', text: 'Question and answer are required.' });
            return;
        }
        try {
            setLoading(true);
            setMessage(null);
            if (isCreatingItem) {
                await ContentService.createFAQItem({
                    ...itemFormData,
                    question: itemFormData.question?.trim() || '',
                    answer: itemFormData.answer?.trim() || '',
                } as Omit<FAQItem, 'id'>);
            } else if (editingItemId) {
                await ContentService.updateFAQItem(editingItemId, {
                    ...itemFormData,
                    question: itemFormData.question?.trim(),
                    answer: itemFormData.answer?.trim(),
                });
            }
            await refreshContent();
            setIsCreatingItem(false);
            setEditingItemId(null);
            setItemFormData({});
            setMessage({ type: 'success', text: isCreatingItem ? 'FAQ item created.' : 'FAQ item updated.' });

            // Ensure the category is expanded to see the new/updated item
            if (selectedCatId && !expandedCats.includes(selectedCatId)) {
                toggleCat(selectedCatId);
            }
        } catch (error) {
            console.error('Failed to save item:', error);
            setMessage({ type: 'error', text: 'Failed to save FAQ item.' });
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteItem = async (id: number) => {
        if (!window.confirm('Delete this FAQ item?')) return;
        try {
            setLoading(true);
            setMessage(null);
            await ContentService.deleteFAQItem(id);
            await refreshContent();
            setMessage({ type: 'success', text: 'FAQ item deleted.' });
        } catch (error) {
            console.error('Failed to delete item:', error);
            setMessage({ type: 'error', text: 'Failed to delete FAQ item.' });
        } finally {
            setLoading(false);
        }
    };

    const handleMoveItem = async (
        categoryId: number,
        items: FAQItem[],
        index: number,
        direction: 'up' | 'down'
    ) => {
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= items.length) return;

        const current = items[index];
        const target = items[targetIndex];
        const currentOrder = current.sort_order ?? index;
        const targetOrder = target.sort_order ?? targetIndex;

        try {
            setLoading(true);
            setMessage(null);
            await Promise.all([
                ContentService.updateFAQItem(current.id, { sort_order: targetOrder, category_id: categoryId }),
                ContentService.updateFAQItem(target.id, { sort_order: currentOrder, category_id: categoryId }),
            ]);
            await refreshContent();
            setMessage({ type: 'success', text: 'FAQ item order updated.' });
        } catch (error) {
            console.error('Failed to reorder FAQ items:', error);
            setMessage({ type: 'error', text: 'Failed to reorder FAQ items.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            {/* Categories Header */}
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">FAQ Categories ({faq.length})</h3>
                {!isCreatingCat && !editingCatId && (
                    <button
                        onClick={handleCreateCat}
                        className="flex items-center space-x-2 bg-slate-800 text-white px-3 py-2 rounded hover:bg-slate-900 text-sm"
                    >
                        <Plus size={16} />
                        <span>Add Category</span>
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

            {/* Category Editor */}
            {(isCreatingCat || editingCatId) && (
                <div className="bg-white p-4 rounded-lg shadow border border-teal-200">
                    <h4 className="font-bold mb-2 text-sm uppercase tracking-wide text-teal-600">
                        {isCreatingCat ? 'New Category' : 'Edit Category'}
                    </h4>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Category Title"
                            value={catFormData.title || ''}
                            onChange={e => setCatFormData({ ...catFormData, title: e.target.value })}
                            className="flex-1 p-2 border rounded"
                        />
                        <button onClick={handleSaveCat} disabled={loading || !(catFormData.title || '').trim()} className="p-2 bg-teal-600 text-white rounded disabled:opacity-50"><Save size={18} /></button>
                        <button onClick={() => { setIsCreatingCat(false); setEditingCatId(null); }} className="p-2 bg-gray-200 text-gray-600 rounded"><X size={18} /></button>
                    </div>
                </div>
            )}

            {/* Item Editor (Global for simplicity, or could be modal) */}
            {(isCreatingItem || editingItemId) && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
                        <h4 className="font-bold mb-4 text-lg">
                            {isCreatingItem ? 'New FAQ Item' : 'Edit FAQ Item'}
                        </h4>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded"
                                    value={itemFormData.question || ''}
                                    onChange={e => setItemFormData({ ...itemFormData, question: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Answer</label>
                                <textarea
                                    className="w-full p-2 border rounded h-32"
                                    value={itemFormData.answer || ''}
                                    onChange={e => setItemFormData({ ...itemFormData, answer: e.target.value })}
                                />
                            </div>
                            <div className="flex justify-end space-x-2 pt-4">
                                <button
                                    onClick={() => { setIsCreatingItem(false); setEditingItemId(null); }}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSaveItem}
                                    disabled={loading || !(itemFormData.question || '').trim() || !(itemFormData.answer || '').trim()}
                                    className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
                                >
                                    {loading ? 'Saving...' : 'Save Item'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* FAQ List */}
            <div className="space-y-4">
                {sortedFaq.map((category, categoryIndex) => (
                    <div key={category.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                        <div className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-100">
                            <button
                                onClick={() => toggleCat(category.id)}
                                className="flex items-center space-x-2 font-bold text-gray-800 hover:text-teal-600"
                            >
                                {expandedCats.includes(category.id) ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                                <span>{category.title}</span>
                                <span className="bg-gray-200 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                                    {category.items.length}
                                </span>
                            </button>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => void handleMoveCategory(categoryIndex, 'up')}
                                    disabled={loading || categoryIndex === 0}
                                    className="p-1.5 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-40"
                                    title="Move category up"
                                >
                                    <ArrowUp size={16} />
                                </button>
                                <button
                                    onClick={() => void handleMoveCategory(categoryIndex, 'down')}
                                    disabled={loading || categoryIndex === sortedFaq.length - 1}
                                    className="p-1.5 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-40"
                                    title="Move category down"
                                >
                                    <ArrowDown size={16} />
                                </button>
                                <button onClick={() => handleEditCat(category)} className="p-1.5 text-blue-600 hover:bg-blue-100 rounded"><Edit2 size={16} /></button>
                                <button onClick={() => handleDeleteCat(category.id)} className="p-1.5 text-red-600 hover:bg-red-100 rounded"><Trash2 size={16} /></button>
                                <button
                                    onClick={() => handleCreateItem(category.id)}
                                    className="ml-2 flex items-center space-x-1 bg-white border border-gray-300 px-3 py-1.5 rounded text-sm hover:bg-gray-50"
                                >
                                    <Plus size={14} />
                                    <span>Add Item</span>
                                </button>
                            </div>
                        </div>

                        {expandedCats.includes(category.id) && (
                            <div className="p-4 space-y-3">
                                {category.items.length === 0 && (
                                    <p className="text-sm text-gray-400 italic">No questions in this category yet.</p>
                                )}
                                {category.items.map((item, itemIndex) => (
                                    <div key={item.id} className="flex items-start justify-between p-3 border border-gray-100 rounded hover:bg-gray-50">
                                        <div className="flex-1 pr-4">
                                            <p className="font-medium text-gray-900 text-sm mb-1">{item.question}</p>
                                            <p className="text-gray-500 text-xs line-clamp-2">{item.answer}</p>
                                            <p className="text-[10px] text-gray-400 mt-1">Order: {item.sort_order ?? itemIndex}</p>
                                        </div>
                                        <div className="flex space-x-1 shrink-0">
                                            <button
                                                onClick={() => void handleMoveItem(category.id, category.items, itemIndex, 'up')}
                                                disabled={loading || itemIndex === 0}
                                                className="p-1 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-40"
                                                title="Move item up"
                                            >
                                                <ArrowUp size={14} />
                                            </button>
                                            <button
                                                onClick={() => void handleMoveItem(category.id, category.items, itemIndex, 'down')}
                                                disabled={loading || itemIndex === category.items.length - 1}
                                                className="p-1 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-40"
                                                title="Move item down"
                                            >
                                                <ArrowDown size={14} />
                                            </button>
                                            <button onClick={() => handleEditItem(item)} className="p-1 text-blue-500 hover:bg-blue-50 rounded"><Edit2 size={14} /></button>
                                            <button onClick={() => handleDeleteItem(item.id)} className="p-1 text-red-500 hover:bg-red-50 rounded"><Trash2 size={14} /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQEditor;
