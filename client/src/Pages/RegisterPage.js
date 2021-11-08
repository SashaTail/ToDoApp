import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'


import {  useToasts } from 'react-toast-notifications';
export const RegisterPage = () => {
    const auth = useContext(AuthContext)
    const {loading,request,error,  clearError, setLoading} = useHttp()
    const [form, setForm] = useState({
        username: '', password: ''
      })
    const [color, setColor] = useState('white')
    
      const { addToast } = useToasts();
    

    const changeHandler = async event => {
        setForm ({ ...form, [event.target.name]: event.target.value})


        const obj= {username:form.username}
        const data = await request('/api/auth/check', 'POST', obj)
        setColor(data.color)
        if (color === 'red')
        {
          setLoading(true)
        }
    }
    const pressHandler = async event =>
    {
        if (event.key === 'Enter')
        {
            registerHandler()
        }
    }

    const registerHandler = async () => {
        try {
          const data = await request('/api/auth/register', 'POST', {...form})
          addToast(data.message)
        } catch (e) {}
      }


    return (
<div style= {{backgroundColor: "rgb(240, 240, 240)", display:'flex', maxHeight:'830px'}}>
<div className="col s1 offset-s1" style={{paddingTop: '7rem', paddingBottom:'15.5rem'}}>
        <div className="row justify-content-center">
            <h3 className="display-2">
                <strong>Просто.</strong></h3>
            
        </div>
        <div className="row justify-content-center mt-4">
            <div className="col-lg-2" style={{background:'#fafafa', justifyContent:'center', borderRadius:'7px'}} onKeyPress={pressHandler}>
            <p className="mt-4 display-7" style={{paddingTop:'3rem', paddingLeft:'1rem'}}>
                        Зарегистируйся.
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
                          style={{backgroundColor:color}}
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
                          onChange={changeHandler}
                          />
                    </div>
                    </div>
                    
                  <div className="row justify-content-center mt-4" style={{paddingBottom:'3rem'}}>
                    <button className="btn yellow darken-4" style ={{ marginRight: 10}} onClick={registerHandler} disabled = {loading}>Sign In</button>
                    <a href='/auth' style={{cursor:"pointer", color:'blue'}}>Есть аккаунт?</a>

                  </div>
                  </div>
                  </div>
                  </div>
                  </div>
                  

    )
}