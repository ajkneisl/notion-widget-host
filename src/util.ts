import {useEffect, useState} from "react";

export type Config<T> = {
    backgroundColor: string;
    queryParameters: T
}

function getDefaultConfig<T>(): Config<T> {
    return {
        backgroundColor: "white",
        queryParameters: { } as T
    }
}

export function useDecoder<T>(value: string): Config<T> {
    const [config, setConfig] = useState(getDefaultConfig() as Config<T>)

    useEffect(() => {
        if (value && value !== "") {
            const str = Buffer.from(value, 'base64').toString('utf-8')
            const cfg = JSON.parse(str)
            setConfig(cfg)
        }
    }, [value])

    return config
}
