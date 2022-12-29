import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { propsStack } from "../routes/models";

import { Feather } from "@expo/vector-icons";

import WateringImg from "../assets/watering.png";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

export function Welcome() {
  const navigation = useNavigation<propsStack>();

  function handleStart() {
    navigation.navigate("UserIdentification");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Gerencie {"\n"} suas plantas de {"\n"} forma fácil
      </Text>

      <Image style={styles.image} source={WateringImg} resizeMode="contain" />

      <Text style={styles.subTitle}>
        Não esqueça mais de regar suas {"\n"}plantas. Nós cuidamos de lembrar
        você{"\n"}
        sempre que precisar.
      </Text>

      <TouchableOpacity
        onPress={handleStart}
        activeOpacity={0.7}
        style={styles.button}
      >
        <Feather name="chevron-right" style={styles.buttonIcon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  title: {
    fontSize: 32,
    fontFamily: fonts.heading,
    textAlign: "center",
    color: colors.heading,
    marginTop: 25,
  },

  subTitle: {
    textAlign: "center",
    fontFamily: fonts.text,
    fontSize: 18,
    paddingHorizontal: 20,
    color: colors.heading,
  },
  button: {
    backgroundColor: colors.green,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    marginBottom: 10,
    height: 56,
    width: 56,
  },
  image: {
    height: Dimensions.get("window").width * 0.7,
  },
  buttonIcon: {
    fontSize: 32,
    color: colors.white,
  },
});
