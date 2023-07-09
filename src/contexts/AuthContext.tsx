import { ReactNode, createContext, useState, useEffect } from "react";
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { api } from "../services/api";

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


  useEffect(() => {
    if (response?.type === "success" && response?.authentication?.accessToken) {
      signInWithGoogle(response.authentication.accessToken);
    }
  }, [response]);

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



  async function signInWithGoogle(access_token: string) {
    try {
      setIsUserLoading(true)

      const tokenResponse = await api.post('users', {access_token: access_token})
      api.defaults.headers.common['Authorization'] = `Bearer ${tokenResponse.data.token}`

      const userInfoResponse = await api.get('/me');
      setUser(userInfoResponse.data.user)


    } catch (error) {
      console.log(error)
      throw error;
    } finally {

    }
  
  }



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
