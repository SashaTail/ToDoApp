
import {Switch, Route, Redirect} from 'react-router-dom'
import { AuthPage } from './Pages/AuthPage'
import { StartPage } from "./Pages/StartPage"

export const useRoutes = isAuthenticated => 
{
    if (isAuthenticated)
    {
        return ( 
            <Switch>
                <Route path="/links" exact >
                    <StartPage  /> 
                </Route>
                <Route path="/create" exact >
                    <StartPage /> 
                </Route>
                <Route path="/detail/:id" exact >
                    <StartPage /> 
                </Route>
                <Redirect to="/create" />
            </Switch>
        )
    }
    return ( 
        <Switch>
            <Route path='/' exact>
                <StartPage />
            </Route>
            <Route path='/auth' exact>
                <AuthPage />
            </Route>
            <Redirect to='/' />
        </Switch>
    )
}