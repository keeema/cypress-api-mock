import * as path from "path";
import * as webpack from "webpack";

const ShebangPlugin = require("webpack-shebang-plugin");

const config: webpack.Configuration = {
    mode: "development",
    entry: path.resolve(__dirname, "server", "startServer.ts"),
    output: {
        path: path.resolve(__dirname, "server", "dist"),
        filename: "serverApiMock.js",
        libraryTarget: "commonjs2",
    },
    resolve: {
        extensions: [".js", ".ts", ".d.ts"],
    },
    target: "node",
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: "ts-loader",
                        options: { allowTsInNodeModules: true },
                    },
                ],
            },
        ],
    },
    plugins: [new ShebangPlugin()],
};

export default config;
