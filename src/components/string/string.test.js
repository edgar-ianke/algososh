import { BrowserRouter } from "react-router-dom";
import { StringComponent } from "./string";
import { render, getByTestId, fireEvent, waitFor, getByPlaceholderText } from "@testing-library/react";
import { DELAY_IN_MS } from "../../constants/delays";

it("Разворот строки с четным количеством символов", async () => {
  const { container } = render(
    <BrowserRouter>
        <StringComponent />
    </BrowserRouter>
  );

  const input = getByPlaceholderText(container, "Введите текст");
  const button = getByTestId(container, "button");

  fireEvent.change(input, { target: { value: "qwerty" } });
  fireEvent.click(button);

  await waitFor(() => {
    expect(input.value).toBe("ytrewq");
  }, {timeout: DELAY_IN_MS * input.value.length});
});

it("Разворот строки с нечетным количеством символов", async () => {
  const { container } = render(
    <BrowserRouter>
        <StringComponent />
    </BrowserRouter>
  );

  const input = getByPlaceholderText(container, "Введите текст");
  const button = getByTestId(container, "button");

  fireEvent.change(input, { target: { value: "Testing" } });
  fireEvent.click(button);

  await waitFor(() => {
    expect(input.value).toBe("gnitseT");
  }, {timeout: DELAY_IN_MS * input.value.length});
});
it("Разворот строки с одним символом", async () => {
  const { container } = render(
    <BrowserRouter>
        <StringComponent />
    </BrowserRouter>
  );

  const input = getByPlaceholderText(container, "Введите текст");
  const button = getByTestId(container, "button");

  fireEvent.change(input, { target: { value: "T" } });
  fireEvent.click(button);

  await waitFor(() => {
    expect(input.value).toBe("T");
  }, {timeout: DELAY_IN_MS * input.value.length});
});
it("Разворот пустой строки", async () => {
  const { container } = render(
    <BrowserRouter>
        <StringComponent />
    </BrowserRouter>
  );

  const input = getByPlaceholderText(container, "Введите текст");
  const button = getByTestId(container, "button");

  fireEvent.change(input, { target: { value: "" } });
  fireEvent.click(button);

  await waitFor(() => {
    expect(input.value).toBe("");
  }, {timeout: DELAY_IN_MS * input.value.length});
});