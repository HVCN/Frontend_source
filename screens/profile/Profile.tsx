import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  heightPercentageToPixels,
  widthPercentageToPixels,
  Theme,
} from "../../helpers";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUserCog, faCheck } from "@fortawesome/free-solid-svg-icons";
import { BottomSheetButton } from "./components/BottomSheetButton";
import RBSheet from "react-native-raw-bottom-sheet";
import { Auth, getAuth, sendEmailVerification } from "firebase/auth";
import { MoreSettings } from "./components/MoreSetting";
import { ChangeName } from "./components/ChangeName";
import { ChangePassword } from "./components/ChangePassword";
import { ChangeEmail } from "./components/ChangeEmail";
import Lang from "../../language";

export const Profile = () => {
  const [verifiedEmail, setVerifiedEmail] = useState(false);
  const [settings, setSettings] = useState<string>("");
  const refRBSheet = useRef<RBSheet>(null);

  let auth: Auth = getAuth();

  let initials = auth.currentUser?.displayName
    ?.split(/ |-/)
    .map((word: string) => {
      return word[0];
    });

  const verifyEmail = () => {
    auth.currentUser &&
      sendEmailVerification(auth.currentUser)
        .then(() => {
          alert(Lang.screens.profile.emailVerification);
        })
        .catch((error) => {
          alert("Error");
        });
  };

  function usePrevious<T>(settings: T): T {
    const ref: any = useRef<T>();

    useEffect(() => {
      ref.current = settings;
    }, [settings]);
    return ref.current;
  }

  const prevSetting: string = usePrevious(settings);

  return (
    <>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.awareView}
        scrollEnabled={false}
        // enableOnAndroid={true}
        // enableAutomaticScroll={true}
        // extraScrollHeight={heightPercentageToDP(5)}
      >
        <View style={styles.signupForm}>
          <View style={styles.circle}>
            <Text style={styles.circleText} adjustsFontSizeToFit>
              {initials}
            </Text>
          </View>
          <FontAwesomeIcon icon={faUserCog} style={styles.icon} size={40} />
          <View>
            <Text style={styles.tempFont}>{Lang.general.name}</Text>
            <View style={styles.inputFields}>
              <Text style={styles.textInput}>
                {auth.currentUser?.displayName}
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.tempFont}>{Lang.general.email}</Text>
            <View style={styles.inputFields}>
              <Text style={styles.textInput}>{auth.currentUser?.email}</Text>
              {auth.currentUser?.emailVerified && (
                <FontAwesomeIcon
                  icon={faCheck}
                  style={styles.checkIcon}
                  size={20}
                />
              )}
            </View>
          </View>

          {!auth.currentUser?.emailVerified && (
            <BottomSheetButton
              onPress={() => verifyEmail()}
              disabled={false}
              value={Lang.screens.profile.verification}
            />
          )}

          <BottomSheetButton
            onPress={() => refRBSheet.current && refRBSheet.current.open()}
            disabled={false}
            value={Lang.screens.profile.moreSettings}
          />

          <RBSheet
            ref={refRBSheet}
            closeOnDragDown={false}
            closeOnPressMask={true}
            onClose={() => setSettings("")}
            height={heightPercentageToPixels(60)}
            customStyles={{
              container: {
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
                backgroundColor: Theme.colors.background,
              },
            }}
          >
            <View style={styles.mainRBContainer}>
              {(() => {
                switch (settings) {
                  case "changeName":
                    return (
                      <ChangeName
                        setSettings={setSettings}
                        user={auth.currentUser}
                      />
                    );
                  case "changeEmail":
                    return <ChangeEmail setSettings={setSettings} />;
                  case "changePassword":
                    return <ChangePassword setSettings={setSettings} />;
                  default:
                    return (
                      <MoreSettings
                        refRbSheet={refRBSheet}
                        setSettings={setSettings}
                      />
                    );
                }
              })()}
            </View>
          </RBSheet>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  signupForm: {
    flexGrow: 1,
    padding: widthPercentageToPixels(5),
    alignItems: "center",
    // alignSelf: "center",
    width: "100%",
    color: Theme.colors.mainText,
    backgroundColor: Theme.colors.background,
  },
  awareView: {
    backgroundColor: Theme.colors.background,
    // height: "105%",
    flexGrow: 1,
    alignItems: "center",
  },
  mainRBContainer: {
    flexGrow: 1,
  },
  tempFont: {
    color: Theme.colors.mainContrast,
    // alignSelf: "flex-start",
  },
  icon: {
    // flex: 1,
    color: Theme.colors.light,
    alignSelf: "center",
    marginLeft: widthPercentageToPixels(34),
    marginTop: -28,
    marginBottom: heightPercentageToPixels(5),
  },
  circle: {
    width: widthPercentageToPixels(40),
    height: widthPercentageToPixels(40),
    borderRadius: widthPercentageToPixels(40) / 2,
    backgroundColor: Theme.colors.light,
    marginTop: heightPercentageToPixels(0.5),
    //marginBottom: heightPercentageToPixels(4),
    justifyContent: "center",
    padding: 3,
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
  circleText: {
    color: Theme.colors.mainContrast,
    textAlign: "center",
    fontSize: widthPercentageToPixels(15),
  },
  tomatoText: {
    color: Theme.colors.mainContrast,
    // alignSelf: "center",
    marginBottom: 5,
  },
  biggerTextFont: {
    fontSize: 30,
    color: Theme.colors.mainText,
  },
  checkIcon: {
    padding: 10,
    color: Theme.colors.green,
    marginRight: 4,
  },
  checkIcon1: {
    padding: 10,
    color: "grey",
    marginRight: 4,
  },
});
