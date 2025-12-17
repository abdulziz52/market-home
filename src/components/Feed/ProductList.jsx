import ProductCard from './ProductCard';

const ProductList = ({ posts }) => {
    if (!posts || posts.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500">
                <p>No products found. Be the first to post!</p>
            </div>
        );
    }

    return (
        <div className="grid-products">
            {posts.map(post => (
                <ProductCard key={post.id} product={post} />
            ))}
        </div>
    );
};

export default ProductList;
