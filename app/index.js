import {
    View,
    StyleSheet,
    Image,
    ActivityIndicator,
    SafeAreaView,
  } from "react-native";
  
  import { router } from "expo-router";
  import { useEffect,useContext } from "react";
  import AsyncStorage from "@react-native-async-storage/async-storage";
import { contextAuth } from "../contexts";
  export default function SplashScreen() {
  const {setUserData} = useContext(contextAuth)
  
  useEffect(()=> {


    const getUser = async () => {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        try {
          const data = JSON.parse(user);
          setUserData(data);
          router.push('/main/home');
        } catch (error) {
          console.error('Erro ao fazer parse do JSON:', error);
        }
      }
      else{
        setTimeout(()=> {
          router.replace('/introdution');
          },300)
          
      }
    };
  
    getUser();

  },[])

  // verifica se tem um usuario armazenado no localstorage


  
    return (
      <SafeAreaView style={styles.container} >
        
          <View style={styles.imageContain}>
            <Image
              source={require("./../assets/logo.png")}
              style={{ width: 150, height: 150 }}
            />
          </View>
       
         <ActivityIndicator size='large' color={'white'}/>
       
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#4073C8",
      alignItems:'center', 
      justifyContent:'center',
      gap:20
    },
    imageContain: {
    
      justifyContent: "center",
      alignItems: "center",
    }
   
  });
  