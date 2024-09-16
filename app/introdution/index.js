import React from 'react';
import { StyleSheet, View, Text,Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconArrow from 'react-native-vector-icons/MaterialIcons'
import AppIntroSlider from 'react-native-app-intro-slider';
import Check from 'react-native-vector-icons/AntDesign'
import { router } from 'expo-router';
const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginHorizontal: 20,
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image:{
    width:250,
    height:250,
    objectFit:'cover',
    marginBottom:10
  }
});

const slides = [
  {
    key: 'one',
    title: 'Bem-vindo a Penedo!',
    text: 'Experiências Únicas Esperam por Você.',
    image:require('../../assets/cidade.png'),
    backgroundColor: '#4073C8',
  },
  {
    key: 'two',
    title: 'Não sabe onde ficar?',
    text: 'Você irá encontrar os melhores hotéis e pousadas da cidade.',
    image:require('../../assets/hotel-intro.png'),
    backgroundColor: '#4073C8',
  },
  {
    key: 'three',
    title: 'Mapas interativos',
    text: "Saiba como chegar aos locais desejados.",
    image:require('../../assets/mapa-da-cidade.png'),
    backgroundColor: '#22bcb5',
  },
];

export default class App extends React.Component {
  _renderItem = ({ item }) => {
    return (

      <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
      
        <Image
        source={item.image}
        style={styles.image}
        />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
        
      </View>
    );
  };

  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <IconArrow
          name="arrow-forward-ios"
          color="rgba(255, 255, 255, .9)"
          size={24}
        />
      </View>
    );
  };

  _renderDoneButton = () => {
    return (
      <TouchableOpacity style={styles.buttonCircle}
      onPress={()=> router.replace('/login')}
      >
        <Check
          name="check"
          color="rgba(255, 255, 255, .9)"
          size={24}
        />
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <AppIntroSlider
        renderItem={this._renderItem}
        data={slides}
        renderDoneButton={this._renderDoneButton}
        renderNextButton={this._renderNextButton}
      />
    );
  }
}
