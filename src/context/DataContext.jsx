import { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    const { user } = useAuth();
    const [posts, setPosts] = useState([]);
    const [chats, setChats] = useState([]);

    useEffect(() => {
        const storedPosts = JSON.parse(localStorage.getItem('we_market_posts') || '[]');
        setPosts(storedPosts);

        if (user) {
            const storedChats = JSON.parse(localStorage.getItem('we_market_chats') || '[]');
            // Filter chats where user is a participant
            const userChats = storedChats.filter(c => c.participants.includes(user.id));
            setChats(userChats);
        } else {
            setChats([]);
        }
    }, [user]);

    const createPost = (postData) => {
        const newPost = {
            ...postData,
            id: Date.now().toString(),
            sellerId: user.id,
            sellerName: user.username, // Storing name for easier display
            timestamp: new Date().toISOString(),
        };

        const updatedPosts = [newPost, ...posts];
        setPosts(updatedPosts);
        localStorage.setItem('we_market_posts', JSON.stringify(updatedPosts));
        return newPost;
    };

    const startChat = (sellerId, productId) => {
        if (!user) return null;

        // Check if chat already exists
        const allChats = JSON.parse(localStorage.getItem('we_market_chats') || '[]');
        let chat = allChats.find(c =>
            c.participants.includes(user.id) &&
            c.participants.includes(sellerId) &&
            c.productId === productId
        );

        if (!chat) {
            chat = {
                id: Date.now().toString(),
                participants: [user.id, sellerId],
                productId,
                messages: [],
                lastMessage: null,
                timestamp: new Date().toISOString()
            };
            allChats.push(chat);
            localStorage.setItem('we_market_chats', JSON.stringify(allChats));
            setChats(prev => [chat, ...prev]);
        }

        return chat;
    };

    const sendMessage = (chatId, text) => {
        const allChats = JSON.parse(localStorage.getItem('we_market_chats') || '[]');
        const chatIndex = allChats.findIndex(c => c.id === chatId);

        if (chatIndex === -1) return;

        const message = {
            id: Date.now().toString(),
            senderId: user.id,
            text,
            timestamp: new Date().toISOString()
        };

        allChats[chatIndex].messages.push(message);
        allChats[chatIndex].lastMessage = text;
        allChats[chatIndex].timestamp = message.timestamp;

        localStorage.setItem('we_market_chats', JSON.stringify(allChats));

        // Update local state if it's one of our chats
        setChats(prev => prev.map(c => c.id === chatId ? allChats[chatIndex] : c));
    };

    const deletePost = (postId) => {
        const updatedPosts = posts.filter(p => p.id !== postId);
        setPosts(updatedPosts);
        localStorage.setItem('we_market_posts', JSON.stringify(updatedPosts));
    };

    return (
        <DataContext.Provider value={{ posts, chats, createPost, startChat, sendMessage, deletePost }}>
            {children}
        </DataContext.Provider>
    );
};
