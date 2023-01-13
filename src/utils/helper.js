import axios from 'axios'
import { notify } from './components/PDF/helper'

export const transport = axios

export const getSessionId = () => localStorage.getItem('sessionId')
export const getRol = () => localStorage.getItem('rol')

export const setSessionId = (sessionId) => {
  localStorage.setItem('sessionId', sessionId)
}

export const setRol = (rol) => {
  localStorage.setItem('rol', rol)
}

export const deleteRol = () => {
  localStorage.removeItem('rol')
}

export const deleteSessionId = () => {
  localStorage.removeItem('sessionId')
}

const Put = async (link, body) => {
    try {
      const headers = { auth: getSessionId() }
      const resp = await transport.put(link, body, { headers })
      if (resp.status === 200) {
        return resp.data
      }
    }
    catch (err) {
      notify(err.response?.data?.message, 'error')
    }
  }
  
  const Post = async (link, body) => {
    try {
      const headers = { auth: getSessionId() }
      const resp = await transport.post(link, body, { headers })
      if (resp.status === 200) {
        return resp.data
      }
    }
    catch (err) {
      notify(err.response?.data?.message, 'error')
    }
  }
  
  const Get = async (link) => {
    try {
      const headers = { auth: getSessionId() }
      const resp = await transport.get(link, { headers })
      if (resp.status === 200) {
        return resp.data
      }
    }
    catch (err) {
      notify(err.response?.data?.message, 'error')
    }
  }
  
  const Delete = async (link) => {
    try {
      const headers = { auth: getSessionId() }
      const resp = await transport.delete(link, { headers })
      if (resp.status === 200) {
        return resp.data
      }
    }
    catch (err) {
      notify(err.response?.data?.message, 'error')
    }
  }
  
  export const sendRequest = {
    Post,
    Get,
    Delete,
    Put
  }
