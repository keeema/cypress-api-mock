interface IApiMockConfiguration extends Partial<Cypress.ConfigOptions> {
    apiMockServer: {
        hostname: string;
        hostPort: number;
    };
}

interface IApiMockOptions {
    pattern: string;
    response: string | Object;
}

interface IApiMockFileInfos {
    [key: string]: IApiMockFileInfo[];
}

interface IApiMockFileInfo {
    fieldName: string;
    originalFilename: string;
    path: string;
    headers: {
        "content-disposition": string;
        "content-type": string;
    };
    size: number;
}

interface IApiMockFileInfoWithContent extends IApiMockFileInfo {
    content: number[];
}

interface IApiMockRequestData {
    data: string;
    fields?: any;
    files: IApiMockFileInfoWithContent[];
}
