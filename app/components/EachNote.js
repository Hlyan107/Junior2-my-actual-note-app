import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import DoubleClick from "react-native-double-tap";
import colors from "../constants/colors";
import RenderHTML from "./RenderHTML";
import RoundIconBtn from "./RoundIconBtn";

const screen = Dimensions.get("window");

const tagsStyles = {
  b: {
    color: "#0281dd",
  },
};
//below is why I've done with tagsStyles
//https://stackoverflow.com/questions/68966120/react-native-render-html-you-seem-to-update-the-x-prop-of-the-y-component-in-s

export default function EachNote({
  navigation,
  note,
  handleContentDT,
  handleCountDT,
}) {
  return (
    <View style={styles.container}>
      <DoubleClick
        doubleTap={() => {
          console.log("tapped twice", note);
          handleContentDT(note);
          //above is the key to send data
        }}
        delay={500}
      >
        <View style={[styles.doubleTap, styles.contentWrapper]}>
          <RenderHTML
            value={note.content}
            style={styles.renderHTML}
            tagsStyles={tagsStyles}
          />
        </View>
      </DoubleClick>
      <View style={styles.hairSeperator} />
      <DoubleClick doubleTap={() => handleCountDT} delay={500}>
        <View style={[styles.doubleTap, styles.buttonWrapper]}>
          <RoundIconBtn
            feathername="check-circle"
            size={20}
            color={colors.black}
          />
          <Text style={styles.textTap}>{note.count}</Text>
        </View>
      </DoubleClick>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: screen.width * 0.95,
    // margin: screen.width * 0.025,
    marginHorizontal: screen.width * 0.025,
    marginVertical: 10,
    elevation: 5,
  },
  doubleTap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  contentWrapper: {
    minHeight: 60,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,

    elevation: 2,
  },
  renderHTML: {
    fontSize: 16,
    // backgroundColor: "cyan",
    padding: 10,
    width: screen.width * 0.93,
  },
  hairSeperator: {
    height: StyleSheet.hairlineWidth,
    marginHorizontal: 20,
  },
  buttonWrapper: {
    minHeight: 40,
    flexDirection: "row",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,

    borderLeftWidth: StyleSheet.hairlineWidth,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    elevation: 2,
    // backgroundColor: colors.notefooterBlue,
  },
  textTap: {
    marginLeft: 5,
    color: colors.black,
  },
});
