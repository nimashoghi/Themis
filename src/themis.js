import fetch from "node-fetch"
import {config} from "../package.json"

const {serverPort = 3283} = config

function createRemoveRequest(keys) {
    if (!Array.isArray(keys)) {
        return {}
    }

    let obj = {}
    for (let i = 0; i < keys.length; ++i) {
        obj[keys[i]] = {$themisRemove: true}
    }
    return obj
}

export async function getData(...args) {
    return fetch(`http://localhost:${serverPort}/${args.join(",")}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    }).then(result => result.json())
}

export async function removeData() {
    return fetch(`http://localhost:${serverPort}/`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(createRemoveRequest(arguments))
    })
}
export async function setData(state) {
    return fetch(`http://localhost:${serverPort}/`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(state)
    })
}
