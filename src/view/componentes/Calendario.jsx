import React from "react";
import FullCalendar from "@fullcalendar/react"; 
import dayGridPlugin from "@fullcalendar/daygrid"; 
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; 
import '../../css/calendario.css'
import { useState,useEffect,useRef } from "react";
import Swal from "sweetalert2";
import { parseISO, addMinutes, format } from "date-fns";
import { succesOp,errorOp } from "../../alertas";
import { realizarReserva,conseguirReservas,editarReserva,cancelarReserva } from "../../controller-front/apis/cncApiReservas"


function Calendario({isReservando, setIsReservando,isEditando, setIsEditando, idEdit, setIdEdit,idUsEdit,setIdUsEdit, isCancel,setIsCancel}){
  
  const screenWidth = window.innerWidth;
  const [userData,setUserData] = useState('');
  const [reservas, setReservas ] = useState([]);
  const [actReservas,actualizarReservas] = useState(true)
  const [cadFechas,setCadFechas] = useState('');

  useEffect(() => {
    const isAuth = localStorage.getItem('isAuth');
    const usuarioRAW = localStorage.getItem('userActivo');

    

    if (isAuth) {
      const usuarioObj = JSON.parse(usuarioRAW);
      setUserData(usuarioObj);
      actualizarReservas(!actReservas)  
   
      const intervalId = setInterval(async () => {
        const reservas = await conseguirReservas();
        setReservas(reservas);
        actualizarReservas(!actReservas)
      }, 1000);
      return () => {
        clearInterval(intervalId);
      }
     
    }
  }, []);




  const handleReservar = async (dts) => {
    
    const resp = await realizarReserva(dts)  
    if (resp){
      succesOp('Operacion exitosa!','Tu reserva ha sido agendada exitosamente');
    }
  }



  const handleSwalDateClick = (info) => {
    const fechaInicio = info.dateStr;
    const fechaInicioDate = parseISO(fechaInicio);
    const fechaFinalDate = addMinutes(fechaInicioDate, 30);

    const fechaInicioINSERTAR = format(fechaInicioDate, "yyyy-MM-dd' 'HH:mm:ss");
    const fechaFinalINSERTAR = format(fechaFinalDate, "yyyy-MM-dd' 'HH:mm:ss");


    const fechaInicioMostrada = format(fechaInicioDate, "HH:mm")
    const fechaFinalMostrada = format(fechaFinalDate, "HH:mm' 'dd-MM-yyyy" )

    


    if(isReservando){
      Swal.fire({
        title: "Esta seguro?",
        text: `Quiere reservar la siguiente fecha ${fechaInicioMostrada} - ${fechaFinalMostrada}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Reservar",
        cancelButtonText: "Cancelar reserva"
  
      }).then((result) => {
        if (result.isConfirmed) {
          const datosReserva = {
            usuario: userData,
            inicio: fechaInicioINSERTAR,
            fin: fechaFinalINSERTAR
          }
          handleReservar(datosReserva).then(()=>{
            setIsReservando(false)
          })
        }
      });
    } else if (isEditando && !idUsEdit){
      Swal.fire({
        text: 'Para editar una reserva, primero debe de seleccionar una reserva en posesion (Verde), luego seleccionar un hora en la que se pueda reservar.',
        icon: "info",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Entendido"
      })
    }else if (isEditando && idUsEdit && idEdit){
      const cadenaFechaFinal = `${fechaInicioMostrada} - ${fechaFinalMostrada}`
      Swal.fire({
        title: "Esta seguro?",
        text: `Quiere editar la reserva de ${cadFechas} a ${cadenaFechaFinal}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Reservar",
        cancelButtonText: "Cancelar reserva"
  
      }).then((result) => {
        if (result.isConfirmed) {
          const datosEdit = {
            rsvId: idEdit,
            userId: idUsEdit,
            fe_ini: fechaInicioINSERTAR,
            fe_fin: fechaFinalINSERTAR
          }

          handleEditarReserva(datosEdit).then(()=>{
            handleDejarEdicion()
          })
        }
      });
    }
    


  };
    
  async function handleEditarReserva(datos){
    const resp = await editarReserva(datos)  
    if (resp){
      succesOp('Operacion exitosa!','Tu reserva ha sido editada exitosamente');
    }
  }

  function handleDejarEdicion(){
    setIdEdit(false);
    setIdUsEdit(false);
    setIsEditando(false);
  }


  const handleEventoClick = (info)=>{
    const idusuarioEv = info.event.extendedProps.id_us;
    const idReserva = info.event.id;

    const fechaInicio = info.event.startStr;
    const fechaInicioDate = parseISO(fechaInicio);
    const fechaFinalDate = addMinutes(fechaInicioDate, 30);

    const fechaInicioMostrada = format(fechaInicioDate, "HH:mm")
    const fechaFinalMostrada = format(fechaFinalDate, "HH:mm' 'dd-MM-yyyy" )
    const cadenaFecha = `${fechaInicioMostrada} - ${fechaFinalMostrada}`
    
    if (isEditando){
      if(userData.id == idusuarioEv && !idUsEdit){
        Swal.fire({
          title: "Esta seguro?",
          text: `Quiere editar reserva ${cadenaFecha}`,
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Editar",
          cancelButtonText: "Cancelar"
    
        }).then((result) => {
          if (result.isConfirmed) {
            setIdEdit(idReserva)
            setIdUsEdit(idusuarioEv)
            setCadFechas(cadenaFecha)
          }
        });
      }else {
        Swal.fire({
          title:'Selecciona reserva valida',
          text: 'Para editar una reserva, primero debe de seleccionar una reserva en posesion (Verde), luego seleccionar un hora en la que se pueda reservar.',
          icon: "error",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Entendido"
        })
      
      }
    }

    if(isCancel){
      if(userData.id == idusuarioEv){
        Swal.fire({
          title: "Esta seguro?",
          text: `Quiere eliminar reserva ${cadenaFecha}`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Editar",
          cancelButtonText: "Cancelar"
    
        }).then((result) => {
          if (result.isConfirmed) {
            const objDel = {
              idReserva: idReserva,
              idUsuario: idusuarioEv
            }

            handleCancelarReserva(objDel).then(()=>{
              handleDejarDelete()
            })

          }
        });
      }else {
        Swal.fire({
          title:'Selecciona reserva valida',
          text: 'Para cancelar una reserva, debes seleccionar una en posesion.',
          icon: "error",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Entendido"
        })
      
      }
    
    
    }}
    
  async function handleCancelarReserva(data){
    
    const resp = await cancelarReserva(data);
    if (resp){
      succesOp('Operacion exitosa!','Tu reserva ha sido cancelada exitosamente');
    }
  }  

  function handleDejarDelete(){
    setIsCancel(false)
  }
  


  return (
    <>
      <div className="calendario-container">
        <FullCalendar
          key={reservas.length}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={screenWidth> 768 ? "timeGridWeek" : "timeGridDay" }
          selectable={true} 
          validRange={{
            start: new Date().toISOString().split('T')[0] 
          }}
          height={screenWidth> 768 ? 765 : 1346 }
          dateClick={handleSwalDateClick} 
          events={reservas}
          eventClick={handleEventoClick}
          slotMinTime="08:00:00"
          slotMaxTime="21:00:00"  
          allDaySlot={false}
          locale="es"
          
        
          
          
        />
      </div>
    </>
  );
};

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}
export default Calendario;
