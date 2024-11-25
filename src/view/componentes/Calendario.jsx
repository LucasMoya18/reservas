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
import { realizarReserva,conseguirReservas } from "../../controller-front/apis/cncApiReservas"


function Calendario({isReservando, setIsReservando,isEditando, setIsEditando}){
  
  const screenWidth = window.innerWidth;
  const [userData,setUserData] = useState('');
  const [reservas, setReservas ] = useState([]);
  const [actReservas,actualizarReservas] = useState(true)
  
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

  const handleDateClick = (info) => {
    alert(`Fecha seleccionada: ${info.dateStr}`);

  };




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


    const fechaInicioMostrada = format(fechaInicioDate, "HH:mm' 'dd-MM-yyyy")
    const fechaFinalMostrada = format(fechaFinalDate, "HH:mm' 'dd-MM-yyyy" )

    


    if(isReservando){
      Swal.fire({
        title: "Esta seguro?",
        text: `Quiere reservar desde ${fechaInicioMostrada} hasta ${fechaFinalMostrada}?`,
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
    } else if (isEditando){
      Swal.fire({
        title: "Esta seguro?",
        text: `Quiere reservar desde ${fechaInicioMostrada} hasta ${fechaFinalMostrada}?`,
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
    }
    


  };

  const handleEventoClick = (info)=>{
    console.log(info.event.id)
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
