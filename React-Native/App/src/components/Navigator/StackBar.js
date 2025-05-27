import * as React from "react";
import { TouchableOpacity, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LogInScreen from "../../screens/LogInScreen/LogInScreen";
import SignUpScreen from "../../screens/SignUpScreen/SignUpScreen";
import Chat from "../../screens/Chat/Chat";
import Help from "../../screens/Help/Help";

import QueryBot from "../../screens/QueryBot/QueryBot";
import Report from "../../screens/Report/Report";

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="Register"
      screenOptions={{
        headerLeft: null,
        headerStyle: {
          height: 30,
          backgroundColor: "#706C6B",
        },
        headerBackTitleVisible: false,
        headerTitleStyle: {
          color: "white",
          fontSize: 28,
          fontWeight: "bold",
          alignItems: "center",
          fontFamily: "Roboto",
        },
        headerTitleAlign: "center",
        safeAreaInsets: "top",
      }}
    >
      <Stack.Screen
        options={{
          gestureEnabled: false,
          headerShown: true,
          headerLeft: () => <></>,
        }}
        name="Log In"
        component={LogInScreen}
      />
      <Stack.Screen
        options={{
          gestureEnabled: false,
          headerShown: true,
          headerLeft: () => <></>,
        }}
        name="Register"
        component={SignUpScreen}
      />
      <Stack.Screen name="Report" component={Report} />
      <Stack.Screen
        options={{
          gestureEnabled: false,
          headerShown: true,
          headerLeft: () => <></>,
          headerStyle: {
            backgroundColor: "#0B2447",
          },
        }}
        name="JoeBot"
        component={Chat}
      />
      <Stack.Screen
        options={{
          gestureEnabled: false,
          headerShown: true,
          headerLeft: () => <></>,
          headerStyle: {
            backgroundColor: "#E14D2A",
          },
        }}
        name="QueryBot"
        component={QueryBot}
      />
      <Stack.Screen
        options={{
          gestureEnabled: false,
          headerShown: true,
          headerLeft: () => <></>,
          headerStyle: {
            backgroundColor: "blue",
          },
        }}
        name="Help"
        component={Help}
      />
    </Stack.Navigator>
  );
}

export default function StackNavigation() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
