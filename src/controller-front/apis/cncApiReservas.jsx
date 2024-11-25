import axios from 'axios';


const API_URL = 'http://localhost:5000/api/reservas';

export async function realizarReserva(datos){
    try {
        const resp = await axios.post(`${API_URL}/registroReserva`, datos)
        return true;
    } catch (error) {
        console.error('Error al ingresar reserva:', error.response ? error.response.data : error.message);
        return false;
    }
}

export async function conseguirReservas(){
    try {

        const resp = await axios.get(`${API_URL}/getReservas`)
        if (!resp.data.reservas){
            return [];
        }
        const listaFormateada = []
        const dat = resp.data.reservas
        dat.map((value)=>{
            listaFormateada.push({
                id: value.id,
                title: value.titulo,
                start: value.fecha_inicio,
                end: value.fecha_fin,
                backgroundColor: value.backgroundColor,
                textColor: value.textColor
            })
        })
       
        

        return listaFormateada;

    } catch (error) {
        console.error('Error al conseguir reserva:', error.response ? error.response.data : error.message);
        return false;
    }
}