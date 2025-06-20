import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currUser, setCurrUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  return (
    <AuthContext.Provider value={{ currUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
