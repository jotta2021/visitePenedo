import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  ScrollView,
} from "react-native";
import axios from "axios";
import Toast from "react-native-toast-message";
import CardHoteis from "../../components/cardHoteis";
import SearchBar from "../../components/searhBar";
import api from "../../services/api";
import CardRestaurants from "../../components/cardRestaurants";
import getHoteis from "../../helpers/getHoteis";
import getRestaurants from "../../helpers/getRestaurants";
import getTouristics from "../../helpers/getTouristcs";
import CardPoints from "../../components/cardsPoints";

import LottieView from "lottie-react-native";

import { contextAuth } from "../../contexts";
import Loading from "../../components/loading";
export default function Home() {
  const [search, setSearch] = useState("");
  // armazena a lista de hoteis
  const [listHoteis, setListHoteis] = useState([]);
  const [listRestaurants, setListRestaurants] = useState([]);
  const [points, setPoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const { selectItem, setSelectItem } = useContext(contextAuth);

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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <SearchBar value={search} onChangeText={setSearch} />
        </View>

        {loading ? (
          <Loading loading />
        ) : (
          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.title}>Hotéis e Pousadas em Penedo </Text>

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
              Opções de locais para ir{" "}
            </Text>

            <FlatList
              data={listRestaurants.places}
              contentContainerStyle={styles.listHoteis}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) =>
                 <CardRestaurants data={item} 
                 selectItem={selectItem}
                 setSelectItem={setSelectItem}
                 />
            
            }
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
    marginEnd:10,
    marginStart:10

  },
  header: {
    alignItems: "center",
  },
  content: {
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    marginStart:20
  },
  listHoteis: {},
  containerLoading: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: "40%",
  },
});
