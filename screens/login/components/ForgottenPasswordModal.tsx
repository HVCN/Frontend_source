import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
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
import Lang from "../../../language";

type ButtonProps = {
  setModalVisible: any;
  modalVisible: any;
};

export const ForgottenPasswordModal = ({
  setModalVisible,
  modalVisible,
}: ButtonProps) => {
  const auth = getAuth();
  const [resetEmail, setResetEmail] = useState<string>("");

  const forgottenPassword = () => {
    sendPasswordResetEmail(auth, resetEmail)
      .then(() => {
        alert(Lang.screens.login.resetMailAlert);
        setModalVisible(false);
      })
      .catch((error) => {
        let errorCode = error.code;
        if (errorCode == "auth/user-not-found") {
          alert(Lang.screens.login.wrongEmail);
        } else {
          alert("Error");
        }
      });
  };

  return (
    <View style={styles.modalContainer}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalView}>
          <View style={styles.iconView}>
            <Pressable onPress={() => setModalVisible(false)}>
              <FontAwesomeIcon
                icon={faTimes}
                size={40}
                style={styles.timesIcon}
              />
            </Pressable>
          </View>
          <View style={styles.middleView}>
            <Text style={styles.inputFieldTitle}>{Lang.general.email}</Text>
            <View style={styles.inputFields1}>
              <TextInput
                value={resetEmail}
                onChangeText={setResetEmail}
                placeholder=">_"
                placeholderTextColor={Theme.colors.mainText}
                style={styles.textInput}
                keyboardType={"email-address"}
                onSubmitEditing={() => forgottenPassword()}
              />
            </View>
            <Pressable
              onPress={() => forgottenPassword()}
              style={styles.resetPasswordButton}
            >
              <Text style={{ color: Theme.colors.mainContrast }}>
                {Lang.screens.login.sendResetMail}
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        onPress={() => setModalVisible(true)}
        style={styles.forgottenPasswordButton}
      >
        <Text style={{ color: Theme.colors.mainContrast, fontSize: 20 }}>
          {Lang.screens.login.forgottenPassword}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
    marginTop: "50%",
    margin: 20,
    backgroundColor: Theme.colors.darkAccent,
    borderRadius: 10,
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
    color: "white",
  },
  iconView: {
    alignItems: "flex-end",
    padding: 5,
  },
  middleView: {
    alignItems: "center",
    alignSelf: "center",
    paddingTop: 5,
    padding: 30,
  },
  inputFields1: {
    backgroundColor: Theme.colors.background,
    width: widthPercentageToPixels(60),
    height: heightPercentageToPixels(7),
    borderRadius: Theme.inputFields.borderRadius,
    marginVertical: heightPercentageToPixels(1),
    paddingLeft: 10,
    justifyContent: "center",
  },
  textInput: {
    fontSize: widthPercentageToPixels(4),
    color: "white",
  },
  inputFieldTitle: {
    color: Theme.colors.mainText,
    alignSelf: "flex-start",
  },
  resetPasswordButton: {
    width: widthPercentageToPixels(50),
    borderRadius: Theme.buttons.borderRadius,
    borderColor: Theme.colors.mainText,
    marginVertical: heightPercentageToPixels(2),
    height: heightPercentageToPixels(5),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Theme.colors.background,
  },
  forgottenPasswordButton: {
    borderRadius: 10,
    padding: 5,
    marginTop: 5,
  },
});
