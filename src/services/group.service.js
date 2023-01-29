import { sendRequest } from "../utils/helper"

export const getGroups = async () => {
    const groups = await sendRequest.Get(`${process.env.REACT_APP_URL}/group`)
    return groups
}

export const getAllGroups = async () => {
    const groups = await sendRequest.Get(`${process.env.REACT_APP_URL}/group?limit=100`)
    return groups
}

export const getGroup = async ({queryKey}) => {
    const id = queryKey[1]
    const group = await sendRequest.Get(`${process.env.REACT_APP_URL}/group/${id}`)
    return group
}

export const deleteGroup = async (id) => {
    const group = await sendRequest.Delete(`${process.env.REACT_APP_URL}/group/${id}`)
    return group
}

export const createGroup = async (data) => {
    const group = await sendRequest.Post(`${process.env.REACT_APP_URL}/group`, data)
    return group
}

export const updateGroup = async (id, data) => {
    const group = await sendRequest.Put(`${process.env.REACT_APP_URL}/group/${id}`, data)
    return group
}