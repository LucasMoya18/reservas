import axios from 'axios';


const API_URL = 'http://localhost:5000/api/users';



export async function registrarUsuario(datosUsuario){
    
    try{
        const resultado = await axios.post(`${API_URL}/registro`, datosUsuario)
        return true;
    }catch(error){
        console.error('Error al registrar usuario:', error.response ? error.response.data : error.message);
        return false;
    }
}


export async function  loguearUsuario(credenciales){
    try {
        const response = await axios.post(`${API_URL}/login`, credenciales)

        const usuario = response.data.data
        
        return usuario;
    } catch (error) {
        console.error('Error al iniciar sesion:', error.response ? error.response.data : error.message);
        return false;
    }
}

export async function realizarReserva(datos){
    try {
        const resp = await axios.post(`${API_URL}/reservas/registroReserva`, datos)
        return true;
    } catch (error) {
        console.error('Error al ingresar reserva:', error.response ? error.response.data : error.message);
        return false;
    }
}