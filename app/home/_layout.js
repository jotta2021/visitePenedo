import { Stack } from "expo-router";
import { useContext } from "react";
import { contextAuth } from "../../contexts";
import Toast from "react-native-toast-message";
export default function RootLayout(){

    const{userData, selectItem} = useContext(contextAuth)
    return(
        <Stack>
           <Toast/>
         <Stack.Screen name="home" options={{
            title:`Olá, ${userData?.name} `,
            headerBackVisible:false,
        
        }}/>
          <Stack.Screen name="localePage" options={{
            title:`${selectItem?.displayName?.text}`,
           headerBackTitleVisible:false
        
        }}/>
              <Stack.Screen name="SearchResults" options={{
            title:'Resultados',
           headerBackTitleVisible:false
        
        }}/>

<Stack.Screen name="screenMap" options={{
             title:`${selectItem?.displayName?.text}`,
           headerBackTitleVisible:false
        
        }}/>
        </Stack>
    )
}