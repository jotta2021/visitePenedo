import axios from "axios"
import api from "../services/api"
export default async  function getRestaurants(){

   
        const data = {
            "textQuery": "restaurantes e lazer  em Penedo Alagoas",
        "pageSize":10
        }
    
      const res =  await axios.post(`${api}`, data,
            {
                headers:{
                    'Content-Type': 'application/json',
                    'X-Goog-FieldMask': 'places.displayName,places.rating,places.photos,places.formattedAddress,places.reviews,places.internationalPhoneNumber,places.regularOpeningHours,places.location',
                'X-Goog-Api-Key': 'AIzaSyArpFGX90C-AtHaXwioqhTpe_kl1c1v-BY',
                
                "languageCode": 'pt-BR'
                }
            }
            
        )
        return res;
       
    
    
}