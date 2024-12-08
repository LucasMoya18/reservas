import { useState } from "react";
import { useEffect } from "react";
import '../../css/CuadroNotificaciones.css'
import { getUserByID } from "../../controller-front/apis/cncApiUsuarios";
import { aprovarReserva,aprovarModificacionReserva, cancelarReserva } from "../../controller-front/apis/cncApiReservas";
import { getNotificaciones, leerNotificacion } from "../../controller-front/apis/cncApiNots"
import Swal from 'sweetalert2';


function CuadroNotificaciones({id_not, id_receptor, id_envia, motivo, estado, id_reserva,tipo}) {
    const [userData,setUserData] = useState('');
    const [emailUsrENV, setEmailUsrENV] = useState('')
    const [nombreUsrENV, setNombreUserENV] = useState('')

    useEffect(()=>{
        const isAuth = localStorage.getItem('isAuth');
        const usuarioRAW = localStorage.getItem('userActivo');
        const usuarioObj = JSON.parse(usuarioRAW);
        setUserData(usuarioObj);

        async function getUser(){
          const usr = await getUserByID(id_envia)
          setEmailUsrENV(usr.email);
          setNombreUserENV(usr.nombre)
         
        }
        getUser()

     




    },[])

    function mostrarToast() {
      Swal.fire({
          toast: true, 
          position: 'top-right', 
          icon: 'success', 
          title: 'Operación exitosa',
          showConfirmButton: false, 
          timer: 3000, 
          timerProgressBar: true, 
          customClass: {
            container: 'toastNots', 
        },
      });
    }

    const handleConfirmar = async ()=>{
      
      
      if(userData.rol == 'Administrador'){
        const datos = {
          usuario: userData,
          id_reserva: id_reserva, 
          id_usEnvia: id_envia,
        }
        if(tipo =='Reserva'){
          const resp = await aprovarReserva(datos);
          const respNot = await leerNotificacion(id_not);
          if(resp && respNot){
            mostrarToast();
          }
        }else if (tipo == 'Modificacion'){
          const datos = {
            usuarioEnvia: userData,
            receptor: id_envia,
            rsvId: id_reserva,
            accion: 'aprobar'
          }
          const resp = await aprovarModificacionReserva(datos);
          const respNot = await leerNotificacion(id_not);
          if(resp && respNot){
            mostrarToast();
          }

        }
        
      }else{
        const respNot = await leerNotificacion(id_not);
        if(respNot){
          mostrarToast();
        }
      }

  
    }

    const handleRechazar = async ()=>{
      if(userData.rol == 'Administrador'){
        const datos = {
          usuario: userData,
          idReserva: id_reserva, 
          idUsuario: id_envia,
          noti: true
        }
        if(tipo =='Reserva'){
          const resp = await cancelarReserva(datos);
          const respNot = await leerNotificacion(id_not);
          if(resp && respNot){
            mostrarToast();
          }
        }else if (tipo == 'Modificacion'){
          const datos = {
            usuarioEnvia: userData,
            receptor: id_envia,
            rsvId: id_reserva,
            accion: 'rechazar'
          }
          const resp = await aprovarModificacionReserva(datos);
          const respNot = await leerNotificacion(id_not);
          if(resp && respNot){
            mostrarToast();
          }

        }
        
      }else{
        const respNot = await leerNotificacion(id_not);
        if(respNot){
          mostrarToast();
        }
      }
    }


    return (
    <>  
      {userData.rol=='Administrador' ? <>
        
        <div className="card mb-3">
          <div className="card-header">
          </div>
          <div className="card-body nots">
            <p className="card-text">Usuario: {nombreUsrENV}</p>
            <p className="card-text">Correo: {emailUsrENV}</p>
            <p className="card-text mb-3">{motivo}</p>
            
            <div className="botonesCardNots">
              <a className="btn btn-success mx-auto" onClick={handleConfirmar}>Confirmar</a>
              <a className="btn btn-danger mx-auto" onClick={handleRechazar}>Rechazar</a>
            </div>
            
          </div>
        </div>

      </> : <>
      
      <div className="card mb-3">
          <div className="card-header">
          </div>
          <div className="card-body nots">
            <p className="card-text mb-3">{motivo}</p>
            
            <div className="botonesCardNots">
              <a className="btn btn-success mx-auto" onClick={handleConfirmar}>Ok</a>

            </div>
            
          </div>
        </div>
      
      </>}
        
    
    </>)
}

export default CuadroNotificaciones;