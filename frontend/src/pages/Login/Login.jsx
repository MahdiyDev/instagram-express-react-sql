import { useRef } from "react";
import useAuth from "../../hooks/useAuth";
import url from "../../assets/url";

function Login() {
    const email = useRef()
    const password = useRef()

    const [setToken] = useAuth(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = {
            email: email.current.value,
            password: password.current.value
        }

        try {
            (async () => {
                await fetch(`${url}login`, {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data),
                    })
                    .then(res => res.json())
                    .then(data => setToken(data.accessToken))
            })()
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="Login">
            <form
                onSubmit={ handleSubmit }>
                <input 
                    type="text" 
                    placeholder='Email'
                    ref={email}
                />
                <input 
                    type="password" 
                    placeholder='Password'
                    ref={password}
                />
                <button type="submit">Log In</button>
            </form>
        </div>
    )
}

export default Login;