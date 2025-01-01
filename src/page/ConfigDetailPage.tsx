import {Config} from "./Types.ts";
import {useState} from "react";
import axios from "../axios.ts";

export default function ConfigDetailPage({
                                             selectConfig,
                                             isAddConfig,
                                             backConfigListPage
}: {
    selectConfig: Config,
    isAddConfig: boolean,
    backConfigListPage: () => void
}) {
    const [currentConfig, setCurrentConfig] = useState({...selectConfig} as Config)
    const [tips, setTips] = useState("")

    return <>
        <div className="max-w-md mx-auto p-4 border border-gray-300 rounded-lg shadow-md bg-white">
            <input
                type="text"
                value={currentConfig.config_key}
                placeholder="配置键"
                onChange={(e) => {
                    currentConfig.config_key = e.target.value
                    setCurrentConfig({...currentConfig})
                }}
                className="mb-4 w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
            />

            <input
                type="text"
                value={currentConfig.config_value}
                placeholder="配置值"
                onChange={(e) => {
                    currentConfig.config_value = e.target.value
                    setCurrentConfig({...currentConfig})
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
                        backConfigListPage()
                        setTips('')
                    }}>
                    后退
                </button>
                <button
                    className={`px-4 py-2 mr-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300`}
                    onClick={() => {
                        setTips('')
                        if (isAddConfig) {
                            axios.post('/config/create', {...currentConfig})
                                .then(res => {
                                    if (res.data.code === 0) {
                                        backConfigListPage()
                                    } else {
                                        setTips(res.data.msg)
                                    }
                                })
                        } else {
                            axios.put('/config/update', {...currentConfig})
                                .then(res => {
                                    if (res.data.code === 0) {
                                        backConfigListPage()
                                    } else {
                                        setTips(res.data.msg)
                                    }
                                })
                        }
                    }}>
                    {isAddConfig ? '新增' : '更新'}
                </button>
                {!isAddConfig && (<button
                    className={`px-4 py-2 mr-2 rounded-md bg-gray-200 text-gray-700 hover:bg-red-600`}
                    onClick={() => {
                        setTips('')
                        axios.delete(`/config/${currentConfig.id}`)
                            .then(res => {
                                if (res.data.code === 0) {
                                    backConfigListPage()
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