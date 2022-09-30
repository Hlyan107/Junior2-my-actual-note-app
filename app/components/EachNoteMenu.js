import { StyleSheet, Text, View, Alert } from "react-native";
import React from "react";

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import RoundIconBtn from "./RoundIconBtn";

const EachNoteMenu = ({ deleteNote, note }) => {
  const displayDeleteAlert = (delNote) => {
    Alert.alert(
      "NO way to get back!",
      "This will delete your note permanently!",
      [
        {
          text: "Cancel",
          onPress: () => console.log("no thanks"),
        },
        {
          text: "Delete",
          onPress: delNote,
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  const lastUpdated = `Last Updated:\n ${note.date}`;

  return (
    <Menu>
      <MenuTrigger>
        <RoundIconBtn name="dots-horizontal" size={24} />
      </MenuTrigger>
      <MenuOptions>
        <MenuOption onSelect={() => alert(`Save`)} style={styles.eachOption}>
          <Text numberOfLines={2}>{lastUpdated}</Text>
        </MenuOption>
        <MenuOption
          onSelect={() => {
            displayDeleteAlert(() => deleteNote(note));
          }}
          style={styles.eachOption}
        >
          <RoundIconBtn name="delete" color="red" />
          <Text style={{ color: "red" }}>Delete</Text>
        </MenuOption>
        <MenuOption
          onSelect={() => {
            displayDeleteAlert(() => deleteNote(notse));
          }}
          style={styles.eachOption}
        >
          <RoundIconBtn feathername="edit-3" />
          <Text>Edit</Text>
        </MenuOption>
      </MenuOptions>
    </Menu>
  );
};

export default EachNoteMenu;

const styles = StyleSheet.create({
  eachOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});

//example link
//https://github.com/instea/react-native-popup-menu
