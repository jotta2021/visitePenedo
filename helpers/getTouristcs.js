import axios from "axios"
import api from "../services/api"
export default async  function getTouristics(){

   
        const data = {
            "textQuery": "Pontos turisticos Penedo Alagoas",
        "pageSize":10
        }
    
      const res =  await axios.post(`${api}`, data,
            {
                headers:{
                    'Content-Type': 'application/json',
                    'X-Goog-FieldMask': 'places.displayName,places.rating,places.photos,places.location,places.reviews',
                'X-Goog-Api-Key': 'AIzaSyAvzGlp4hS_Cy8Xi2LE8fLWTH7DCht6ut0',
                "languageCode": 'pt-BR'
                }
            }
            
        )
        return res;
       
    
    
}