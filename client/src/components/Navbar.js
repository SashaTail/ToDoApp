import React, { useContext } from 'react'
import { NavLink , useHistory} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export const Navbar=  () =>
{
    const history = useHistory()
    const auth = useContext(AuthContext)
    console.log(auth)
    const logoutHandler = event =>{
        event.preventDefault()
        auth.logout()
        history.push('/')

    }
    return ( 
        <nav class="navbar navbar-dropdown navbar-fixed-top navbar-expand-lg">
        <div class="container">
            <div class="navbar-brand">
                <span class="navbar-logo">
                </span>
                <span class="navbar-caption-wrap" ><a style={{color:'black', fontFamily:'Segoe UI', fontWeight:"500"}} href="/">Список<br/>твоих<br/>дел</a></span>
            </div>
            <div class="collapse navbar-collapse flex-grow-0" id="navbarSupportedContent">
                <ul class="navbar-nav nav-dropdown nav-right" data-app-modern-menu="true">
                <li class="nav-item" ><a class="nav-link link text-black" href="/" >Menu Item 1</a></li>
                {auth.isAuthenticated ?
                        (<li class="nav-item" style={{paddingRight: '5rem'}}>
                        
                        <a class="nav-link link text-black" href="/" onClick={logoutHandler}>Выйти</a>
                        </li>)
                        : (<li class="nav-item" style={{paddingRight: '5rem'}}>
                        
                        <a class="nav-link link text-black" href="/auth">Авторизация</a>
                        </li>)}
                        </ul>
                
                
            </div>
        </div>
    </nav>

    )
}