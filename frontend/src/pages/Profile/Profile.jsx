import { useState, useEffect } from "react";
import axios from 'axios'
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import url from "../../assets/url";

function Profile() {
    const [token] = useAuth(true)
    const [user, setUser] = useState([])

    useEffect(() => {
        axios.get(`${url}signup`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => {
                setUser(res.data);
            })
            .catch (err => {
                console.log(err);
            })
    }, [])
    
    
    return (
        <div className="Profile">
            <h2>{user.username}</h2>
            <h1>{user.fname}</h1>
            <Link to='/'>Home</Link>
        </div>
    )
}

export default Profile;