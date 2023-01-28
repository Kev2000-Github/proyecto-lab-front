import { sendRequest } from "../utils/helper"

export const getGroups = async () => {
    const users = await sendRequest.Get(`${process.env.REACT_APP_URL}/group`)
    return users
}

export const getAllGroups = async () => {
    const users = await sendRequest.Get(`${process.env.REACT_APP_URL}/group?limit=100`)
    return users
}

export const deleteGroup = async (id) => {
    const user = await sendRequest.Delete(`${process.env.REACT_APP_URL}/group/${id}`)
    return user
}