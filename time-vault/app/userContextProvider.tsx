"use client";

import React, { ReactNode, SetStateAction, useState } from "react";
import { AppUser } from "@/app/types";
import { createContext } from "react";

type UserContextProviderProps = {
  children: ReactNode;
};

type ContextType = AppUser & {
  setUserId: React.Dispatch<SetStateAction<AppUser["userId"]>>;
  setUsername: React.Dispatch<SetStateAction<AppUser["username"]>>;
  setEmail: React.Dispatch<SetStateAction<AppUser["email"]>>;
};

export const UserContext = createContext<ContextType | null>(null);

export default function UserDataContextProvider({
  children,
}: UserContextProviderProps) {
  const [username, setUsername] = useState<AppUser["username"]>(null);
  const [userId, setUserId] = useState<AppUser["userId"]>(null);
  const [email, setEmail] = useState<AppUser["email"]>(null);

  return (
    <UserContext.Provider
      value={{
        username,
        setUsername,
        userId,
        setUserId,
        email,
        setEmail,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
