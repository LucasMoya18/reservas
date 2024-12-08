import axios from 'axios';


const API_URL = 'http://localhost:5000/api/users';



export async function registrarUsuario(nameUserRegister,emailUserRegister,passwUserRegister){
    
    const usrs = localStorage.getItem('noUsers');
    const rol = usrs ? 'Administrador' : 'Cliente'


    const datosUsuario = {
        nombre: nameUserRegister,
        email: emailUserRegister,
        passw: passwUserRegister,
        rol: rol
    }

    try{
        const resultado = await axios.post(`${API_URL}/registro`, datosUsuario)
        localStorage.removeItem('noUsers')
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



export async function getUsers(){
    try {
        const resp = await axios.get(`${API_URL}/getUsers`)
        if(resp.data.data.length === 0){
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error al conseguir users:', error.response ? error.response.data : error.message);
        return false;
    }
}


export async function getUserByID(id){
    try {
        const resp = await axios.get(`${API_URL}/getUserByID`,{
            params: {id}
        })
        return resp.data.usuario;
    } catch (error) {
        console.error('Error al conseguir users:', error.response ? error.response.data : error.message);
        return false;
    }
}