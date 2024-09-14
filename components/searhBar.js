import { Button, Input } from "@rneui/themed";
import React from "react";
import { View, StyleSheet, TextInput, SafeAreaView } from "react-native";
import Search from "react-native-vector-icons/AntDesign";
import Xicon from 'react-native-vector-icons/Feather'
// import { Container } from './styles';

export default function SearchBar({ value, onChangeText, onPress }) {
  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Onde você quer ir?"
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        keyboardType="web-search"
      ></TextInput>
      {
        value!=='' &&
          <Xicon
      name="x"
      size={14}
      color={'grey'}
      style={styles.x}
      onPress={()=> onChangeText('')}
      />
      }
    
      <Button buttonStyle={styles.button} onPress={onPress}>
        <Search name="search1" size={24} color={"grey"} />
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    position: "relative",
    backgroundColor: "white",
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 8,
    borderRadius: 25,
    paddingVertical: 2,
    paddingVertical: 2,
  },
  input: {
    width: 300,
    height: 50,
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  button: {
    borderRadius: 50,
    width: 50,
    height: 50,
    backgroundColor: "white",
    
  },
  x:{
    position:'absolute',
    right:60
  }
});
