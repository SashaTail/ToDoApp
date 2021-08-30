import './header.css';
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
        <div className='container_nav'>
            <div className="logo_nav">
                <a className="logo_text_" style={{textDecoration: 'none'}} href="/">Список<br/>твоих<br/>дел</a>
            </div>
            <ul>
            <div className="navigation_">
                <li className="navigation_item_">
                    <a className="navigation_text_" style={{textDecoration: 'none'}} href='/'>Menu Item1</a>
                </li>
                {auth.isAuthenticated ?
                    (<li className="navigation_item_"><a  className= "navigation_text_" style={{textDecoration: 'none'}} href='/' onClick={logoutHandler}>Выйти</a></li>) :
                    (<li className="navigation_item_"><a  className= "navigation_text_" style={{textDecoration: 'none'}} href='/auth'>Авторизация</a></li>)}
            </div>
            </ul>
        </div>

    )
}