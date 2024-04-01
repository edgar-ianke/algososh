import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { SortingPage } from "./sorting-page";
import { BrowserRouter } from "react-router-dom";

describe("SortingPage component", () => {
  it("Сортировка пузырьком по возрастанию пустого массива", async () => {
    render(
      <BrowserRouter>
        <SortingPage array={[]} />
      </BrowserRouter>
    );

    const order = screen.getByText("По возрастанию");
    const button = screen.getByLabelText("Пузырек");
    fireEvent.click(button);
    fireEvent.click(order);

    await waitFor(
      () => {
        const array = screen.getByTestId("array");
        expect(array).toHaveTextContent("");
      },
      { timeout: 1000 }
    );
  });
  it("Сортировка пузырьком по возрастанию 1го элемента", async () => {
    render(
      <BrowserRouter>
        <SortingPage array={[3]} />
      </BrowserRouter>
    );

    const order = screen.getByText("По возрастанию");
    const button = screen.getByLabelText("Пузырек");
    fireEvent.click(button);
    fireEvent.click(order);

    await waitFor(
      () => {
        const column = screen.getByTestId("column");
        expect(column).toHaveTextContent("3");
      },
      { timeout: 1000 }
    );
  });
  it("Сортировка пузырьком по возрастанию 3х элементов", async () => {
    render(
      <BrowserRouter>
        <SortingPage array={[3, 1, 5]} />
      </BrowserRouter>
    );

    const order = screen.getByText("По возрастанию");
    const button = screen.getByLabelText("Пузырек");
    fireEvent.click(button);
    fireEvent.click(order);

    await waitFor(
      () => {
        const columns = screen.getAllByTestId("column");
        expect(columns[0]).toHaveTextContent("1");
        expect(columns[1]).toHaveTextContent("3");
        expect(columns[2]).toHaveTextContent("5");
      },
      { timeout: 4000 }
    );
  });
  
    it("Сортировка выбором по возрастанию пустого массива", async () => {
    render(
      <BrowserRouter>
        <SortingPage array={[]} />
      </BrowserRouter>
    );

    const order = screen.getByText("По возрастанию");
    const button = screen.getByLabelText("Выбор");
    fireEvent.click(button);
    fireEvent.click(order);

    await waitFor(
      () => {
        const array = screen.getByTestId("array");
        expect(array).toHaveTextContent("");
      },
      { timeout: 1000 }
    );
  });
  it("Сортировка выбором по возрастанию 1го элемента", async () => {
    render(
      <BrowserRouter>
        <SortingPage array={[3]} />
      </BrowserRouter>
    );

    const order = screen.getByText("По возрастанию");
    const button = screen.getByLabelText("Выбор");
    fireEvent.click(button);
    fireEvent.click(order);

    await waitFor(
      () => {
        const column = screen.getByTestId("column");
        expect(column).toHaveTextContent("3");
      },
      { timeout: 1000 }
    );
  });
  it("Сортировка выбором по возрастанию 3х элементов", async () => {
    render(
      <BrowserRouter>
        <SortingPage array={[3, 1, 5]} />
      </BrowserRouter>
    );

    const order = screen.getByText("По возрастанию");
    const button = screen.getByLabelText("Выбор");
    fireEvent.click(button);
    fireEvent.click(order);

    await waitFor(
      () => {
        const columns = screen.getAllByTestId("column");
        expect(columns[0]).toHaveTextContent("1");
        expect(columns[1]).toHaveTextContent("3");
        expect(columns[2]).toHaveTextContent("5");
      },
      { timeout: 4000 }
    );
  });
  it("Сортировка пузырьком по убыванию пустого массива", async () => {
    render(
      <BrowserRouter>
        <SortingPage array={[]} />
      </BrowserRouter>
    );

    const order = screen.getByText("По убыванию");
    const button = screen.getByLabelText("Пузырек");
    fireEvent.click(button);
    fireEvent.click(order);

    await waitFor(
      () => {
        const array = screen.getByTestId("array");
        expect(array).toHaveTextContent("");
      },
      { timeout: 1000 }
    );
  });
  it("Сортировка пузырьком по убыванию 1го элемента", async () => {
    render(
      <BrowserRouter>
        <SortingPage array={[3]} />
      </BrowserRouter>
    );

    const order = screen.getByText("По убыванию");
    const button = screen.getByLabelText("Пузырек");
    fireEvent.click(button);
    fireEvent.click(order);

    await waitFor(
      () => {
        const column = screen.getByTestId("column");
        expect(column).toHaveTextContent("3");
      },
      { timeout: 1000 }
    );
  });
  it("Сортировка пузырьком по убыванию 3х элементов", async () => {
    render(
      <BrowserRouter>
        <SortingPage array={[3, 1, 5]} />
      </BrowserRouter>
    );

    const order = screen.getByText("По убыванию");
    const button = screen.getByLabelText("Пузырек");
    fireEvent.click(button);
    fireEvent.click(order);

    await waitFor(
      () => {
        const columns = screen.getAllByTestId("column");
        expect(columns[0]).toHaveTextContent("5");
        expect(columns[1]).toHaveTextContent("3");
        expect(columns[2]).toHaveTextContent("1");
      },
      { timeout: 4000 }
    );
  });
  it("Сортировка выбором по убыванию пустого массива", async () => {
    render(
      <BrowserRouter>
        <SortingPage array={[]} />
      </BrowserRouter>
    );

    const order = screen.getByText("По убыванию");
    const button = screen.getByLabelText("Выбор");
    fireEvent.click(button);
    fireEvent.click(order);

    await waitFor(
      () => {
        const array = screen.getByTestId("array");
        expect(array).toHaveTextContent("");
      },
      { timeout: 1000 }
    );
  });
  it("Сортировка выбором по убыванию 1го элемента", async () => {
    render(
      <BrowserRouter>
        <SortingPage array={[3]} />
      </BrowserRouter>
    );

    const order = screen.getByText("По убыванию");
    const button = screen.getByLabelText("Выбор");
    fireEvent.click(button);
    fireEvent.click(order);

    await waitFor(
      () => {
        const column = screen.getByTestId("column");
        expect(column).toHaveTextContent("3");
      },
      { timeout: 1000 }
    );
  });
  it("Сортировка выбором по убыванию 3х элементов", async () => {
    render(
      <BrowserRouter>
        <SortingPage array={[3, 1, 5]} />
      </BrowserRouter>
    );

    const order = screen.getByText("По убыванию");
    const button = screen.getByLabelText("Выбор");
    fireEvent.click(button);
    fireEvent.click(order);

    await waitFor(
      () => {
        const columns = screen.getAllByTestId("column");
        expect(columns[0]).toHaveTextContent("5");
        expect(columns[1]).toHaveTextContent("3");
        expect(columns[2]).toHaveTextContent("1");
      },
      { timeout: 4000 }
    );
  });
});
