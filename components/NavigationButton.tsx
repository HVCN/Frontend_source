import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  GestureResponderEvent,
  Image,
} from "react-native";
import { Theme } from "../helpers";

type ButtonProps = {
  onPress: any;
  text: string;
  width?: number;
  height?: number;
  image: any;
};

export default function NavigationButton(props: ButtonProps) {
  let path = props.image;
  return (
    <Pressable onPress={props.onPress} style={styles.button}>
      <Image
        source={path}
        style={{ width: "7.5%", marginHorizontal: 15 }}
        resizeMode="contain"
      />
      <Text style={{ color: "white", fontSize: 17 }}>{props.text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    height: "10%",
    width: "100%",
    alignItems: "center",
    // backgroundColor: '#212121',
    backgroundColor: Theme.colors.mainLight,
    marginVertical: 15, //Mellomrom mellom knappene i Main
    flexDirection: "row",
  },
});
