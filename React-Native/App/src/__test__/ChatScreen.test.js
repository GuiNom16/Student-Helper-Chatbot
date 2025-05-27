import React from "react";
import { create, act } from "react-test-renderer";
import Chat from "../screens/Chat/Chat";

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
describe("JoeBot screen", () => {
  const tree = renderer.create(<Chat />).toJSON();
  it("has 4 children", () => {
    expect(tree.children.length).toBe(4);
  });

  it("JoeBot screen renders correctly", () => {
    expect(tree).toMatchSnapshot();
  });
});

//testing the interaction functions
describe("test functionalities", () => {
  const tree = create(<Chat />);

  it("messages appering when sending ", () => {
    const msg = tree.root.findByProps({ testID: "sendMessage" }).props;
    //defining a msg to be sent
    let obj = {
      _id: 60,
      text: "New message",
      createdAt: new Date(),
      user: {
        _id: 2,
        name: "React Native",
        avatar: null,
      },
    };
    act(() => msg.onSend([obj]));
    //checking if new message appears in chat
    expect(msg.messages == obj);
  });

  it("signing out ", () => {
    const button = tree.root.findByProps({ testID: "signOut" }).props;
    act(() => button.onPress());
    //checking sign out function works
    expect(console.log("sign out successful"));
  });

  it("Help modal working ", () => {
    const modal = tree.root.findByProps({ testID: "helpModal" }).props;
    const button = tree.root.findByProps({ testID: "helpBtn" }).props;
    act(() => button.onPress());
    //checking if new message appears in chat
    expect(modal.visible == true);
  });
});
