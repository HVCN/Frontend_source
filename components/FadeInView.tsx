import { Animated, ViewStyle } from "react-native";
import React, { ReactChild, ReactChildren, useEffect, useRef } from "react";

type FadeViewProps = {
  style?: Animated.AnimatedProps<ViewStyle>;
  children: ReactChild | ReactChildren;
};

const FADE_INITIAL_VALUE = 0.3;
const FADE_FINAL_VALUE = 1;
const FADE_DURATION = 400;

export const FadeInView = ({ style, children }: FadeViewProps) => {
  const fadeAnim = useRef(new Animated.Value(FADE_INITIAL_VALUE)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: FADE_FINAL_VALUE,
      duration: FADE_DURATION,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View
      style={{
        ...style,
        opacity: fadeAnim,
      }}
    >
      {children}
    </Animated.View>
  );
};
