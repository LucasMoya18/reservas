import React, { useEffect, useState } from 'react';
import '../../css/sidebar.css';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

function Sidebar({isReservando,setIsReservando,isEditando, setIsEditando, idEdit, setIdEdit,idUsEdit,setIdUsEdit,isCancel,setIsCancel}) {
    const [isOpen, setIsOpen] = useState(false);
    const [userData,setUserData] = useState('');
    const screenWidth = window.innerWidth;
    function handleIsCancel(val){
        setIsCancel(val)
    }
    function handleIsReservando(val){
        setIsReservando(val)
    }

    function handleIsEditando(val){
        setIsEditando(val)
    }

    const navegar = useNavigate();
    function toggleSidebar(){
        setIsOpen(!isOpen);
    };

    useEffect(()=>{
        const isAuth = localStorage.getItem('isAuth')
        const usuarioRAW = localStorage.getItem('userActivo');
        if (isAuth){
            const usuarioObj = JSON.parse(usuarioRAW)
            setUserData(usuarioObj)
        }
    },[])


    function cerrarSesionOP(){
        Swal.fire({
          title: 'Estas seguro?',
          icon: 'info',
          showCancelButton: true
        }).then((result)=>{
          if(result.isConfirmed){
            localStorage.removeItem('isAuth');
            localStorage.removeItem('userActivo');
            navegar('/login');
          }
        })
      }
    return (
        <>

            <button className="menu-btn" onClick={toggleSidebar}>
                ☰
            </button>
            
            <div className={`sidebar ${isOpen ? 'active' : ''}`}>
                <div className="user-section">
                    <div className="user-icon">
                        <AccountBoxIcon />
                    </div>
                    <div className='datos-usuario'>
                        <p className="user-role text-center">{userData.nombre}</p>
                        <p className="user-role text-center">{userData.rol}</p>
                    </div>
                    <button className='Log-Out' onClick={cerrarSesionOP}>Cerrar sesión</button>
                </div>
                <div className="options">
                    <button className={`option-btn ${isReservando ? 'btn-activo' : ''}`} onClick={()=>{
                        handleIsReservando(true)
                        handleIsEditando(false)
                        setIdEdit(false);
                        setIdUsEdit(false);
                        handleIsCancel(false);
                        if(isReservando){
                            handleIsReservando(false)
                        }

                        if(screenWidth <=768){
                            toggleSidebar()
                        }

                    }}>{isReservando ? 'Cancelar reserva' : 'Reservar'}</button>
                    <button className={`option-btn ${isEditando ? 'btn-activo' : ''}`} onClick={()=>{
                        handleIsEditando(true);
                        handleIsReservando(false);
                        setIdEdit(false);
                        setIdUsEdit(false);
                        handleIsCancel(false);

                        if (isEditando){
                            handleIsEditando(false);
                            setIdEdit(false);
                            setIdUsEdit(false);
                        }
                        if(screenWidth <=768){
                            toggleSidebar();
                        }

                    }}>{isEditando ? 'Cancelar edicion' : 'Editar'}</button>  
                    <button className={`option-btn ${isCancel ? 'btn-activo' : ''}`}onClick={()=>{
                        handleIsCancel(true);
                        handleIsEditando(false);
                        handleIsReservando(false);
                        setIdEdit(false);
                        setIdUsEdit(false);

                        if (isCancel){
                            handleIsCancel(false);;
                            setIdEdit(false);
                            setIdUsEdit(false);
                        }
                        if(screenWidth <=768){
                            toggleSidebar();
                        }}}>{isCancel ? 'Volver' : 'Cancelar reserva'}</button>
                    <button className="option-btn">OPCIONES</button>
                    <button className="option-btn">OPCIONES</button>
                    <button className="option-btn">OPCIONES</button>
                    <button className="option-btn">OPCIONES</button>
                    <button className="option-btn">OPCIONES</button>
                    <button className="option-btn">OPCIONES</button>
                </div>
                <div className="pagination-dots">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>
            </div>
        </>
    );
}

export default Sidebar;
