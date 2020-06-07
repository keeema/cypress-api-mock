/// <reference path="common.d.ts" />
/// <reference types="cypress" />
declare function register(on: Cypress.PluginEvents, config?: Partial<IApiMockConfiguration>): void;
export default register;
