import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  FlatList,
  TextInput,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EachNote from "../components/EachNote";
import colors from "../constants/colors";
import RoundIconBtn from "../components/RoundIconBtn";
import { useNotes } from "../provider/NoteProvider";
import { format } from "date-fns";
import AsyncStorage from "@react-native-async-storage/async-storage";

const screen = Dimensions.get("window");

export default function NoteScreen({ navigation }) {
  //<b></b>

  //States below
  const { notes, setNotes, findAndSetNotes } = useNotes();
  const [note, setNote] = useState("");

  useEffect(() => {
    findAndSetNotes();
  }, []);

  //functions below
  const handleOnChangeText = (text) => {
    setNote(text);
  };
  const handleNoteSubmit = async () => {
    //unshift = push
    //shift = pop
    if (note) {
      const newNote = {
        content: note,
        date: format(new Date(), "PPpp"),
        count: 0,
        id: Date.now(),
      };
      // notes.unshift(newNote);
      const updatedNotes = [newNote, ...notes];
      setNotes(updatedNotes);
      await AsyncStorage.setItem("notes", JSON.stringify(updatedNotes));
      setNote("");
    }
  };

  const handleDeleteNoteOnEach = async (note) => {
    const newNotes = notes.filter((n) => n.id !== note.id);
    setNotes(newNotes);
    await AsyncStorage.setItem("notes", JSON.stringify(newNotes));
  };

  const goEdit = (note) => {
    navigation.navigate("EditScreen", { note });
  };
  //in flat list
  const renderItem = ({ item }) => {
    return (
      <EachNote
        note={item}
        handleContentDT={goEdit}
        deleteNote={handleDeleteNoteOnEach}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <RoundIconBtn feathername="menu" size={30} color={colors.white} />
        <TouchableOpacity onPress={() => navigation.navigate("PellEditorTest")}>
          <RoundIconBtn feathername="search" size={30} color={colors.white} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={notes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.flatlist}
      />

      <View style={styles.footer}>
        <TouchableOpacity onPress={goEdit}>
          <RoundIconBtn name="sort-variant" size={25} color={colors.white} />
        </TouchableOpacity>
        <TextInput
          style={styles.textInput}
          multiline
          placeholder="Quick Notes"
          value={note}
          onChangeText={handleOnChangeText}
        />
        <TouchableOpacity onPress={handleNoteSubmit}>
          <RoundIconBtn name="send" size={25} color={colors.white} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginTop: StatusBar.currentHeight,

    flex: 1,
    backgroundColor: colors.gray,
  },
  header: {
    flexDirection: "row",
    backgroundColor: colors.black,
    height: 55,
    justifyContent: "space-between",
    paddingHorizontal: 10,
    alignItems: "center",
    elevation: 3,
    borderBottomWidth: 3,
    borderBottomColor: colors.boldBlue,
  },
  flatlist: {
    flex: 1,
    // marginTop: 200,
  },
  footer: {
    // position: "absolute",
    width: screen.width,
    // bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderTopWidth: 2,
    backgroundColor: colors.black,
    borderTopWidth: 3,
    borderTopColor: colors.boldBlue,
    paddingHorizontal: 10,
  },
  textInput: {
    backgroundColor: colors.gray,
    borderRadius: 5,
    width: screen.width * 0.65,
    minHeight: 25,
    margin: 5,
    maxHeight: 150,
    paddingHorizontal: 15,
    paddingVertical: 5,
    fontSize: 16,
  },
});
