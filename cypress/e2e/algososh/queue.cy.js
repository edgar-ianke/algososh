describe("stack page working correctly", function () {
  beforeEach(() => cy.visit("http://localhost:3000/queue"));
  it("add button should be disabled with empty input", () => {
    cy.get("input").should("be.empty");
    cy.get("button").contains("Добавить").parent().should("be.disabled");
  });
  it("elements are adding and deleting correctly", () => {
    cy.get("input").as("input");
    cy.get("button").contains("Добавить").as("add");
    cy.get("button").contains("Удалить").as("delete");
    cy.get("ul").as("container");
    let length = 0;
    for (let i = 0; i < 3; i++) {
      cy.get("@input").type(i);
      cy.get("@add").click();
      length++;
      cy.get("[class*=circle_content]").eq(i).children("[class*=circle_changing]");
      if (i === 0) {
        cy.get("[class*=circle_content]").eq(i).children("[class*=circle_head]").should("have.text", "head");
      }
      cy.get("[class*=circle_content]").eq(i).children("[class*=circle_tail]").should("have.text", "tail");
      cy.get("[class*=circle_circle]").eq(i).should("have.text", i);
      cy.wait(500);
      cy.get("[class*=circle_content]").eq(i).children("[class*=circle_default]");
    }
    cy.get("@container")
      .get("[class*=text_type_circle]")
      .filter((index, element) => {
        return Cypress.$(element).text().length > 0;
      })
      .should("have.length", length);
    cy.get("@delete").click();
    length--;
    cy.get("@container").children().eq(0).children("[class*=circle_changing]");;
    cy.wait(500);
    cy.get("@container").children().eq(0).children("[class*=circle_default]");
    cy.get("@container").children().eq(1).children("[class*=circle_head]").should("have.text", "head");
    cy.get("@container")
      .get("[class*=text_type_circle]")
      .filter((index, element) => {
        return Cypress.$(element).text().length > 0;
      })
      .should("have.length", length);
  });
  it("reset button is working correctly", () => {
    cy.get("input").as("input");
    cy.get("button").contains("Добавить").as("add");
    cy.get("button").contains("Удалить").as("delete");
    cy.get("button").contains("Очистить").as("reset");
    cy.get("ul").as("container");
    for (let i = 0; i < 6; i++) {
      cy.get("@input").type(i);
      cy.get("@add").click();
      cy.wait(500);
    }
    cy.get("@reset").click();
    cy.get("@container")
      .get("[class*=text_type_circle]")
      .filter((index, element) => {
        return Cypress.$(element).text().length > 0;
      })
      .should("have.length", length);
    cy.get("@reset").parent().should("be.disabled");
    cy.get("@delete").parent().should("be.disabled");
  });
});
