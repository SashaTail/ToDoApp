import './App.css';
import {BrowserRouter as Router} from 'react-router-dom'
import {Card, Button, Nav} from 'react-bootstrap'
import { Navbar } from './components/Navbar';
import { StartPage } from './Pages/StartPage';
import { useRoutes } from './routes'
import { useAuth } from './hooks/auth.hook';
import "materialize-css"


function App() {
  const {token,login,logout, userId, ready} = useAuth()
 // const isAuthenticated = !!token
  const isAuthenticated = false
  const routes= useRoutes(isAuthenticated)
  console.log(isAuthenticated)
  return (
    <Router>
    <Navbar></Navbar>
    <div>
       {routes}
    </div>
    </Router>
  );
}

export default App;
