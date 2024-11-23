import Swal from 'sweetalert2'

export function succesOp(titulo,texto){
    Swal.fire({
        title: titulo,
        text: texto,
        icon: "success"
      });
}

export function errorOp(titulo,texto){
    Swal.fire({
        title: titulo,
        text: texto,
        icon: "error"
      });
}


