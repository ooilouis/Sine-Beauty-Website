import React, { useState, useEffect } from 'react';
import { Save, Upload } from 'lucide-react';
import { useContent } from '../../contexts/ContentContext';
import { ContentService, PopupSettings, SiteSettings } from '../../lib/content';
import { optimizeImageToDataUrl } from '../../lib/image-upload';

const isValidUrl = (value: string) => {
    if (!value.trim()) return true;
    try {
        // eslint-disable-next-line no-new
        new URL(value);
        return true;
    } catch {
        return false;
    }
};

const SettingsEditor: React.FC = () => {
    const { popup, settings, refreshContent } = useContent();
    const [popupSaving, setPopupSaving] = useState(false);
    const [siteSaving, setSiteSaving] = useState(false);
    const [popupMessage, setPopupMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);
    const [siteMessage, setSiteMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

    // Popup State
    const [popupData, setPopupData] = useState<Partial<PopupSettings>>({});

    // Site Settings State
    const [siteData, setSiteData] = useState<Partial<SiteSettings>>({});

    useEffect(() => {
        if (popup) setPopupData(popup);
        if (settings) setSiteData(settings);
    }, [popup, settings]);

    const handlePopupImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        try {
            const dataUrl = await optimizeImageToDataUrl(file, { maxWidth: 1200, maxHeight: 1200 });
            setPopupData((prev) => ({ ...prev, image_url: dataUrl }));
            setPopupMessage({ type: 'success', text: 'Popup image uploaded.' });
        } catch (error) {
            console.error('Popup image upload failed:', error);
            setPopupMessage({ type: 'error', text: 'Popup image upload failed.' });
        } finally {
            event.target.value = '';
        }
    };

    const handleSavePopup = async () => {
        if (!isValidUrl(popupData.image_url || '')) {
            setPopupMessage({ type: 'error', text: 'Popup image URL must be a valid URL.' });
            return;
        }
        if (!isValidUrl(popupData.link_url || '')) {
            setPopupMessage({ type: 'error', text: 'Popup link URL must be a valid URL.' });
            return;
        }

        try {
            setPopupSaving(true);
            setPopupMessage(null);
            await ContentService.updatePopupSettings(popupData);
            await refreshContent();
            setPopupMessage({ type: 'success', text: 'Popup settings saved.' });
        } catch (error) {
            console.error('Failed to save popup settings:', error);
            setPopupMessage({ type: 'error', text: 'Failed to save popup settings.' });
        } finally {
            setPopupSaving(false);
        }
    };

    const handleSaveSite = async () => {
        if ((siteData.email || '').trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(siteData.email || '')) {
            setSiteMessage({ type: 'error', text: 'General email format is invalid.' });
            return;
        }

        const urlFields = ['facebook_url', 'instagram_url', 'youtube_url', 'twitter_url'] as const;
        for (const key of urlFields) {
            if (!isValidUrl(siteData[key] || '')) {
                setSiteMessage({ type: 'error', text: `${key.replace('_', ' ')} must be a valid URL.` });
                return;
            }
        }

        try {
            setSiteSaving(true);
            setSiteMessage(null);
            await ContentService.updateSiteSettings(siteData);
            await refreshContent();
            setSiteMessage({ type: 'success', text: 'Site settings saved.' });
        } catch (error) {
            console.error('Failed to save site settings:', error);
            setSiteMessage({ type: 'error', text: 'Failed to save site settings.' });
        } finally {
            setSiteSaving(false);
        }
    };

    return (
        <div className="space-y-8 max-w-4xl">

            {/* Popup Settings Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold">Popup Modal Settings</h3>
                    <button
                        onClick={handleSavePopup}
                        disabled={popupSaving}
                        className="flex items-center space-x-2 bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 disabled:opacity-50"
                    >
                        <Save size={18} />
                        <span>{popupSaving ? 'Saving...' : 'Save Popup'}</span>
                    </button>
                </div>
                {popupMessage && (
                    <div
                        className={`mb-4 rounded border px-4 py-3 text-sm ${
                            popupMessage.type === 'error'
                                ? 'border-red-200 bg-red-50 text-red-700'
                                : 'border-emerald-200 bg-emerald-50 text-emerald-700'
                        }`}
                    >
                        {popupMessage.text}
                    </div>
                )}

                <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                        <input
                            type="checkbox"
                            id="popupEnabled"
                            checked={popupData.is_enabled || false}
                            onChange={e => setPopupData({ ...popupData, is_enabled: e.target.checked })}
                            className="w-5 h-5 text-teal-600 rounded"
                        />
                        <label htmlFor="popupEnabled" className="font-medium text-gray-700">Enable Popup Modal</label>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                        <input
                            type="text"
                            value={popupData.image_url || ''}
                            onChange={e => setPopupData({ ...popupData, image_url: e.target.value })}
                            className="w-full p-2 border rounded"
                            placeholder="https://..."
                        />
                        <label className="mt-2 inline-flex items-center gap-2 text-xs text-teal-700 cursor-pointer">
                            <Upload size={14} />
                            Upload popup image
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(event) => void handlePopupImageUpload(event)}
                            />
                        </label>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Link URL (Optional)</label>
                        <input
                            type="text"
                            value={popupData.link_url || ''}
                            onChange={e => setPopupData({ ...popupData, link_url: e.target.value })}
                            className="w-full p-2 border rounded"
                            placeholder="https://..."
                        />
                        <p className="text-xs text-gray-500 mt-1">If set, clicking the popup image will redirect here.</p>
                    </div>
                </div>
            </div>

            {/* Site Settings Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold">General Site Settings</h3>
                    <button
                        onClick={handleSaveSite}
                        disabled={siteSaving}
                        className="flex items-center space-x-2 bg-slate-900 text-white px-4 py-2 rounded hover:bg-slate-800 disabled:opacity-50"
                    >
                        <Save size={18} />
                        <span>{siteSaving ? 'Saving...' : 'Save Settings'}</span>
                    </button>
                </div>
                {siteMessage && (
                    <div
                        className={`mb-4 rounded border px-4 py-3 text-sm ${
                            siteMessage.type === 'error'
                                ? 'border-red-200 bg-red-50 text-red-700'
                                : 'border-emerald-200 bg-emerald-50 text-emerald-700'
                        }`}
                    >
                        {siteMessage.text}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Top Bar Announcement</label>
                        <input
                            type="text"
                            value={siteData.announcement_text || ''}
                            onChange={e => setSiteData({ ...siteData, announcement_text: e.target.value })}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
                        <input
                            type="text"
                            value={siteData.whatsapp_number || ''}
                            onChange={e => setSiteData({ ...siteData, whatsapp_number: e.target.value })}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">General Phone</label>
                        <input
                            type="text"
                            value={siteData.phone || ''}
                            onChange={e => setSiteData({ ...siteData, phone: e.target.value })}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">General Email</label>
                        <input
                            type="text"
                            value={siteData.email || ''}
                            onChange={e => setSiteData({ ...siteData, email: e.target.value })}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div className="col-span-2 border-t pt-4 mt-2">
                        <h4 className="font-bold text-gray-600 mb-3">Social Media Links</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Facebook URL</label>
                                <input
                                    type="text"
                                    value={siteData.facebook_url || ''}
                                    onChange={e => setSiteData({ ...siteData, facebook_url: e.target.value })}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Instagram URL</label>
                                <input
                                    type="text"
                                    value={siteData.instagram_url || ''}
                                    onChange={e => setSiteData({ ...siteData, instagram_url: e.target.value })}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">YouTube URL</label>
                                <input
                                    type="text"
                                    value={siteData.youtube_url || ''}
                                    onChange={e => setSiteData({ ...siteData, youtube_url: e.target.value })}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Twitter/X URL</label>
                                <input
                                    type="text"
                                    value={siteData.twitter_url || ''}
                                    onChange={e => setSiteData({ ...siteData, twitter_url: e.target.value })}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default SettingsEditor;
