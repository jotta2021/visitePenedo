import React, { useState } from 'react';
import { View, Text, Dimensions, Image, StyleSheet } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const SwiperPhotos = ({ data }) => {
  const width = Dimensions.get('window').width;
  const [currentIndex, setCurrentIndex] = useState(0); // Estado para o índice atual

  return (
    <GestureHandlerRootView style={{position:'relative'}}>
      <Carousel
        loop
        width={width}
        height={350}
        autoPlay={false}
        data={data}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => setCurrentIndex(index)} // Atualiza o índice atual
        renderItem={({ item, index }) => (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}
            key={index}
          >
            <Image source={{ uri: item }} style={{ width: width, height: 350, objectFit:'' }} />
            
          </View>
        )}
      />

      {/* Indicadores de página */}
      <View style={styles.indicatorContainer}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              currentIndex === index && styles.activeIndicator, // Estilo do indicador ativo
            ]}
          />
        ))}
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    position:'absolute',
    bottom:20,
    right:0,
    left:0
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeIndicator: {
    backgroundColor: '#000', // Cor do indicador ativo
  },
});

export default SwiperPhotos;
