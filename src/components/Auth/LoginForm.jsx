import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { User, Lock } from 'lucide-react';

const LoginForm = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        const result = login(formData.username, formData.password);

        if (result.success) {
            navigate('/');
        } else {
            setError(result.error);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-6 bg-[#1a1a23] rounded-2xl border border-white/10 shadow-xl">
            <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Welcome Back
            </h2>

            {error && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm text-center">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-xs text-gray-400 mb-1">Username</label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full pl-10 bg-[#0f0f13] border-white/5 focus:border-primary"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs text-gray-400 mb-1">Password</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full pl-10 bg-[#0f0f13] border-white/5 focus:border-primary"
                            required
                        />
                    </div>
                </div>

                <button type="submit" className="w-full btn btn-primary mt-4">
                    Login
                </button>

                <p className="text-center text-sm text-gray-400 mt-4">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-primary hover:text-primary-hover">
                        Register
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default LoginForm;
