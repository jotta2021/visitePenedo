
import { createContext, useState,useEffect } from "react";
import { db,auth } from '../services/configFirebase'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import  {doc,setDoc, getDoc} from 'firebase/firestore'
import Toast from 'react-native-toast-message';
import { router, Router } from 'expo-router';

import * as Location from 'expo-location';

export const contextAuth = createContext({})





export default function ContextProvider({children}){

const [loading,setLoading] = useState(false)
const [userData,setUserData] = useState([])
//armazena o local que foi selecionado
const [selectItem,setSelectItem] = useState([])
const [search,setSearch] =useState('')
const [category,setCategory] = useState('')
const [keysCategory,setKeysCategory] = useState('')

const [location, setLocation] = useState(null);
const [errorMsg, setErrorMsg] = useState(null);








// função responsavel para pedir ao usuário permissão para acessar sua localização
useEffect(() => {
  (async () => {
    
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permissão para acessar a localização foi negada.');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  })();
}, []);









    async function RegisterUser(name,email,password){
        setLoading(true)
await createUserWithEmailAndPassword(auth,email,password)
.then(async (res)=> {
const uid  =res.user.uid;
await setDoc(doc(db,"user", uid),{
    name:name,
    email:email,
    uid:uid
}).then((res)=> {
    Toast.show({
        text1:'Obaa! sua conta foi criada',
        type:'success'
    })
    setLoading(false)
    router.push('/login')
}).catch((error)=> {
    setLoading(false)
    Toast.show({
        text1:'Oops! ocorreu um erro no seu cadastro',
        type:'error'
    })
    console.log('erro ao cadastrar dados no banco', error)
})

})
.catch((error)=> {
 console.log(error.code)
 setLoading(false)
if(error.code==='auth/invalid-email'){
    Toast.show({
        text1:'Digite um email válido!',
        type:'error'
      })
}else if(error.code==='auth/weak-password'){
    Toast.show({
        text1:'Senha fraca',
        type:'error'
      }) 
}else if(error.code==='auth/email-already-in-use'){
    Toast.show({
        text1:'Este email já está em uso',
        type:'error'
      })  
}
})
    }

    async function LoginUser(email, password) {
        setLoading(true);
      
        try {
          // Tentativa de login
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
         
      
          const uid = userCredential.user.uid;
          const docRef = doc(db, 'user', uid);
          const docSnap = await getDoc(docRef);
      
          if (docSnap.exists()) {
            let data = {
              name: docSnap.data().name || '',
              email: docSnap.data().email || '',
              uid: uid,
            };
            
            setUserData(data);
            router.push('/main/home');
          } else {
            console.log("Usuário não encontrado no Firestore");
          }
        } catch (error) {
          if (error.code === "auth/wrong-password") {
            Toast.show({
              text1: "Senha inválida",
              type: 'error'
            });
          } else if (error.code === "auth/invalid-email") {
            Toast.show({
              text1: "Email inválido",
              type: 'error'
            });
          } 
          else if(error.code ==='auth/invalid-credential'){
            Toast.show({
                text1: "Email ou senha incorretos",
                type: 'error'
              });
          }
          else {
            console.error("Erro desconhecido:", error);
          }
        } finally {
          setLoading(false);
        }
      }
      




return(


<contextAuth.Provider value={{loading, LoginUser, RegisterUser, userData,search,setSearch,
  selectItem,setSelectItem, location,setLocation,category,setCategory,keysCategory,setKeysCategory
}}>
    {children}
</contextAuth.Provider>


)


}