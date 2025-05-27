import {
  TouchableOpacity,
  View,
  Text,
  Modal,
  BackHandler,
  Alert,
  Image,
} from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import uuid from "react-native-uuid";

const QueryBot = () => {
  const [messages, setMessages] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        "Already Leaving? :(",
        "Are you sure you want to exit the app?",
        [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel",
          },
          { text: "YES", onPress: () => BackHandler.exitApp() },
        ]
      );
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello I'm QueryBot! I'm here to help you with any Univeristy-related query you may have.",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: null,
        },
      },
    ]);
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
        navigation.navigate("Log In");
      })
      .catch((error) => console.log(error));
  };

  //retrieve messages from the chatbot
  const getBotResponse = (messages) => {
    const configurationObject = {
      url: "http://192.168.100.46:3000/getQuerybotResponse",
      method: "POST",
      data: { text: messages },
    };

    axios(configurationObject)
      .then((res) => {
        //format data for giftedchat
        let messageData = [
          {
            _id: uuid.v4(),
            createdAt: new Date(),
            text: res.data.message,
            user: { _id: 2, avatar: null },
          },
        ];
        onSend(messageData);
        console.log(res.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessage) =>
      GiftedChat.append(previousMessage, messages)
    );
  }, []);

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              QueryBot is here to help you with any kind of uni-related
              information you need. It might occur that QueryBot cannot answer
              you directly and redirect you to someone relevant to your query.
              QueryBot provides only known information about the university, any
              information of confidential nature QueryBot cannot provide. Note
              that if there are any queries that QueryBot is giving you a wrong
              answer or isn't aware of, there is a reoprt button where you can
              give us feedback so that we can fix the issue.
            </Text>
            <TouchableOpacity
              style={[styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.buttonQueryBot]}
          onPress={() => navigation.navigate("JoeBot")}
        >
          <Image
            style={styles.queryBot}
            source={require("../../../assets/images/joebot3d.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonModal]}
          onPress={() => setModalVisible(true)}
        >
          <Text
            style={{
              fontSize: 26,
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            ?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonReport]}
          onPress={() => navigation.navigate("Report")}
        >
          <Text
            style={{
              fontSize: 26,
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            !
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonLogout]}
          styleDisabled={{ color: "red" }}
          onPress={() => userSignOut()}
        >
          <Image
            style={styles.logo}
            source={require("../../../assets/images/logout.png")}
          />
        </TouchableOpacity>
      </View>
      <Image
        source={require("../../../assets/images/chatbot.png")}
        style={{
          position: "absolute",
          marginTop: 200,
          marginLeft: 60,
          height: 300,
          width: 300,
          opacity: 0.5,
        }}
      />

      <GiftedChat
        messages={messages}
        onSend={(messages) => {
          console.log(messages);
          onSend(messages), getBotResponse(messages);
        }}
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
    backgroundColor: "#F2E3DB",
  },
  logo: {
    height: 25,
    width: 25,
  },
  queryBot: {
    height: 25,
    width: 25,
  },
  buttonContainer: {
    padding: 10,
    backgroundColor: "#03001C",
    flexDirection: "row",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 30,
    padding: 12,
    marginRight: "auto",
    marginStart: "auto",
    height: 50,
    width: 50,
  },
  report: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },

  buttonModal: {
    padding: 5,
    backgroundColor: "#24a0ed",
  },
  buttonReport: {
    padding: 5,
    backgroundColor: "#d11a2a",
  },
  buttonLogout: {
    borderRadius: 30,
    backgroundColor: "#D3D3D3",
  },
  buttonQueryBot: {
    backgroundColor: "#024082",
    borderRadius: 30,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    borderRadius: 10,
    padding: 12,
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default QueryBot;
