import {
    View,
    Text,
    StatusBar,
    StyleSheet,
    Image,
    TextInput,
    ScrollView,
    Button,
    TouchableOpacity,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    ActivityIndicator,
  } from "react-native";
  
  import { useContext, useEffect, useState } from "react";
import Toast from "react-native-toast-message";
  import { Input } from "@rneui/themed";
  import EmailIcon from "react-native-vector-icons/MaterialCommunityIcons";
  import { router, useNavigation } from "expo-router";
import { contextAuth } from "../contexts";
  export default function Index() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {LoginUser,loading, userData} =useContext(contextAuth);
    const navigation = useNavigation();

//sempre que acessar a tela limpa os campos


useEffect(()=> {
  setEmail('')
  setPassword('')
},[])

    function Autentication() {
      if (email !== "" && password !== "") {
    
   
    
    LoginUser(email,password);
      } else {
        Toast.show({
          type: "info",
          text1: "Preencha os campos vazios",
        });
      }
    }
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Toast/>
          <View style={styles.imageContain}>
            <Image
              source={require('../assets/logo.png')}
              style={{ width: 150, height: 150 }}
            />
          </View>
          <View style={styles.form}>
            <Text style={styles.title}>Seja bem vindo!</Text>
  
            <View style={styles.spaceTextInput}>
              <Input
                value={email}
                onChangeText={(e)=> setEmail(e)}
                containerStyle={styles.textInput}
                placeholder="Digite seu email"
                leftIcon={
                  <EmailIcon name="email-outline" size={24} color={"grey"} />
                }
              />
  
              <Input
                value={password}
                onChangeText={(e)=> setPassword(e)}
                secureTextEntry
                placeholder="Digite sua senha "
                containerStyle={styles.textInput}
                leftIcon={
                  <EmailIcon name="lock-outline" size={24} color={"grey"} />
                }
              />
  
              <TouchableOpacity style={styles.button} onPress={Autentication}>
                {
                  loading ? <ActivityIndicator color={'white'}/> :
                    <Text
                  style={{
                    color: "white",
                    fontSize: 20,
                    textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Entrar
                </Text>
                }
              
              </TouchableOpacity>
  
              <View>

              <TouchableOpacity 
              onPress={()=> router.push('/register')}
              >
                <Text
                 
                >
                  Ainda não tem uma conta? Cadastre-se
                </Text>
              </TouchableOpacity>
              </View>
            </View>
          </View>
          <Toast />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#4073C8",
    },
    imageContain: {
      flex: 2,
      backgroundColor: "#4073C8",
      justifyContent: "center",
      alignItems: "center",
    },
    form: {
      flex: 2,
      backgroundColor: "white",
      borderTopLeftRadius: 35,
      borderTopRightRadius: 35,
    },
    spaceTextInput: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: 20,
      gap: 10,
    },
    textInput: {
      width: 370,
      fontSize: 18,
    },
    title: {
      textAlign: "left",
      marginLeft: 35,
      marginTop: 20,
      fontSize: 22,
      color: "#4073C8",
    },
    button: {
      backgroundColor: "#4073C8",
      color: "white",
      width: 350,
      height: 40,
      borderRadius: 10,
      justifyContent: "center",
    },
    shop: {
      marginTop: 20,
      display: "flex",
      flexDirection: "row",
      gap: 20,
      justifyContent: "center",
    },
  });
  