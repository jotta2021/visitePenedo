import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Rating } from "react-native-ratings";
import { useState } from "react";
import { format } from 'date-fns';

export default function Reviews({ data }) {
  // Controla se o texto completo ou truncado é exibido
  const [lerMais, setLerMais] = useState(false);

  function Format(value) {
    return format(value, 'dd/MM/yyyy');
  }

  function FormatCaracteres(value) {
    if(value){
       // Se o texto deve ser exibido completo, retorna o texto completo
    if (lerMais) return value;
    
    // Verifica se o valor tem mais de 100 caracteres e exibe apenas os primeiros 100 com '...'
    if (value.length > 100) {
      return value.substring(0, 100) + '...';
    }

    return value;
    }
   
  }

  return (
    <View style={styles.container}>
      <View>
        <Image 
          source={{ uri: data.authorAttribution.photoUri }}
          style={styles.image}
        />
      </View>
      <View>
        <Text>
          {data?.authorAttribution.displayName}  
          <Text style={styles.date}>{` - ${Format(data?.publishTime)}`}</Text>
        </Text>
        <Rating
          type='custom'
          ratingCount={5}
          imageSize={12}
          startingValue={data?.rating}
          style={{ paddingVertical: 5, alignItems: 'flex-start' }}
          readonly
        />
        <Text style={styles.comment}>
          {FormatCaracteres(data?.text?.text)}
        </Text>
        {data?.text?.text.length > 100 && (
          <TouchableOpacity onPress={() => setLerMais(!lerMais)}>
            <Text style={styles.lerMais}>
              {lerMais ? 'Ler menos' : 'Ler mais'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    paddingEnd: 40,
    paddingVertical: 10
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  comment: {
    flexWrap: 'wrap',
  
  },
  date: {
    fontSize: 10
  },
  lerMais: {
    color: 'blue',
    marginTop: 5,
    fontWeight: 'bold'
  }
});
