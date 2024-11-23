import { useEffect } from "react";
import Sidebar from "./componentes/Sidebar";
import { useNavigate } from "react-router-dom";

function Home(){
    const navegar = useNavigate();
    useEffect( ()=>{
        const isAuth = localStorage.getItem('isAuth');
        const usuarioRAW = localStorage.getItem('userActivo');

        if(!isAuth){
            navegar('/login');
            const usuarioObj = JSON.parse(usuarioRAW)
        }
    },[])
    return (<>
        <Sidebar/>
        
    </>)
}

export default Home;