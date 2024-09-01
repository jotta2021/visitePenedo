import { Stack } from "expo-router";
import { useContext } from "react";
import { contextAuth } from "../../contexts";
export default function RootLayout(){

    const{userData, selectItem} = useContext(contextAuth)
    return(
        <Stack>
         <Stack.Screen name="home" options={{
            title:`Olá, ${userData?.name} `,
            headerBackVisible:false,
        
        }}/>
          <Stack.Screen name="localePage" options={{
            title:`${selectItem?.displayName?.text}`,
           headerBackTitleVisible:false
        
        }}/>
        </Stack>
    )
}