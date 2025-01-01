import {useState} from "react";
import {Imsdk} from "./Types.ts";
import axios from "../axios.ts";
export default function ImsdkDetailPage({
                                            selectImsdk,
                                            isAddItem,
                                            backNaviListPage,
                                            toConfigListPage
}: {
    selectImsdk: Imsdk,
    isAddItem: boolean,
    backNaviListPage: () => void,
    toConfigListPage: () => void
}) {
    const [currentImsdk, setCurrentImsdk] = useState(isAddItem ? {
        id: 0,
        user_id: 0,
        imsdk_name: '',
        imsdk_describe: '',
        imsdk_host: '',
        imsdk_port: 0,
        imsdk_token: '',
        imsdk_prefix: '',
        is_active: 0
    } : {...selectImsdk} as Imsdk);
    const [tips, setTips] = useState("")
    return <>
        <div className="max-w-md mx-auto p-4 border border-gray-300 rounded-lg shadow-md bg-white">
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">IMSDK</h1>
            <input
                type="text"
                value={currentImsdk.imsdk_name}
                placeholder="IMSDK名"
                onChange={(e) => {
                    currentImsdk.imsdk_name = e.target.value
                    setCurrentImsdk({...currentImsdk})
                }}
                className="mb-4 w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
            />

            <input
                type="text"
                value={currentImsdk.imsdk_describe || ''}
                placeholder="IMSDK描述"
                onChange={(e) => {
                    currentImsdk.imsdk_describe = e.target.value
                    setCurrentImsdk({...currentImsdk})
                }}
                className="mb-4 w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
            />

            <input
                type="text"
                value={currentImsdk.imsdk_host}
                placeholder="IMSDK访问地址"
                onChange={(e) => {
                    currentImsdk.imsdk_host = e.target.value
                    setCurrentImsdk({...currentImsdk})
                }}
                className="mb-4 w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
            />

            <input
                type="number"
                value={currentImsdk.imsdk_port}
                placeholder="IMSDK访问端口"
                onChange={(e) => {
                    currentImsdk.imsdk_port = Number(e.target.value)
                    setCurrentImsdk({...currentImsdk})
                }}
                className="mb-4 w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
            />

            <input
                type="text"
                value={currentImsdk.imsdk_prefix || ''}
                placeholder="IMSDK访问前缀"
                onChange={(e) => {
                    currentImsdk.imsdk_prefix = e.target.value
                    setCurrentImsdk({...currentImsdk})
                }}
                className="mb-4 w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500"
            />

            <input
                type="text"
                value={currentImsdk.imsdk_token}
                placeholder="IMSDK访问Token"
                onChange={(e) => {
                    currentImsdk.imsdk_token = e.target.value
                    setCurrentImsdk({...currentImsdk})
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
                            axios.post('/imsdk/create', {...currentImsdk})
                                .then(res => {
                                    if (res.data.code === 0) {
                                        backNaviListPage()
                                    } else {
                                        setTips(res.data.msg)
                                    }
                                })
                        } else {
                            axios.put('/imsdk/update', {...currentImsdk})
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
                        axios.delete(`/imsdk/${currentImsdk.id}`)
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