import React, { useEffect, useState } from 'react';
import '../../css/sidebar.css';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import { getNotificaciones } from '../../controller-front/apis/cncApiNots';
import CuadroNotificaciones from './CuadroNotificaciones';
import CloseIcon from '@mui/icons-material/Close';



function Sidebar({isReservando,setIsReservando,isEditando, setIsEditando, idEdit, setIdEdit,idUsEdit,setIdUsEdit,isCancel,setIsCancel,isModificandoHorario, setIsModificandoHorario}) {
    const [isOpen, setIsOpen] = useState(false);
    const [userData,setUserData] = useState('');
    const [notisExist,setNotisExist] = useState(false)
    const [notificaciones, setNotificaciones] = useState([])
    const [botonDesplegarNots,setBotonDesplegarNots] = useState(false)
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

            const intervalId = setInterval(async () => {
                const nots = await getNotificaciones(usuarioObj.id);
                const notificacionesPendientes = nots.filter(notificacion => notificacion.estado === 'P');
                setNotificaciones(notificacionesPendientes)
                if (nots.some(objeto => objeto.estado === 'P')) {
                    setNotisExist(true)
                }else{
                    setNotisExist(false)
                }
                
                
              }, 1000);
              return () => {
                clearInterval(intervalId);
              }


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

    function handleIsModificandoHorario(val){
        setIsModificandoHorario(val)
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
                    <button className={`option-btn logoNotificacion ${notisExist ? 'notisExist' : ''}`} onClick={()=>{setBotonDesplegarNots(true)}}>
                        {notisExist ? <><NotificationImportantIcon/></> : <><NotificationsIcon/></>}
                    </button>
                    <button className={`option-btn ${isReservando ? 'btn-activo' : ''}`} onClick={()=>{
                        handleIsReservando(true)
                        handleIsEditando(false)
                        handleIsModificandoHorario(false);
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
                        handleIsModificandoHorario(false);
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
                        handleIsModificandoHorario(false);
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
                        }}}>{isCancel ? 'Volver' : userData.rol=='Administrador'? 'Cancelar reserva/modificacion de horario': 'Cancelar reserva'}</button>
                    
                    {userData.rol == 'Administrador'? 
                    <>
                    <button className={`option-btn ${isModificandoHorario ? 'btn-activo' : ''}`} onClick={()=>{
                        handleIsModificandoHorario(true);
                        handleIsCancel(false);
                        handleIsEditando(false);
                        handleIsReservando(false);
                        setIdEdit(false);
                        setIdUsEdit(false);

                        if (isModificandoHorario){
                            handleIsModificandoHorario(false);
                            
                        }
                        if(screenWidth <=768){
                            toggleSidebar();
                        }
                    }}>
                        {isModificandoHorario ? 'Cancelar Modificacion Horario' : 'Modificar Horario'}</button>
                    </> : ''}
                </div>
                <div className="pagination-dots" onClick={toggleSidebar}>
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>
            </div>
            {botonDesplegarNots && (
        <>
          
          <div className="overlay-background" onClick={() => setBotonDesplegarNots(false)}></div>

          
          <div className="floating-div ">
            <div className='encabezadoNots mb-3'>
                <h3>Notificaciones</h3>
                <div className='cerrarIconoNots' onClick={()=>{setBotonDesplegarNots(false)}}>
                    <CloseIcon/>
                </div>
            </div>
            
            <div className='boxNotis'>
            {notificaciones.map((valor, key)=>{
                return(
                <React.Fragment key={key}>
                    <CuadroNotificaciones id_not={valor.id} id_receptor={valor.id_receptor} id_envia={valor.id_envia} motivo={valor.motivo} estado= {valor.estado} id_reserva={valor.id_reserva} tipo={valor.tipo}/>
                </React.Fragment>
                )
            })}
            </div>
            
          </div>
        </>
      )}
        </>
    );
}

export default Sidebar;
