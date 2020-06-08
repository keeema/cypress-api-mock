import * as path from "path";
import * as webpack from "webpack";

const config: webpack.Configuration = {
    mode: "development",
    entry: path.resolve(__dirname, "plugin", "apiMock.ts"),
    output: {
        path: path.resolve(__dirname, "plugin", "dist"),
        filename: "apiMock.js",
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
};

export default config;
