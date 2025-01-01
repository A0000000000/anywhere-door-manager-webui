import {useState} from "react";
import {Plugin, Imsdk, Config} from "./Types.ts"
import axios from "../axios.ts"
export default function ConfigListPage({
                                           type,
                                           data,
                                           backDetailPage,
                                           toConfigDetailPage
}: {
    type: number,
    data: Plugin | Imsdk,
    backDetailPage: (data: Plugin | Imsdk | null, isAdd: boolean) => void,
    toConfigDetailPage: (data: Config | null) => void
}) {

    const [firstLoad, setFirstLoad] = useState(true)
    const [configs, setConfigs] = useState(Array<Config>)

    async function getConfigs() {
        setConfigs((await axios.get(`/config/getByTypeAndTarget?type=${type}&target_id=${data.id}`)).data.data)
    }

    if (firstLoad) {
        getConfigs().then()
        setFirstLoad(false)
    }

    return <>
        <div className="max-w-md mx-auto p-4 border border-gray-300 rounded-lg shadow-md bg-white">
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">配置管理</h1>
            {
                configs.map((item, index) => (
                    <button
                        key={index}
                        className={`mb-4 w-full px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300`}
                        onClick={() => {
                            toConfigDetailPage(item)
                            setFirstLoad(true)
                        }}>
                        {item.config_key}
                    </button>
                ))
            }
            <button
                className={`mb-4 w-full px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300`}
                onClick={() => {
                    toConfigDetailPage(null)
                    setFirstLoad(true)
                }}>
                新增一项
            </button>
            <button
                className={`mb-4 w-full px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300`}
                onClick={() => {
                    backDetailPage(data, false)
                    setFirstLoad(true)
                }}>
                后退
            </button>
        </div>

    </>
}