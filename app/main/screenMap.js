import React, { useContext, useEffect, useRef } from 'react';
import { View,Text } from 'react-native';
import { contextAuth } from '../../contexts';
import MapView,{Marker} from 'react-native-maps'
import {LocationAccuracy, watchPositionAsync} from 'expo-location'
import MapViewDirections from 'react-native-maps-directions';
// import { Container } from './styles';

const ScreenMap = () => {
    const {location,setLocation,selectItem} = useContext(contextAuth);
    const mapRef = useRef(MapView);
    //location é a localizção do usuário
useEffect(()=> {
watchPositionAsync({
    accuracy: LocationAccuracy.Highest,
    timeInterval:1000,
    distanceInterval:1
}, (response)=> {
    
 setLocation(response);

 /** 
 mapRef.current?.animateCamera({
    center: {
      latitude: response.coords.latitude,
      longitude: response.coords.longitude,
    },
  });
})*/
})

},[])


const key=`AIzaSyArpFGX90C-AtHaXwioqhTpe_kl1c1v-BY`
  return (
    <View>
        
        <MapView style={{width:'100%', height:'100%'}}
        ref={mapRef}
        initialRegion={{
            latitude:location.coords.latitude,
            longitude:location.coords.longitude,
            latitudeDelta:0.005,
            longitudeDelta:0.005
        }}
        
        >

            <MapViewDirections
           origin={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          destination={{
            latitude:selectItem.location.latitude,
            longitude:selectItem.location.longitude,
          }}
          apikey={key}
          strokeWidth={4}
          strokeColor="blue"
          onReady={(result) => {
            console.log(`Distância: ${result.distance} km`);
            console.log(`Duração: ${result.duration} min.`);
          }}
            />
              <Marker
            coordinate={{
                latitude:selectItem.location.latitude,
                longitude:selectItem.location.longitude,
            }}
            title={selectItem.displayName?.text }
           
            pinColor='blue'
            />
            <Marker
            coordinate={{
                latitude:location.coords.latitude,
                longitude:location.coords.longitude,
            }}
            title="Sua localização"
            description="Você está aqui"
            />
        </MapView>
    </View>
  )
}

export default ScreenMap;