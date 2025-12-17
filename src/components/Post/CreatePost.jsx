import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { X } from 'lucide-react';

const CreatePost = ({ onClose }) => {
    const { createPost } = useData();
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        location: user?.state || '', // Default to user's state
        image: '' // In a real app, this would be a file upload. Here we'll use a URL or a placeholder.
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        createPost({
            ...formData,
            price: Number(formData.price),
            sellerName: user.username
        });
        onClose();
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-[#1a1a23] w-full max-w-lg rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-white/5">
                    <h3 className="font-bold text-lg">Sell a Product</h3>
                    <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-xs text-gray-400 mb-1">Product Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g. iPhone 13 Pro Max"
                            className="w-full bg-[#0f0f13] border-white/5 focus:border-primary"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs text-gray-400 mb-1">Price (₦)</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="0.00"
                            className="w-full bg-[#0f0f13] border-white/5 focus:border-primary"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs text-gray-400 mb-1">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Describe your product..."
                            rows="4"
                            className="w-full bg-[#0f0f13] border-white/5 focus:border-primary resize-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs text-gray-400 mb-1">Location</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="City, State"
                            className="w-full bg-[#0f0f13] border-white/5 focus:border-primary"
                            required
                        />
                    </div>

                    {/* Image URL Input for Demo */}
                    <div>
                        <label className="block text-xs text-gray-400 mb-1">Image URL (Optional)</label>
                        <div className="flex gap-2">
                            <input
                                type="url"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                placeholder="https://example.com/image.jpg"
                                className="w-full bg-[#0f0f13] border-white/5 focus:border-primary"
                            />
                        </div>
                        <p className="text-[10px] text-gray-500 mt-1">Leave empty for no image.</p>
                    </div>

                    <button type="submit" className="w-full btn btn-primary mt-2">
                        Post Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreatePost;
