
import {Switch, Route, Redirect} from 'react-router-dom'
import { AuthPage } from './Pages/AuthPage'
import { PlanPage } from './Pages/PlansPage'
import { RegisterPage } from './Pages/RegisterPage'
import { StartPage } from "./Pages/StartPage"
import { TestPage } from './Pages/TestPage'
export const useRoutes = isAuthenticated => 
{
    if (isAuthenticated)
    {
        return ( 
            <Switch>
                <Route exact path="/plans" component={PlanPage} />
                <Route path="/create" exact >
                    <StartPage /> 
                </Route>
                <Route path="/detail/:id" exact >
                    <StartPage /> 
                </Route>
                <Route path="/test" exact >
                    <TestPage /> 
                </Route>
                <Redirect to="/plans" />
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
            <Route path='/register' exact>
                <RegisterPage />
            </Route>
        </Switch>
    )
}