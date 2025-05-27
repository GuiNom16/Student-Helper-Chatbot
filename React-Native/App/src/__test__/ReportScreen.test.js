import React from "react";
import renderer from "react-test-renderer";

import Report from "../screens/Report/Report";

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      dispatch: jest.fn(),
    }),
  };
});

//testing if the right amount of children is being displayed
describe("Report screen", () => {
  const tree = renderer.create(<Report />).toJSON();
  it("has 4 children", () => {
    expect(tree.children.length).toBe(4);
  });

  it("screen renders correctly", () => {
    expect(tree).toMatchSnapshot();
  });
});
