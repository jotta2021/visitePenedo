import { Button, Input } from '@rneui/themed';
import React from 'react';
import { View,StyleSheet, TextInput, SafeAreaView } from 'react-native';
import Search from 'react-native-vector-icons/AntDesign'
// import { Container } from './styles';

export default function SearchBar({value,onChangeText,onPress}){
    return (
        <SafeAreaView style={styles.container}>


            
            <TextInput
    placeholder='Onde você quer ir?'
    style={styles.input}
    value={value}
    onChangeText={onChangeText}
   
    /> 
    <Button buttonStyle={styles.button}
    onPress={onPress}
    >
<Search name='search1' size={24} color={'white'}/>
    </Button>
        </SafeAreaView>
    )
   
}


const styles = StyleSheet.create({
    container:{
       flexDirection:'row',
        alignItems:'center',
        gap:6
    },
input:{
    borderWidth:0.3,
    borderRadius:6,
    width:300,
    height:50,
    backgroundColor:'#e9e9e9',
    paddingVertical:8,
    fontSize:16,
    paddingHorizontal:10

},
button:{
    borderRadius:6,
width:50,
height:50
}

})