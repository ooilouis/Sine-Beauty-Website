import React, { useState, useEffect } from 'react';
import type { User } from '@supabase/supabase-js';
import DashboardLayout from './DashboardLayout';

import HeroEditor from './HeroEditor';

import StoriesEditor from './StoriesEditor';

import FAQEditor from './FAQEditor';

import ContactEditor from './ContactEditor';

import SettingsEditor from './SettingsEditor';
import BlogPostsEditor from './BlogPostsEditor';
import LandingPagesEditor from './LandingPagesEditor';
import FormsEditor from './FormsEditor';

// Placeholder components for editors
import GuaranteeEditor from './GuaranteeEditor';
import { supabase } from '../../lib/supabase';

const adminEmailConfig = (import.meta.env.VITE_CMS_ADMIN_EMAILS || import.meta.env.VITE_CMS_ADMIN_EMAIL || '')
    .split(',')
    .map((email: string) => email.trim().toLowerCase())
    .filter(Boolean);

const editorEmailConfig = (import.meta.env.VITE_CMS_EDITOR_EMAILS || '')
    .split(',')
    .map((email: string) => email.trim().toLowerCase())
    .filter(Boolean);

const getUserRole = (user: User | null): 'admin' | 'editor' | null => {
    if (!user?.email) return null;
    const email = user.email.toLowerCase();

    if (adminEmailConfig.length === 0 && editorEmailConfig.length === 0) return 'admin';
    if (adminEmailConfig.includes(email)) return 'admin';
    if (editorEmailConfig.includes(email)) return 'editor';
    return null;
};

const isAuthorizedUser = (user: User | null) => {
    return Boolean(getUserRole(user));
};

const Login: React.FC<{ onLogin: (user: User) => void; initialError?: string }> = ({ onLogin, initialError }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(initialError || '');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setError(initialError || '');
    }, [initialError]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError('');
            const { data, error: signInError } = await supabase.auth.signInWithPassword({
                email: email.trim(),
                password,
            });

            if (signInError) {
                setError(signInError.message || 'Login failed');
                return;
            }

            if (!isAuthorizedUser(data.user)) {
                await supabase.auth.signOut();
                setError('This account is not authorized to access CMS.');
                return;
            }

            if (data.user) {
                onLogin(data.user);
            }
        } catch (err) {
            console.error('CMS login error:', err);
            setError('Unexpected error during login.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-slate-800">CMS Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 outline-none"
                            placeholder="you@company.com"
                            autoComplete="username"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 outline-none"
                            placeholder="Enter password"
                            autoComplete="current-password"
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                        type="submit"
                        disabled={loading || !email.trim() || !password.trim()}
                        className="w-full bg-slate-900 text-white py-2 rounded-md hover:bg-slate-800 transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Signing in...' : 'Login'}
                    </button>
                    <p className="text-xs text-gray-500 text-center">
                        Tip: use <code>VITE_CMS_ADMIN_EMAILS</code> and <code>VITE_CMS_EDITOR_EMAILS</code> for role-based CMS access.
                    </p>
                </form>
            </div>
        </div>
    );
};

const Dashboard: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authReady, setAuthReady] = useState(false);
    const [authError, setAuthError] = useState('');
    const [role, setRole] = useState<'admin' | 'editor'>('editor');
    const [activePage, setActivePage] = useState('hero');

    useEffect(() => {
        let mounted = true;

        const bootSession = async () => {
            try {
                const { data, error } = await supabase.auth.getSession();
                if (!mounted) return;

                if (error) {
                    setIsAuthenticated(false);
                    setAuthError('Unable to restore session.');
                } else if (isAuthorizedUser(data.session?.user || null)) {
                    setIsAuthenticated(true);
                    setRole(getUserRole(data.session?.user || null) || 'editor');
                    setAuthError('');
                } else {
                    setIsAuthenticated(false);
                }
            } finally {
                if (mounted) setAuthReady(true);
            }
        };

        void bootSession();

        const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
            const sessionRole = getUserRole(session?.user || null);
            if (sessionRole) {
                setIsAuthenticated(true);
                setRole(sessionRole);
                setAuthError('');
            } else {
                setIsAuthenticated(false);
            }
        });

        return () => {
            mounted = false;
            listener.subscription.unsubscribe();
        };
    }, []);

    const handleLogin = (user: User) => {
        const nextRole = getUserRole(user);
        if (!nextRole) {
            setIsAuthenticated(false);
            setAuthError('This account is not authorized to access CMS.');
            return;
        }
        setIsAuthenticated(true);
        setRole(nextRole);
        setAuthError('');
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setIsAuthenticated(false);
    };

    if (!authReady) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-600">
                Loading CMS...
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Login onLogin={handleLogin} initialError={authError} />;
    }

    const renderContent = () => {
        switch (activePage) {
            case 'hero': return <HeroEditor />;
            case 'stories': return <StoriesEditor />;
            case 'blog-posts': return <BlogPostsEditor />;
            case 'landing-pages': return <LandingPagesEditor />;
            case 'forms': return <FormsEditor />;
            case 'faq': return <FAQEditor />;
            case 'contact': return <ContactEditor />;
            case 'popup': return role === 'admin' ? <SettingsEditor /> : <HeroEditor />;
            case 'settings': return role === 'admin' ? <SettingsEditor /> : <HeroEditor />;
            case 'guarantee': return <GuaranteeEditor />;
            default: return <HeroEditor />;
        }
    };

    return (
        <DashboardLayout
            activePage={activePage}
            onNavigate={setActivePage}
            onLogout={handleLogout}
            role={role}
        >
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 capitalize">
                    {activePage.replace('-', ' ')} Editor
                </h2>
                <p className="text-gray-500">Manage your website content here.</p>
            </div>
            {renderContent()}
        </DashboardLayout>
    );
};

export default Dashboard;
