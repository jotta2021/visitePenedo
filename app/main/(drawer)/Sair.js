import React , {useContext, useEffect} from 'react';
import { View } from 'react-native';
import { contextAuth } from '../../../contexts';
import { router } from 'expo-router';
// import { Container } from './styles';

const Logout = () => {
const {userData,setUserData} = useContext(contextAuth)
  //realiza a funcao de logout do aplicativo
useEffect(()=> {
setUserData([])
router.replace('/login')
},[])
  return <View />;
}

export default Logout;