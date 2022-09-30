import { StyleSheet, Text, View } from "react-native";
import React, { useContext, createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NoteContext = createContext();

const dummyNotes = [
  {
    content:
      "hello <b></b>.hello <b>Zar Hlyan</b>.hello <b>Zar Hlyan</b>.hello <b>Zar Hlyan</b>.hello <b>Zar Hlyan</b>.hello <b>Zar Hlyan</b>.hello <b>Zar Hlyan</b>.hello <b>Zar Hlyan</b>.hello <b>Zar Hlyan</b>.hello <b>Zar Hlyan</b>.hello <b>Zar Hlyan</b>.hello <b>Zar Hlyan</b>.",
    date: "Sep 26, 2022",
    count: 4,
    id: "thisisid1",
  },
  {
    content: "George stood silently <b>with his arms folded</b>",
    date: "Sep 25, 2022",
    count: 9,
    id: "thisisid2",
  },
  {
    content: "We sang as we matched <b>to keep our spirits up</b>",
    date: "Sep 26, 2022",
    count: 4,
    id: "thisisid3",
  },
  {
    content: "Can you pass me the bag <b>by</b>  your feet?",
    date: "Sep 26, 2022",
    count: 4,
    id: "thisisid4",
  },
  {
    content: "Outside, a storm was <b>raging</b>",
    date: "Sep 26, 2022",
    count: 4,
    id: "thisisid5",
  },
];

const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState(dummyNotes);

  // const findNotes = async () => {
  //   const result = await AsyncStorage.getItem("notes");
  //   if (result !== null) setNotes(JSON.parse(result));
  // };

  // useEffect(() => {
  //   findNotes();
  // }, []);
  const findAndSetNotes = async () => {
    // await AsyncStorage.setItem("notes", JSON.stringify(dummyNotes));
    const result = await AsyncStorage.getItem("notes");
    if (result !== null) setNotes(JSON.parse(result));

    // console.log("result", result);
  };

  return (
    <NoteContext.Provider value={{ notes, setNotes, findAndSetNotes }}>
      {children}
    </NoteContext.Provider>
  );
};

export const useNotes = () => useContext(NoteContext);

export default NoteProvider;
