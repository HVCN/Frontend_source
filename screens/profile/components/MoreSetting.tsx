import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Modal,
  TextInput,
} from "react-native";
import {
  widthPercentageToPixels,
  heightPercentageToPixels,
  Theme,
} from "../../../helpers/index";
import { BottomSheetButton } from "./BottomSheetButton";
import {
  Auth,
  deleteUser,
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
} from "firebase/auth";
import { ProfileButton } from "./ProfileButton";
import Lang from "../../../language";
import { deleteUserCollection } from "../../../api/UserRequests";

type ButtonProps = {
  refRbSheet: any;
  setSettings: any;
};

export const MoreSettings = ({ refRbSheet, setSettings }: ButtonProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [password, setPassword] = useState("");

  const auth: Auth = getAuth();
  const user = auth.currentUser;

  const deleteProfile = async () => {
    user &&
      deleteUser(user)
        .then(async () => await deleteUserCollection(user?.uid))
        .then(() => alert("User " + user?.email + " is deleted successfully"))
        .catch((error) => {
          let errorCode = error.code;
          if (errorCode == "auth/requires-recent-login") {
            console.log("Needs reauth");
          } else {
            alert(Lang.general.oops);
          }
        });
  };

  const credential =
    user?.email && EmailAuthProvider.credential(user?.email, password);

  const reAuth = async () => {
    user &&
      credential &&
      reauthenticateWithCredential(user, credential)
        .then(async () => {
          await deleteProfile();
        })
        .catch((error) => {
          let errorCode = error.code;
          if (errorCode == "auth/wrong-password") {
            alert("Wrong password");
          } else {
            alert(Lang.errors.contactSupport);
          }
        });
  };

  return (
    <View style={styles.mainContainer}>
      <Pressable
        style={styles.timesIcon}
        onPress={() => refRbSheet.current.close()}
        hitSlop={7}
      >
        <FontAwesomeIcon
          icon={faTimes}
          size={40}
          color={Theme.colors.mainText}
        />
      </Pressable>

      <View style={styles.middleContainer}>
        <BottomSheetButton
          onPress={() => setSettings("changeName")}
          disabled={false}
          value={Lang.screens.profile.changeName}
        />
        <BottomSheetButton
          onPress={() => setSettings("changePassword")}
          disabled={false}
          value={Lang.screens.profile.changePassword}
        />
        <BottomSheetButton
          onPress={() => setSettings("changeEmail")}
          disabled={false}
          value={Lang.screens.profile.changeEmail}
        />
        <View style={styles.modalContainer}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.modalView}>
              <Text style={styles.tomatoText}>
                {Lang.screens.profile.sureDelete}
              </Text>
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
                disabled={password.length > 5 ? false : true}
                value={Lang.screens.profile.deleteAccount}
                backgroundColor={Theme.colors.darkAccent}
              />
              <ProfileButton
                onPress={() => setModalVisible(!modalVisible)}
                disabled={false}
                value={Lang.screens.profile.no}
                backgroundColor={Theme.colors.darkAccent}
              />
            </View>
          </Modal>
        </View>

        <BottomSheetButton
          onPress={() => setModalVisible(true)}
          disabled={false}
          value={Lang.screens.profile.deleteAccount}
        />

        <Text style={styles.tomatoText}>{Lang.screens.profile.needHelp}</Text>
        {/* TODO add Linking to email provider */}
        <Pressable onPress={() => alert("'mail client'")}>
          <Text style={styles.textInput}>{Lang.screens.profile.contactUs}</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {},
  middleContainer: {
    alignItems: "center",
  },
  tomatoText: {
    color: Theme.colors.mainContrast,
    alignSelf: "center",
    marginBottom: 5,
  },
  textInput: {
    color: Theme.colors.mainText,
  },
  modalContainer: {
    // justifyContent: "center",
    // alignSelf: "center",
  },
  modalView: {
    marginTop: "45%",
    margin: 20,
    backgroundColor: Theme.colors.background,
    borderRadius: 30,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  timesIcon: {
    color: Theme.colors.mainText,
    right: 10,
    top: 5,
    alignSelf: "flex-end",
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
});
