import './App.css';
import {BrowserRouter as Router} from 'react-router-dom'
import { Navbar } from './components/Navbar';
import { useRoutes } from './routes'
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/AuthContext';
import React  from 'react';
import 'materialize-css'
import { ToastProvider } from 'react-toast-notifications';


function App() {
  const {token,login,logout, userId,check} = useAuth()
 const isAuthenticated = !!token

 
  //const isAuthenticated = false
  const routes= useRoutes(isAuthenticated)
  return (
    <AuthContext.Provider value={ {token,login,logout,userId,isAuthenticated,check}}>
    <ToastProvider>
    <Navbar></Navbar>
    <Router>
    <div>
       {routes}
    </div>
    </Router>
  </ToastProvider>
    </AuthContext.Provider>
  );
}

export default App;
