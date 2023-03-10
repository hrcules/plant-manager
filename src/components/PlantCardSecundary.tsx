import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  Animated,
} from "react-native";
import { SvgFromUri } from "react-native-svg";
import {
  GestureHandlerRootView,
  RectButton,
  RectButtonProps,
} from "react-native-gesture-handler";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { Feather } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";

interface PlantProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
    hour: string;
  };
  handleRemove: () => void;
}

export const PlantCardSecundary = ({
  data,
  handleRemove,
  ...rest
}: PlantProps) => {
  return (
    <GestureHandlerRootView>
      <Swipeable
        overshootRight={false}
        renderRightActions={() => (
          <Animated.View>
            <View>
              <RectButton style={styles.buttonRemove} onPress={handleRemove}>
                <Feather name="trash" size={28} color={colors.white} />
              </RectButton>
            </View>
          </Animated.View>
        )}
      >
        <RectButton style={styles.container} {...rest}>
          <SvgFromUri uri={data.photo} width={50} height={50} />
          <Text style={styles.title}>{data.name}</Text>
          <View style={styles.details}>
            <Text style={styles.timeLabel}>Regar às</Text>
            <Text style={styles.time}>{data.hour}</Text>
          </View>
        </RectButton>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 25,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.shape,
    marginVertical: 5,
  },
  title: {
    flex: 1,
    marginLeft: 10,
    fontFamily: fonts.heading,
    color: colors.heading,
    fontSize: 17,
  },
  details: {
    alignItems: "flex-end",
    marginRight: 15,
  },
  timeLabel: {
    fontSize: 16,
    fontFamily: fonts.text,
    color: colors.body_light,
  },
  time: {
    marginTop: 5,
    fontSize: 16,
    fontFamily: fonts.heading,
    color: colors.body_dark,
  },
  buttonRemove: {
    width: 110,
    height: 100,
    backgroundColor: colors.red,
    marginVertical: 5,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    right: 20,
    paddingLeft: 15,
  },
});
