import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {useSelector} from 'react-redux'

import {RootState} from './types/redux.index'
import AuthController from './controllers/auth.controller'
import ErrorBoundry from './components/error-boundry'
import Header from './components/header'
import RandomPlanet from './components/random-planet'
import PeoplePage from './pages/people'
import PlanetsPage from './pages/planets'
import StarshipsPage from './pages/starships'
import StarshipDetails from './components/details/starship'
import SignIn from './pages/sign-in'
import SignUp from './pages/sign-up'
import ProfilePage from './pages/profile'

import './styles/main'

export default function App() {
    const user = useSelector((state: RootState) => state.reducerAuth.user)

    React.useEffect(() => {
        if (localStorage.getItem('token')) {
            AuthController.checkAuth()
        }
    }, [])

    return (
        <ErrorBoundry>
            <Router>
                <div className='app'>
                    <Header isAuth={user} />
                    <RandomPlanet />

                    <Switch>
                        <Route path='/' exact render={() => <span className='main-text'>Welcome to StarDB</span>} />
                        <Route path='/people/:id?' component={PeoplePage} />
                        <Route path='/planets/:id?' component={PlanetsPage} />
                        <Route path='/starships' exact component={StarshipsPage} />
                        <Route path='/starships/:id' render={({ match}) => {
                            const {id} = match.params
                            return <StarshipDetails starshipId={id} />
                        }} />
                        <Route path='/sign-in' exact component={SignIn} />
                        <Route path='/sign-up' exact component={SignUp} />
                        <Route path='/profile' exact component={ProfilePage} />

                        <Route path='*' render={() => <span className='main-text'>Page not found</span>} />
                    </Switch>
                </div>
            </Router>
        </ErrorBoundry>
    )
}