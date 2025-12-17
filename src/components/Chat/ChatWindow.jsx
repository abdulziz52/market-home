import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { Send, ArrowLeft } from 'lucide-react';

const ChatWindow = () => {
    const { chatId } = useParams();
    const { chats, sendMessage } = useData();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const messagesEndRef = useRef(null);

    const chat = chats.find(c => c.id === chatId);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chat?.messages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        sendMessage(chatId, message);
        setMessage('');
    };

    if (!chat) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-400">Chat not found</p>
                <button onClick={() => navigate('/')} className="text-primary mt-4">Go Home</button>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-[calc(100vh-140px)] max-w-3xl mx-auto bg-[#1a1a23] rounded-2xl border border-white/10 overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-white/5 flex items-center gap-4 bg-[#23232f]">
                <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/5 rounded-full">
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                    <h3 className="font-bold">Chat</h3>
                    <p className="text-xs text-gray-400">Product ID: {chat.productId}</p>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chat.messages.map(msg => {
                    const isMe = msg.senderId === user.id;
                    return (
                        <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                            <div
                                className={`max-w-[70%] p-3 rounded-2xl text-sm ${isMe
                                        ? 'bg-primary text-white rounded-tr-none'
                                        : 'bg-[#2a2a35] text-gray-200 rounded-tl-none'
                                    }`}
                            >
                                {msg.text}
                                <div className={`text-[10px] mt-1 ${isMe ? 'text-primary-200' : 'text-gray-500'}`}>
                                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-4 border-t border-white/5 bg-[#23232f]">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 bg-[#0f0f13] border-white/5 focus:border-primary rounded-full px-4"
                    />
                    <button
                        type="submit"
                        disabled={!message.trim()}
                        className="p-3 bg-primary text-white rounded-full hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChatWindow;
