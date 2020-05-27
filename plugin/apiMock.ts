/// <reference path="common.d.ts" />
/// <reference types="cypress" />

import * as http from "http";

const paramRegex = /\$\{(?![0-9])[.a-zA-Z0-9$_]+\}/gm;

function register(on: Cypress.PluginEvents, config?: Partial<IApiMockConfiguration>): void {
    const fullConfig: IApiMockConfiguration = Object.assign({ apiMockServer: { hostname: "127.0.0.1", hostPort: 3000 } }, config);

    startServer(fullConfig);
    on("task", {
        "api-mock:register": (options: IApiMockOptions): null => registerMock(options.pattern, options.response),
        "api-mock:get-calls": (): { [key: string]: string[] } => getCalls(),
        "api-mock:reset-calls": (): null => resetCalls(),
        "api-mock:reset": (): null => reset(),
    });
}

export default register;

const mocks = new Map<string, string | Object>();
const calls = new Map<string, string[]>();

function getCalls(): { [key: string]: string[] } {
    const result: { [key: string]: string[] } = {};
    calls.forEach((value, key) => {
        if (result !== undefined) {
            result[key] = value;
        }
    });
    return result;
}

function resetCalls(): null {
    calls.clear();
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
        const body = await processRequest(req);
        if (req.url !== undefined && mocks.has(req.url)) {
            const answer = prepareAnswer(req.url, body);
            registerCall(req.url, answer);
            answerOK(res, answer);
        } else {
            answerNotFound(res);
        }
    });

    server.listen(config.apiMockServer.hostPort, config.apiMockServer.hostname, () => {
        log(`Server running at http://${config.apiMockServer.hostname}:${config.apiMockServer.hostPort}/`);
    });
}

function registerCall(url: string, answer: string): void {
    const particularCalls = calls.get(url) || [];
    particularCalls.push(answer);
    calls.set(url, particularCalls);
}
function prepareAnswer(url: string, body: string): string {
    const answer = mocks.get(url) || "";
    return parseParameters(answer, body);
}

function parseParameters(answer: string | object, body: string): string {
    const answerStr = typeof answer === "string" ? answer : JSON.stringify(answer);
    const regex = new RegExp(paramRegex);
    const bodyObj = JSON.parse(body);
    return answerStr.replace(regex, (match) => getParamValue(bodyObj, match));
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
