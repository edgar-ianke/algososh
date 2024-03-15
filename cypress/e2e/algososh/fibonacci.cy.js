describe("fibonaci page working correctly", function () {
  beforeEach(() => cy.visit("http://localhost:3000/fibonacci"));
  it("reverse button should be locked", () => {
    cy.get("input").should("be.empty");
    cy.get("button").contains("Рассчитать").parent().should("be.disabled");
  });
  it("string reverses correctly", () => {
    cy.get("input").type("5");
    cy.get("button").contains("Рассчитать").click();
    cy.get("ul>div").first().as("first");
    cy.get("@first").contains("1");
    cy.wait(500);
    cy.get("ul>div").last().as("last");
    cy.get("@last").contains("1");
    cy.wait(500);
    cy.get("ul>div").last().as("last");
    cy.get("@last").contains("2");
    cy.wait(500);
    cy.get("ul>div").last().as("last");
    cy.get("@last").contains("3");
    cy.wait(500);
    cy.get("ul>div").last().as("last");
    cy.get("@last").contains("5");
    cy.wait(500);
  });
});
