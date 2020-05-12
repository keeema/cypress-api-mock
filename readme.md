# cypress-api-mock

Cypress task plugin with commands for mocking API. It runs its own http server and returns registered responses.

## Adding to project

Add following lines to your _commands.ts_:

```tsx
/// <reference types=cypress-api-mock" />

import "cypress-api-mock/commands";
```

Add following lines to your _plugins/index.js_:

```tsx
const apiMock = require("cypress-api-mock/plugin/dist/apiMock.js");

module.exports = (on, config) => {
    apiMock(on, config);
};
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
cy.apiMock("/test-api", `{"id":10,"message":"Test Response Message!"}`);
```

### Assertion

```tsx
cy.apiMockRequests().should((requests) => expect(requests["/test-api"]).exist);
```

## How to Develope

To build plugin just run in _plugin_ folder command:

```bash
npx webpack --watch
```

Then run tests in root:

```bash
npx cypress open
```
