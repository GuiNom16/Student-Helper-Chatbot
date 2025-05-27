import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import LottieView from "lottie-react-native";

const LogInScreen = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("The user is ", user.email);
        navigation.navigate("JoeBot");
      }
    });

    return unsuscribe;
  }, []);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in user: ", user.email);
        navigation.navigate("JoeBot");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <LottieView
        source={require("../../lottie/login.json")}
        autoPlay
        style={{ height: 400, width: 400 }}
      />
      {/* <Image
        style={styles.img}
        source={require("../../../assets/images/logo.jpg")}
      /> */}
      <View style={styles.inputView}>
        <TextInput
          testID="emailInput"
          style={styles.TextInput}
          value={email}
          placeholder="Enter your email"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          testID="passwordInput"
          style={styles.TextInput}
          value={password}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          autoCapitalize="none"
        />
      </View>
      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        testID="loginBtn"
        style={styles.loginBtn}
        onPress={handleLogin}
      >
        <Text style={styles.registerBtn}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Register");
        }}
      >
        <Text style={styles.alreadyAcc}>
          Don't have an account? Register here
        </Text>
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
    width: 250,
    height: 250,
  },
  image: {
    marginBottom: 40,
  },
  inputView: {
    backgroundColor: "white",
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
    marginBottom: 20,
    color: "white",
    opacity: 0.9,
    textDecorationLine: "underline",
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
    backgroundColor: "#0474ea",
  },
});

export default LogInScreen;
