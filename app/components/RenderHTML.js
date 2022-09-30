import React from "react";
import { useWindowDimensions } from "react-native";
import RenderHtml from "react-native-render-html";

export default function RenderHTML({ value, style, tagsStyles }) {
  const { width } = useWindowDimensions();

  const source = {
    html: value,
  };
  // const tagsStyles = {
  //   b: {
  //     color: "#0281dd",
  //   },
  // };

  return (
    <RenderHtml
      contentWidth={width}
      source={source}
      tagsStyles={tagsStyles}
      baseStyle={style}
    />
  );
}
