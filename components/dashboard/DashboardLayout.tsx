import React, { useState } from 'react';
import {
    CreditCard,
    Users,
    HelpCircle,
    ShieldCheck,
    MapPin,
    Settings,
    Image,
    Layout,
    FormInput,
    LogOut,
    Menu,
    X
} from 'lucide-react';

interface DashboardLayoutProps {
    children: React.ReactNode;
    activePage: string;
    onNavigate: (page: string) => void;
    onLogout: () => void;
    role: 'admin' | 'editor';
}

const navItems = [
    { id: 'hero', label: 'Hero Slides', icon: <Image size={20} />, roles: ['admin', 'editor'] },
    { id: 'stories', label: 'Customer Stories', icon: <Users size={20} />, roles: ['admin', 'editor'] },
    { id: 'blog-posts', label: 'Blog Posts', icon: <CreditCard size={20} />, roles: ['admin', 'editor'] },
    { id: 'landing-pages', label: 'Landing Pages', icon: <Layout size={20} />, roles: ['admin', 'editor'] },
    { id: 'forms', label: 'Forms', icon: <FormInput size={20} />, roles: ['admin', 'editor'] },
    { id: 'faq', label: 'FAQ', icon: <HelpCircle size={20} />, roles: ['admin', 'editor'] },
    { id: 'guarantee', label: 'Guarantee Items', icon: <ShieldCheck size={20} />, roles: ['admin', 'editor'] },
    { id: 'contact', label: 'Contact Outlets', icon: <MapPin size={20} />, roles: ['admin', 'editor'] },
    { id: 'popup', label: 'Popup Modal', icon: <Layout size={20} />, roles: ['admin'] },
    { id: 'settings', label: 'Site Settings', icon: <Settings size={20} />, roles: ['admin'] },
];

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
    children,
    activePage,
    onNavigate,
    onLogout,
    role
}) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const visibleNavItems = navItems.filter((item) => item.roles.includes(role));

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
        fixed md:static inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
                <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                    <h1 className="text-xl font-bold tracking-wider">CMS DASHBOARD</h1>
                    <button onClick={() => setIsSidebarOpen(false)} className="md:hidden">
                        <X size={24} />
                    </button>
                </div>

                <nav className="p-4 space-y-2">
                    {visibleNavItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                onNavigate(item.id);
                                setIsSidebarOpen(false);
                            }}
                            className={`
                w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                ${activePage === item.id
                                    ? 'bg-teal-600 text-white'
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
              `}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800">
                    <button
                        onClick={onLogout}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-slate-400 hover:bg-red-900/20 hover:text-red-400 rounded-lg transition-colors"
                    >
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-h-screen transition-all duration-300">
                {/* Mobile Header */}
                <header className="bg-white shadow-sm p-4 md:hidden flex justify-between items-center sticky top-0 z-30">
                    <button onClick={() => setIsSidebarOpen(true)} className="text-gray-600">
                        <Menu size={24} />
                    </button>
                    <span className="font-semibold text-gray-800">
                        {visibleNavItems.find(i => i.id === activePage)?.label || 'Dashboard'}
                    </span>
                    <div className="w-6" /> {/* Spacer */}
                </header>

                <div className="flex-1 p-6 md:p-10 overflow-auto">
                    <div className="max-w-6xl mx-auto">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
