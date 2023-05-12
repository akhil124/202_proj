import React, { useState, useEffect, useContext, createContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "../services/userService";

const AuthContext = createContext<{
  user: any;
  signin: (email: any, password: any) => Promise<any>;
  signup: (user: any) => Promise<any>;
  signout: () => void;
}>(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);
  const signin = async (email, password) => {
    try {
      const res = await signInWithEmailAndPassword(email, password);
      const user = res?.data?.data;
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const signup = async (user: any) => {
    try {
      const res = await createUserWithEmailAndPassword(user);
      setUser(res?.data?.data);
      return res?.data?.data;
    } catch (error) {
      throw error;
    }
  };
  const signout = () => {
    localStorage.removeItem("user");
    setUser(false);
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  // Return the user object and auth methods
  return {
    user,
    signin,
    signup,
    signout,
  };
}
