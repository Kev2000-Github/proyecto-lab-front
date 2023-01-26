import { sendRequest } from "../utils/helper"

export const getItems = async () => {
    const items = await sendRequest.Get(`${process.env.REACT_APP_URL}/item`)
    return items
}

export const deleteItem = async (id) => {
    const item = await sendRequest.Delete(`${process.env.REACT_APP_URL}/item/${id}`)
    return item
}