import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading,request,error,  clearError} = useHttp()
    const [form, setForm] = useState({
        username: '', password: ''
      })

      useEffect( ()=> {
        window.M.updateTextFields()
    },[])

      useEffect( () => {
        console.log(error)
        message(error)
        clearError()
    }, [error,message,clearError])
    const changeHandler = event => {
        setForm ({ ...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
          const data = await request('/api/auth/register', 'POST', {...form})
          message(data.message)
          console.log(form)
        } catch (e) {}
      }

      const loginHandler = async () => {
        try {
          const data = await request('/api/auth/login', 'POST', {...form})
          auth.login(data.token, data.userId)
        } catch (e) {}
      }
    return (
        <div className='row justify-content-center'>
            <div className="col s6 offset-s3">
                <div className="card blue-grey darken-1">
                  <div className="card-content white-text">
                    <span className="card-title">Auth</span>


                    <div className="input-field">
                          <input 
                          placeholder="Введите username" 
                          id="string" 
                          type="text" 
                          name='username'
                          value={form.username}
                          onChange={changeHandler}
                          />
                          <label htmlFor="username">username</label>
                    </div>

                    <div className="input-field">
                          <input 
                          placeholder="Введите пароль" 
                          id="password" 
                          type="password" 
                          name='password'
                          value={form.password}
                          onChange={changeHandler}/>
                          
                          <label htmlFor="password">password</label>
                    </div>
                    
                  </div>
                  <div className="card-action">
                    <button className="btn yellow darken-4" style ={{ marginRight: 10}} onClick={loginHandler} disabled = {loading}>Log in</button>
                    <button className="btn yellow darken-4" onClick={registerHandler} disabled = {loading}>Sign in</button>

                  </div>
                </div>
            </div>
        </div>
    )
}