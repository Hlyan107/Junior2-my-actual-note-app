import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import NoteScreen from "./app/screens/NoteScreen";
import PellEditorTest from "./app/screens/PellEditorTest";
import EditScreen from "./app/screens/EditScreen";
import NoteProvider from "./app/provider/NoteProvider";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <NoteProvider>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen component={NoteScreen} name="NoteScreens" />
          <Stack.Screen component={EditScreen} name="EditScreen" />
          <Stack.Screen component={PellEditorTest} name="PellEditorTest" />
        </Stack.Navigator>
      </NoteProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
