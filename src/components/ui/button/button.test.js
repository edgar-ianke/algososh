import { Button } from "./button";
import renderer from "react-test-renderer";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Button test", () => {
  it("button with text renders correctly", () => {
    const tree = renderer.create(<Button text="Hello" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("button no text renders correctly", () => {
    const tree = renderer.create(<Button />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("disabled button renders correctly", () => {
    const tree = renderer.create(<Button disabled={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("loading button renders correctly", () => {
    const tree = renderer.create(<Button isLoader={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("Callback on Button", () => {
    window.alert = jest.fn();
    render(<Button onClick={alert("Callback")} text="Testing" />);
    const button = screen.getByText("Testing");
    fireEvent.click(button);
    expect(window.alert).toHaveBeenCalledWith("Callback");
  });
});
