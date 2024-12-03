import axios from 'axios';


const API_URL = 'http://localhost:5000/api/notificaciones';

export async function getNotificaciones(){
    try {

        const resp = await axios.get(`${API_URL}/getNotificaciones`)
        if (!resp.data.reservas){
            return [];
        }
        const listaFormateada = []
        const dat = resp.data.notificaciones

        return listaFormateada;

    } catch (error) {
        console.error('Error al conseguir notificacion:', error.response ? error.response.data : error.message);
        return false;
    }
}