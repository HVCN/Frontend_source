import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, TextInput } from "react-native";
import {
  widthPercentageToPixels,
  heightPercentageToPixels,
  Theme,
} from "../../../helpers/index";
import { ProfileButton } from "./ProfileButton";
import { updateProfile, User } from "firebase/auth";
import Lang from "../../../language";

type CardProps = {
  setSettings: any;
  user: User | null;
};

export const ChangeName = ({ setSettings, user }: CardProps) => {
  const [newName, setNewName] = useState("");

  const changeName = () => {
    user &&
      updateProfile(user, {
        displayName: newName,
      })
        .then(() => {
          setSettings("");
        })
        .catch((error) => {
          alert("Error");
        });
  };

  return (
    <View style={styles.test}>
      <View style={styles.container}>
        <Pressable onPress={() => setSettings("")}>
          <FontAwesomeIcon
            icon={faAngleLeft}
            size={40}
            style={styles.timesIcon}
          />
        </Pressable>
      </View>
      <View style={styles.middleContainer}>
        <Text style={styles.biggerTextFont}>
          {Lang.screens.profile.changeName}
        </Text>
        <Text style={styles.tempFont1}>
          {Lang.screens.profile.currentName}:
        </Text>
        <View style={styles.inputFields}>
          <Text style={styles.textInput}>{user && user.displayName}</Text>
        </View>
        <View style={styles.inputFields}>
          <TextInput
            value={newName}
            onChangeText={setNewName}
            placeholder={Lang.screens.profile.newName}
            placeholderTextColor={Theme.colors.mainText}
            style={styles.textInput}
            keyboardType={"default"}
          />
        </View>
        <ProfileButton
          onPress={changeName}
          disabled={false}
          value={Lang.screens.profile.changeName}
          backgroundColor={Theme.colors.darkAccent}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  test: {
    backgroundColor: Theme.colors.background,
    justifyContent: "center",
  },
  container: {
    backgroundColor: Theme.colors.background,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  bottomSheetContainer: {
    //flex: 1,
    backgroundColor: Theme.colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  timesIcon: {
    backgroundColor: Theme.colors.background,
    color: Theme.colors.text,
  },
  middleContainer: {
    backgroundColor: Theme.colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  biggerTextFont: {
    fontSize: 30,
    color: Theme.colors.mainText,
  },
  tempFont1: {
    color: Theme.colors.background,
    alignSelf: "center",
  },
  inputFields: {
    flexDirection: "row",
    backgroundColor: Theme.colors.darkAccent,
    width: widthPercentageToPixels(60),
    height: heightPercentageToPixels(6.5),
    borderRadius: Theme.inputFields.borderRadius,
    marginVertical: heightPercentageToPixels(1),
    paddingLeft: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  textInput: {
    //flex: 1,
    color: Theme.colors.mainText,
  },
});
