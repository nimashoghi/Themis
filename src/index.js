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
    port: 3000,
    host: "0.0.0.0"
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
        StateWrapper.state = Object.assign(
            StateWrapper.state,
            ...(Array.isArray(request.payload)
                ? request.payload
                : [request.payload])
        )
        return "Success"
    }
})

server
    .start()
    .then(() => console.log("Server started on port 3000"))
    .catch(e => console.error(e))
