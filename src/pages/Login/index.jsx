import React from "react"
import { swalClose, swalError, swalLoading } from '../../utils/swal';
import { useMutation } from "react-query";
import { signin } from "../../services/login.service";
import './style.scss';
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { setRol, setSessionId } from "../../utils/helper";


export function Login() {
    const history = useHistory()
    const loginMutation = useMutation('login', signin, {
        retry: 0,
        onSuccess: (resp) => {
            swalClose();
            setSessionId(resp.session?.id)
            setRol(resp.user?.role)
            history.push('/medicinas')
        },
        onError: (err) => {
            swalClose();
            swalError("Ha ocurrido un error", err.response?.data?.error?.message);
        }
    })

    useEffect(() => {
        if(loginMutation.isLoading) swalLoading()
    },[loginMutation.isLoading])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const username = e.target[0].value
        const password = e.target[1].value
        loginMutation.mutate({password, username})
    }

    return (
      <div className="body">
      <div className="wrapper">
          <header>FARMACIA LOGIN</header>
          <form onSubmit={handleSubmit}>
              <div className="field email">
                  <div className="input-area">
                      <input type="text" placeholder=" Email"/>
                      <i className="icon fas fa-envelope"></i>
                      <i className="error error-icon fas fa-exclamation-circle"></i>
                  </div>
                  <div className="error error-txt">Email no puede estar vacio</div>
              </div>
              <div className="field password">
                  <div className="input-area">
                      <input type="password" placeholder=" Contraseña"/>
                      <i className="icon fas fa-lock"></i>
                      <i className="error error-icon fas fa-exclamation-circle"></i>
                  </div>
                  <div className="error error-txt">Password no puede estar vacio</div>
              </div>
              <input type="submit" value="Login"/>
          </form>
      </div>
      </div>
    )
}