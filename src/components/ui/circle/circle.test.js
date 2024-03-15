import { ElementStates } from "../../../types/element-states";
import { Circle } from "./circle";
import renderer from "react-test-renderer";

describe("Circle test", () => {
  it("circle without letter renders correctly", () => {
    const tree = renderer.create(<Circle />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("circle with letter renders correctly", () => {
    const tree = renderer.create(<Circle letter="T" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("circle with head(letter) renders correctly", () => {
    const tree = renderer.create(<Circle head="T" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("circle with head(element) renders correctly", () => {
    const tree = renderer.create(<Circle head={<Circle />} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("circle with tail(letter) renders correctly", () => {
    const tree = renderer.create(<Circle tail="T" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("circle with tail(element) renders correctly", () => {
    const tree = renderer.create(<Circle tail={<Circle />} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("circle with index renders correctly", () => {
    const tree = renderer.create(<Circle index={0} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("small circle renders correctly", () => {
    const tree = renderer.create(<Circle isSmall={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("circle default renders correctly", () => {
    const tree = renderer.create(<Circle state={ElementStates.Default} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("circle changing renders correctly", () => {
    const tree = renderer.create(<Circle state={ElementStates.Changing} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("circle modified renders correctly", () => {
    const tree = renderer.create(<Circle state={ElementStates.Modified} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
