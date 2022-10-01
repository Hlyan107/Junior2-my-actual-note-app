import React from "react";
import { View, StyleSheet } from "react-native";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  Feather,
} from "@expo/vector-icons";
import colors from "../constants/colors";

const RoundIconBtn = ({
  name,
  size,
  color,
  style,
  onPress,
  fontawe5name,
  feathername,
}) => {
  if (fontawe5name) {
    return (
      <FontAwesome5
        name={fontawe5name}
        size={size || 24}
        color={color || colors.black}
        style={[styles.icon, { ...style }]}
        onPress={onPress}
      />
    );
  }
  if (feathername) {
    return (
      <Feather
        name={feathername}
        size={size || 24}
        color={color || colors.black}
        style={[styles.icon, { ...style }]}
        onPress={onPress}
      />
    );
  }
  return (
    <MaterialCommunityIcons
      name={name}
      size={size || 24}
      color={color || colors.black}
      style={[styles.icon, { ...style }]}
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    // backgroundColor: colors.white,
    // padding: 10,
    // borderRadius: 50,
    // elevation: 5,
    margin: 5,
  },
});

export default RoundIconBtn;
