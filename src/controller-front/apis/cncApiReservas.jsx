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

        const usuarioRAW = localStorage.getItem('userActivo');
        const usuarioObj = JSON.parse(usuarioRAW)
        
        dat.map((value)=>{
            listaFormateada.push({
                id: value.id,
                title: value.titulo,
                start: value.fecha_inicio,
                end: value.fecha_fin,
                backgroundColor: value.usuario_id==usuarioObj.id ? '#32a830' : value.backgroundColor ,
                textColor: value.textColor,
                id_us: value.usuario_id
            })
        })
       
        

        return listaFormateada;

    } catch (error) {
        console.error('Error al conseguir reserva:', error.response ? error.response.data : error.message);
        return false;
    }
}

export async function editarReserva(data){
    try {
        const resp = await axios.put(`${API_URL}/actualizarReserva`,data)
        return true
    } catch (error) {
        console.error('Error al editar reserva:', error.response ? error.response.data : error.message);
        return false;
    }
}

export async function cancelarReserva(data){
    
    data.idReserva = parseInt(data.idReserva)
    try {
        const resp = await axios.delete(`${API_URL}/cancelarReserva`, {
            params: {
                idReserva: data.idReserva,
                idUsuario: data.idUsuario
            }
        })
        return true
    } catch (error) {
        console.error('Error al cancelar reserva:', error.response ? error.response.data : error.message);
        return false;
    }
}