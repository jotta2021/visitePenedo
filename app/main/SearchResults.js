import React, { useContext, useEffect, useState } from "react";
import { FlatList, SafeAreaView, View,Text } from "react-native";
import { contextAuth } from "../../contexts";
import axios from "axios";
import api from "../../services/api";
import Toast from "react-native-toast-message";
import CardSearchResults from "../../components/CardSearchResults";
import Loading from "../../components/loading";
import { StyleSheet } from "react-native";
// import { Container } from './styles';

const searchResults = () => {
  const { search, setSearch ,selectItem,setSelectItem ,category,keysCategory} = useContext(contextAuth);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getData() {
    const data = {
      textQuery: `${keysCategory || search} Penedo Alagoas`,

    };
    await axios
      .post(`${api}`, data, {
        headers: {
          "Content-Type": "application/json",
          "X-Goog-FieldMask":
            "places.displayName,places.rating,places.photos,places.formattedAddress,places.reviews,places.internationalPhoneNumber,places.regularOpeningHours,places.location",
          "X-Goog-Api-Key": "AIzaSyArpFGX90C-AtHaXwioqhTpe_kl1c1v-BY",
          "languageCode": "pt-BR",
        },
      })
      .then((res) => {
        setData(res.data);
        setLoading(false);
        
     
      })
      .catch((error) => {
        Toast.show({
          text1: "Erro ao realizar busca, tente novamente",
          type: "error",
        });
        setLoading(false);
      });
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView >
      <Toast/>
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={data.places}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <CardSearchResults data={item} selectItem={selectItem} setSelectItem={setSelectItem} />}
        />
      )}

      {
        data.length === 0 && loading===false &&
        <Text style={styles.notFound} >Oops! parece que nada foi encontrado.</Text>
      }
    </SafeAreaView>
  );
};

export default searchResults;


const styles = StyleSheet.create({
  notFound: {
    textAlign:'center',
    fontWeight:'500'
  }
})