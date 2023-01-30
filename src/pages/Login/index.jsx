import React from "react"
import { swalClose, swalLoading } from '../../utils/swal';
import { useMutation } from "react-query";
import { signin } from "../../services/session.service";
import './style.scss';
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { setRol, setSessionId, setUser } from "../../utils/helper";
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { config } from "../../config";


export function Login() {
    const history = useHistory()
    const loginMutation = useMutation('login', signin, {
        ...config.defaultReactQuery,
        onSuccess: (resp) => {
            swalClose();
            setSessionId(resp.session?.id)
            setRol(resp.user?.role)
            const user = {
                id: resp.user?.id,
                username: resp.user?.username,
                subsidiary: resp.user?.Subsidiary?.name
            }
            setUser(user)
            history.push('/drugs')
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
            <div className="contenfrom">
                <div className="field email">
                    <div className="input-area">
                        <PersonIcon/>
                        <input type="text" placeholder=" Username"/>
                    </div>
                    <div className="error error-txt">Email no puede estar vacio</div>
                </div>
                <div className="field password">
                    <div className="input-area">
                        <LockIcon/>
                        <input type="password" placeholder=" Password"/>
                    </div>
                    <div className="error error-txt">Password no puede estar vacio</div>
                </div>
                <input type="submit" value="Login"/>
            </div>
          </form>
      </div>
      </div>
    )
}