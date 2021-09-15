# cypress-api-mock

Cypress plugin with commands for mocking API. It runs its own http server locally and returns registered responses.
Http server can be started separately on remote machine if needed.

## Adding to project

Add following lines to your _commands.ts_:

```tsx
/// <reference types=cypress-api-mock" />

import "cypress-api-mock/commands";
```

Add following lines to your _plugins/index.ts_:

```tsx
import apiMock from "cypress-api-mock/plugin";

function register(on: Cypress.PluginEvents, config: Cypress.ConfigOptions): void {
    /* your other registrations */
    apiMock(on, config);
}

export = register;
```

It will start server in the default address http://localhost:3000,

## Usage

### Prepare environment

It is highly recommended to reset the plugin before every suite to remove all previously registered mocks and logged requests.

```tsx
beforeEach(() => cy.apiMockReset());
```

You can also reset the log of requests and responses during the test suite.
Requests, responses and mocks are deleted once 5 minutes timeout after the mocks is written expires. If new mock is written, timeout is reset.

```tsx
cy.apiMockResetCalls();
```

### Mock specific API

```tsx
cy.apiMock("/test-api", '{"id":${body.id},"message":"Hello ${body.name}!"}');
```

### Assertion

```tsx
cy.apiMockRequests().should((requests) => expect(requests[testApiUrl][0].data).to.eq(testApiRequestBody));
cy.apiMockResponses().should((requests) => expect(requests[testApiUrl][0]).to.eq(testApiExpectedResponse));
```

## How to Develope

To build plugin run webpack with specific config:

For running server locally when cypress is started

```bash
npx webpack --config webpack.config.plugin.ts -w
```

For running server remotely

```bash
npx webpack --config webpack.config.server.ts -w
```

and then run cypress:

```bash
npx cypress open
```
