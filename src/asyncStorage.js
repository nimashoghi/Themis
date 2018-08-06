import {getData, removeData, setData} from "./themis"

const execute = async (operation, cb) => {
    const callback = cb || ((_error, _result) => {})
    try {
        callback(undefined, await operation())
    } catch (e) {
        callback(e, undefined)
        throw e
    }
}

const first = (list, predicate) => {
    for (const item of list) {
        if (predicate(item)) {
            return item
        }
    }
    throw new Error("No item matched predicate")
}

export class AsyncStorage {
    static async getItem(key, cb = undefined) {
        return execute(async () => await getData(key), cb)
    }

    static async setItem(key, value, cb = undefined) {
        return execute(async () => await setData({[key]: value}), cb)
    }

    static async removeItem(key, cb = undefined) {
        return execute(async () => await removeData(key), cb)
    }

    static async mergeItem(key, value, cb = undefined) {
        return execute(
            async () =>
                await setData({
                    [key]: {...(await getData(key)), ...JSON.parse(value)}
                }),
            cb
        )
    }

    static async clear(cb = undefined) {
        return execute(
            async () => await removeData(...Object.keys(await getData())),
            cb
        )
    }

    static async getAllKeys(cb = undefined) {
        return execute(async () => Object.keys(await getData()), cb)
    }

    static flushGetRequests() {
        // TODO
    }

    static async multiGet([...keys], cb = undefined) {
        return execute(async () => Object.entries(await getData(keys)), cb)
    }

    static async multiSet([...kvPairs], cb = undefined) {
        return execute(
            async () =>
                await setData(
                    kvPairs.reduce(
                        ({...previous}, [key, value]) => ({
                            ...previous,
                            [key]: value
                        }),
                        {}
                    )
                ),
            cb
        )
    }

    static async multiRemove([...keys], cb = undefined) {
        return execute(async () => await removeData(...keys), cb)
    }

    static async multiMerge([...kvPairs], cb = undefined) {
        return execute(
            async () =>
                Object.entries(
                    await getData(...kvPairs.map(([key, _]) => key))
                ).reduce(({...previous}, [key, {...value}]) => ({
                    ...previous,
                    [key]: {
                        ...value,
                        ...first(kvPairs, ([key_, _]) => key_ === key)[1] // key, value
                    }
                })),
            cb
        )
    }
}
