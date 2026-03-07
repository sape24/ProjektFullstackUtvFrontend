import axios from 'axios' //importerar in axios

const api = axios.create({
  //skapar en axios instans så man slipper skriva in urlen varje gång
  baseURL: 'https://projektfullstackutvbackend.onrender.com',
  headers: {
    'Content-Type': 'application/json', //talar om för backenden att det som skickas och förväntas är data i JSON-format
  },
})

api.interceptors.request.use(
  //en interceptor fångar upp varje anrop precis innan det skickas iväg till servern
  (config) => {
    const token = localStorage.getItem('token') //hämtar token från localstorage

    if (token) {
      config.headers.Authorization = `Bearer ${token}` //om en token hittas läggs den till i headers
    }
    return config //släpper iväg anropet till servern med den uppdaterade informationen
  },
  (error) => {
    return Promise.reject(error) //om något går fel innan anropet skickas returneras ett felmeddelande
  },
)

export default api
