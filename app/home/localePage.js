import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, ScrollView, StyleSheet, FlatList, TextInput,Linking } from "react-native";
import { contextAuth } from "../../contexts";
import axios from "axios";
import SwiperPhotos from "../../components/SwiperPhotos";
import Loading from "../../components/loading";
import { Button } from "@rneui/themed";
import Phone from "react-native-vector-icons/Feather";
import Reviews from "../../components/reviews";
import { Dialog } from "@rneui/themed";
import { router } from "expo-router";
const LocalePage = () => {
  const { selectItem } = useContext(contextAuth);
  const [imageUris, setImageUris] = useState([]); // Array para armazenar URLs das imagens
  const [loading, setLoading] = useState(false);
  const [openContact,setOpenContact] = useState(false)
  const [message,setMessage] =useState('Olá, gostaria de informações sobre reserva.')
  // Função para buscar a URL da imagem


  const getImageUrls = async () => {
    setLoading(true);
    try {
      const photos = selectItem.photos.slice(0, 5); // Pegar no máximo 5 fotos
      const promises = photos.map(async (photo) => {
        const response = await axios.get(
          `https://places.googleapis.com/v1/${photo.name}/media?maxHeightPx=400&maxWidthPx=400&skipHttpRedirect=true`,
          {
            headers: {
              "X-Goog-Api-Key": "AIzaSyArpFGX90C-AtHaXwioqhTpe_kl1c1v-BY",
            },
          }
        );
        setLoading(false);
        return response.data && response.data.photoUri
          ? response.data.photoUri
          : null;
      });

      const imageUrls = await Promise.all(promises);
      setImageUris(imageUrls.filter((uri) => uri)); // Filtra URLs válidas
    } catch (error) {
      setLoading(false);
      console.log("Erro ao buscar imagens", error);
    }
  };

  // Hook para buscar as imagens ao montar o componente
  useEffect(() => {
if (Array.isArray(selectItem?.photos) && selectItem.photos.length > 0) {
  getImageUrls();
}

  }, [selectItem]);
// funcao pra enfiar mensagem no whatsapp

const openWhatsApp = () => {

    function formatPhoneNumber(phoneNumber) {
        // Remove todos os caracteres que não sejam números
        const formattedNumber = phoneNumber.replace(/[^0-9]/g, '');
        return formattedNumber;
      }
      
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/${formatPhoneNumber(selectItem.internationalPhoneNumber)}?text=${encodedMessage}`;
  
    Linking.openURL(whatsappLink).catch((err) =>
      console.error('Erro ao abrir o WhatsApp', err)
    );
  };


  return (
    <ScrollView style={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <View>

          {
            imageUris && imageUris.length>0 &&
            <SwiperPhotos data={imageUris} />
          }
          

          <View style={styles.content}>
            <Text style={styles.title}>{selectItem.displayName.text}</Text>

            {
              selectItem.regularOpeningHours &&
              <View style={styles.status}>
              <View style={ selectItem.regularOpeningHours.openNow ===true ? styles.circle : styles.circleClose}></View>
                <Text style={selectItem.regularOpeningHours.openNow ===true ? styles.open : styles.close}>{selectItem.regularOpeningHours.openNow ===true ? 'Aberto' : 'Fechado'}</Text>
            </View>
            }
            
          
            <Text style={styles.adress}>{selectItem?.formattedAddress}</Text>

            <View style={styles.containerButton}>
              {
                selectItem.internationalPhoneNumber && selectItem.internationalPhoneNumber!=='' &&
                    <Button buttonStyle={styles.buttonContact}
              onPress={()=> setOpenContact(true)}
              >
                <Phone name="phone" size={18} color="white" />
                Contato
              </Button>
              }
          
              <Button buttonStyle={styles.buttonLocale}
              onPress={()=> router.push('/home/screenMap')}
              >Como chegar</Button>
            </View>

            <View style={styles.ratingContainer}>
                <Text style={styles.ratingTitle}>Avaliações</Text>
           <View style={{borderTopWidth:1, borderColor:'#e6e6e6',paddingVertical:10}}> 

        
           
           <FlatList
           data={selectItem.reviews}
           keyExtractor={(item,index)=> index.toString()}
           renderItem={({item})=> (
           <Reviews data={item}/>
           )}
           />
              </View>
           
            </View>
          </View>
        </View>
      )}

{
    openContact && 
       <Dialog onBackdropPress={()=> setOpenContact(false)}
      backdropStyle={{borderRadius:10}}
        
        >
        <View style={styles.modal}>
    <Text style={styles.titleModal}>Contato</Text>
<Text style={styles.subtitleModal}>Entre em contato para realizar uma reserva</Text>        
       
       <View>
        <TextInput
        style={styles.input}
        multiline
        value={message}
        onChangeText={(text)=> setMessage(text)}

        />
         <Button buttonStyle={[styles.buttonLocale,{marginTop:10}]}
         onPress={openWhatsApp}
         >Enviar mensagem</Button>
       </View>
       
       
        </View>

      </Dialog>
}
  
    </ScrollView>
  );
};

export default LocalePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    marginStart: 10,
    marginEnd: 10,
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    color: "grey",
  },
  adress: {
    color: "grey",
  },
  containerButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  buttonContact: {
    backgroundColor: "#4072C7",
    borderRadius: 10,
    gap: 5,
  },
  buttonLocale: {
    backgroundColor: "#81D672",
    borderRadius: 10,
  },
  ratingContainer:{
marginTop:15, 
  },
  ratingTitle:{
    color:'grey',
    fontSize:18,
  
  },
  modal:{
alignItems:'center'
  },
  titleModal:{
    fontSize:20,
    fontWeight:'500',
    color:'black'
  },
  subtitleModal:{
    fontSize:12
  },
  input:{
    borderWidth:1,
    borderColor:'#e6e6e6',
height:100,
width:250,
marginTop:10,
borderRadius:10,
flexWrap:'wrap'
  },
  status:{
flexDirection:'row',
alignItems:'center',
gap:2
  },
  circle:{
    width:8,
    height:8,
    backgroundColor:'#14870c',
    borderRadius:24
  },
  circleClose:{
    width:8,
    height:8,
    backgroundColor:'red',
    borderRadius:24
  },
  open:{
    color:'#14870c',
    fontWeight:'500'
  },
  close:{
     color:'red',
    fontWeight:'500'
  }
});
