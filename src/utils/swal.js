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

export const swalSuccess = (title = 'Éxito', text = null) => {
  void Swal.fire({
    icon: 'success',
    title,
    text: text ?? '',
    confirmButtonText: 'Aceptar'
  })
}
