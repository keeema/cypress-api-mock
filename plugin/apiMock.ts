/// <reference path="common.d.ts" />
/// <reference types="cypress" />

import * as http from "http";

const paramRegex = /\$\{(?![0-9])[.a-zA-Z0-9$_]+\}/gm;

function register(on: Cypress.PluginEvents, config?: Partial<IApiMockConfiguration>): void {
    const fullConfig: IApiMockConfiguration = Object.assign<IApiMockConfiguration, Partial<IApiMockConfiguration> | undefined>(
        { apiMockServer: { hostname: "127.0.0.1", hostPort: 3000 } },
        config
    );

    startServer(fullConfig);
    on("task", {
        "api-mock:register": (options: IApiMockOptions): null => registerMock(options.pattern, options.response),
        "api-mock:get-requests": (): { [key: string]: string[] } => getRequests(),
        "api-mock:get-responses": (): { [key: string]: string[] } => getResponses(),
        "api-mock:reset-calls": (): null => resetCalls(),
        "api-mock:reset": (): null => reset(),
    });
}

export = register;

const mocks = new Map<string, string | Object>();
const requests = new Map<string, string[]>();
const responses = new Map<string, string[]>();

function getRequests(): { [key: string]: string[] } {
    const result: { [key: string]: string[] } = {};
    requests.forEach((value, key) => {
        if (result !== undefined) {
            result[key] = value;
        }
    });
    return result;
}

function getResponses(): { [key: string]: string[] } {
    const result: { [key: string]: string[] } = {};
    responses.forEach((value, key) => {
        if (result !== undefined) {
            result[key] = value;
        }
    });
    return result;
}

function resetCalls(): null {
    requests.clear();
    responses.clear();
    return null;
}

function reset(): null {
    resetCalls();
    mocks.clear();
    return null;
}

function registerMock(pattern: string, response: string | Object): null {
    mocks.set(pattern, response);
    return null;
}
function startServer(config: IApiMockConfiguration): void {
    const server = http.createServer(async (req, res) => {
        try {
            const body = await processRequest(req);
            if (req.url !== undefined && mocks.has(req.url)) {
                const answer = prepareAnswer(req.url, body);
                registerCall(req.url, body, answer);
                answerOK(res, answer);
            } else {
                answerNotFound(res);
            }
        } catch {
            answerError(res);
        }
    });

    server.listen(config.apiMockServer.hostPort, config.apiMockServer.hostname, () => {
        log(`Server running at http://${config.apiMockServer.hostname}:${config.apiMockServer.hostPort}/`);
    });
}

function registerCall(url: string, request:string, response: string): void {
    const particularRequests = requests.get(url) || [];
    particularRequests.push(request);

    const particularResponses = responses.get(url) || [];
    particularResponses.push(response);

    requests.set(url, particularRequests)
    responses.set(url, particularResponses);
}
function prepareAnswer(url: string, body: string): string {
    const answer = mocks.get(url) || "";
    return parseParameters(answer, body);
}

function parseParameters(answer: string | object, body: string): string {
    const answerStr = typeof answer === "string" ? answer : JSON.stringify(answer);
    const regex = new RegExp(paramRegex);

    let bodyObj: object;
    return answerStr.replace(regex, (match) => {
        if (bodyObj === undefined) {
            bodyObj = JSON.parse(body);
        }
        return getParamValue(bodyObj, match);
    });
}

function getParamValue(bodyObj: object, param: string): string {
    try {
        const cleanParam = param.substr(2, param.length - 3);
        const path = cleanParam.split(".");
        let result: any = bodyObj;
        for (const part of path) {
            if (part !== "body") {
                result = result[part];
            }
        }
        return result ? result.toString() : result;
    } catch (err) {
        log("\x1b[31m" + `Error in parsing param '${param}':  ${err}`);
        return "error";
    }
}

async function processRequest(req: http.IncomingMessage): Promise<string> {
    const data = await getRequestData(req);
    log(`-> URL: ${req.url} Data: ${data}`);
    return data;
}

function answerOK(res: http.ServerResponse, mockResult: string): void {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end(mockResult);
    log("\x1b[32m" + `<- Status: ${res.statusCode} Response:${mockResult}`);
}

function answerNotFound(res: http.ServerResponse): void {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("Mock not found");

    log("\x1b[31m" + `<- Status: ${res.statusCode}`);
}

function answerError(res: http.ServerResponse): void {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/plain");
    res.end("Internal Server Error. Problem in creating response.");

    log("\x1b[31m" + `<- Status: ${res.statusCode}`);
}

async function getRequestData(req: http.IncomingMessage): Promise<string> {
    return new Promise<string>((resolve) => {
        let allData = "";

        req.on("data", (data: any) => (allData += data));
        req.on("end", () => resolve(allData));
    });
}

function log(message?: any, ...optionalParams: any[]): void {
    console.log("API-MOCK", message, ...optionalParams, "\x1b[0m");
}

module.exports = register;
