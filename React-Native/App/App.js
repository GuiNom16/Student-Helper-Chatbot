import React from "react";

import { SafeAreaProvider } from "react-native-safe-area-context";

import StackNavigation from "./src/components/Navigator/StackBar";

const MyApp = () => {
  return (
    <SafeAreaProvider>
      <StackNavigation />
    </SafeAreaProvider>
  );
};

export default MyApp;
