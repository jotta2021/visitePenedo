import React, { useContext, useEffect, useState } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { contextAuth } from "../../contexts";
import axios from "axios";
import api from "../../services/api";
import Toast from "react-native-toast-message";
import CardSearchResults from "../../components/CardSearchResults";
import Loading from "../../components/loading";

// import { Container } from './styles';

const searchResults = () => {
  const { search, setSearch ,selectItem,setSelectItem} = useContext(contextAuth);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getData() {
    const data = {
      textQuery: search,
      locationBias: {
        circle: {
          center: {
            latitude: -10.2874,
            longitude: -36.5824,
          },
          radius: 500.0,
        },
      },
    };
    await axios
      .post(`${api}`, data, {
        headers: {
          "Content-Type": "application/json",
          "X-Goog-FieldMask":
            "places.displayName,places.rating,places.photos,places.formattedAddress,places.reviews,places.internationalPhoneNumber,places.regularOpeningHours",
          "X-Goog-Api-Key": "AIzaSyArpFGX90C-AtHaXwioqhTpe_kl1c1v-BY",

          languageCode: "pt-BR",
        },
      })
      .then((res) => {
        setData(res.data);
        setLoading(false);
     
      })
      .catch((error) => {
        Toast.show({
          text1: "Erro ao realizar busca",
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
    </SafeAreaView>
  );
};

export default searchResults;
