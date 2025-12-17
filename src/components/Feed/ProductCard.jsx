import { MessageCircle, MapPin, Clock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const { user } = useAuth();
    const { startChat } = useData();
    const navigate = useNavigate();

    const handleChat = () => {
        if (!user) {
            navigate('/login');
            return;
        }
        if (user.id === product.sellerId) return; // Can't chat with self

        const chat = startChat(product.sellerId, product.id);
        navigate(`/chat/${chat.id}`);
    };

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    };

    return (
        <div className="card hover:border-primary/50 transition-colors group overflow-hidden flex flex-col h-full">
            {/* Image Placeholder or Actual Image */}
            <div className="aspect-video bg-[#23232f] rounded-lg mb-4 overflow-hidden relative">
                {product.image ? (
                    <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-600">
                        No Image
                    </div>
                )}
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-xs text-white font-medium">
                    ₦{product.price}
                </div>
            </div>

            <div className="flex-1 flex flex-col">
                <h3 className="font-bold text-lg mb-1 truncate">{product.title}</h3>
                <p className="text-sm text-gray-400 line-clamp-2 mb-3 flex-1">{product.description}</p>

                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {product.location || 'Unknown'}
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDate(product.timestamp)}
                    </div>
                </div>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-[10px] font-bold">
                            {product.sellerName?.[0]?.toUpperCase() || 'U'}
                        </div>
                        <span className="text-xs text-gray-300">{product.sellerName || 'Seller'}</span>
                    </div>

                    {user?.id !== product.sellerId && (
                        <button
                            onClick={handleChat}
                            className="btn btn-primary py-1.5 px-3 text-xs gap-1.5"
                        >
                            <MessageCircle className="w-3 h-3" />
                            Chat
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
