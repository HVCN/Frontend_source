import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet, TextInput } from "react-native";
import {
  widthPercentageToPixels,
  heightPercentageToPixels,
  Theme,
} from "../../../helpers/index";
import { ProfileButton } from "./ProfileButton";
import {
  Auth,
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../RootStackParams";
import Lang from "../../../language";

type CardProps = {
  setSettings: any;
};

type mainScreenProp = NativeStackNavigationProp<RootStackParamList, "Profile">;

export const ChangePassword = ({ setSettings }: CardProps) => {
  const navigation = useNavigation<mainScreenProp>();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validPasswords, setValidPasswords] = useState(false);

  const auth: Auth = getAuth();
  const user = auth.currentUser;

  const changePassword = () => {
    user &&
      updatePassword(user, newPassword)
        .then(() => {
          setSettings("");
        })
        .catch((error) => {
          let errorCode = error.code;
          if (errorCode == "auth/requires-recent-login") {
            alert(Lang.general.oops);
          } else if (errorCode == "auth/weak-password") {
            alert(Lang.screens.signUp.weakPassword);
          } else {
            alert(Lang.general.oops);
          }
        });
  };

  const credential =
    user?.email && EmailAuthProvider.credential(user?.email, oldPassword);

  const reAuth = () => {
    user &&
      credential &&
      reauthenticateWithCredential(user, credential)
        .then(() => {
          changePassword();
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

  useEffect(() => {
    if (confirmPassword === newPassword) {
      setValidPasswords(true);
    } else {
      setValidPasswords(false);
    }
  }, [confirmPassword, newPassword]);

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
          {Lang.screens.profile.changePassword}
        </Text>
        <View style={styles.inputFields}>
          <TextInput
            value={oldPassword}
            onChangeText={setOldPassword}
            placeholder={Lang.screens.profile.oldPassword}
            secureTextEntry={true}
            placeholderTextColor={Theme.colors.mainText}
            style={styles.textInput}
            keyboardType={"default"}
          />
        </View>
        <View style={styles.inputFields}>
          <TextInput
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder={Lang.screens.profile.newPassword}
            secureTextEntry={true}
            placeholderTextColor={Theme.colors.mainText}
            style={styles.textInput}
            keyboardType={"default"}
          />
        </View>
        <View style={styles.inputFields}>
          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder={Lang.screens.profile.confirmPassword}
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
          disabled={newPassword.length > 5 && validPasswords ? false : true}
          value={Lang.screens.profile.changePassword}
          backgroundColor={Theme.colors.darkAccent}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {},
  container: {
    // flexGrow: 1,
  },
  middleContainer: {
    // backgroundColor: Theme.colors.background,
    alignItems: "center",
    // justifyContent: "center",
  },
  timesIcon: {
    // backgroundColor: Theme.colors.mainColor,
    color: Theme.colors.mainText,
  },
  textInput: {
    color: Theme.colors.mainText,
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
  biggerTextFont: {
    fontSize: 30,
    color: Theme.colors.mainText,
  },
});
