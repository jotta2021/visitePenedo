import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { contextAuth } from '../../contexts';

const Hours = () => {
  const { selectItem } = useContext(contextAuth);

  const hours = selectItem.regularOpeningHours.weekdayDescriptions;

  // Função para capitalizar a primeira letra de cada dia
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Horários de funcionamento</Text>
      <View style={styles.containerList}>
        <FlatList
          data={hours}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            // Separar o dia do horário
            const [day, time] = item.split(': ');
            return (
              <View style={styles.itemContainer}>
                <Text style={styles.day}>{capitalizeFirstLetter(day)}</Text>
                <Text style={styles.time}>{time}</Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

export default Hours;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginStart: 10,
    marginEnd: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  containerList: {
    marginTop: 20,
  },
  itemContainer: {
    marginBottom: 10, // Espaçamento entre cada item
  },
  day: {
    fontSize: 18,
    fontWeight: '500',
  },
  time: {
    fontSize: 16,
    color: 'gray', // Você pode ajustar o estilo do horário
  },
});
