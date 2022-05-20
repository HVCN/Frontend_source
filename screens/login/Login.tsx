import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import {
  heightPercentageToPixels,
  Theme,
  widthPercentageToPixels,
} from "../../helpers";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { LoginButton } from "./components/LoginButton";
import { SignUpButton } from "./components/SignUpButton";
import Lang from "../../language";
import { ForgottenPasswordModal } from "./components/ForgottenPasswordModal";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { StatusBar } from "expo-status-bar";
import ScreenNames from "../ScreenNames";
import { LoadingSpinner } from "../../components";
import { BlurView } from "expo-blur";

const auth = getAuth();

export default function Login({ navigation }: any) {
  const [email, setEmail] = useState<string>("");

  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const passwordRef = useRef<any>();

  const loginNow = async () => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password).catch((error) => {
      let errorCode = error.code;

      if (
        errorCode == "auth/wrong-password" ||
        errorCode == "auth/user-not-found"
      ) {
        alert(Lang.screens.login.wrongCredentials);
      } else if (errorCode == "auth/invalid-email") {
        alert(Lang.screens.signUp.invalidEmail);
      } else {
        alert(Lang.general.oops);
      }
    });

    setIsLoading(false);
  };

  return (
    <View
      style={{
        backgroundColor: Theme.colors.mainColor,
        justifyContent: "center",
        flex: 1,
      }}
    >
      {isLoading && (
        <BlurView
          intensity={100}
          tint={"dark"}
          style={{
            position: "absolute",
            justifyContent: "center",
            zIndex: 2,
            width: "100%",
            height: "100%",
          }}
        >
          <LoadingSpinner
            size={widthPercentageToPixels(30)}
            animating={isLoading}
            color={"white"}
          />
        </BlurView>
      )}

      <StatusBar style="light" />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.awareView}
        scrollEnabled={false}
      >
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/images/logo_fo.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <View style={styles.loginForm}>
          <View>
            <Text style={styles.inputFieldTitle}>{Lang.general.email}</Text>
            <View
              style={[
                styles.inputFields,
                { marginBottom: heightPercentageToPixels(2) },
              ]}
            >
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder=">_"
                placeholderTextColor={Theme.colors.mainText}
                style={styles.textInput}
                keyboardType={"email-address"}
                onSubmitEditing={() => passwordRef.current.focus()}
                blurOnSubmit={false}
              />
            </View>
          </View>
          <View>
            <Text style={styles.inputFieldTitle}>{Lang.general.password}</Text>
            <View
              style={[
                styles.inputFields,
                { flexDirection: "row", justifyContent: "space-between" },
              ]}
            >
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder=">_"
                placeholderTextColor={Theme.colors.mainText}
                style={styles.textInput}
                secureTextEntry={!showPassword}
                onSubmitEditing={() => loginNow()}
                ref={passwordRef}
              />
              <Pressable
                style={{ alignSelf: "center", padding: 10 }}
                onPress={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  size={20}
                  color="gray"
                />
              </Pressable>
            </View>
          </View>
          <LoginButton onPress={loginNow} />
          <SignUpButton
            onPress={() => navigation.navigate(ScreenNames.SignUp)}
          />
          <ForgottenPasswordModal
            setModalVisible={setModalVisible}
            modalVisible={modalVisible}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1.5,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: "5%",
  },
  image: { borderColor: "white" },
  loginForm: {
    flex: 1,
    alignSelf: "center",
    alignItems: "center",
  },
  awareView: {
    width: widthPercentageToPixels(100),
    flexGrow: 1,
  },
  inputFields: {
    backgroundColor: Theme.colors.background,
    width: widthPercentageToPixels(60),
    height: heightPercentageToPixels(6.5),
    borderRadius: 5,
    marginVertical: 5,
    paddingLeft: 10,
  },
  textInput: {
    fontSize: widthPercentageToPixels(4),
    color: Theme.colors.mainText,
    flexGrow: 1,
  },
  inputFieldTitle: {
    color: Theme.colors.mainText,
  },
});
