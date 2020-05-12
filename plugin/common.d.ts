interface IApiMockConfiguration {
    apiMockServer: {
        hostname?: string;
        hostPort?: number;
    };
}

interface IApiMockOptions {
    pattern: string;
    response: string | Object;
}
