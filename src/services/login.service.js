import { sendRequest } from "../utils/helper"

export const signin = async (loginData) => {
    const login = await sendRequest.Post(`${process.env.REACT_APP_URL}/session/login`, loginData)
    return login
}