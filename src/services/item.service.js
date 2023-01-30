import { sendRequest } from "../utils/helper"

export const getItems = async ({queryKey}) => {
    const page = queryKey[1]
    const limit = queryKey[2]
    const group = queryKey[3]
    const byNewItem = queryKey[4]
    const params = `?page=${page}&limit=${limit}${group ? `&groups=${group}` : ''}&newitem=${byNewItem}` 
    const link = `${process.env.REACT_APP_URL}/item${params}`
    const items = await sendRequest.Get(link)
    return items
}

export const getItem = async ({queryKey}) => {
    const id = queryKey[1]
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

export const updateQuantity = async (id, data) => {
    const item = await sendRequest.Post(`${process.env.REACT_APP_URL}/item/subsidiary/${id}`, data)
    return item
}