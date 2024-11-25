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
    let swalInstance = null;
    useEffect( ()=>{
        const isAuth = localStorage.getItem('isAuth');
        const usuarioRAW = localStorage.getItem('userActivo');

        if(!isAuth){
            navegar('/login');
            const usuarioObj = JSON.parse(usuarioRAW)
        }
    },[])
    return (<>
        <div className={`layout-home ${isReservando || isEditando ? 'reservando' : ''}`}>
            <div className={`sidebar-home ${isReservando || isEditando ? 'reservando' : ''}`}>
                <Sidebar isReservando={isReservando} setIsReservando={setIsReservando} isEditando={isEditando} setIsEditando={setIsEditando}/>
            </div>
            <div className={`content-home ${isReservando || isEditando ? 'reservando' : ''}`}>
                <Calendario isReservando={isReservando} setIsReservando={setIsReservando} isEditando={isEditando} setIsEditando={setIsEditando}/>
            </div>
        </div>
        
    </>)
}

export default Home;