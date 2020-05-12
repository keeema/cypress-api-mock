module.exports = {
    entry: "./apiMock.ts",
    output: {
        filename: "apiMock.js",
        libraryTarget: "commonjs2",
    },
    devtool: "inline-source-map",
    resolve: {
        extensions: [".js", ".ts", ".d.ts"],
    },
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
    target: "node",
    mode: "development",
};
