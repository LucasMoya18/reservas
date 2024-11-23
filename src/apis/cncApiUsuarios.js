import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';


export function registrarUsuario(datosUsuario){
    axios.post(`${API_URL}/registro`, datosUsuario)
    .then(response => {
        console.log('USUARIO REGISTRADO, LLAMADO DESDE API', response.data);
    })
    .catch(error => {
        console.error('Error al registrar usuario:', error.response ? error.response.data : error.message);
    });
}


export function loguearUsuario(credenciales){
    axios.post(`${API_URL}/login`, credenciales)
    .then(response => {
        console.log('USUARIO logueado, LLAMADO DESDE API', response.data);
    })
    .catch(error => {
        console.error('Error al iniciar sesion:', error.response ? error.response.data : error.message);
    });
}

