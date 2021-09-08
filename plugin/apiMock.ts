import { constants } from "../constants";
import { startAutoClearing, startServer } from "../server";

function register(_: Cypress.PluginEvents, config?: Partial<IApiMockConfiguration>): void {
    const fullConfig: IApiMockConfiguration = Object.assign<IApiMockConfiguration, Partial<IApiMockConfiguration> | undefined>(
        { apiMockServer: { hostname: "127.0.0.1", hostPort: constants.Port } },
        config
    );

    startServer(fullConfig);
    startAutoClearing();
}

export = register;
