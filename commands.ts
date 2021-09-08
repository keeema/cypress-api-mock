/// <reference path="./index.d.ts" />

import { constants } from "./constants";

Cypress.Commands.add(
    "apiMock",
    (pattern: string, response: string | Object): Cypress.Chainable<void> => {
        Cypress.log({ message: [pattern] });
        const options: IApiMockOptions = { pattern, response };
        return (cy
            .request("POST", `127.0.0.1:${constants.Port}${constants.Paths.registerMock}`, options)
            .then(() => {}) as any) as Cypress.Chainable<void>;
    }
);

Cypress.Commands.add(
    "apiMockRequests",
    (_: Partial<Cypress.Timeoutable> = {}): Cypress.Chainable<Map<string, IApiMockRequestData[]>> => {
        return cy
            .request(`127.0.0.1:${constants.Port}${constants.Paths.getRequests}`)
            .then((response) => (response.body as any) as Map<string, IApiMockRequestData[]>);
    }
);

Cypress.Commands.add(
    "apiMockResponses",
    (_: Partial<Cypress.Timeoutable> = {}): Cypress.Chainable<Map<string, string[]>> => {
        return cy
            .request(`127.0.0.1:${constants.Port}${constants.Paths.getResponses}`)
            .then((response) => (response.body as any) as Map<string, string[]>);
    }
);

Cypress.Commands.add(
    "apiMockResetCalls",
    (): Cypress.Chainable<void> => {
        return (cy.request(`127.0.0.1:${constants.Port}${constants.Paths.resetCalls}`).then(() => {}) as any) as Cypress.Chainable<void>;
    }
);

Cypress.Commands.add(
    "apiMockReset",
    (): Cypress.Chainable<void> => {
        return (cy.request(`127.0.0.1:${constants.Port}${constants.Paths.resetAll}`).then(() => {}) as any) as Cypress.Chainable<void>;
    }
);
