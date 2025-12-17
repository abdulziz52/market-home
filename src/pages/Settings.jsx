import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, MapPin, Lock, Save } from 'lucide-react';

const Settings = () => {
    const { user, updateProfile } = useAuth();
    const [formData, setFormData] = useState({
        firstName: user?.firstName || '',
        secondName: user?.secondName || '',
        country: user?.country || '',
        state: user?.state || '',
        lga: user?.lga || '',
        password: user?.password || '', // In real app, don't prefill password
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateProfile(formData);
        setMessage('Profile updated successfully!');
        setTimeout(() => setMessage(''), 3000);
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Account Settings
            </h1>

            <div className="card">
                {message && (
                    <div className="mb-6 p-3 bg-green-500/10 border border-green-500/20 text-green-400 rounded-lg text-sm text-center">
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <User className="w-5 h-5 text-primary" />
                            Personal Information
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs text-gray-400 mb-1">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="w-full bg-[#0f0f13] border-white/5 focus:border-primary"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-400 mb-1">Second Name</label>
                                <input
                                    type="text"
                                    name="secondName"
                                    value={formData.secondName}
                                    onChange={handleChange}
                                    className="w-full bg-[#0f0f13] border-white/5 focus:border-primary"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Location */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-primary" />
                            Location
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs text-gray-400 mb-1">Country</label>
                                <input
                                    type="text"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    className="w-full bg-[#0f0f13] border-white/5 focus:border-primary"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs text-gray-400 mb-1">State</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        className="w-full bg-[#0f0f13] border-white/5 focus:border-primary"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-400 mb-1">LGA</label>
                                    <input
                                        type="text"
                                        name="lga"
                                        value={formData.lga}
                                        onChange={handleChange}
                                        className="w-full bg-[#0f0f13] border-white/5 focus:border-primary"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Security */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Lock className="w-5 h-5 text-primary" />
                            Security
                        </h3>
                        <div>
                            <label className="block text-xs text-gray-400 mb-1">New Password</label>
                            <input
                                type="text"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full bg-[#0f0f13] border-white/5 focus:border-primary"
                            />
                            <p className="text-[10px] text-gray-500 mt-1">Update only if you want to change it.</p>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-white/5">
                        <button type="submit" className="btn btn-primary w-full gap-2">
                            <Save className="w-4 h-4" />
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Settings;
