// ------------------------------------------------------------------
//  AuthContext
//  Keeps track of whether the visitor is logged in.
//  The logged in user is saved in localStorage so the login survives
//  a page refresh, and a plain context lets the Navbar read it
//  from anywhere in the app.
// ------------------------------------------------------------------
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Read the saved user when the app starts (JSON.parse turns the
  // stored string back into an object).
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('bookstore_user')) || null;
    } catch {
      return null;
    }
  });

  // Called by the Login page after the backend confirms the password.
  const login = (userData) => {
    localStorage.setItem('bookstore_user', JSON.stringify(userData));
    setUser(userData);
  };

  // Called by the Logout button in the Navbar.
  const logout = () => {
    localStorage.removeItem('bookstore_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// A small shortcut so components can just call useAuth().
export const useAuth = () => useContext(AuthContext);
