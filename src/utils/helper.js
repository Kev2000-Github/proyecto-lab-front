import axios from 'axios'


export const transport = axios

transport.interceptors.response.use((response) => response, async function (error) {
  const originalRequest = error.config;
  const role = getRol()
  if (
    (error.response.status === 401 || !role) && 
    originalRequest.url.indexOf("/session") === -1
    ) {
    return window.location.replace('/')
  }
  return Promise.reject(error)
})

export const getSessionId = () => localStorage.getItem('sessionId')
export const getRol = () => localStorage.getItem('rol')
export const getUser = () => {
  const userString = localStorage.getItem('user')
  if(isJSON(userString)){
    const user = JSON.parse(userString)
    return user
  }
  deleteUser()
  return null
}

export const setSessionId = (sessionId) => {
  localStorage.setItem('sessionId', sessionId)
}

export const setRol = (rol) => {
  localStorage.setItem('rol', rol)
}

export const setUser = (user) => {
  const relevantData = {
    id: user?.id,
    username: user?.username,
    subsidiary: user?.subsidiary
  }
  const userParsed = JSON.stringify(relevantData)
  localStorage.setItem('user', userParsed)
}

export const isJSON = (jsonString) => {
  try{
    JSON.parse(jsonString)
    return true
  }
  catch{
    return false
  }
}

export const deleteRol = () => {
  localStorage.removeItem('rol')
}

export const deleteSessionId = () => {
  localStorage.removeItem('sessionId')
}

export const deleteUser = () => {
  localStorage.removeItem('user')
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
      throw err
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
      throw err
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
      throw err
    }
  }
  
  export const sendRequest = {
    Post,
    Get,
    Delete,
    Put
  }
