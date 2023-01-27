import React from "react"

import './style.scss';


export function Login() {
  return (
    <div class="body">
    <div class="wrapper">
        <header>FARMACIA LOGIN</header>
        <form action="#">
            <div class="field email">
                <div class="input-area">
                    <input type="text" placeholder=" Email"/>
                    <i class="icon fas fa-envelope"></i>
                    <i class="error error-icon fas fa-exclamation-circle"></i>
                </div>
                <div class="error error-txt">Email no puede estar vacio</div>
            </div>
            <div class="field password">
                <div class="input-area">
                    <input type="password" placeholder=" Contraseña"/>
                    <i class="icon fas fa-lock"></i>
                    <i class="error error-icon fas fa-exclamation-circle"></i>
                </div>
                <div class="error error-txt">Password no puede estar vacio</div>
            </div>
            <input type="submit" value="Login"/>
        </form>
    </div>
    </div>

  )
}