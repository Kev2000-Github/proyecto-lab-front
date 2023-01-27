import axios from 'axios'


export const transport = axios

transport.interceptors.response.use((response) => response, async function (error) {
  const originalRequest = error.config;
  console.log('originalRequest=', originalRequest)
  const role = getRol()
  if (
    (error.response.status === 403 && 
    originalRequest.url.indexOf("/session") === -1) ||
    !role
    ) {
    return window.location.replace('/')
  }
  return Promise.reject(error)
})

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
      const headers = { Authorization: `Bearer ${getSessionId()}` }
      const resp = await transport.put(link, body, { headers })
      if (resp.status === 200) {
        return resp.data
      }
    }
    catch (err) {
      //notify(err.response?.data?.message, 'error')
    }
  }
  
  const Post = async (link, body) => {
    try {
      const headers = { Authorization: `Bearer ${getSessionId()}` }
      const resp = await transport.post(link, body, { headers })
      if (resp.status === 200) {
        return resp.data
      }
    }
    catch (err) {
      throw err
    }
  }
  
  const Get = async (link) => {
    try {
      const headers = { Authorization: `Bearer ${getSessionId()}` }
      const resp = await transport.get(link, { headers })
      if (resp.status === 200) {
        return resp.data
      }
    }
    catch (err) {
      //notify(err.response?.data?.message, 'error')
    }
  }
  
  const Delete = async (link) => {
    try {
      const headers = { Authorization: `Bearer ${getSessionId()}` }
      const resp = await transport.delete(link, { headers })
      if (resp.status === 200) {
        return resp.data
      }
    }
    catch (err) {
      //notify(err.response?.data?.message, 'error')
    }
  }
  
  export const sendRequest = {
    Post,
    Get,
    Delete,
    Put
  }
