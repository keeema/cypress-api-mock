# cypress-api-mock

Cypress task plugin with commands for mocking API. It runs its own http server and returns registered responses.

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

You can also reset the log of requests during the test suite.

```tsx
cy.apiMockResetRequests();
```

### Mock specific API

```tsx
cy.apiMock("/test-api", '{"id":${body.id},"message":"Hello ${body.name}!"}');
```

### Assertion

```tsx
cy.apiMockRequests().should((requests) => expect(requests["/test-api"]).exist);
```
