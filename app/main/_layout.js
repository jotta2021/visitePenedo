import { Stack } from "expo-router";
import { useContext } from "react";
import { contextAuth } from "../../contexts";
import Toast from "react-native-toast-message";
export default function RootLayout(){

    const{userData, selectItem,search,category} = useContext(contextAuth)
    return(
        <Stack>
          
           <Toast/>
         <Stack.Screen name="(drawer)" options={{
        headerShown:false,
        
        }}/>
          <Stack.Screen name="localePage" options={{
            title:`${selectItem?.displayName?.text}`,
           headerBackTitleVisible:false
        
        }}/>
              <Stack.Screen name="SearchResults" options={{
            title:`Resultados para ${search || category}`,
           headerBackTitleVisible:false
        
        }}/>

<Stack.Screen name="screenMap" options={{
             title:`${selectItem?.displayName?.text}`,
           headerBackTitleVisible:false
        
        }}/>
        <Stack.Screen name="Hours" options={{
    title:`${selectItem?.displayName?.text}`,
         headerBackTitleVisible:false
        }}/>
        </Stack>
    )
}