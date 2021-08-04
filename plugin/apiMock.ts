/// <reference path="common.d.ts" />

import * as http from "http";
import * as multiparty from "multiparty";
import * as fs from "fs";
import * as path from "path";

const paramRegex = /\$\{(?![0-9])[.a-zA-Z0-9$_]+\}/gm;
const apiMockLogsFolderPath = path.resolve("cypress/api-mock-logs");
const testTimestamp = new Date().toISOString().replace(/(:)|(\.)/g, "-");
const guid = uuid();
const apiMockLogsPath = path.resolve(`${apiMockLogsFolderPath}/${testTimestamp}-${guid}.log`);

function register(on: Cypress.PluginEvents, config?: Partial<IApiMockConfiguration>): void {
    const fullConfig: IApiMockConfiguration = Object.assign<IApiMockConfiguration, Partial<IApiMockConfiguration> | undefined>(
        { apiMockServer: { hostname: "127.0.0.1", hostPort: 3000 } },
        config
    );

    startServer(fullConfig);
    on("task", {
        "api-mock:register": (options: IApiMockOptions): null => registerMock(options.pattern, options.response),
        "api-mock:get-requests": (): { [key: string]: IApiMockRequestData[] } => getRequests(),
        "api-mock:get-responses": (): { [key: string]: string[] } => getResponses(),
        "api-mock:reset-calls": (): null => resetCalls(),
        "api-mock:reset": (): null => reset(),
    });
}

const mocks = new Map<string, string | Object>();
const requests = new Map<string, IApiMockRequestData[]>();
const responses = new Map<string, string[]>();

function getRequests(): { [key: string]: IApiMockRequestData[] } {
    log(`I\tRetrieving requests`, "\x1b[33m");
    const result: { [key: string]: IApiMockRequestData[] } = {};
    requests.forEach((value, key) => {
        if (result !== undefined) {
            result[key] = value;
        }
    });
    return result;
}

function getResponses(): { [key: string]: string[] } {
    log(`I\tRetrieving responses`, "\x1b[33m");
    const result: { [key: string]: string[] } = {};
    responses.forEach((value, key) => {
        if (result !== undefined) {
            result[key] = value;
        }
    });
    return result;
}

function resetCalls(): null {
    log(`I\tCalls reset`, "\x1b[33m");
    requests.clear();
    responses.clear();
    return null;
}

function reset(): null {
    log(`I\tComplete mock reset`, "\x1b[33m");
    resetCalls();
    mocks.clear();
    return null;
}

function registerMock(pattern: string, response: string | Object): null {
    log(`I\tMock registration for:\t${pattern}`, "\x1b[33m");
    mocks.set(pattern, response);
    return null;
}
function startServer(config: IApiMockConfiguration): void {
    const server = http.createServer(async (req, res) => {
        try {
            const body = await processRequest(req);
            if (req.url !== undefined && mocks.has(req.url)) {
                const answer = prepareAnswer(req.url, body.data);
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
        log(`I\tServer running at http://${config.apiMockServer.hostname}:${config.apiMockServer.hostPort}/`, "\x1b[33m");
    });
}

function registerCall(url: string, request: IApiMockRequestData, response: string): void {
    const particularRequests = requests.get(url) || [];
    particularRequests.push(request);

    const particularResponses = responses.get(url) || [];
    particularResponses.push(response);

    requests.set(url, particularRequests);
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
        const paramPath = cleanParam.split(".");
        let result: any = bodyObj;
        for (const part of paramPath) {
            if (part !== "body") {
                result = result[part];
            }
        }
        return result ? result.toString() : result;
    } catch (err) {
        log(`E\tError in parsing param '${param}':  ${err}`, "\x1b[31m");
        return "error";
    }
}

async function processRequest(req: http.IncomingMessage): Promise<IApiMockRequestData> {
    const data = await getRequestData(req);
    log(`->\tURL: ${req.url}\tData: ${data.data}`, "\x1b[36m");
    return data;
}

function answerOK(res: http.ServerResponse, mockResult: string): void {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end(mockResult);
    log(`<-\tStatus: ${res.statusCode}\tResponse:${mockResult}`, "\x1b[32m");
}

function answerNotFound(res: http.ServerResponse): void {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("Mock not found");

    log(`<-\tStatus: ${res.statusCode}`, "\x1b[31m");
}

function answerError(res: http.ServerResponse): void {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/plain");
    res.end("Internal Server Error. Problem in creating response.");

    log(`<-\tStatus: ${res.statusCode}`, "\x1b[31m");
}

async function getRequestData(req: http.IncomingMessage): Promise<IApiMockRequestData> {
    return new Promise<IApiMockRequestData>((resolve) => {
        let allData = "";
        const form = new multiparty.Form({ autoFiles: true });
        const fileResult: IApiMockFileInfoWithContent[] = [];
        let fieldsResult: any;

        form.parse(req, function (_err: any, fields: any, files: IApiMockFileInfos) {
            fieldsResult = fields;
            if (files) {
                for (const key in files) {
                    const file = files[key][0];
                    fileResult.push({
                        ...file,
                        content: Array.from(fs.readFileSync(file.path)),
                    });
                }
            }
        });

        req.on("data", (data: any) => (allData += data));

        req.on("end", () =>
            resolve({
                files: fileResult,
                fields: fieldsResult,
                data: allData,
            })
        );
    });
}

function log(message: string, color: string = "\x1b[0m"): void {
    console.log("API-MOCK", "\t", color, message, "\x1b[0m");
    writeFileLog(message);
}

function uuid(): string {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0,
            v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

function writeFileLog(message: string): void {
    const timestamp = new Date().toISOString();
    if (!fs.existsSync(apiMockLogsFolderPath)) {
        fs.mkdirSync(apiMockLogsFolderPath);
    }
    fs.appendFileSync(apiMockLogsPath, `${timestamp}\t${message}\n`);
}

export = register;
