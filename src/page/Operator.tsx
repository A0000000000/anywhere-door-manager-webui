import {useState} from "react";
import NaviListPage from "./NaviListPage.tsx";
import PluginDetailPage from "./PluginDetailPage.tsx";
import ImsdkDetailPage from "./ImsdkDetailPage.tsx";
import ConfigListPage from "./ConfigListPage.tsx";
import ConfigDetailPage from "./ConfigDetailPage.tsx";
import {Plugin, Imsdk, Config} from "./Types.ts";

export default function Operator() {
    const [currentPage, setCurrentPage] = useState(0)
    const [isAddItem, setIsAddItem] = useState(false)
    const [selectPlugin, setSelectPlugin] = useState({
        id: 0,
        user_id: 0,
        plugin_name: '',
        plugin_describe: '',
        plugin_host: '',
        plugin_port: 0,
        plugin_prefix: '',
        plugin_token: '',
        is_active: 0
    } as Plugin)
    const [selectImsdk, setSelectImsdk] = useState({
        id: 0,
        user_id: 0,
        imsdk_name: '',
        imsdk_describe: '',
        imsdk_host: '',
        imsdk_port: 0,
        imsdk_token: '',
        imsdk_prefix: '',
        is_active: 0
    } as Imsdk)
    const [operatorType, setOperatorType] = useState(0)
    const [selectConfig, setSelectConfig] = useState({
        id: 0,
        user_id: 0,
        type: 0,
        target_id: 0,
        config_key: '',
        config_value: ''
    } as Config)
    const [isAddConfig, setIsAddConfig] = useState(false)

    function naviDetailPage(data: Plugin | Imsdk | null, isAdd: boolean) {
        setIsAddItem(isAdd)
        if (!isAdd && data != null) {
            if (operatorType === 0) {
                setSelectPlugin(data as Plugin)
            }
            if (operatorType === 1) {
                setSelectImsdk(data as Imsdk)
            }
        }
        setCurrentPage(operatorType == 0 ? 1 : 2)
    }

    if (currentPage === 0) {
        return <NaviListPage
            naviDetailPage={naviDetailPage}
            operatorType={operatorType}
            setOperatorType={setOperatorType}
        ></NaviListPage>
    }
    if (currentPage === 1) {
        return <PluginDetailPage
            selectPlugin={selectPlugin}
            isAddItem={isAddItem}
            backNaviListPage={() => {
                setCurrentPage(0)
            }}
            toConfigListPage={() => {
                setCurrentPage(3)
            }}
        ></PluginDetailPage>
    }
    if (currentPage === 2) {
        return <ImsdkDetailPage
            selectImsdk={selectImsdk}
            isAddItem={isAddItem}
            backNaviListPage={() => {
                setCurrentPage(0)
            }}
            toConfigListPage={() => {
                setCurrentPage(3)
            }}
        ></ImsdkDetailPage>
    }
    if (currentPage === 3) {
        return <ConfigListPage
            type={operatorType}
            data={operatorType === 0 ? selectPlugin : selectImsdk}
            backDetailPage={naviDetailPage}
            toConfigDetailPage={(data: Config | null) => {
                setCurrentPage(4)
                if (data !== null) {
                    setSelectConfig(data)
                    setIsAddConfig(false)
                } else {
                    setIsAddConfig(true)
                    setSelectConfig({
                        id: 0,
                        user_id: 0,
                        type: operatorType,
                        target_id: (operatorType === 0 ? selectPlugin : selectImsdk).id,
                        config_key: '',
                        config_value: ''
                    } as Config)
                }
            }}
        ></ConfigListPage>
    }
    if (currentPage === 4) {
        return <ConfigDetailPage
            selectConfig={selectConfig}
            isAddConfig={isAddConfig}
            backConfigListPage={() => {
                setCurrentPage(3)
            }}
        ></ConfigDetailPage>
    }
    return <><h1 className="text-2xl font-bold mb-6 text-center">内部错误, 请刷新重试</h1></>
}