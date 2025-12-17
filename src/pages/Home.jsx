import { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import ProductList from '../components/Feed/ProductList';
import CreatePost from '../components/Post/CreatePost';
import { Plus } from 'lucide-react';

const Home = () => {
    const { posts } = useData();
    const { user } = useAuth();
    const [isCreating, setIsCreating] = useState(false);

    return (
        <div className="relative min-h-[80vh]">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    Fresh Finds
                </h1>
                {user && (
                    <button
                        onClick={() => setIsCreating(true)}
                        className="btn btn-primary gap-2 shadow-glow"
                    >
                        <Plus className="w-5 h-5" />
                        Sell Item
                    </button>
                )}
            </div>

            <ProductList posts={posts} />

            {isCreating && (
                <CreatePost onClose={() => setIsCreating(false)} />
            )}
        </div>
    );
};

export default Home;
