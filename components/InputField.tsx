import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
  StyleProp,
  TextStyle,
  TextInputEndEditingEventData,
} from "react-native";
import { heightPercentageToPixels, Theme } from "../helpers/index";

type Props = {
  text: string;
  onChangeText: any;
  password?: boolean;
  width?: number;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  onSubmitEditing?: (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => void;
  onEndEditing?: (
    e: NativeSyntheticEvent<TextInputEndEditingEventData>
  ) => void;
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode;
  autoFocus?: boolean;
};

export default function InputField({
  text,
  onChangeText,
  password,
  width,
  placeholder,
  keyboardType,
  onSubmitEditing,
  onEndEditing,
  style,
  children,
  autoFocus,
}: Props) {
  return (
    <View style={[styles.container, { width: width }]}>
      <TextInput
        onChangeText={onChangeText}
        value={text}
        placeholder={placeholder}
        secureTextEntry={password ?? false}
        style={[styles.input, style]}
        placeholderTextColor={Theme.colors.placeholderText}
        keyboardType={keyboardType}
        onSubmitEditing={onSubmitEditing ?? undefined}
        onEndEditing={onEndEditing ?? undefined}
        autoFocus={autoFocus}
      />
      {children && children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: Theme.colors.borderColor,
    borderRadius: Theme.inputFields.borderRadius,
    marginVertical: heightPercentageToPixels(1),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    height: 40,
    paddingLeft: 10,
  },
});
