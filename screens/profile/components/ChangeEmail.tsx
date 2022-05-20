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
import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  updateEmail,
} from "firebase/auth";
import Lang from "../../../language";

type CardProps = {
  setSettings: any;
};

export const ChangeEmail = ({ setSettings }: CardProps) => {
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth: any = getAuth();
  const user = auth.currentUser;

  const changeEmail = () => {
    updateEmail(user, newEmail)
      .then(() => {
        setSettings("");
        user.reload().then(() => console.log("reloaded user"));
      })
      .catch((error) => {
        let errorCode = error.code;
        if (errorCode == "auth/requires-recent-login") {
          console.log("Need reauth");
        } else if (errorCode == "auth/email-already-in-use") {
          alert(Lang.screens.signUp.emailInUse);
        } else if (errorCode == "auth/invalid-email") {
          alert(Lang.screens.signUp.invalidEmail);
        } else {
          alert(Lang.general.oops);
        }
      });
  };

  const credential = EmailAuthProvider.credential(user?.email, password);

  const reAuth = () => {
    reauthenticateWithCredential(user, credential)
      .then(() => {
        changeEmail();
      })
      .catch((error) => {
        let errorCode = error.code;
        if (errorCode == "auth/wrong-password") {
          alert("Wrong password");
        } else {
          alert("Error");
        }
      });
  };

  return (
    <View style={styles.mainContainer}>
      <Pressable onPress={() => setSettings("")}>
        <FontAwesomeIcon
          icon={faAngleLeft}
          size={40}
          style={styles.timesIcon}
        />
      </Pressable>

      <View style={styles.middleContainer}>
        <Text style={styles.biggerTextFont}>
          {Lang.screens.profile.changeEmail}
        </Text>
        <Text style={styles.tempFont1}>
          {Lang.screens.profile.currentEmail}
        </Text>
        <View style={styles.inputFields}>
          <Text style={styles.textInput}>{user?.email}</Text>
        </View>
        <View style={styles.inputFields}>
          <TextInput
            value={newEmail}
            onChangeText={setNewEmail}
            placeholder={Lang.screens.profile.newEmail}
            placeholderTextColor={Theme.colors.mainText}
            style={styles.textInput}
            keyboardType={"email-address"}
          />
        </View>
        <View style={styles.inputFields}>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder={Lang.screens.profile.password}
            secureTextEntry={true}
            placeholderTextColor={Theme.colors.mainText}
            style={styles.textInput}
            keyboardType={"default"}
          />
        </View>
        <ProfileButton
          onPress={() => {
            reAuth();
          }}
          disabled={false}
          value={Lang.screens.profile.changeEmail}
          backgroundColor={Theme.colors.darkAccent}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
    backgroundColor: Theme.colors.background,
  },
  middleContainer: {
    alignItems: "center",
  },
  timesIcon: {
    // backgroundColor: Theme.colors.background,
    color: Theme.colors.text,
  },
  tempFont1: {
    color: Theme.colors.mainContrast,
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
    color: Theme.colors.mainText,
  },
  biggerTextFont: {
    fontSize: 30,
    color: Theme.colors.mainText,
  },
});
