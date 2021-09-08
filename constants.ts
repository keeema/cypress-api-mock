export const constants = {
    Port: 3000,
    Paths: {
        registerMock: "/register",
        getRequests: "/get-requests",
        getResponses: "/get-responses",
        resetAll: "/reset-all",
        resetCalls: "/reset-calls",
    },
    ApiMockFolderPath: "cypress/api-mock-logs",
    DeleteDataOlderThenInMinutes: 5, // Calls and mocks
    ResetCallsIntervalInMinutes: 10,
    ResetMocksIntervalInMinutes: 10,
};
