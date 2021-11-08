import './header.css';
import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
export const Navbar=  () =>
{   
    const auth = useContext(AuthContext)
    const logoutHandler = event =>{
        event.preventDefault()
        auth.logout()
    }
    return ( 
        <div className='container_nav'>
            <div className="logo_nav">
                <a className="logo_text_" style={{textDecoration: 'none'}} href="/">Список<br/>твоих<br/>дел</a>
            </div>
            <ul>
            <div className="navigation_">
                <li className="navigation_item_">
                    <a className="navigation_text_" style={{textDecoration: 'none'}} href='/test'>Тестовая страница</a>
                </li>
                {auth.isAuthenticated ?
                    (<li className="navigation_item_"><a  className= "navigation_text_" style={{textDecoration: 'none'}} href='/' onClick={logoutHandler}>Выйти</a></li>) :
                    (<li className="navigation_item_"><a  className= "navigation_text_" style={{textDecoration: 'none'}} href='/auth'>Авторизация</a></li>)}
            </div>
            </ul>
        </div>

    )
}