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
    (
        serverAddressWithPort: string = `127.0.0.1:${constants.Port}`,
        options: Partial<Cypress.Timeoutable> = {}
    ): Cypress.Chainable<Map<string, IApiMockRequestData[]>> => {
        Cypress.log({});
        return cy
            .request<Map<string, IApiMockRequestData[]>>({
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
    (
        serverAddressWithPort: string = `127.0.0.1:${constants.Port}`,
        options: Partial<Cypress.Timeoutable> = {}
    ): Cypress.Chainable<Map<string, string[]>> => {
        Cypress.log({});
        return cy
            .request<Map<string, string[]>>({
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
    (
        serverAddressWithPort: string = `127.0.0.1:${constants.Port}`,
        options: Partial<Cypress.Timeoutable> = {}
    ): Cypress.Chainable<void> => {
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
    (
        serverAddressWithPort: string = `127.0.0.1:${constants.Port}`,
        options: Partial<Cypress.Timeoutable> = {}
    ): Cypress.Chainable<void> => {
        Cypress.log({});
        return (cy
            .request({ log: false, url: `${serverAddressWithPort}${constants.Paths.resetAll}`, ...options })
            .then(() => {}) as any) as Cypress.Chainable<void>;
    }
);
