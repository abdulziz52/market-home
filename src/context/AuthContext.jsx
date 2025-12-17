import { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('we_market_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (username, password) => {
    // In a real app, this would verify against a backend.
    // For this demo, we'll check against a "users" array in localStorage
    // or just simulate a successful login if the user exists.

    const users = JSON.parse(localStorage.getItem('we_market_users') || '[]');

    // Admin Check
    if (username === 'admin') {
      if (password === 'abdulaziz2025@') {
        const adminUser = { id: 'admin', username: 'admin', country: 'Global', role: 'admin' };
        setUser(adminUser);
        localStorage.setItem('we_market_user', JSON.stringify(adminUser));
        return { success: true };
      } else {
        return { success: false, error: 'Invalid admin credentials' };
      }
    }

    const foundUser = users.find(u => u.username === username && u.password === password);

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('we_market_user', JSON.stringify(foundUser));
      return { success: true };
    } else {
      return { success: false, error: 'Invalid credentials' };
    }
  };

  const register = (userData) => {
    const users = JSON.parse(localStorage.getItem('we_market_users') || '[]');

    // Check if username exists
    if (users.find(u => u.username === userData.username)) {
      return { success: false, error: 'Username already taken' };
    }

    const newUser = { ...userData, id: Date.now().toString(), avatar: null };
    users.push(newUser);
    localStorage.setItem('we_market_users', JSON.stringify(users));

    // Auto login
    setUser(newUser);
    localStorage.setItem('we_market_user', JSON.stringify(newUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('we_market_user');
  };

  const updateProfile = (updates) => {
    if (!user) return;

    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('we_market_user', JSON.stringify(updatedUser));

    // Update in users list too
    const users = JSON.parse(localStorage.getItem('we_market_users') || '[]');
    const updatedUsers = users.map(u => u.id === user.id ? updatedUser : u);
    localStorage.setItem('we_market_users', JSON.stringify(updatedUsers));
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
