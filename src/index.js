import {existsSync} from "fs"
import {Server} from "hapi"
import {readFileSync, writeFileSync} from "jsonfile"

if (!existsSync("./state.json")) {
    writeFileSync(
        "./state.json",
        {},
        {
            spaces: 4
        }
    )
}

class StateWrapper {
    static get state() {
        return readFileSync("./state.json")
    }
    static set state(value) {
        writeFileSync("./state.json", value, {
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
        if (
            !Array.isArray(request.payload) ||
            !request.payload.every(o => typeof o === "object")
        ) {
            return "Failure: Invalid payload"
        }
        StateWrapper.state = Object.assign(
            StateWrapper.state,
            ...request.payload
        )
        return "Success"
    }
})

server
    .start()
    .then(() => console.log("Server started on port 3000"))
    .catch(e => console.error(e))
