import './App.css';
import NavBar from "./components/navbar/NavBar";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import Registration from "./components/registration/Registration";
import Auth from "./components/login/Login";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {auth} from "./components/actions/user";
import Disk from "./components/disk/Disk";

function App() {
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(auth())
    }, [])
    return (
        <BrowserRouter>
            <NavBar/>
            {!isAuth ?
            <Switch>
                <Route path={'/registration'} component={Registration}/>
                <Route path={'/login'} component={Auth}/>
                <Redirect to={'/login'}/>
            </Switch>
                :
                <Switch>
                    <Route exact path={'/'} component={Disk}/>
                    <Redirect to={'/'}/>
                </Switch>
            }

        </BrowserRouter>
    );
}

export default App;
