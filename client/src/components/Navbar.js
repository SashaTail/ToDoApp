import React, { useContext } from 'react'
import { NavLink , useHistory} from 'react-router-dom'

export const Navbar=  () =>
{
    const history = useHistory()
    const logoutHandler = event =>{
        event.preventDefault()
        
        history.push('/')

    }
    return ( 
        <nav class="navbar navbar-dropdown navbar-fixed-top navbar-expand-lg">
        <div class="container">
            <div class="navbar-brand">
                <span class="navbar-logo">
                </span>
                <span class="navbar-caption-wrap" ><a class="navbar-caption text-black" href="https://mobiri.se">Список<br/>твоих<br/>дел</a></span>
            </div>
            <div class="collapse navbar-collapse flex-grow-0" id="navbarSupportedContent">
                <ul class="navbar-nav nav-dropdown nav-right" data-app-modern-menu="true">
                <li class="nav-item" ><a class="nav-link link text-black" href="https://mobirise.com" >Menu Item 1</a></li>
                    <li class="nav-item" style={{paddingRight: '5rem'}}><a class="nav-link link text-black" href="https://mobirise.com">
                            Авторизация</a></li></ul>
                
                
            </div>
        </div>
    </nav>

    )
}