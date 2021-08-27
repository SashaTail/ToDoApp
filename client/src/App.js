import './App.css';
import {BrowserRouter as Router} from 'react-router-dom'
import {Card, Button, Nav} from 'react-bootstrap'
import { Navbar } from './components/Navbar';
import { StartPage } from './Pages/StartPage';
import { useRoutes } from './routes'
import { useAuth } from './hooks/auth.hook';
import "materialize-css"
import { AuthContext } from './context/AuthContext';


function App() {
  const {token,login,logout, userId, ready} = useAuth()
 const isAuthenticated = !!token
  //const isAuthenticated = false
  const routes= useRoutes(isAuthenticated)
  console.log(isAuthenticated)
  return (
    <AuthContext.Provider value={ {token,login,logout,userId,isAuthenticated}}>
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
