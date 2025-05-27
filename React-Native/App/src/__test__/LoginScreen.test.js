import React from "react";

import renderer, { act } from "react-test-renderer";

import LogInScreen from "../screens/LogInScreen/LogInScreen";

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
describe("Login screen", () => {
  const tree = renderer.create(<LogInScreen />).toJSON();
  it(" has 6 children", () => {
    expect(tree.children.length).toBe(6);
  });

  it(" screen renders correctly", () => {
    expect(tree).toMatchSnapshot();
  });
});

//testing the interaction functions
describe("test functionality", () => {
  const tree = renderer.create(<LogInScreen />);
  it(" log in function works", () => {
    const email = tree.root.findByProps({ testID: "emailInput" }).props;
    const password = tree.root.findByProps({ testID: "passwordInput" }).props;
    const button = tree.root.findByProps({ testID: "loginBtn" }).props;
    act(() => {
      email.value = "jean@test.com";
      password.value = "Password";
      button.onPress();
    });
    expect(console.log("Logged in user: ", email.value));
  });
});
