import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  Image,
  Modal,
} from "react-native";

import { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";

import LottieView from "lottie-react-native";

const data = [
  { label: "JoeBot", value: "1" },
  { label: "QueryBot", value: "2" },
  { label: "Both", value: "3" },
];

const Report = () => {
  const [isSelected, setSelection] = useState("");
  const [description, setDescription] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  //add a new field
  const addReport = () => {
    //check if we have new field data
    if (isSelected != "") {
      addDoc(collection(db, "reports"), {
        classification: isSelected,
        description: description,
        botType: value,
      }).then(
        () => setDescription(""),
        setSelection(""),
        setValue(null),
        setModalVisible(!modalVisible)
      );
    }
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Popup has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <LottieView
              source={require("../../lottie/feedback.json")}
              autoPlay
              style={{ height: 100, width: 100 }}
            />
            <Text style={styles.modalText}>Report Sent!</Text>
            <TouchableOpacity
              style={[styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        Help us get better at what we do
      </Text>
      <View style={styles.reportContainer}>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={data}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? "Pick problematic chatbot" : "..."}
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            setValue(item.value);
            setIsFocus(false);
          }}
          renderLeftIcon={() => (
            <Image
              source={require("../../../assets/images/bot.png")}
              style={{ height: 35, width: 35, marginRight: 5 }}
              color={isFocus ? "blue" : "black"}
              name="Safety"
              size={20}
            />
          )}
        />

        <Text style={{ marginTop: 10 }}>Type:</Text>
        <TouchableOpacity onPress={() => setSelection("Off Topic")}>
          <Text
            style={isSelected == "Off Topic" ? styles.active : styles.unactive}
          >
            Off Topic Response
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelection("Misleading")}>
          <Text
            style={isSelected == "Misleading" ? styles.active : styles.unactive}
          >
            Misleading or Deceiving response
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelection("Other")}>
          <Text style={isSelected == "Other" ? styles.active : styles.unactive}>
            Other
          </Text>
        </TouchableOpacity>
        <Text style={{ marginTop: 10 }}>Description:</Text>
        <TextInput
          style={styles.TextInput}
          onChangeText={setDescription}
          value={description}
          placeholder="Explain issue in more details"
          multiline={true}
        ></TextInput>
      </View>

      <TouchableOpacity
        onPress={() => {
          if (isSelected != "" && value != null && description != "") {
            Alert.alert(
              "Report Submission",
              "Are you sure you want to submit your feedback?",
              [
                {
                  text: "Not now",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
                { text: "Yes", onPress: () => addReport() },
              ]
            );
          } else {
            Alert.alert(
              "Opps!",
              "Make sure that all the fields are filled before submitting a report",
              [
                {
                  text: "Close",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
              ]
            );
          }
        }}
        style={styles.buttonFeedback}
      >
        <Text style={styles.buttonFeedbackText}>Send Feedback</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d3d3d3",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonFeedback: {
    color: "white",
    width: "65%",
    borderRadius: 25,
    height: 50,

    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0474ea",
  },
  buttonFeedbackText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  reportContainer: {
    backgroundColor: "white",
    height: 500,
    width: 320,
    margin: 30,
    borderRadius: 20,
    padding: 20,
  },
  TextInput: {
    backgroundColor: "#d3d3d3",
    textAlignVertical: "top",
    height: 180,
    padding: 10,
    marginTop: 10,
    borderRadius: 20,
  },
  active: {
    backgroundColor: "black",
    color: "#d3d3d3",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  unactive: {
    backgroundColor: "#d3d3d3",
    color: "black",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  dropdown: {
    height: 50,
    backgroundColor: "#d3d3d3",
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
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
    height: 50,
    width: 120,
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginRight: 25,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: "white",
  },
  buttonClose: {
    borderRadius: 10,
    padding: 12,
    backgroundColor: "#2196F3",
  },
});

export default Report;
