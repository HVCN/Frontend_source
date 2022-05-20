import React from "react";
import { Text, Pressable, StyleSheet, GestureResponderEvent } from "react-native";

type ButtonProps = {
  onPress: (event: GestureResponderEvent) => void;
  text: string;
  width?: number;
  height?: number;
}

export default function Button(props: ButtonProps) {
  return (
    <Pressable onPress={props.onPress} style={[styles.button, props.height ? { height: props.height, width: props.width } : { width: props.width }]}>
      <Text style={{color: 'white'}}>{props.text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
    borderColor: '#212121',
    backgroundColor: '#212121',
  },
});
