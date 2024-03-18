import {
  baseUrl,
  circleDefault,
  circleChanging,
  circleModified,
  circleContent,
  circleHead,
  circleTail,
  circleCircle,
} from "../constants";

describe("stack page working correctly", function () {
  beforeEach(() => cy.visit(`${baseUrl}/list`));
  it("add button should be disabled with empty input", () => {
    cy.get('[placeholder = "Введите значение"]').should("be.empty");
    cy.get('[placeholder = "Введите индекс"]').should("be.empty");
    cy.get("button").contains("Добавить в head").parent().should("be.disabled");
    cy.get("button").contains("Добавить в tail").parent().should("be.disabled");
    cy.get("button").contains("Добавить по индексу").parent().should("be.disabled");
    cy.get("button").contains("Удалить по индексу").parent().should("be.disabled");
  });
  it("initial list renders correctly", () => {
    cy.get("ul>li")
      .should("have.length", 4)
      .each(($el, index) => {
        switch (index) {
          case 0:
            cy.wrap($el).contains("0");
            cy.wrap($el).contains("head");
            break;

          case 1:
            cy.wrap($el).contains("34");
            break;

          case 2:
            cy.wrap($el).contains("8");
            break;

          case 3:
            cy.wrap($el).contains("1");
            cy.wrap($el).contains("tail");
            break;
        }
      });
  });
  it("adds to head/tail correctly", () => {
    cy.get("ul>li").as("list").should("have.length", 4);
    cy.get('[placeholder = "Введите значение"]').as("valueInput");
    cy.get('[placeholder = "Введите индекс"]').as("indexInput");
    cy.get("button").contains("Добавить в head").parent().as("addHead");
    cy.get("button").contains("Добавить в tail").parent().as("addTail");
    cy.get("@valueInput").type("22");
    cy.get("@addHead").click();
    cy.get("@list").get(circleHead).first().children().children(circleChanging);
    cy.get("@list").get(circleHead).first().contains("22");
    cy.wait(500);
    cy.get("@list").first().contains("22");
    cy.get("@list").get(circleContent).first().get(circleModified);
    cy.get("@list").should("have.length", 5);
    cy.wait(500);
    cy.get("@list").get(circleContent).first().get(circleDefault);
    cy.get("@list").first().contains("head");

    cy.get("@valueInput").type("-3");
    cy.get("@addTail").click();
    cy.get("@list").last().children().children(circleHead).children().children(circleChanging);
    cy.get("@list").last().children().children(circleHead).contains("-3");
    cy.wait(500);
    cy.get("@list").last().contains("-3");
    cy.get("@list").last().contains("tail");
    cy.get("@list").get(circleContent).last().get(circleModified);
    cy.wait(500);
    cy.get("@list").get(circleContent).first().get(circleDefault);
    cy.get("@list").should("have.length", 6);
  });
  it("removes from head/tail correctly", () => {
    cy.get(circleContent).as("list").should("have.length", 4);
    cy.get("button").contains("Удалить из head").click();
    cy.get("@list").first().children(circleCircle).children("p").should("be.empty");
    cy.get("@list").first().children(circleTail).children().children(circleChanging);
    cy.get("@list").first().children(circleTail).contains("0");
    cy.wait(500);
    cy.get("@list").first().contains("34");
    cy.get("@list").first().contains("head");
    cy.get("@list").should("have.length", 3);

    cy.get("@list").should("have.length", 3);
    cy.get("button").contains("Удалить из tail").click();
    cy.get("@list").eq(2).children(circleCircle).children("p").should("be.empty");
    cy.get("@list").eq(2).children(circleTail).children().children(circleChanging);
    cy.get("@list").eq(2).children(circleTail).contains("1");
    cy.wait(500);
    cy.get("@list").last().contains("8");
    cy.get("@list").last().contains("tail");
    cy.get("@list").should("have.length", 2);
  });
  it("adds by index correctly", () => {
    cy.get(circleContent).as("list").should("have.length", 4);
    cy.get('[placeholder = "Введите значение"]').type("22");
    cy.get('[placeholder = "Введите индекс"]').type("2");
    cy.get("button").contains("Добавить по индексу").click();

    for (let i = 0; i <= 2; i++) {
      cy.get("@list").eq(i).children(circleHead).contains("22");
      cy.get("@list").eq(i).children(circleHead).children().children(circleChanging);
      cy.get("@list").eq(i).children(circleChanging);
      cy.wait(500);
      if (i === 2) {
        cy.get("@list").eq(i).contains("22");
        cy.get("@list").eq(i).children(circleModified);
        cy.wait(500);
        cy.get("@list").eq(i).children(circleDefault);
      }
    }
    cy.get(circleContent).as("list").should("have.length", 5);
    cy.get("@list").first().contains("head");
  });
  it("deletes by index correctly", () => {
    cy.get(circleContent).as("list").should("have.length", 4);
    cy.get('[placeholder = "Введите значение"]').type("22");
    cy.get('[placeholder = "Введите индекс"]').type("2");
    cy.get("button").contains("Удалить по индексу").click();

    for (let i = 0; i <= 2; i++) {
      cy.get("@list").eq(i).children(circleChanging);
      cy.wait(500);
      if (i === 2) {
        cy.get("@list").eq(i).children(circleTail).contains("8");
        cy.get("@list").eq(i).children(circleTail).children().children(circleChanging);
        cy.wait(500);
        cy.get("@list").eq(i).children(circleTail).contains("tail");
      }
    }
    cy.get(circleContent).as("list").should("have.length", 3);
  });
});
