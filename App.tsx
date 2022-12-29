import React, { useEffect } from "react";
import AppLoading from "expo-app-loading";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Routes from "./src/routes";

import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold,
} from "@expo-google-fonts/jost";

export default function App() {
  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold,
  });

  async function userName() {
    const user = await AsyncStorage.setItem("@plantmanager:user", " ");
    console.log(user);
  }

  userName();

  if (!fontsLoaded) return <AppLoading />;

  return <Routes />;
}
