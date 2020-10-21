/// <reference path="../../index.d.ts" />

describe("cypress api-mock", () => {
    const testApiUrl = "/test-api";
    const testApiResponse = '{"id":${body.id},"message":"Hello ${body.name}!"}';
    const testApiExpectedResponse = `{"id":10,"message":"Hello Simon!"}`;
    const testApiRequestBody = JSON.stringify({ id: 10, name: "Simon" });
    const testApiRequestBodyInvalid = "{";
    const dummyUrl = "/dummy-api";

    beforeEach(() => cy.apiMockReset());

    it("should return a response for registered api mock", () => {
        cy.apiMock(testApiUrl, testApiResponse);

        cy.request(`localhost:3000${testApiUrl}`, testApiRequestBody).its("body").should("include", testApiExpectedResponse);

        cy.apiMockRequests().should((requests) => expect(requests[testApiUrl]).exist);
        cy.apiMockRequests().should((requests) => expect(requests[testApiUrl][0]).to.eq(testApiRequestBody));
        cy.apiMockResponses().should((requests) => expect(requests[testApiUrl][0]).to.eq(testApiExpectedResponse));
        cy.apiMockRequests().should((requests) => expect(requests["/not-called-api"]).not.exist);
    });

    it("should return 404 for not-registered api mock", () => {
        cy.request({ url: `localhost:3000${dummyUrl}`, failOnStatusCode: false })
            .its("status")
            .should("equal", 404);

        cy.apiMockRequests().should((requests) => expect(requests[dummyUrl]).not.exist);
    });

    it("should return 500 for invalid calls", () => {
        cy.apiMock(testApiUrl, testApiResponse);

        cy.request({ url: `localhost:3000${testApiUrl}`, body: testApiRequestBodyInvalid, failOnStatusCode: false })
            .its("status")
            .should("equal", 500);
    });
});
