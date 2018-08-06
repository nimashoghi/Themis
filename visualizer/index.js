import React from "react"
import ReactDOM from "react-dom"
import ReactJson from "react-json-view"

import {getData, removeData, setData} from "../src"
import {config} from "../package.json"

const {theme = "rjv-default", updateInterval = 1000} = config
class App extends React.Component {
    state = {
        data: {}
    }

    async getData(...keys) {
        return await getData(...keys)
    }

    async removeData(...keys) {
        // this.setState({
        //     data: Object.keys(this.state)
        //         .filter(stateKey =>
        //             keys.some(removeKey => stateKey !== removeKey)
        //         )
        //         .reduce(({...previous}, key) => ({
        //             ...previous,
        //             [key]: this.state[key]
        //         }))
        // })
        this.setState({...(await removeData(...keys))})
    }

    async setData({...state}) {
        this.setState({...(await setData({...state}))})
    }

    async componentWillMount() {
        const update = async () => {
            const globalState = await this.getData()
            if (
                JSON.stringify(globalState) === JSON.stringify(this.state.data)
            ) {
                return
            }
            this.setState({data: globalState})
        }
        await update()
        setInterval(async () => await update(), updateInterval)
    }

    render() {
        return (
            <div
                className="App"
                style={{
                    height: "100vh",
                    width: "100%"
                }}
            >
                <ReactJson
                    src={this.state.data}
                    theme={theme}
                    style={{
                        minHeight: "calc(100vh)",
                        width: "100%"
                    }}
                    collapseStringsAfterLength={64}
                    enableClipboard
                    sortKeys
                    name={null}
                    onAdd={({updated_src: newState}) => this.setData(newState)}
                    onDelete={({updated_src: newState, name}) =>
                        this.setData({
                            ...newState,
                            [name]: {
                                $themisRemove: true
                            }
                        })
                    }
                    onEdit={({updated_src: newState}) => this.setData(newState)}
                />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById("root"))
