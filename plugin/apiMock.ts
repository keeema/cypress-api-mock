import { log, startServer } from "../server";

function register(_: Cypress.PluginEvents, config?: Partial<IApiMockConfiguration>): void {
    const url: string = config?.env?.["cypress_api_mock_url"] ?? "127.0.0.1";
    const port: number = config?.env?.["cypress_api_mock_port"] ?? 3000;

    const ipAddr = url.replace(/^((http|https):\/\/)*/, "");
    const fullConfig: IApiMockConfiguration = Object.assign<IApiMockConfiguration, Partial<IApiMockConfiguration> | undefined>(
        { apiMockServer: { hostname: ipAddr, hostPort: port } },
        config
    );

    if (ipAddr === "127.0.0.1") {
        startServer(fullConfig);
    } else {
        log(`I\tNot starting local server. Server should run on: ${url}`, "\x1b[33m");
    }
}

export = register;
