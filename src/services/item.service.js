import { sendRequest } from "../utils/helper"

export const getItems = async () => {
    const items = await sendRequest.Get(`${process.env.REACT_APP_URL}/item`)
    return items
}

export const getItem = async (id) => {
    const item = await sendRequest.Get(`${process.env.REACT_APP_URL}/item/${id}`)
    return item
}

export const updatedItem = async (id, data) => {
    const item = await sendRequest.Put(`${process.env.REACT_APP_URL}/item/${id}`, data)
    return item
}

export const createItem = async (data) => {
    const item = await sendRequest.Post(`${process.env.REACT_APP_URL}/item`, data)
    return item
}

export const deleteItem = async (id) => {
    const item = await sendRequest.Delete(`${process.env.REACT_APP_URL}/item/${id}`)
    return item
}