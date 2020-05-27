interface IApiMockConfiguration extends Cypress.ConfigOptions {
    apiMockServer: {
        hostname: string;
        hostPort: number;
    };
}

interface IApiMockOptions {
    pattern: string;
    response: string | Object;
}
