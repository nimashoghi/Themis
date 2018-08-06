import path from "path"
import BabelClassPropertiesPlugin from "@babel/plugin-proposal-class-properties"

export default {
    entry: ["@babel/polyfill", "./visualizer/index.js"],
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "public")
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            [
                                "@babel/preset-env",
                                {
                                    targets: {
                                        browsers: ["last 2 versions"]
                                    }
                                }
                            ],
                            "@babel/preset-react"
                        ],
                        plugins: [BabelClassPropertiesPlugin]
                    }
                }
            }
        ]
    }
}
