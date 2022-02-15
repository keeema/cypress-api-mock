/// <reference path="./index.d.ts" />

import { constants } from "./constants";

const url: string = Cypress.env("cypress_api_mock_url") ?? "127.0.0.1";
const port: number = Cypress.env("cypress_api_mock_port") ?? 3000;
const serverAddressWithPort = `${url}:${port}`;

Cypress.Commands.add(
    "apiMock",
    (pattern: string, response: string | Object, options: Partial<Cypress.Timeoutable> = {}): Cypress.Chainable<void> => {
        Cypress.log({ message: [pattern] });
        const data: IApiMockOptions = { pattern, response };
        return (cy
            .request({
                log: false,
                method: "POST",
                url: `${serverAddressWithPort}${constants.Paths.registerMock}`,
                body: data,
                ...options,
            })
            .then(() => {}) as any) as Cypress.Chainable<void>;
    }
);

Cypress.Commands.add(
    "apiMockRequests",
    (options: Partial<Cypress.Timeoutable> = {}): Cypress.Chainable<{ [key: string]: IApiMockRequestData[] }> => {
        Cypress.log({});
        return cy
            .request<{ [key: string]: IApiMockRequestData[] }>({
                log: false,
                url: `${serverAddressWithPort}${constants.Paths.getRequests}`,
                body: {},
                ...options,
            })
            .then((response) => response.body);
    }
);

Cypress.Commands.add(
    "apiMockResponses",
    (options: Partial<Cypress.Timeoutable> = {}): Cypress.Chainable<{ [key: string]: string[] }> => {
        Cypress.env();

        Cypress.log({});
        return cy
            .request<{ [key: string]: string[] }>({
                log: false,
                url: `${serverAddressWithPort}${constants.Paths.getResponses}`,
                body: {},
                ...options,
            })
            .then((response) => response.body);
    }
);

Cypress.Commands.add(
    "apiMockResetCalls",
    (options: Partial<Cypress.Timeoutable> = {}): Cypress.Chainable<void> => {
        Cypress.log({});
        return (cy
            .request({
                log: false,
                url: `${serverAddressWithPort}${constants.Paths.resetCalls}`,
                ...options,
            })
            .then(() => {}) as any) as Cypress.Chainable<void>;
    }
);

Cypress.Commands.add(
    "apiMockReset",
    (options: Partial<Cypress.Timeoutable> = {}): Cypress.Chainable<void> => {
        Cypress.log({});
        return (cy
            .request({ log: false, url: `${serverAddressWithPort}${constants.Paths.resetAll}`, ...options })
            .then(() => {}) as any) as Cypress.Chainable<void>;
    }
);
