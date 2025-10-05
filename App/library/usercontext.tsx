import { fetchuser } from "@/library/data";
import React, { createContext, useContext, useEffect, useState } from "react";

interface UserContextType {
  user: any;
  setUser: (user: any) => void;
  refreshUser: () => Promise<void>;

}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>([]);


  const refreshUser = async () => {
    const fetchedUser = await fetchuser();
    if (fetchedUser) {
      setUser(fetchedUser);
    }

  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, refreshUser }}>
      {children}
    </UserContext.Provider >
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
