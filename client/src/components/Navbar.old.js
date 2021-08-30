import React, { useContext } from 'react'
import {useHistory} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export const Navbar=  () =>
{
    const history = useHistory()
    const auth = useContext(AuthContext)
    const logoutHandler = event =>{
        event.preventDefault()
        auth.logout()
        history.push('/')

    }
    return ( 
        <nav className="navbar navbar-dropdown navbar-fixed-top navbar-expand-lg">
        <div className="container">
            <div className="navbar-brand">
                <span className="navbar-caption-wrap" ><a style={{color:'black', fontFamily:'Segoe UI', fontWeight:"500"}} href="/">Список<br/>твоих<br/>дел</a></span>
            </div>
            <div className="collapse navbar-collapse flex-grow-0" id="navbarSupportedContent">
                <ul className="navbar-nav nav-dropdown nav-right" data-app-modern-menu="true">
                <li className="nav-item" ><a class="nav-link link text-black" href="/" >Menu Item 1</a></li>
                {auth.isAuthenticated ?
                        (<li className="nav-item" style={{paddingRight: '5rem'}}>
                        
                        <a className="nav-link link text-black" href="/" onClick={logoutHandler}>Выйти</a>
                        </li>)
                        : (<li className="nav-item" style={{paddingRight: '5rem'}}>
                        
                        <a className="nav-link link text-black" href="/auth">Авторизация</a>
                        </li>)}
                        </ul>
                
                
            </div>
        </div>
    </nav>

    )
}