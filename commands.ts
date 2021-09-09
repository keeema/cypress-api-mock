/// <reference path="./index.d.ts" />

import { constants } from "./constants";

Cypress.Commands.add(
    "apiMock",
    (
        pattern: string,
        response: string | Object,
        serverAddressWithPort: string = `127.0.0.1:${constants.Port}`
    ): Cypress.Chainable<void> => {
        Cypress.log({ message: [pattern] });
        const options: IApiMockOptions = { pattern, response };
        return (cy
            .request("POST", `${serverAddressWithPort}${constants.Paths.registerMock}`, options)
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
            .request(`${serverAddressWithPort}${constants.Paths.getRequests}`, options)
            .then((response) => (response.body as any) as Map<string, IApiMockRequestData[]>);
    }
);

Cypress.Commands.add(
    "apiMockResponses",
    (
        serverAddressWithPort: string = `127.0.0.1:${constants.Port}`,
        options: Partial<Cypress.Timeoutable> = {}
    ): Cypress.Chainable<Map<string, string[]>> => {
        return cy
            .request(`${serverAddressWithPort}${constants.Paths.getResponses}`, options)
            .then((response) => (response.body as any) as Map<string, string[]>);
    }
);

Cypress.Commands.add(
    "apiMockResetCalls",
    (serverAddressWithPort: string = `127.0.0.1:${constants.Port}`): Cypress.Chainable<void> => {
        return (cy.request(`${serverAddressWithPort}${constants.Paths.resetCalls}`).then(() => {}) as any) as Cypress.Chainable<void>;
    }
);

Cypress.Commands.add(
    "apiMockReset",
    (serverAddressWithPort: string = `127.0.0.1:${constants.Port}`): Cypress.Chainable<void> => {
        return (cy.request(`${serverAddressWithPort}${constants.Paths.resetAll}`).then(() => {}) as any) as Cypress.Chainable<void>;
    }
);
