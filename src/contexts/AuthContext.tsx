import { ReactNode, createContext, useState, useEffect } from "react";
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

interface UserProps {
  name: string;
  avatarUrl: string;
}

interface IAuthProviderProps {
  children: ReactNode;
}

export interface IAuthContextDataProps {
  user: UserProps;
  isUserLoading: boolean;
  signIn: () => Promise<void>;
}

export const AuthContext = createContext({} as IAuthContextDataProps);

export function AuthContextProvider({ children }: IAuthProviderProps) {
  
  const [user, setUser] = useState<UserProps>({} as UserProps);
  const [isUserLoading, setIsUserLoading] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '799263738110-a9437nuk7dn4b85rdu0qouc3cahs5s6q.apps.googleusercontent.com',
    redirectUri: AuthSession.makeRedirectUri({ useProxy : true}),
    scopes: ['profile', 'email']
  });




  async function signIn() {
    try {
      setIsUserLoading(true);
      await promptAsync();

    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsUserLoading(false);
    }
  }

  async function signInWithGoogle(access_Token: string) {
    console.log("TOKEN DE AUTENTICAÇÃO ==> ", access_Token);
  
  }

  useEffect(() => {
    if (response?.type === "success" && response?.authentication?.accessToken) {
      signInWithGoogle(response.authentication.accessToken);
    }
  }, [response]);




  return (
    <AuthContext.Provider
      value={{
        signIn,
        isUserLoading,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
