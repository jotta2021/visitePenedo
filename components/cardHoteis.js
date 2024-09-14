import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Card } from '@rneui/themed';
import { Rating } from 'react-native-ratings';
import axios from 'axios';
import api from '../services/api';
import { router } from 'expo-router';

const CardHoteis = ({ data ,  selectItem,setSelectItem}) => {
  const [imageUrl, setImageUrl] = useState(null);

  // Se o nome do local for muito grande, adiciona reticências
  const handleTitle = (value) => {
    if (value.length > 20) {
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
      <TouchableOpacity
      onPress={()=> {setSelectItem(data)
router.push('/main/localePage')

      }}
      >
      <View>
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            style={styles.img}
          />
        ) : (
          <Image
            source={require('./../assets/sem-foto.png')}
            style={styles.img}
          />
        )}
      </View>

      <View style={styles.info}>
        <Text style={styles.title}>{handleTitle(data?.displayName.text)}</Text>
        <Rating
          type='custom'
          ratingCount={5}
          imageSize={14}
          startingValue={data?.rating}
          style={{ paddingVertical: 5, alignItems: 'flex-start' }}
          readonly
        />
      </View>
      </TouchableOpacity>
    </Card>
  );
};

export default CardHoteis;

const styles = StyleSheet.create({
  card: {
    width: 230,
    height: 220,
    borderRadius: 10,
    flex: 1,
  },
  img: {
    objectFit: 'cover',
    width: 200,
    height: 120,
    borderRadius: 10,
  },
  info: {
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
  },
  rating: {
    marginTop: 50,
    width: 10,
  },
});
