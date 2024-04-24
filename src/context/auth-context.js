"use client";
import { createContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { getDatabase, onValue, ref } from "firebase/database";
import { SignOutUser, app, userStateListener } from "@/firebase-config/firebase-methords";

export const AuthContext = createContext({
  currentUser: {},
  setCurrentUser: (_user) => {},
  signOut: () => {},
});

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useRouter();
  const db = getDatabase(app);

  useEffect(() => {
    const unsubscribe = userStateListener((user) => {
      console.log(user)
      if (user) {
        setCurrentUser(user);
        sessionStorage.setItem("user", "true");
      } else {
        sessionStorage.removeItem("user");
      }
    });
    return unsubscribe;
  }, []);

  const signOut =() => {
     SignOutUser()
    setCurrentUser(null);
    sessionStorage.removeItem("user");
    navigate.push('login');
  };

  const value = {
    currentUser,
    setCurrentUser,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
