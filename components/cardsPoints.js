import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Card } from '@rneui/themed';

import axios from 'axios';


const CardPoints = ({ data }) => {
  const [imageUrl, setImageUrl] = useState(null);

  // Se o nome do local for muito grande, adiciona reticências
  const handleTitle = (value) => {
    if (value.length > 30) {
      return value.substring(0, 30) + '...'; // Pega os primeiros 20 caracteres e adiciona "..."
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
      <View style={{alignItems:'center'}}>
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            style={styles.img}
            blurRadius={2}
          />
        ) : (
          <Image
            source={require('./../assets/img_referencia.jpg')}
            style={styles.img}
          />
        )}

<View style={styles.info}>
        <Text style={styles.title}>{handleTitle(data?.displayName.text)}</Text>
      
      </View>
      </View>

     
    </Card>
  );
};

export default CardPoints;

const styles = StyleSheet.create({
  card: {
    width: 150,
    height: 150,
    borderRadius: 10,
    flex: 1,
    position:'relative',
    padding:0,
    marginRight:80
  },
  img: {
    objectFit: 'cover',
    width: 230,
    height: 220,
    
  
  },
  info: {
    position:'absolute',
    zIndex:10,
    justifyContent:'center',
    marginTop:30
    
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
  },
  rating: {
    marginTop: 50,
    width: 10,
  },
});
