import { sendRequest } from "../utils/helper"

export const getUsers = async () => {
    const users = await sendRequest.Get(`${process.env.REACT_APP_URL}/user`)
    return users
}

export const deleteUser = async (id) => {
    const user = await sendRequest.Delete(`${process.env.REACT_APP_URL}/user/${id}`)
    return user
}