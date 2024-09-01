import {
    View,
    StyleSheet,
    Image,
    ActivityIndicator,
    SafeAreaView,
  } from "react-native";
  
  import { router } from "expo-router";
  import { useEffect } from "react";
  export default function SplashScreen() {
  
  
  useEffect(()=> {
  setTimeout(()=> {
  router.push('/login');
  },300)
  
  },[])
  
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
  