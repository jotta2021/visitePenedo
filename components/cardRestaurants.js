import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button, Card } from '@rneui/themed';
import { Rating } from 'react-native-ratings';
import axios from 'axios';
import api from '../services/api';
import { router } from 'expo-router';
const CardRestaurants = ({ data,selectItem,setSelectItem }) => {
  const [imageUrl, setImageUrl] = useState(null);

  // Se o nome do local for muito grande, adiciona reticências
  const handleTitle = (value) => {
    if (value.length > 15) {
      return value.substring(0, 20) + '...'; // Pega os primeiros 20 caracteres e adiciona "..."
    }
    return value; // Retorna o título original se tiver 20 caracteres ou menos
  };

  // Função para buscar a URL da imagem
  const getImageUrl = async () => {
    try {
      const response = await axios.get(
        `https://places.googleapis.com/v1/${data.photos[0].name}/media?maxHeightPx=400&maxWidthPx=400&skipHttpRedirect=true`,
        {
          headers: {
            'X-Goog-Api-Key': 'AIzaSyArpFGX90C-AtHaXwioqhTpe_kl1c1v-BY',
          },
        }
      );

      if (response.data && response.data.photoUri) {
        setImageUrl(response.data.photoUri);
      }
    } catch (error) {
      console.log('Erro ao buscar imagem', error);
    }
  };

  // Hook para buscar a imagem ao montar o componente
  useEffect(() => {
    if (data?.photos && data.photos.length > 0) {
      getImageUrl();
    }
  }, [data]);

  return (
    <Card containerStyle={styles.card}>
      <View >
           <View  style={styles.content}>
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            style={styles.img}
          />
        ) : (
          <Image
            source={require('./../assets/img_referencia.jpg')}
            style={styles.img}
          />
        )}
        <View style={styles.info}>
        <Text style={styles.title}>{handleTitle(data?.displayName.text)}  </Text>
       
      </View>
      </View >

<View style={styles.containerButton}>
    <Button buttonStyle={styles.button} 
  onPress={()=> {setSelectItem(data)
    router.push('/home/localePage')
    
          }}
    >Visitar</Button>
</View>
      

      
      
      </View>
    </Card>  

     
  );
};

export default CardRestaurants;

const styles = StyleSheet.create({
  card: {
    width: 230,
    
    borderRadius: 6,
    flex: 1,
    flexDirection:'row',
    paddingHorizontal:5
  },
  img: {
    objectFit: 'cover',
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  info: {
    marginTop: 10,
   
  },
  title: {
    fontSize:16,
    flexWrap:'wrap',
 width:140,
 color:'grey'
  },
  rating: {
    marginTop: 50,
    width: 10,
  },
  content:{
    flexDirection:'row',
    gap:10

  },
  containerButton:{
alignItems:'center',
justifyContent:'center',
marginTop:5
  },
  button:{
    backgroundColor:'#CC4848',
    borderRadius:10,
    width:200,
    height:40,
  }
});
