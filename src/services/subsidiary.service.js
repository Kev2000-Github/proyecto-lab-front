import { sendRequest } from "../utils/helper"

export const getSubsidiaries = async () => {
    const users = await sendRequest.Get(`${process.env.REACT_APP_URL}/subsidiary`)
    return users
}

export const deleteSubsidiary = async (id) => {
    const user = await sendRequest.Delete(`${process.env.REACT_APP_URL}/subsidiary/${id}`)
    return user
}