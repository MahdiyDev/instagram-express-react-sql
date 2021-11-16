import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import url from "../../assets/url";

function Home() {
    const [token] = useAuth(true)
    const fileInput = useRef()
    const contentInput = useRef()

    const [user, setUser] = useState([])
    const [post, setPost] = useState([])

    const handleSubmit = async (e) => {
        const newData = new FormData()

        newData.append('poster', fileInput.current.files[0])
        newData.append('content', contentInput.current.value)
        newData.append('username', user.username)

        try {
            await fetch(`${url}posts`, {
            method: "POST",
            body: newData
        })
        } catch (error) {
            console.log(error);
        }
    }

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

    useEffect(() => {
        axios.get(`${url}posts`)
            .then(res => {
                setPost(res.data);
            })
            .catch (err => {
                console.log(err);
            })
    }, [])
    console.log(post);
    return (
        <div className="Home">
            <Link to='/profile'>Profile</Link>
            <form 
                onSubmit={ handleSubmit }
                encType='multipart/form-data'
            >
                <input ref={contentInput} type="text" name="content" placeholder="description" />
                <input ref={fileInput} type="file" name="poster" />
                <button type="submit">post</button>
            </form>
            <ul>
                {post.length ? post.map(e => {
                    return (
                        <li key={e.postName}>
                            <h3>{e.username}</h3>
                            <p>{e.content}</p>
                            {e.type === 'mp4' ? <video autoPlay controls  width='600' >
                                <source src={`${url}image ${e.postName}`} type='video/mp4' />
                            </video> :
                            <img width='600' src={`${url}image/ ${e.postName}`} alt={e.postName} />}
                        </li>
                    )
                }) : []}
            </ul>
            
        </div>
    )
}

export default Home;
