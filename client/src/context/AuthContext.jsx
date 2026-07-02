import {
  createContext,
  useContext,
  useState,
} from "react";

import {
  loginUser,
  logoutUser,
} from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(
    localStorage.getItem("token") || null
  );

  const [loading, setLoading] = useState(false);

  /* Login */

  const login = async (credentials) => {
    setLoading(true);

    try {
      const data = await loginUser(credentials);

      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      setToken(data.token);
      setUser(data.user);

      return data;
    } finally {
      setLoading(false);
    }
  };

  /* Logout */

  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error(error);
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};