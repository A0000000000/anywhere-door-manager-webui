

export declare interface Plugin {
    id: number,
    user_id: number,
    plugin_name: string,
    plugin_describe: string | null,
    plugin_host: string,
    plugin_port: number,
    plugin_prefix: string | null,
    plugin_token: string
    is_active: number
}

export declare interface Imsdk {
    id: number,
    user_id: number,
    imsdk_name: string,
    imsdk_describe: string | null,
    imsdk_host: string,
    imsdk_port: number,
    imsdk_prefix: string | null,
    imsdk_token: string
    is_active: number
}

export declare interface Config {
    id: number,
    user_id: number,
    type: number,
    target_id: number,
    config_key: string,
    config_value: string
}