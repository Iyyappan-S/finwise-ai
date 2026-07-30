import axios from "axios";


const API = axios.create({
  baseURL: "https://finwise-ai-l5df.onrender.com/api"
});



// attach token automatically

API.interceptors.request.use((config)=>{


const token = localStorage.getItem("token");


if(token){

config.headers.Authorization = `Bearer ${token}`;

}


return config;


});


export default API;