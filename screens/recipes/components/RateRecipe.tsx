import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Theme } from "../../../helpers";
import Lang from "../../../language";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

// TODO: Implement this functionality
const RateRecipe = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text
          style={{
            color: Theme.colors.mainText,
          }}
        >
          {Lang.screens.recipes.rateRecipe}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingTop: 3,
          }}
        >
          <FontAwesomeIcon icon={faStar} color="tomato" />
          <FontAwesomeIcon icon={faStar} color="tomato" />
          <FontAwesomeIcon icon={faStar} color="tomato" />
          <FontAwesomeIcon icon={faStar} color="tomato" />
          <FontAwesomeIcon icon={faStar} color="white" />
        </View>
      </View>
    </View>
  );
};

export default RateRecipe;

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: "center",
    marginBottom: "5%",
  },
  container: {
    alignSelf: "center",
  },
});
