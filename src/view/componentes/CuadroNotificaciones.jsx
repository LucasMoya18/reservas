import { useState } from "react";
import { useEffect } from "react";
import '../../css/CuadroNotificaciones.css'
import { getNotificaciones } from "../../controller-front/apis/cncApiNots";

function CuadroNotificaciones() {
    const [notificaciones, setNotificaciones] = useState([]);
    const [userData,setUserData] = useState('');


    useEffect(()=>{
        const isAuth = localStorage.getItem('isAuth');
        const usuarioRAW = localStorage.getItem('userActivo');
        const usuarioObj = JSON.parse(usuarioRAW);
        setUserData(usuarioObj);

        const intervalId = setInterval(async () => {
            const nots = await getNotificaciones({id_receptor: usuarioObj.id});
            console.log(nots)
            setNotificaciones(nots)
            
          }, 1000);
          return () => {
            clearInterval(intervalId);
          }


    },[])


    return (
    <>
        <div className="divCuadroNots">
             asdhhasdhasjkdjk
        </div>
    
    </>)
}

export default CuadroNotificaciones;