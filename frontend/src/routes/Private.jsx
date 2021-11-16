import { Redirect, Route } from "react-router-dom";

/* Hooks */
import useAuth from '../hooks/useAuth'

function Private(props) {
    const [token] = useAuth(true)

    if (token) {
        return <Route {...props} />
    } else {
        return <Redirect to='/signup' />
    }
}

export default Private;