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


      useEffect( () => {
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
        } catch (e) {}
      }

      const loginHandler = async () => {
        try {
          const data = await request('/api/auth/login', 'POST', {...form})
          auth.login(data.token, data.userId)
          
        } catch (e) {}
      }

      const checkHandler = async () => {
        try {
          const data = await request('/api/auth/check', 'GET', null, {
            Authorization: `Bearer ${auth.token}`
          })
          auth.login(data.token, data.userId)
          
        } catch (e) {}
      }


    return (
<div className='jarallax-container-0' style= {{backgroundColor: "rgb(240, 240, 240)"}}>
<div className="col s1 offset-s1" style={{paddingTop: '7rem', paddingBottom:'15.5rem'}}>
        <div className="row justify-content-center mt-4">
            <h3 className="col-lg-2 display-2">
                <strong>Просто.</strong></h3>
            
        </div>
        <div className="row justify-content-center mt-4">
            <div className="col-lg-2" style={{background:'#fafafa', justifyContent:'center', borderRadius:'7px'}}>
            <p className="mt-4 display-7" style={{paddingTop:'3rem', paddingLeft:'1rem'}}>
                        Зарегистируйся или авторизуйся.
                    </p>
                    <div className='drag-area px-3' style={{justifyContent: 'center'}}>
                    <div className="input-field " style= {{paddingBottom:'1rem'}}>
                          <input 
                          placeholder="Введите username" 
                          id="string" 
                          className= 'form-control'
                          type="text" 
                          name='username'
                          value={form.username}
                          onChange={changeHandler}
                          />
                    </div>

                    <div className="input-field">
                          <input 
                          placeholder="Введите пароль" 
                          id="password" 
                          type="password" 
                          className= 'form-control'
                          name='password'
                          value={form.password}
                          onChange={changeHandler}/>
                    </div>
                    </div>
                    
                  <div className="row justify-content-center mt-4" style={{paddingBottom:'3rem'}}>
                    <button className="btn yellow darken-4" style ={{ marginRight: 10}} onClick={loginHandler} disabled = {loading}>Log in</button>
                    <button className="btn yellow darken-4" onClick={registerHandler} disabled = {loading}>Sign in</button>

                  </div>
                  </div>
                  </div>
                  </div>
                  </div>
                  

    )
}