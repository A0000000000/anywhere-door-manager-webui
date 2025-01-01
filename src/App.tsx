import "./App.css";
import { useState } from "react";
import Login from "./page/Login.tsx";
import Operator from "./page/Operator.tsx";
import axios from "./axios.ts";

function App() {
    const [isLogin, setIsLogin] = useState(false)
    const [firstLoad, setFirstLoad] = useState(true)
    if (firstLoad) {
        checkLocalStatus().then(setIsLogin)
        setFirstLoad(false)
    }
    return (
        <>
            <h1>AnywhereDoor</h1>
            <div className="card">
                {
                    !isLogin ? (<Login setIsLogin={ setIsLogin }></Login>) : (<Operator></Operator>)
                }
            </div>
        </>
    )
}

async function checkLocalStatus() {
    let token = localStorage.getItem('token') || ''
    let flush_token = localStorage.getItem('flush_token') || ''
    const result = await axios.get(`/user/flush_token?token=${token}&flush_token=${flush_token}`)
    if (result.data.code === 0) {
        token = result.data.data.token
        flush_token = result.data.data.token
        axios.defaults.headers.common['token'] = token
        localStorage.setItem('token', token)
        localStorage.setItem('flush_token', flush_token)
        return true
    } else {
        localStorage.removeItem('token')
        localStorage.removeItem('flush_token')
        localStorage.removeItem('username')
    }
    return false
}

export default App
