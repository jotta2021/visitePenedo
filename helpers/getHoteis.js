import axios from "axios"
import api from "../services/api"
export default async  function getHoteis(){

   
        const data = {
            "textQuery": "Hoteis e pousadas em Penedo Alagoas",
        "pageSize":10
        }
    
      const res =  await axios.post(`${api}`, data,
            {
                headers:{
                    'Content-Type': 'application/json',
                    'X-Goog-FieldMask': 'places.displayName,places.rating,places.photos',
                'X-Goog-Api-Key': 'AIzaSyArpFGX90C-AtHaXwioqhTpe_kl1c1v-BY'
                }
            }
            
        )
        return res;
       
    
    
}