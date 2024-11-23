"use client";

import React, { ReactNode, SetStateAction, useContext, useState } from "react";
import { AppUser } from "@/app/types";
import { createContext } from "react";

type UserContextProviderProps = {
  children: ReactNode;
};

type ContextType = AppUser & {
  setUserId: React.Dispatch<SetStateAction<AppUser["userId"]>>;
  setUsername: React.Dispatch<SetStateAction<AppUser["username"]>>;
  setEmail: React.Dispatch<SetStateAction<AppUser["email"]>>;
  setCanContinue: React.Dispatch<SetStateAction<AppUser["canContinue"]>>;
};

export const UserContext = createContext<ContextType | null>(null);

export default function UserDataContextProvider({
  children,
}: UserContextProviderProps) {
  const [username, setUsername] = useState<AppUser["username"]>(null);
  const [userId, setUserId] = useState<AppUser["userId"]>(null);
  const [email, setEmail] = useState<AppUser["email"]>(null);
  const [canContinue, setCanContinue] = useState<AppUser["canContinue"] | null>(
    null,
  );

  return (
    <UserContext.Provider
      value={{
        username,
        setUsername,
        userId,
        setUserId,
        email,
        setEmail,
        canContinue,
        setCanContinue,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
export function useUserDataContext() {
  const context = useContext(UserContext);
  if (!context) {
    console.error("no context");
    throw new Error("user context shall be not null");
  }
  return context;
}
