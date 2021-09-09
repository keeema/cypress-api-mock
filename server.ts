import * as http from "http";
import * as multiparty from "multiparty";
import * as fs from "fs";
import * as path from "path";
import { constants } from "./constants";

const paramRegex = /\$\{(?![0-9])[.a-zA-Z0-9$_]+\}/gm;
const apiMockLogsFolderPath = path.resolve(constants.ApiMockFolderPath);
const testTimestamp = new Date().toISOString().replace(/(:)|(\.)/g, "-");
const guid = uuid();
const apiMockLogsPath = path.resolve(`${apiMockLogsFolderPath}/${testTimestamp}-${guid}.log`);

const mocks = new Map<string, string | Object>();
const requests = new Map<string, IApiMockRequestData[]>();
const responses = new Map<string, string[]>();

let deleteTimeout: NodeJS.Timeout;

export function startServer(config: IApiMockConfiguration): void {
    //Todo delete
    setInterval(() => log(`Server on ${config.apiMockServer.hostname}:${config.apiMockServer.hostPort} is alive`, "\x1b[33m"), 15 * 1000);
    const server = http.createServer(async (req, res) => {
        log(`Server received url: ${req.url}`, "\x1b[33m");
        try {
            switch (req.url) {
                // Todo delete
                case "/testIfRunning": {
                    res.writeHead(200, { "Content-Type": "text/plain" });
                    res.end("Server is running!\n");
                    break;
                }
                case constants.Paths.registerMock: {
                    const options = JSON.parse((await processRequest(req)).data) as IApiMockOptions;
                    setNewDeleteTimeout();
                    registerMock(options.pattern, options.response);
                    answerOK(res);
                    break;
                }
                case constants.Paths.getRequests: {
                    answerOKWithResult(res, JSON.stringify(getRequests()));
                    break;
                }
                case constants.Paths.getResponses: {
                    answerOKWithResult(res, JSON.stringify(getResponses()));
                    break;
                }
                case constants.Paths.resetCalls: {
                    resetCalls();
                    answerOK(res);
                    break;
                }
                case constants.Paths.resetAll: {
                    reset();
                    answerOK(res);
                    break;
                }
                default: {
                    await ProcessApiRequest(req, res);
                }
            }
        } catch {
            answerError(res);
        }
    });

    server.listen(config.apiMockServer.hostPort, config.apiMockServer.hostname, () => {
        log(`I\t apiMock server running at http://${config.apiMockServer.hostname}:${config.apiMockServer.hostPort}/`, "\x1b[33m");
    });
}

function setNewDeleteTimeout(): void {
    if (deleteTimeout !== undefined) {
        clearTimeout(deleteTimeout);
    }

    deleteTimeout = setTimeout(() => reset(), 5 * 60000);
}

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

function resetCalls(): void {
    log(`I\tCalls reset`, "\x1b[33m");
    requests.clear();
    responses.clear();
}

function resetMock(): void {
    log(`I\tMock reset`, "\x1b[33m");
    mocks.clear();
}

function reset(): void {
    log(`I\tMock and calls reset`, "\x1b[33m");
    resetCalls();
    resetMock();
}

function registerMock(pattern: string, response: string | Object): null {
    log(`I\tMock registration for:\t${pattern} with response: ${response}`, "\x1b[33m");
    mocks.set(pattern, response);
    return null;
}

async function ProcessApiRequest(req: any, res: any): Promise<void> {
    log("In process request");
    const body = await processRequest(req);
    log("After request processing");
    if (req.url !== undefined && mocks.has(req.url)) {
        const answer = prepareAnswer(req.url, body.data);
        registerCall(req.url, body, answer);
        answerOKWithResult(res, answer);
    } else {
        answerNotFound(res);
    }
}

function registerCall(url: string, request: IApiMockRequestData, response: string): void {
    log(`I\tRegistering call for url:${url}, with request ${request.data} and response ${response}`, "\x1b[33m");
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
    log(`->\tRequest processing - URL: ${req.url}\tData: ${data.data}`, "\x1b[36m");
    return data;
}

function answerOK(res: http.ServerResponse): void {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end();
    log(`<-\tAnswer OK Status: ${res.statusCode}\t`, "\x1b[32m");
}

function answerOKWithResult(res: http.ServerResponse, result: string): void {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end(result);
    log(`<-\t Answer OK with result. Status: ${res.statusCode}\tResponse:${result}`, "\x1b[32m");
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
