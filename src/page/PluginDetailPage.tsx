import {useState} from "react";
import {Plugin} from "./Types.ts";
import axios from "../axios.ts";
export default function PluginDetailPage({
                                             selectPlugin,
                                             isAddItem,
                                             backNaviListPage,
                                             toConfigListPage
}:{
    selectPlugin: Plugin,
    isAddItem: boolean,
    backNaviListPage: () => void,
    toConfigListPage: () => void
}) {
    const [currentPlugin, setCurrentPlugin] = useState(isAddItem ? {
        id: 0,
        user_id: 0,
        plugin_name: '',
        plugin_describe: '',
        plugin_host: '',
        plugin_port: 0,
        plugin_prefix: '',
        plugin_token: '',
        is_active: 0
    }: {...selectPlugin} as Plugin)
    const [tips, setTips] = useState("")

    return <>
        <div className="max-w-md mx-auto p-4 border border-gray-300 rounded-lg shadow-md bg-white">
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">Plugin</h1>
            <input
                type="text"
                value={currentPlugin.plugin_name}
                placeholder="插件名"
                onChange={(e) => {
                    currentPlugin.plugin_name = e.target.value
                    setCurrentPlugin({...currentPlugin})
                }}
                className="mb-4 w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
            />

            <input
                type="text"
                value={currentPlugin.plugin_describe || ''}
                placeholder="插件描述"
                onChange={(e) => {
                    currentPlugin.plugin_describe = e.target.value
                    setCurrentPlugin({...currentPlugin})
                }}
                className="mb-4 w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
            />

            <input
                type="text"
                value={currentPlugin.plugin_host}
                placeholder="插件访问地址"
                onChange={(e) => {
                    currentPlugin.plugin_host = e.target.value
                    setCurrentPlugin({...currentPlugin})
                }}
                className="mb-4 w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
            />

            <input
                type="number"
                value={currentPlugin.plugin_port}
                placeholder="插件访问端口"
                onChange={(e) => {
                    currentPlugin.plugin_port = Number(e.target.value)
                    setCurrentPlugin({...currentPlugin})
                }}
                className="mb-4 w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
            />

            <input
                type="text"
                value={currentPlugin.plugin_prefix || ''}
                placeholder="插件访问前缀"
                onChange={(e) => {
                    currentPlugin.plugin_prefix = e.target.value
                    setCurrentPlugin({...currentPlugin})
                }}
                className="mb-4 w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
            />

            <input
                type="text"
                value={currentPlugin.plugin_token}
                placeholder="插件访问Token"
                onChange={(e) => {
                    currentPlugin.plugin_token = e.target.value
                    setCurrentPlugin({...currentPlugin})
                }}
                className="mb-4 w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
            />

            {
                tips !== '' && (<label className="block text-red-700 text-sm font-bold mb-2">请求出错: {tips}</label>)
            }

            <div className="flex mb-4 justify-center">
                <button
                    className={`px-4 py-2 mr-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300`}
                    onClick={() => {
                        backNaviListPage()
                        setTips('')
                    }}>
                    后退
                </button>
                <button
                    className={`px-4 py-2 mr-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300`}
                    onClick={() => {
                        setTips('')
                        if (isAddItem) {
                            axios.post('/plugin/create', {...currentPlugin})
                                .then(res => {
                                    if (res.data.code === 0) {
                                        backNaviListPage()
                                    } else {
                                        setTips(res.data.msg)
                                    }
                                })
                        } else {
                            axios.put('/plugin/update', {...currentPlugin})
                                .then(res => {
                                    if (res.data.code === 0) {
                                        backNaviListPage()
                                    } else {
                                        setTips(res.data.msg)
                                    }
                                })
                        }
                    }}>
                    {isAddItem ? '新增' : '更新'}
                </button>
                {!isAddItem && (<button
                    className={`px-4 py-2 mr-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300`}
                    onClick={() => {
                        setTips('')
                        toConfigListPage()
                    }}>
                    配置管理
                </button>)}
                {!isAddItem && (<button
                    className={`px-4 py-2 mr-2 rounded-md bg-gray-200 text-gray-700 hover:bg-red-600`}
                    onClick={() => {
                        setTips('')
                        axios.delete(`/plugin/${currentPlugin.id}`)
                            .then(res => {
                                if (res.data.code === 0) {
                                    backNaviListPage()
                                } else {
                                    setTips(res.data.msg)
                                }
                            })
                    }}>
                    删除
                </button>)}
            </div>
        </div>
    </>
}