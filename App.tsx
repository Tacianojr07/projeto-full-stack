import { NativeBaseProvider,VStack,Text, StatusBar} from "native-base";
import {useFonts, Roboto_400Regular,Roboto_500Medium, Roboto_700Bold} from "@expo-google-fonts/roboto"

import { Routes } from "./src/routes/index";
import { Loading } from "./src/components/Loading";

import { AuthContextProvider } from "./src/contexts/AuthContext";

import {THEME} from './src/styles/theme';




export default function App() {
  const [fontsLoaded] = useFonts({Roboto_400Regular,Roboto_500Medium,Roboto_700Bold})



  return (
    <NativeBaseProvider theme={THEME}>
      <AuthContextProvider>
        <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
        />
      
        {fontsLoaded ? <Routes />: <Loading />}
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}
