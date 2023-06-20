import { createContext } from "react";

interface UserProps {
    name: string;
    avatarUrl: string;
}

export interface IAuthContextDataProps {
    user: UserProps;
    signIn: () => Promise<void>
}

export const AuthContext = createContext({});