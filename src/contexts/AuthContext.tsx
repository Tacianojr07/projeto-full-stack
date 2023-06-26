import { ReactNode, createContext } from "react";

interface UserProps {
    name: string;
    avatarUrl: string;
}

interface IAuthProviderPros {
    children: ReactNode;
}

export interface IAuthContextDataProps {
    user: UserProps;
    signIn: () => Promise<void>
}

export const AuthContext = createContext({} as IAuthContextDataProps);

export function AuthContextProvider({ children }: IAuthProviderPros) {

    async function signIn() {
        console.log('Logou com sucesso')
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