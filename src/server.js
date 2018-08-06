import {existsSync, mkdirSync} from "fs"
import {Server} from "hapi"
import {readFileSync, writeFileSync} from "jsonfile"

if (!existsSync("./state")) {
    mkdirSync("./state")
}

if (!existsSync("./state/state.json")) {
    writeFileSync(
        "./state/state.json",
        {},
        {
            spaces: 4
        }
    )
}

class StateWrapper {
    static get state() {
        return readFileSync("./state/state.json")
    }
    static set state(value) {
        writeFileSync("./state/state.json", value, {
            spaces: 4
        })
    }
}

const server = new Server({
    host: "0.0.0.0",
    port: 3001,
    routes: {
        cors: {
            origin: "ignore"
        }
    }
})

server.route({
    method: "GET",
    path: "/{keys?}",
    handler: request => {
        const state = StateWrapper.state
        const keys = request.params.keys
            ? request.params.keys.split(",")
            : Object.keys(state)
        return Object.entries(state)
            .filter(([key, _]) => keys.some(k => k === key))
            .reduce(({...prev}, [key, value]) => ({...prev, [key]: value}), {})
    }
})

server.route({
    method: "POST",
    path: "/",
    handler: request => {
        let newState = StateWrapper.state
        for (const {...state} of Array.isArray(request.payload)
            ? request.payload
            : [request.payload]) {
            for (const [key, value] of Object.entries(state)) {
                if (value && value.$themisRemove) {
                    if (newState.hasOwnProperty(key)) {
                        delete newState[key]
                    }
                } else {
                    newState[key] = value
                }
            }
        }
        StateWrapper.state = newState
        return {
            success: true
        }
    }
})

async function startServer() {
    try {
        await server.start()
        console.log("Server started on port 3001")
    } catch (e) {
        console.error(e)
    }
}

startServer()
