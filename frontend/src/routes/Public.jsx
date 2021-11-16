import { Redirect, Route } from "react-router-dom";

/* Hooks */
import useAuth from '../hooks/useAuth'

function Public(props) {
    const [token] = useAuth(true)

    if (token) {
        return <Redirect to='/' /> 
    }
    return (
        <Route {...props} />
    )
}

export default Public;