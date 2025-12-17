import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Eye, EyeOff, MapPin, User, Lock } from 'lucide-react';

const RegisterForm = () => {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        secondName: '',
        username: '', // using firstName + secondName or separate? User asked for Name, Second Name. I'll add a username field or generate it.
        // User said "put his name, scond name password confarm password country state local governmet area"
        // I'll add username as well or use email? User didn't specify email. I'll use username for login.
        password: '',
        confirmPassword: '',
        country: '',
        state: '',
        lga: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validatePassword = (password) => {
        if (password.length < 8) return false;
        if (!/\d/.test(password)) return false; // Must contain numbers
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (!validatePassword(formData.password)) {
            setError('Password must be at least 8 characters and contain a number');
            return;
        }

        // Create a username from names if not provided, or just use firstName as display name
        const username = (formData.firstName + formData.secondName).toLowerCase().replace(/\s/g, '') + Math.floor(Math.random() * 1000);

        const result = register({
            ...formData,
            username // Auto-generated or add field? I'll auto-generate for simplicity or add a field if needed.
            // Let's add a username field to be safe, or just use the generated one.
            // I'll stick to the requested fields: Name, Second Name, Password, Confirm, Country, State, LGA.
            // I'll generate a username for internal use.
        });

        if (result.success) {
            navigate('/');
        } else {
            setError(result.error);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto p-6 bg-[#1a1a23] rounded-2xl border border-white/10 shadow-xl">
            <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Join We-Market
            </h2>

            {error && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm text-center">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs text-gray-400 mb-1">First Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="w-full pl-10 bg-[#0f0f13] border-white/5 focus:border-primary"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs text-gray-400 mb-1">Second Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                name="secondName"
                                value={formData.secondName}
                                onChange={handleChange}
                                className="w-full pl-10 bg-[#0f0f13] border-white/5 focus:border-primary"
                                required
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-xs text-gray-400 mb-1">Location</label>
                    <div className="space-y-3">
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                name="country"
                                placeholder="Country"
                                value={formData.country}
                                onChange={handleChange}
                                className="w-full pl-10 bg-[#0f0f13] border-white/5 focus:border-primary"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                name="state"
                                placeholder="State"
                                value={formData.state}
                                onChange={handleChange}
                                className="w-full bg-[#0f0f13] border-white/5 focus:border-primary"
                                required
                            />
                            <input
                                type="text"
                                name="lga"
                                placeholder="LGA"
                                value={formData.lga}
                                onChange={handleChange}
                                className="w-full bg-[#0f0f13] border-white/5 focus:border-primary"
                                required
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-xs text-gray-400 mb-1">Password</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full pl-10 pr-10 bg-[#0f0f13] border-white/5 focus:border-primary"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                        >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                    <p className="text-[10px] text-gray-500 mt-1">Must be 8+ chars with numbers</p>
                </div>

                <div>
                    <label className="block text-xs text-gray-400 mb-1">Confirm Password</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full pl-10 bg-[#0f0f13] border-white/5 focus:border-primary"
                            required
                        />
                    </div>
                </div>

                <button type="submit" className="w-full btn btn-primary mt-4">
                    Create Account
                </button>

                <p className="text-center text-sm text-gray-400 mt-4">
                    Already have an account?{' '}
                    <Link to="/login" className="text-primary hover:text-primary-hover">
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default RegisterForm;
