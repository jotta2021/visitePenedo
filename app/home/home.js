import React,{useState, useEffect} from 'react';
import { View,Text, SafeAreaView, StyleSheet, FlatList, ScrollView } from 'react-native';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import CardHoteis from '../../components/cardHoteis';
import SearchBar from '../../components/searhBar';
import api from '../../services/api';
import CardRestaurants from '../../components/cardRestaurants'
import getHoteis from '../../helpers/getHoteis';
import getRestaurants from '../../helpers/getRestaurants';
import getTouristics from '../../helpers/getTouristcs';
import CardPoints from '../../components/cardsPoints';
export default function Home(){
const [search,setSearch] = useState('');
// armazena a lista de hoteis
const [listHoteis,setListHoteis] = useState([])
const [listRestaurants,setListRestaurants] = useState([])
const [points,setPoints] = useState([])



useEffect(()=> {
    getHoteis() 
    .then((res)=> { 
        console.log('res', res)
        setListHoteis(res.data)
        })
        .catch((error)=> {
            Toast.show({
                text1:'Erro ao buscar estabelecimentos',
                type:'error'
            })
            console.log('error', error)
        })



        getRestaurants() 
        .then((res)=> { 
            console.log('res', res)
            setListRestaurants(res.data)
            })
            .catch((error)=> {
                Toast.show({
                    text1:'Erro ao buscar estabelecimentos',
                    type:'error'
                })
                console.log('error', error)
            })

            getTouristics() 
            .then((res)=> { 
                console.log('res', res)
                setPoints(res.data)
                })
                .catch((error)=> {
                    Toast.show({
                        text1:'Erro ao buscar pontos turísticos',
                        type:'error'
                    })
                    console.log('error', error)
                })
},[])

return(
    <SafeAreaView style={{flex:1, backgroundColor:'white'}}>
    <View style={styles.container}>
        <View style={styles.header}>
              <SearchBar
        value={search}
        onChangeText={setSearch}
        />
        </View>
      
<ScrollView style={styles.content}
showsVerticalScrollIndicator={false}
>
    <Text style={styles.title}>Hotéis e Pousadas em Penedo </Text>

    <FlatList
          data={listHoteis.places}
          contentContainerStyle={styles.listHoteis}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
       
          <CardHoteis data={item}/>
          )}
        />

<Text style={[styles.title,{marginTop:20}]}>Opções de locais para ir </Text>

<FlatList
          data={listRestaurants.places}
          contentContainerStyle={styles.listHoteis}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
       
          <CardRestaurants data={item}/>
          )}
        />

<Text style={[styles.title,{marginTop:20}]}>Pontos turísticos </Text>
<FlatList
          data={points.places}
          contentContainerStyle={styles.listHoteis}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
       
          <CardPoints data={item}/>
          )}
        />
</ScrollView>

    </View>
    </SafeAreaView>
)
}

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
       
    }
})
