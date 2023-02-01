import { sendRequest } from "../utils/helper"

export const getSubsidiaries = async () => {
    const subsidiaries = await sendRequest.Get(`${process.env.REACT_APP_URL}/subsidiary`)
    return subsidiaries
}

export const getAllSubsidiaries = async () => {
    const subsidiaries = await sendRequest.Get(`${process.env.REACT_APP_URL}/subsidiary?limit=100`)
    return subsidiaries
}

export const getSubsidiary = async ({queryKey}) => {
    const id = queryKey[1]
    const subsidiariy = await sendRequest.Get(`${process.env.REACT_APP_URL}/subsidiary/${id}`)
    return subsidiariy
}

export const deleteSubsidiary = async (id) => {
    const subsidiary = await sendRequest.Delete(`${process.env.REACT_APP_URL}/subsidiary/${id}`)
    return subsidiary
}

export const createSubsidiary = async (data) => {
    const subsidiary = await sendRequest.Post(`${process.env.REACT_APP_URL}/subsidiary`, data)
    return subsidiary
}

export const updateSubsidiary = async (id, data) => {
    const subsidiary = await sendRequest.Put(`${process.env.REACT_APP_URL}/subsidiary/${id}`, data)
    return subsidiary
}

export const getReport = async () => {
    const reporte = await sendRequest.Get(`${process.env.REACT_APP_URL}/subsidiary/item`)
    return reporte 
}