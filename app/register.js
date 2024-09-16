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
    ActivityIndicator
  } from 'react-native'
  import { useState,useEffect } from 'react'
  import Toast from 'react-native-toast-message';
  import { Input } from '@rneui/themed';
  import EmailIcon from 'react-native-vector-icons/MaterialCommunityIcons'
  import UserIcon from 'react-native-vector-icons/AntDesign'
import { router } from 'expo-router';
import { useContext } from 'react';
import { contextAuth } from '../contexts';
  export default function Register() {
  
  
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('')
    const { RegisterUser,loading} = useContext(contextAuth);

//sempre que acessar a tela limpa os campos
useEffect(()=> {
  setEmail('')
  setPassword('')
  setName('')
},[])

    function Autentication() {
      if (name!==''&&email!=='' && password!=='') {
        
       RegisterUser(name,email,password);
      } else {
        Toast.show({
          type:'info',
          text1:'Preencha os campos vazios'
        })
      }
    }


    
    return (
   <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
  
      <KeyboardAvoidingView behavior='height' style={styles.container}>
  
        <View style={styles.imageContain}>
      <Image
      source={require('../assets/logo.png')}
     
      style={{width:150, height:150}}
      
      />
        </View>
        <Toast/>
        <View style={styles.form}>
          <Text style={styles.title}>Criar uma conta</Text>
  
          <View style={styles.spaceTextInput}>
          <Input
            value={name}
            onChangeText={(e)=> setName(e)}
           containerStyle={styles.textInput}
           placeholder='Digite seu nome'
           leftIcon={<UserIcon name='user' size={24} color={'grey'}/>}
          />
          <Input
            value={email}
            onChangeText={(e)=> setEmail(e)}
           containerStyle={styles.textInput}
           placeholder='Digite seu email'
           leftIcon={<EmailIcon name='email-outline' size={24} color={'grey'}/>}
          />
        
              <Input
               value={password}
               onChangeText={(e)=> setPassword(e)}
            placeholder='Crie uma senha '
            containerStyle={styles.textInput}
            leftIcon={<EmailIcon name='lock-outline' size={24} color={'grey'}/>}
            />
          
              <TouchableOpacity  style={styles.button}
               onPress={Autentication}
              >

                {
                  loading ? <ActivityIndicator color={'white'}/> :
                  <Text
                 
                  style={{
                    color: 'white',
                    fontSize: 20,
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  Criar conta
                </Text>
                }
                
              </TouchableOpacity>
           
              <TouchableOpacity 
              onPress={()=> router.push('/login')}
              >
                <Text
                 
                >
                  Já tem uma conta? 
                </Text>
              </TouchableOpacity>
            <View>
            </View>
          </View>
        </View>
        <Toast />
      </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    )
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#4073C8'
    },
    imageContain: {
      flex: 1,
      backgroundColor: '#4073C8',
      justifyContent: 'center',
      alignItems: 'center'
    },
    form: {
     
      flex: 2,
      backgroundColor: 'white',
      borderTopLeftRadius: 35,
      borderTopRightRadius: 35
    },
    spaceTextInput: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
      gap: 10
    },
    textInput: {
     
      width:370,
      fontSize: 18
    },
    title: {
      textAlign: 'left',
      marginLeft: 35,
      marginTop: 20,
      fontSize: 22,
      color: '#4073C8',
  
    },
    button: {
      backgroundColor: '#4073C8',
      color: 'white',
      width: 350,
      height: 40,
      borderRadius: 10,
      justifyContent: 'center'
    },
    shop: {
      marginTop: 20,
      display: 'flex',
      flexDirection: 'row',
      gap: 20,
      justifyContent: 'center'
    }
  })