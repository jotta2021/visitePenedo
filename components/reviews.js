import { View,Text,Image ,StyleSheet} from "react-native"
import { Rating } from "react-native-ratings"

import {format} from 'date-fns'
export default function Reviews({data}){

    function Format(value){
        return format(value,'dd/MM/yyyy')
    }
    function FormatCaracteres(value) {
        // Verifica se o valor tem mais de 50 caracteres
        if (value.length > 100) {
          // Retorna os primeiros 50 caracteres com '...'
          return value.substring(0, 100) + '...';
        }
        // Caso contrário, retorna o valor original
        return value;
      }
      

    return(
        <View style={styles.container}>
            <View>
                <Image 
                source={{uri:data.authorAttribution.photoUri}}
                width={30}
                height={30}
                />
            </View>
            <View>
                <Text>{data?.authorAttribution.displayName}  <Text style={styles.date}>{Format(data?.publishTime) }</Text></Text>
                <Rating
          type='custom'
          ratingCount={5}
          imageSize={12}
          startingValue={data?.rating}
          style={{ paddingVertical: 5, alignItems: 'flex-start' }}
          readonly
        />
          <Text style={styles.comment}>{FormatCaracteres(data?.text?.text) } </Text>
            
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
container:{
    flexDirection:'row',
    alignItems:'center',
    gap:10,
    marginBottom:10,
    backgroundColor:'white',
    paddingEnd:20,
    paddingVertical:10
 
},
comment:{
    flexWrap:'wrap',
    width:'40%'

},
date:{
    fontSize:10
}
})