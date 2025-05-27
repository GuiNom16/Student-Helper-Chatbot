import { View, Text } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";

const Help = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developper",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "../../../assets/images/logo.jpg",
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessage) =>
      GiftedChat.append(previousMessage, messages)
    );
  }, []);

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#024082",
  },
});

export default Help;
