import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MoreVertical, Home, MessageCircle, LogOut, User, Settings, ShieldAlert } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
        setMenuOpen(false);
    };

    return (
        <nav className="glass sticky top-0 z-50 border-b border-white/10">
            <div className="container h-16 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    We-Market
                </Link>

                {/* Desktop Nav */}
                <div className="flex items-center gap-6">
                    <Link to="/" className="p-2 hover:bg-white/5 rounded-full transition-colors" title="Feed">
                        <Home className="w-6 h-6 text-gray-300 hover:text-white" />
                    </Link>

                    {user && (
                        <div className="relative">
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className="p-2 hover:bg-white/5 rounded-full transition-colors"
                            >
                                <MoreVertical className="w-6 h-6 text-gray-300 hover:text-white" />
                            </button>

                            {/* Dropdown Menu */}
                            {menuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-[#1a1a23] border border-white/10 rounded-xl shadow-xl overflow-hidden animate-fade-in">
                                    <div className="p-3 border-b border-white/5">
                                        <p className="font-medium text-white truncate">{user.username}</p>
                                        <p className="text-xs text-gray-400 truncate">{user.country}</p>
                                    </div>

                                    {user.username === 'admin' && (
                                        <Link
                                            to="/admin"
                                            className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            <ShieldAlert className="w-4 h-4 text-primary" />
                                            Dashboard
                                        </Link>
                                    )}

                                    <Link
                                        to="/settings"
                                        className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        <Settings className="w-4 h-4" />
                                        Settings
                                    </Link>

                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors text-left"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {!user && (
                        <Link to="/login" className="btn btn-primary text-sm">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
