import React, {Component} from "react"
import ReactJson from "react-json-view"

class App extends Component {
    state = {
        data: {}
    }

    async setGlobalState({...state}) {
        this.setState({...state})
        await fetch("http://localhost:3001/", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({...state})
        })
    }

    async getGlobalState(...keys) {
        return await (await fetch(
            `http://localhost:3001/${keys.length === 0 ? "" : keys.join(",")}`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            }
        )).json()
    }

    async componentWillMount() {
        const update = async () => {
            const globalState = await this.getGlobalState()
            if (
                JSON.stringify(globalState) === JSON.stringify(this.state.data)
            ) {
                return
            }
            this.setState({data: globalState})
        }
        setInterval(async () => await update(), 500)
        await update()
    }

    render() {
        return (
            <div className="App">
                <ReactJson
                    src={this.state.data}
                    onAdd={({updated_src: newState}) =>
                        this.setGlobalState(newState)
                    }
                    onDelete={({updated_src: newState, name}) =>
                        this.setGlobalState({
                            ...newState,
                            [name]: {
                                $themisRemove: true
                            }
                        })
                    }
                    onEdit={({updated_src: newState}) =>
                        this.setGlobalState(newState)
                    }
                />
            </div>
        )
    }
}

export default App
