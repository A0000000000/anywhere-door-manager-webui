import {useState} from "react"
import {Plugin, Imsdk} from "./Types.ts"
import axios from "../axios.ts"

export default function NaviListPage({
                                         naviDetailPage,
                                         operatorType,
                                         setOperatorType
}: {
    naviDetailPage: (data: Plugin | Imsdk | null, isAdd: boolean) => void,
    operatorType: number,
    setOperatorType: (operatorType: number) => void
}) {
    const [plugins, setPlugins] = useState(Array<Plugin>)
    const [imsdks, setImsdks] = useState(Array<Imsdk>)
    const [firstLoad, setFirstLoad] = useState(true)

    async function getPlugins() {
        setPlugins((await axios.get('/plugin')).data.data)
    }

    async function getImsdks() {
        setImsdks((await axios.get('/imsdk')).data.data)
    }

    if (firstLoad) {
        if (operatorType === 0) {
            getPlugins().then()
        } else {
            getImsdks().then()
        }
        setFirstLoad(false)
    }

    return <>
        <div className="max-w-md mx-auto p-4 border border-gray-300 rounded-lg shadow-md bg-white">
            <div className="flex mb-4 justify-center">
                <button
                    className={`px-4 py-2 mr-2 rounded-md ${operatorType === 0 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} ${operatorType === 1 && 'hover:bg-gray-300'}`}
                    onClick={() => {
                        setOperatorType(0)
                        getPlugins().then()
                    }}>
                    Plugin管理
                </button>
                <button
                    className={`px-4 py-2 lr-2 rounded-md ${operatorType === 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} ${operatorType === 0 && 'hover:bg-gray-300'}`}
                    onClick={() => {
                        setOperatorType(1)
                        getImsdks().then()
                    }}>
                    IMSDK管理
                </button>
            </div>
            <div className="flex flex-col items-center justify-center">
                {
                    operatorType === 0 && plugins.map((item, index) => (
                        <button
                            key={index}
                            className={`mb-4 w-full px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300`}
                            onClick={() => {
                                naviDetailPage(item, false)
                                setFirstLoad(true)
                            }}>
                            {item.plugin_name}
                        </button>
                    ))
                }

                {
                    operatorType === 1 && imsdks.map((item, index) => (
                        <button
                            key={index}
                            className={`mb-4 w-full px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300`}
                            onClick={() => {
                                naviDetailPage(item, false)
                                setFirstLoad(true)
                            }}>
                            {item.imsdk_name}
                        </button>
                    ))
                }
                <button
                    className={`mb-4 w-full px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300`}
                    onClick={() => {
                        naviDetailPage(null,true)
                        setFirstLoad(true)
                    }}>
                    新增一项
                </button>
            </div>
        </div>
    </>
}