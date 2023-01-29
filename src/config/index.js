import { swalClose, swalError } from '../utils/swal'

const defaultOnErrorQuery = (err) => swalError("Ha ocurrido un error", err.response?.data?.error?.message)

export const config = {
    backURL: process.env.BACK_URL ?? "http://localhost:8000",
    defaultOnErrorQuery,
    defaultReactQuery: {
        retry: false,
        enabled: false,
        onError: defaultOnErrorQuery
    }
}