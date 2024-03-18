import { baseUrl, circleChanging, circleModified } from "../constants";

describe("string page working correctly", function () {
  beforeEach(() => cy.visit(`${baseUrl}/recursion`));
  it("reverse button should be locked", () => {
    cy.get("input").should("be.empty");
    cy.get("button").contains("Развернуть").parent().should("be.disabled");
  });
  it("string reverses correctly", () => {
    cy.get("input").type("qwer");

    cy.get("ul>div").eq(0).as("first");
    cy.get("ul>div").eq(1).as("second");
    cy.get("ul>div").eq(2).as("third");
    cy.get("ul>div").eq(3).as("fourth");

    cy.get("button").contains("Развернуть").click();

    cy.get("@first").should("have.text", "r");
    cy.get("@first").children(circleChanging);
    cy.get("@fourth").should("have.text", "q");
    cy.get("@fourth").children(circleChanging);

    cy.wait(1000);

    cy.get("@first").children(circleModified);
    cy.get("@fourth").children(circleModified);
    cy.get("@second").children(circleChanging);
    cy.get("@third").children(circleChanging);

    cy.wait(1000);

    cy.get("@second").should("have.text", "e");
    cy.get("@third").should("have.text", "w");
    cy.get("@second").children(circleModified);
    cy.get("@third").children(circleModified);
  });
});
