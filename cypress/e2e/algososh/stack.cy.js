import {
  baseUrl,
  circleDefault,
  circleChanging,
  circleContent,
  circleHead,
  circleCircle,
} from "../constants";

const { wait } = require("@testing-library/user-event/dist/utils");

describe("stack page working correctly", function () {
  beforeEach(() => cy.visit(`${baseUrl}/stack`));
  it("add button should be disabled with empty input", () => {
    cy.get("input").should("be.empty");
    cy.get("button").contains("Добавить").parent().should("be.disabled");
  });
  it("elements are adding and deleting correctly", () => {
    cy.get("input").as("input");
    cy.get("button").contains("Добавить").as("add");
    cy.get("button").contains("Удалить").as("delete");
    cy.get("ul").as("container");
    for (let i = 0; i < 6; i++) {
      cy.get("@input").type(i);
      cy.get("@add").click();
      cy.get(circleCircle).last().should("have.text", i);
      cy.get(circleChanging).last().should("have.text", i);
      cy.wait(500);
      cy.get(circleDefault).last().should("have.text", i);
      cy.get(circleContent).last().children(circleHead).should("have.text", "top");
    }
    cy.get("@container").children().should("have.length", 6);
    cy.get("@delete").click();
    cy.get(circleCircle).last().should("have.text", "5");
    cy.get(circleChanging).last().should("have.text", "5");
    wait(500);
    cy.get(circleCircle).last().should("have.text", "4");
    cy.get(circleContent).last().children(circleHead).should("have.text", "top");
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
    }
    cy.get("@reset").click();
    cy.get("@container").children().should("have.length", 0);
    cy.get("@reset").parent().should("be.disabled");
    cy.get("@delete").parent().should("be.disabled");
  });
});
