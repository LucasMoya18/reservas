import { useEffect, useState } from "react";
import Sidebar from "./componentes/Sidebar";
import { useNavigate } from "react-router-dom";
import '../css/home.css'
import Calendario from "./componentes/Calendario";
import Swal from "sweetalert2";

function Home(){
    const navegar = useNavigate();
    const [isReservando, setIsReservando] = useState(false);
    const [isEditando, setIsEditando] = useState(false);
    const [idEdit,setIdEdit] = useState(false)
    const [idUsEdit,setIdUsEdit] =  useState(false)
    const [isCancel,setIsCancel] = useState(false)
    useEffect( ()=>{
        const isAuth = localStorage.getItem('isAuth');
        const usuarioRAW = localStorage.getItem('userActivo');
        const usuarioObj = JSON.parse(usuarioRAW)

        if(!isAuth){
            navegar('/login');
        }
    },[])
    return (<>
        <div className={`layout-home ${isReservando || isEditando || isCancel ? 'reservando' : ''}`}>

            <div className={`sidebar-home ${isReservando || isEditando || isCancel ? 'reservando' : ''}`}>
                <Sidebar 
                isReservando={isReservando} setIsReservando={setIsReservando} 
                isEditando={isEditando} setIsEditando={setIsEditando} 
                idEdit={idEdit} setIdEdit={setIdEdit}
                idUsEdit={idUsEdit} setIdUsEdit={setIdUsEdit}
                isCancel={isCancel} setIsCancel={setIsCancel}
                />
            </div>

            <div className={`content-home ${isReservando || isEditando || isCancel ? 'reservando' : ''}`}>
                <Calendario 
                isReservando={isReservando} setIsReservando={setIsReservando} 
                isEditando={isEditando} setIsEditando={setIsEditando} 
                idEdit={idEdit} setIdEdit={setIdEdit}
                idUsEdit={idUsEdit} setIdUsEdit={setIdUsEdit}
                isCancel={isCancel} setIsCancel={setIsCancel}/>
            </div>

        </div>
        
    </>)
}

export default Home;