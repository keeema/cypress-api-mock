/// <reference path="./index.d.ts" />

import { constants } from "./constants";

Cypress.Commands.add(
    "apiMock",
    (
        pattern: string,
        response: string | Object,
        serverAddressWithPort: string = `127.0.0.1:${constants.Port}`,
        options: Partial<Cypress.Timeoutable> = {}
    ): Cypress.Chainable<void> => {
        Cypress.log({ message: [pattern] });
        const data: IApiMockOptions = { pattern, response };
        return (cy
            .request({
                log: false,
                timeout: options?.timeout,
                method: "POST",
                url: `${serverAddressWithPort}${constants.Paths.registerMock}`,
                body: data,
            })
            .then(() => {}) as any) as Cypress.Chainable<void>;
    }
);

Cypress.Commands.add(
    "apiMockRequests",
    (
        serverAddressWithPort: string = `127.0.0.1:${constants.Port}`,
        options: Partial<Cypress.Timeoutable> = {}
    ): Cypress.Chainable<Map<string, IApiMockRequestData[]>> => {
        return cy
            .request<Map<string, IApiMockRequestData[]>>({
                log: false,
                timeout: options.timeout,
                url: `${serverAddressWithPort}${constants.Paths.getRequests}`,
                body: options, //????
            })
            .then((response) => response.body);
    }
);

Cypress.Commands.add(
    "apiMockResponses",
    (
        serverAddressWithPort: string = `127.0.0.1:${constants.Port}`,
        options: Partial<Cypress.Timeoutable> = {}
    ): Cypress.Chainable<Map<string, string[]>> => {
        return cy
            .request<Map<string, string[]>>({
                log: false,
                timeout: options.timeout,
                url: `${serverAddressWithPort}${constants.Paths.getResponses}`,
                body: options,
            })
            .then((response) => response.body);
    }
);

Cypress.Commands.add(
    "apiMockResetCalls",
    (
        serverAddressWithPort: string = `127.0.0.1:${constants.Port}`,
        options: Partial<Cypress.Timeoutable> = {}
    ): Cypress.Chainable<void> => {
        return (cy
            .request({
                log: false,
                timeout: options.timeout,
                url: `${serverAddressWithPort}${constants.Paths.resetCalls}`,
            })
            .then(() => {}) as any) as Cypress.Chainable<void>;
    }
);

Cypress.Commands.add(
    "apiMockReset",
    (
        serverAddressWithPort: string = `127.0.0.1:${constants.Port}`,
        options: Partial<Cypress.Timeoutable> = {}
    ): Cypress.Chainable<void> => {
        return (cy
            .request({ log: false, timeout: options.timeout, url: `${serverAddressWithPort}${constants.Paths.resetAll}` })
            .then(() => {}) as any) as Cypress.Chainable<void>;
    }
);
