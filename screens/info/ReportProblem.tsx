import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Theme } from "../../helpers";

export const ReportProblem = () => {
  return (
    <View style={styles.container}>
      <Text style={{ color: "white" }}>ReportProblem</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.background,
    flex: 1,
  },
});
