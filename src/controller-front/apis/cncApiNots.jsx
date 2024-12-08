import axios from 'axios';


const API_URL = 'http://localhost:5000/api/notificaciones';

export async function getNotificaciones(id_receptor){

    try {
        const resp = await axios.get(`${API_URL}/getNotificaciones`,{
            params: { id_receptor },
        })

        if (!resp.data.notificaciones){
            return [];
        }       
        const dat = resp.data.notificaciones

        return dat;

    } catch (error) {
        console.error('Error al conseguir notificacion:', error.response ? error.response.data : error.message);
        return false;
    }
}

export async function leerNotificacion(id_not){
    
    try {
        const resp = await axios.put(`${API_URL}/leerNotificacion`,{id_not})
        return true
    } catch (error) {
        console.error('Error al leer notificacion:', error.response ? error.response.data : error.message);
        return false;
    }
    
}