import { useState } from 'react'
import axios from '../axios.ts'

export default function Login({ setIsLogin } : {setIsLogin: (value: boolean) => void}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [tips, setTips] = useState("")

    const [remember, setRemember] = useState(false)
    const [autoRegister, setAutoRegister] = useState(false)

    return (<>
        <div className="p-8 rounded-lg shadow-md w-96">
            <h1 className="text-2xl font-bold mb-6 text-center">注册&登录</h1>
            <div className="mb-4">
                <input
                    type="text"
                    id="username"
                    value={username}
                    placeholder="用户名"
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
                />
            </div>
            <div className="mb-6">
                <input
                    type="password"
                    id="password"
                    value={password}
                    placeholder="密码"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
                />
            </div>
            <div className="mb-6 flex items-center">
                <input
                    type="checkbox"
                    id="remember"
                    checked={remember}
                    onChange={() => setRemember(!remember)}
                    className="mr-2 ml-2"
                />
                <label htmlFor="remember" className="text-gray-700">
                    记住我
                </label>
                <input
                    type="checkbox"
                    id="autoRegister"
                    checked={autoRegister}
                    onChange={() => setAutoRegister(!autoRegister)}
                    className="mr-2 ml-2"
                />
                <label htmlFor="autoRegister" className="text-gray-700">
                    自动注册
                </label>
            </div>
            <button
                onClick={() => {login().then()}}
                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none"
            >
                注册&登录
            </button>
            {
                tips !== '' && (
                    <label className="block text-red-700 text-sm font-bold mb-2"
                           htmlFor="password">登录错误: {tips}</label>)
            }
        </div>
    </>)

    async function login() {
        if (!username || !password) {
            setTips('用户名或密码不能为空.')
            return
        }
        const res = await axios.get(`/user/login?username=${username}&password=${password}`)
        if (res.data.code === 0) {
            setTips('')
            axios.defaults.headers.common['token'] = res.data.data.token
            setIsLogin(true)
            if (remember) {
                localStorage.setItem('token', res.data.data.token)
                localStorage.setItem('flush_token', res.data.data.flush_token)
                localStorage.setItem('username', username)
            }
        } else {
            if (res.data.code === -16 && autoRegister) {
                const registerResult = await axios.get(`/user/register?username=${username}&password=${password}`)
                if (registerResult.data.code === 0) {
                    axios.defaults.headers.common['token'] = registerResult.data.data.token
                    setIsLogin(true)
                    if (remember) {
                        localStorage.setItem('token', registerResult.data.data.token)
                        localStorage.setItem('flush_token', registerResult.data.data.flush_token)
                        localStorage.setItem('username', username)
                    }
                } else {
                    setTips(registerResult.data.msg)
                }
            } else {
                setTips(res.data.msg)
            }
        }
    }

}