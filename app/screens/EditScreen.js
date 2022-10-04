import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import colors from "../constants/colors";
import {
  actions,
  RichEditor,
  RichToolbar,
} from "react-native-pell-rich-editor";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNotes } from "../provider/NoteProvider";
import { format } from "date-fns";

const screen = Dimensions.get("window");

export default function EditScreen({ navigation, route }) {
  const richText = useRef();
  const [placeholder, setPlaceholder] = useState("Edit like a pro");
  const noteFromRoute = route.params.note;
  const { notes, setNotes, findAndSetNotes } = useNotes();

  const [editNote, setEditNote] = useState(noteFromRoute);
  const [editNoteContent, setEditNoteContent] = useState(noteFromRoute.content);

  useEffect(() => {
    findAndSetNotes();
  }, []);

  //functions
  const richTextHandle = (content) => {
    setEditNoteContent(content);
  };

  const handleEditSave = async () => {
    if (editNoteContent) {
      const updatedNotes = notes.map((note) => {
        if (note.id === editNote.id) {
          note.content = editNoteContent;
          note.updatedDate = format(new Date(), "MMM d, yyyy. h:mm aaa");
        }
        return note;
      });
      setNotes(updatedNotes);
      await AsyncStorage.setItem("notes", JSON.stringify(updatedNotes));
      // console.log("submitted", updatedNotes);
      setEditNoteContent("");
      navigation.goBack();
    } else {
      setPlaceholder("Let there be some text, please.");
    }
  };

  return (
    <SafeAreaView style={{ marginTop: StatusBar.currentHeight, flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.textButtonStyle}>EditScreen</Text>
      </View>

      <RichEditor
        ref={richText}
        initialContentHTML={editNoteContent}
        onChange={richTextHandle}
        placeholder={placeholder}
        androidHardwareAccelerationDisabled={true}
        style={styles.richTextEditorStyle}
        initialHeight={250}
      />

      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
            setEditNote("");
          }}
        >
          <Text style={styles.textButtonStyle}>Cancel</Text>
        </TouchableOpacity>
        <RichToolbar
          editor={richText}
          selectedIconTint={colors.boldBlue}
          iconTint={colors.white}
          actions={[actions.setBold]}
          style={styles.richTextToolbarStyle}
        />
        <TouchableOpacity
          style={styles.saveButtonStyle}
          onPress={handleEditSave}
        >
          <Text style={styles.textButtonStyle}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  richTextEditorStyle: {
    flex: 1,
    borderWidth: 10,
  },
  richTextToolbarStyle: {
    backgroundColor: colors.black,
    borderColor: colors.boldBlue,
    fontWeight: "bold",
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 15,
    height: 40,
  },
  footer: {
    // position: "absolute",
    width: screen.width,
    // bottom: 0,
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderTopWidth: 2,
    backgroundColor: colors.black,
    borderTopWidth: 3,
    borderTopColor: colors.boldBlue,
    paddingHorizontal: 10,
  },
  saveButtonStyle: {
    backgroundColor: colors.boldBlue,
    borderWidth: 1,
    // borderColor: colors.b,
    borderRadius: 10,
    padding: 5,
    height: 45,
    width: "45%",
    alignItems: "center",
    justifyContent: "center",

    elevation: 4,
  },

  textButtonStyle: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.white,
  },
});
