import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, LogOut, Home, LayoutDashboard } from 'lucide-react';

const AdminLayout = ({ children }) => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen flex bg-[#0f0f13]">
            {/* Sidebar - Hidden on mobile, visible on desktop */}
            <aside className="hidden md:flex flex-col w-64 bg-[#1a1a23] border-r border-white/5 p-6">
                <div className="flex items-center gap-3 mb-10">
                    <ShieldAlert className="w-8 h-8 text-red-500" />
                    <span className="text-xl font-bold text-white">Admin Panel</span>
                </div>

                <nav className="flex-1 space-y-2">
                    <Link to="/admin" className="flex items-center gap-3 px-4 py-3 bg-white/5 text-white rounded-xl">
                        <LayoutDashboard className="w-5 h-5" />
                        Dashboard
                    </Link>
                    <Link to="/" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                        <Home className="w-5 h-5" />
                        View Site
                    </Link>
                </nav>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors mt-auto"
                >
                    <LogOut className="w-5 h-5" />
                    Logout
                </button>
            </aside>

            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#1a1a23] border-b border-white/5 flex items-center justify-between px-4 z-50">
                <div className="flex items-center gap-2">
                    <ShieldAlert className="w-6 h-6 text-red-500" />
                    <span className="font-bold text-white">Admin</span>
                </div>
                <button onClick={handleLogout} className="p-2 text-red-400">
                    <LogOut className="w-5 h-5" />
                </button>
            </div>

            {/* Main Content */}
            <main className="flex-1 p-4 md:p-8 mt-16 md:mt-0 overflow-y-auto">
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;
