import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import AdminPostCard from '../components/Admin/AdminPostCard';

const AdminDashboard = () => {
    const { posts, deletePost } = useData();
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.username !== 'admin') {
            navigate('/');
        }
    }, [user, navigate]);

    if (user?.username !== 'admin') return null;

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this post?')) {
            deletePost(id);
        }
    };

    return (
        <AdminLayout>
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Dashboard</h1>
                <p className="text-gray-400">Manage all user posts from here.</p>
            </div>

            {/* Desktop View - Table */}
            <div className="hidden md:block card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-white/5 text-gray-400 border-b border-white/5">
                            <tr>
                                <th className="p-4 font-medium">Product</th>
                                <th className="p-4 font-medium">Price</th>
                                <th className="p-4 font-medium">Seller</th>
                                <th className="p-4 font-medium">Date</th>
                                <th className="p-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {posts.map(post => (
                                <tr key={post.id} className="hover:bg-white/5 transition-colors">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded bg-[#23232f] overflow-hidden flex-shrink-0">
                                                {post.image ? (
                                                    <img src={post.image} alt="" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-600">No Img</div>
                                                )}
                                            </div>
                                            <span className="font-medium truncate max-w-[200px]">{post.title}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">₦{post.price}</td>
                                    <td className="p-4 text-gray-400">{post.sellerName}</td>
                                    <td className="p-4 text-gray-400">
                                        {new Date(post.timestamp).toLocaleDateString()}
                                    </td>
                                    <td className="p-4 text-right">
                                        <button
                                            onClick={() => handleDelete(post.id)}
                                            className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                            title="Delete Post"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {posts.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-gray-500">
                                        No posts found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mobile View - Cards */}
            <div className="md:hidden">
                {posts.map(post => (
                    <AdminPostCard key={post.id} post={post} onDelete={handleDelete} />
                ))}
                {posts.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        No posts found.
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;
