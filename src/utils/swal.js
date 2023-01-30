import Swal from 'sweetalert2'

export const swalLoading = (title = 'Cargando...') => {
  void Swal.fire({
    title,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading(null)
    }
  })
}

export const swalClose = () => {
  Swal.close()
}

export const swalError = (
  title = 'Ha ocurrido un error',
  text = null
) => {
  void Swal.fire({
    icon: 'error',
    title,
    text: text ?? ''
  })
}

export const swalQuestion = async (
  title = '¿Está seguro?',
  text = null
) => {
  return await Swal.fire({
    icon: 'question',
    title,
    text: text ?? '',
    showCancelButton: true,
    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Cancelar'
  })
}

export const swalSuccess = (title = 'Éxito', text = null, onAccept = () => {}) => {
  return Swal.fire({
    icon: 'success',
    title,
    text: text ?? '',
    confirmButtonText: 'Aceptar',
    didClose: onAccept
  })
}

export const swalInput = () => {
  return Swal.fire({
    title: 'Cantidad',
    html: `<input type="number" id="quantity" class="swal2-input" placeholder="Cantidad">`,
    confirmButtonText: 'Confirmar',
    focusConfirm: false,
    preConfirm: () => {
      const quantity = Swal.getPopup().querySelector('#quantity').value
      if (!quantity) {
        Swal.showValidationMessage(`Por favor ingrese una cantidad`)
      }
      return { quantity }
    }
  })
}