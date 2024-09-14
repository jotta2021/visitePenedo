import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import Toast from "react-native-toast-message";
import CardHoteis from '../../../components/cardHoteis'
import SearchBar from "../../../components/searhBar";
import api from "../../../services/api";
import CardRestaurantes from '../../../components/cardRestaurants'
import getHoteis from "../../../helpers/getHoteis";
import getRestaurants from "../../../helpers/getRestaurants";
import getTouristics from "../../../helpers/getTouristcs";
import CardPoints from "../../../components/cardsPoints";
import Header from "../../../components/header";
import { contextAuth } from "../../../contexts";
import Loading from "../../../components/loading";
import { router } from "expo-router";
import HotelIcon from "../../../assets/hotel.png";
import RestaurantIcon from "../../../assets/restaurant.png";
import MercadoIcon from "../../../assets/mercado.png";
import FarmaciaIcon from "../../../assets/farmacia.png";
export default function Home() {
  // armazena a lista de hoteis
  const [listHoteis, setListHoteis] = useState([]);
  const [listRestaurants, setListRestaurants] = useState([]);
  const [points, setPoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const { selectItem, setSelectItem, search, setSearch ,keysCategory,setKeysCategory, category,setCategory} =
    useContext(contextAuth);
  const icons = [
    {
      id: 1,
      src: HotelIcon,
      title: "Hospedagem",
      keysSearch:'Hotels pousadas hospedagem'
    },
    {
      id: 2,
      src: RestaurantIcon,
      title: "Alimentação",
      keysSearch:'lanchonete restaurante pizzaria hamburgueria almoco'
    },
    {
      id: 3,
      src: MercadoIcon,
      title: "Compras",
       keysSearch:'mercado supermercado lojas '
    },
    {
      id: 3,
      src: FarmaciaIcon,
      title: "Farmácias",
       keysSearch:'remedios farmacias drogarias'
    },
  ];

  useEffect(() => {
    // Função para buscar todos os dados
    const fetchData = async () => {
      try {
        // Executa todas as funções em paralelo e espera todas serem resolvidas
        const [hoteisRes, restaurantsRes, touristicsRes] = await Promise.all([
          getHoteis(),
          getRestaurants(),
          getTouristics(),
        ]);

        // Manipula os dados recebidos de cada chamada

        setListHoteis(hoteisRes.data);

        setListRestaurants(restaurantsRes.data);

        setPoints(touristicsRes.data);
      } catch (error) {
        // Mostra uma mensagem de erro em caso de falha de qualquer chamada
        Toast.show({
          text1: "Erro ao buscar estabelecimentos ou pontos turísticos",
          type: "error",
        });
        console.log("error", error);
      } finally {
        // Define o loading como false após todas as requisições serem concluídas
        setLoading(false);
      }
    };

    fetchData(); // Chama a função ao montar o componente
  }, []);

  function SearhchItem() {
    setCategory('')
    setKeysCategory('')
    if (search !== "") {
      router.push("/main/SearchResults");
    } else{
      Toast.show({text1:'Preencha o campo de pesquisa', type:'info'})
    }
  }

  function SearchByCategory(){
    setSearch('')
      if (keysCategory !== "") {
      router.push("/main/SearchResults");
    } 
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Header />
      <Toast/>
      <View style={styles.container}>
        <View style={styles.header}>
          <SearchBar
            value={search}
            onChangeText={setSearch}
            onPress={SearhchItem}
          />
        </View>

        {loading ? (
          <Loading loading />
        ) : (
          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
          >
            <Text style={[styles.title ]}>Categorias</Text>
            <FlatList
              data={icons}
              contentContainerStyle={styles.listHoteis}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.containerIcons}
                onPress={()=> {
                  setKeysCategory(item.keysSearch)
               setCategory(item.title)
               SearchByCategory()
                }}
                >
                  <Image source={item.src} style={styles.icon} />
                  <Text style={styles.titleCategory}>{item.title}</Text>
                </TouchableOpacity>
              )}
            />

            <Text style={[styles.title,{marginTop:20}]}>Hotéis e Pousadas em Penedo </Text>

            <FlatList
              data={listHoteis.places}
              contentContainerStyle={styles.listHoteis}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <CardHoteis
                  data={item}
                  selectItem={selectItem}
                  setSelectItem={setSelectItem}
                />
              )}
            />
            <Text style={[styles.title, { marginTop: 20 }]}>
              Pontos turísticos{" "}
            </Text>
            <FlatList
              data={points.places}
              contentContainerStyle={styles.listHoteis}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => <CardPoints data={item} />}
            />
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 12,
    marginEnd: 10,
    marginStart: 10,
  },
  header: {
    alignItems: "center",
  },
  content: {
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    marginStart: 20,
    fontWeight: "500",
  },
  listHoteis: {},
  containerLoading: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: "40%",
  },
  icon: {
    width: 50,
    height: 50,
    objectFit: "cover",
  },
  containerIcons: {
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    paddingHorizontal: 8,
  },
  titleCategory: {
    fontSize: 15,
    color:'#4073C8'
  },
});
