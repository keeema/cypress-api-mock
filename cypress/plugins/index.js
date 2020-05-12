// plugins file
const webpack = require("@cypress/webpack-preprocessor");
const apiMock = require("../../plugin/dist/apiMock.js");

module.exports = (on, config) => {
    const options = {
        webpackOptions: require("../../webpack.config"),
        watchOptions: {},
    };
    on("file:preprocessor", getWebPackWithFileChange(options));
    apiMock(on, config);
};
function getWebPackWithFileChange(options) {
    const webPackPreProcessor = webpack(options);
    return function (file) {
        file.outputPath = file.outputPath.replace(".ts", ".js");
        return webPackPreProcessor(file);
    };
}
