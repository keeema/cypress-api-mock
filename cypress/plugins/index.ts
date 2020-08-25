// plugins file

import webpackPreprocessor = require("@cypress/webpack-preprocessor");
import cfg = require("../../webpack.config");
import apiMock = require("../../plugin");

function register(on: Cypress.PluginEvents, config: Cypress.ConfigOptions): void {
    const options = {
        webpackOptions: cfg,
        watchOptions: {},
    };
    on("file:preprocessor", webpackPreprocessor(options as any) as (file: unknown) => string | Promise<string>);
    apiMock(on, config);
}

module.exports = register;
