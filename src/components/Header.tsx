import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, Platform } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import UserImg from "../assets/Perfil.png";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface headerProps {
  salutation: string;
  title?: string;
}

export function Header({ salutation, title }: headerProps) {
  const [userName, setUserName] = useState<string>();

  useEffect(() => {
    async function loadStorageUserName() {
      const user = await AsyncStorage.getItem("@plantmanager:user");

      setUserName(user || " ");
    }

    loadStorageUserName();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}> {salutation},</Text>
        <Text style={styles.userName}>{!title ? userName : title}</Text>
      </View>

      <Image style={styles.image} source={UserImg} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 35,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 40,
  },
  greeting: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.text,
  },
  userName: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 40,
    marginLeft: 10,
  },
});
