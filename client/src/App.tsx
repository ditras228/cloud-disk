import NavBar from './components/navbar/NavBar'
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import Registration from './components/registration/Registration'
import Auth from './components/login/Login'
import {useDispatch, useSelector} from 'react-redux'
import {useEffect} from 'react'
import Disk from './components/disk/Disk'
import {IsAuth} from './redux/selectors'
import Profile from './components/profile/Profile'
import Share from './components/share/Share'
import {auth} from './redux/actions/user'

function App() {
    const isAuth = useSelector(state => IsAuth(state))
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(auth())
    }, [])
    return (
        <BrowserRouter>
            <NavBar/>
            {!isAuth && !localStorage.getItem('token')?
            <Switch>
                <Route path={'/registration'} component={Registration}/>
                <Route path={'/login'} component={Auth}/>
                <Redirect to={'/login'}/>
            </Switch>
                :
                <Switch>
                    <Route exact path={'/'} component={Disk}/>
                    <Route exact path={'/profile'} component={Profile}/>
                    <Route path={'/share'} component={Share}/>
                    <Redirect to={'/'}/>
                </Switch>
            }
        </BrowserRouter>
    );
}

export default App;
