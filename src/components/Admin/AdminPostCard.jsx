import { Trash2, MapPin, Calendar } from 'lucide-react';

const AdminPostCard = ({ post, onDelete }) => {
    return (
        <div className="bg-[#1a1a23] border border-white/5 rounded-xl overflow-hidden mb-4">
            <div className="flex gap-4 p-4">
                <div className="w-20 h-20 bg-[#23232f] rounded-lg overflow-hidden flex-shrink-0">
                    {post.image ? (
                        <img src={post.image} alt="" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-600">No Img</div>
                    )}
                </div>

                <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-white truncate mb-1">{post.title}</h3>
                    <p className="text-primary font-medium text-sm mb-2">₦{post.price}</p>

                    <div className="flex items-center gap-3 text-xs text-gray-400">
                        <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {post.location || 'N/A'}
                        </div>
                        <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(post.timestamp).toLocaleDateString()}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-t border-white/5">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-[10px] font-bold text-white">
                        {post.sellerName?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <span className="text-xs text-gray-300">{post.sellerName}</span>
                </div>

                <button
                    onClick={() => onDelete(post.id)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 text-red-400 rounded-lg text-xs hover:bg-red-500/20 transition-colors"
                >
                    <Trash2 className="w-3 h-3" />
                    Delete
                </button>
            </div>
        </div>
    );
};

export default AdminPostCard;
