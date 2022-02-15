/// <reference types="cypress" />
/// <reference path="plugin/common.d.ts" />

declare namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/interface-name-prefix
    interface Chainable<Subject> {
        /**
         * Registers mock response for given url pattern.
         * @param pattern url pattern
         * @param response mock response
         */
        apiMock(pattern: string, response: string | Object, options?: Partial<Cypress.Timeoutable>): Cypress.Chainable<void>;
        /**
         * Retrieve list of requests.
         * @returns dictionary object with with url pattern as a key and list of request as a value
         */
        apiMockRequests(options?: Partial<Cypress.Timeoutable>): Cypress.Chainable<{ [key: string]: IApiMockRequestData[] }>;
        /**
         * Retrieve list of responses.
         * @returns dictionary object with with url pattern as a key and list of responses as a value
         */
        apiMockResponses(options?: Partial<Cypress.Timeoutable>): Cypress.Chainable<{ [key: string]: string[] }>;
        /** Reset list of received requests and responses.
         */
        apiMockResetCalls(options?: Partial<Cypress.Timeoutable>): Cypress.Chainable<void>;
        /**         
         Reset mock registrations and list of received requests.*/
        apiMockReset(options?: Partial<Cypress.Timeoutable>): Cypress.Chainable<void>;
    }
}
