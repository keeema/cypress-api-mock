/// <reference types="cypress" />
declare function register(_: Cypress.PluginEvents, config?: Partial<IApiMockConfiguration>): void;
export = register;
