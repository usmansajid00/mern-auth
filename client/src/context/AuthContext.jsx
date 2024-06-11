import { createContext, useState } from "react";
import { login, signup, signout } from "../api/auth";

export const StoreContext = createContext();

export const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const Signup = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await signup(data);
      setUser(response.data);
    } catch (error) {
      setError(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const Login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const response = await login(credentials);
      setUser(response.data);
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const Logout = async () => {
    setLoading(true);
    setError(null);
    try {
      await signout();
      setUser(null);
    } catch (error) {
      setError(error.response?.data?.message || "Logout failed");
    } finally {
      setLoading(false);
    }
  };

  const contextValues = {
    user,
    Login,
    Signup,
    Logout,
    loading,
    error,
  };

  return (
    <StoreContext.Provider value={contextValues}>
      {children}
    </StoreContext.Provider>
  );
};

export default AuthContext;
