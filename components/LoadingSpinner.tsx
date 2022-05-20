import {
  StyleSheet,
  ActivityIndicator,
  ActivityIndicatorProps,
} from "react-native";
import React from "react";

// size: "small"/"large" -- android: number
// defaults to "small"
export const LoadingSpinner = ({
  animating,
  size,
  color,
  style,
}: ActivityIndicatorProps) => {
  return (
    <ActivityIndicator
      animating={animating}
      size={size}
      color={color}
      style={style}
    />
  );
};

const styles = StyleSheet.create({});
