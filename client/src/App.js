import './App.css';
import {BrowserRouter as Router} from 'react-router-dom'
import { Navbar } from './components/Navbar';
import { useRoutes } from './routes'
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import React, {useEffect} from 'react';
import { useHttp } from './hooks/http.hook';


function App() {
  const {token,login,logout, userId,check} = useAuth()
 const isAuthenticated = !!token

 
  //const isAuthenticated = false
  const routes= useRoutes(isAuthenticated)
  return (
    <AuthContext.Provider value={ {token,login,logout,userId,isAuthenticated,check}}>
    <Router>
    <Navbar></Navbar>
    <div>
       {routes}
    </div>
    </Router>
    </AuthContext.Provider>
  );
}

export default App;
