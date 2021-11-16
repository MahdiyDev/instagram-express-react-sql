import { useRef } from "react"
import { Link } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import url from "../../assets/url"

function SignUp() {
    const email = useRef()
    const fname = useRef()
    const username = useRef()
    const password = useRef()

    const [setToken] = useAuth(false)

    const submitForm = async (e) => {
        e.preventDefault()

        const data = {
            email: email.current.value,
            fname: fname.current.value,
            username: username.current.value,
            password: password.current.value
        }

        await fetch(`${url}signup`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then(res => res.json())
            .then(data => setToken(data.accessToken))
    }

    return (
        <div className="SignUp">
            <form 
                onSubmit={ submitForm }
            >
                <input 
                    type="email" 
                    placeholder='Email'
                    ref={email}
                />
                <input 
                    type="text" 
                    placeholder='Full Name'
                    ref={fname}
                />
                <input 
                    type="text" 
                    placeholder='username'
                    ref={username}
                />
                <input 
                    type="password" 
                    placeholder='Password'
                    ref={password}
                />
                <button type="submit">Sign up</button>
            </form>
            <span>Have an account?<Link to='/login'> Log in</Link></span>
        </div>
    )
}

export default SignUp;
