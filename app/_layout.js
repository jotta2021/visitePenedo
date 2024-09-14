import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import ContextProvider from "../contexts";
import { useContext } from "react";
import { contextAuth } from "../contexts";
// import { Container } from './styles';
export default function Layout(){

    const {userData} = useContext(contextAuth)
    
    return(
        <ContextProvider>


       <Stack>
         <Toast />
        <Stack.Screen name="index" options={{headerShown:false}}/>
        <Stack.Screen name="login" options={{headerShown:false}}/>
        <Stack.Screen name="register" options={{headerShown:false}}/>
        <Stack.Screen name="main" options={{headerShown:false}}/>
    </Stack>  
    </ContextProvider>
    )
   
}