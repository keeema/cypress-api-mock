/// <reference path="./index.d.ts" />

declare namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/interface-name-prefix
    interface Chainable<Subject> {
        verifyUpcomingAssertions<TValue>(value: TValue, options?: Object, retryOptions?: Object): TValue;
    }
}

Cypress.Commands.add(
    "apiMock",
    (pattern: string, response: string | Object): Cypress.Chainable<string[]> => {
        Cypress.log({ message: [pattern] });
        const options: IApiMockOptions = { pattern, response };
        return (cy.task("api-mock:register", options, { log: false }) as any) as Cypress.Chainable<string[]>;
    }
);

Cypress.Commands.add(
    "apiMockRequests",
    (options: Partial<Cypress.Timeoutable> = {}): Cypress.Chainable<Map<string, IApiMockRequestData[]>> => {
        Cypress.log({});
        return cy.task("api-mock:get-requests", options, { log: false }).then((requests) => (requests as any) as Map<string, IApiMockRequestData[]>);
    }
);

Cypress.Commands.add(
    "apiMockResponses",
    (options: Partial<Cypress.Timeoutable> = {}): Cypress.Chainable<Map<string, string[]>> => {
        Cypress.log({});
        return cy.task("api-mock:get-responses", options, { log: false }).then((requests) => (requests as any) as Map<string, string[]>);
    }
);

Cypress.Commands.add(
    "apiMockResetCalls",
    (): Cypress.Chainable<void> => {
        Cypress.log({});
        return (cy.task("api-mock:reset-calls", undefined, { log: false }) as any) as Cypress.Chainable<void>;
    }
);

Cypress.Commands.add(
    "apiMockReset",
    (): Cypress.Chainable<void> => {
        Cypress.log({});
        return (cy.task("api-mock:reset", undefined, { log: false }) as any) as Cypress.Chainable<void>;
    }
);
