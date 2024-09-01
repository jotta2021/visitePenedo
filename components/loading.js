import React from 'react';
import { View ,Text,StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
// import { Container } from './styles';
import LoadingImg from './../assets/loading.json'
const Loading = () => {
  return (
    <View style={styles.containerLoading}>
    <LottieView
style={{width:200, height:200}}
autoPlay
loop
source={LoadingImg}

/> 
<Text style={{marginTop:-50}}>Carregando...</Text>
</View>
  )
}

export default Loading;

const styles = StyleSheet.create({
    container:{
   
       marginTop:12,
       marginStart:20,
       marginEnd:20,
   
    },
    header:{
        alignItems:'center'
    },
    content:{
        marginTop:20
    },
    title:{
        fontSize:18
    },
    listHoteis:{
       
    },
    containerLoading:{
        alignItems:'center',
        justifyContent:'center',
        marginTop:'40%'
    }
})