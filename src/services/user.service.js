import { sendRequest } from "../utils/helper"

export const getUsers = async () => {
    const users = await sendRequest.Get(`${process.env.REACT_APP_URL}/user`)
    return users
}

export const getUser = async ({queryKey}) => {
    const id = queryKey[1]
    const users = await sendRequest.Get(`${process.env.REACT_APP_URL}/user/${id}`)
    return users
}

export const deleteUser = async (id) => {
    const user = await sendRequest.Delete(`${process.env.REACT_APP_URL}/user/${id}`)
    return user
}

export const createUser = async (data) => {
    console.log(data)
    const user = await sendRequest.Post(`${process.env.REACT_APP_URL}/user`, data)
    return user
}

export const updateUser = async (id, data) => {
    const user = await sendRequest.Put(`${process.env.REACT_APP_URL}/user/${id}`, data)
    return user
}