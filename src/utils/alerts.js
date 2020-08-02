import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

function alerts(error = null){
  if (error)
    Swal.fire({
      icon: 'error',
      title: 'Ocorreu um erro!',
      text: error,
    })
  else
    Toast.fire({
      icon: 'success',
      title: 'Operação realizada com sucesso!'
    })
}

export default alerts;