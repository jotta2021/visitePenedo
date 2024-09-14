import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { contextAuth } from '../contexts';
import Menu from 'react-native-vector-icons/Feather'
// import { Container } from './styles';

const Header = () => {
    const { userData } = useContext(contextAuth)
    return (
        <View style={styles.header}>
            <View>
                <Text style={styles.title}>Olá, {userData?.name.toUpperCase()}</Text>
                <Text style={styles.subtitle}>Explore os melhores lugares de Penedo</Text>
            </View>
           

        </View>
    )
}

export default Header;


const styles = StyleSheet.create({
    header: {
        marginTop: 10,
        marginStart: 20,
        marginEnd: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',

    },
    subtitle: {
        fontSize: 14,
        color: 'grey'

    }
})