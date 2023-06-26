import { createContext } from "react";

interface UserProps {
    name: string;
    avatarUrl: string;
}

export interface IAuthContextDataProps {
    user: UserProps;
    signIn: () => Promise<void>
}

export const AuthContext = createContext({} as IAuthContextDataProps);

export function AuthContextProvider({ children }) {

    async function signIn() {

    }

    return(
        <AuthContext.Provider value={{
            signIn,
            user: {
                name: 'Rodrigo',
                avatarUrl: 'http://github.com/rodrigorgtic.png'
            }
        }}>
            {children}
        </AuthContext.Provider>
    )
}