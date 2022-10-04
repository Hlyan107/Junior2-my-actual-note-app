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
import { useNotes } from "./NoteProvider";
import {
  sortRecentDateFirst,
  sortLeastCountFirst,
  sortShortestContentFirst,
} from "./sortNotesFuncs";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SortMenu() {
  const { notes, setNotes, findAndSetNotes } = useNotes();

  const chiefSortFunc = async (helperfunc, data) => {
    let sortedData = helperfunc(data);
    console.log(sortedData);
    setNotes(sortedData);
    await AsyncStorage.setItem("notes", JSON.stringify(sortedData));
    findAndSetNotes();
  };

  return (
    <Menu>
      <MenuTrigger>
        <RoundIconBtn name="sort-variant" size={25} color={colors.white} />
      </MenuTrigger>
      <MenuOptions>
        <MenuOption
          style={styles.eachOption}
          onSelect={() => chiefSortFunc(sortRecentDateFirst, notes)}
        >
          <Text>Recently Added First</Text>
        </MenuOption>
        <MenuOption
          style={styles.eachOption}
          onSelect={() => chiefSortFunc(sortLeastCountFirst, notes)}
        >
          <Text>Least Count First</Text>
        </MenuOption>
        <MenuOption
          style={styles.eachOption}
          onSelect={() => chiefSortFunc(sortShortestContentFirst, notes)}
        >
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
