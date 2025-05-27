import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";

const SignInScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password1, setPassword] = useState("");
  const [password2, verifyPassword] = useState("");

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("The user is ", user.email);
        navigation.navigate("JoeBot");
      }
    });

    return unsuscribe;
  }, []);

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password2)
      .then((userCreadentials) => {
        const user = userCreadentials.user;
        navigation.navigate("JoeBot");
        console.log(user.email);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <LottieView
        source={require("../../lottie/signup.json")}
        autoPlay
        style={{ height: 300, width: 300 }}
      />
      {/* <Image
        style={styles.img}
        source={require("../../../assets/images/logo.jpg")}
      /> */}
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          value={email}
          placeholder="Enter an existing email"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Confirm password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(text) => verifyPassword(text)}
          autoCapitalize="none"
        />
      </View>

      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => {
          password1 === password2
            ? handleSignUp()
            : alert("password dont match");
        }}
      >
        <Text style={styles.registerBtn}>REGISTER</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Log In");
        }}
      >
        <Text style={styles.alreadyAcc}>Already have an account?</Text>
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
  img: {
    width: 230,
    height: 230,
  },
  image: {
    marginBottom: 40,
  },
  inputView: {
    backgroundColor: "#ffffff",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "flex-start",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  alreadyAcc: {
    marginTop: 15,
    color: "blue",
    textDecorationLine: "underline",
  },
  registerBtn: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  loginBtn: {
    color: "white",
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#0474ea",
  },
});

export default SignInScreen;
