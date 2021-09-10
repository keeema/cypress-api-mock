/// <reference types="cypress" />
/// <reference path="plugin/common.d.ts" />

declare namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/interface-name-prefix
    interface Chainable<Subject> {
        /**
         * Registers mock response for given url pattern.
         * @param pattern url pattern
         * @param response mock response
         * @param serverAddressWithPort url address of mock server. If no address passed, localhost is called
         */
        apiMock(
            pattern: string,
            response: string | Object,
            serverAddressWithPort?: string,
            options?: Partial<Cypress.Timeoutable>
        ): Cypress.Chainable<void>;
        /**
         * Retrieve list of requests.
         * @param serverAddressWithPort url address of mock server
         * @returns dictionary object with with url pattern as a key and list of request as a value
         */
        apiMockRequests(
            serverAddressWithPort?: string,
            options?: Partial<Cypress.Timeoutable>
        ): Cypress.Chainable<{ [key: string]: IApiMockRequestData[] }>;
        /**
         * @param serverAddressWithPort url address of mock server. If no address passed, localhost is called
         * Retrieve list of responses.
         * @returns dictionary object with with url pattern as a key and list of responses as a value
         */
        apiMockResponses(
            serverAddressWithPort?: string,
            options?: Partial<Cypress.Timeoutable>
        ): Cypress.Chainable<{ [key: string]: string[] }>;
        /** Reset list of received requests and responses.
         * @param serverAddressWithPort url address of mock server. If no address passed, localhost is called
         */
        apiMockResetCalls(serverAddressWithPort?: string, options?: Partial<Cypress.Timeoutable>): Cypress.Chainable<void>;
        /**
         * @param serverAddressWithPort url address of mock server. If no address passed, localhost is called
         Reset mock registrations and list of received requests.*/
        apiMockReset(serverAddressWithPort?: string, options?: Partial<Cypress.Timeoutable>): Cypress.Chainable<void>;
    }
}
