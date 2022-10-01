import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import RoundIconBtn from "./RoundIconBtn";
import colors from "../constants/colors";

export default function SortMenu() {
  return (
    <Menu>
      <MenuTrigger>
        <RoundIconBtn name="sort-variant" size={25} color={colors.white} />
      </MenuTrigger>
      <MenuOptions>
        <MenuOption style={styles.eachOption}>
          <Text>Recently Added First</Text>
        </MenuOption>
        <MenuOption style={styles.eachOption}>
          <Text>Least Count First</Text>
        </MenuOption>
        <MenuOption style={styles.eachOption}>
          <Text>Shortest Content First</Text>
        </MenuOption>
      </MenuOptions>
    </Menu>
  );
}

const styles = StyleSheet.create({
  eachOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 10,
    minHeight: 60,
    borderWidth: StyleSheet.hairlineWidth,
    // borderTopWidth: StyleSheet.hairlineWidth,
  },
});
