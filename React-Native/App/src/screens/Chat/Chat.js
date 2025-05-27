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

const Chat = () => {
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
        text: "Hello I'm JoeBot! You can tell me how you feel or ask any questions concerning mental health and I'll try to help you!",
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
      url: "http://192.168.100.46:3000/getJoebotResponse",
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
        testID="helpModal"
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
              Joebot is here to help you with any information you want to get on
              mental health disease. You can ask him about the symptoms of any
              mental illnesses and he should be able to help you understand more
              about it. For the any uni-related queries you should click on the
              top left button to seek help from QueryBot!
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
          onPress={() => navigation.navigate("QueryBot")}
        >
          <Image
            style={styles.queryBot}
            source={require("../../../assets/images/querybot3d.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          testID="helpBtn"
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
          testID="signOut"
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
        source={require("../../../assets/images/joebot.png")}
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
        testID="sendMessage"
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
    backgroundColor: "#024082",
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
    backgroundColor: "#E86A33",
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

export default Chat;
