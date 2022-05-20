import React, { useRef, useLayoutEffect, useState, useCallback } from "react";
import {
  FlexAlignType,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Theme, widthPercentageToPixels } from "../../helpers";
import { Auth, getAuth } from "firebase/auth";
import Lang from "../../language";
import {
  Expiration,
  Section,
  SuggestedRecipes,
  Menu,
  Inventories,
} from "./components";
import RBSheet from "react-native-raw-bottom-sheet";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faBars,
  faExclamation,
  faInfo,
  faSignOutAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useFocusEffect } from "@react-navigation/native";
import ScreenNames from "../ScreenNames";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Divider from "../../components/Divider";

const auth = getAuth();

type RBMenuProps = {
  refRbSheet: any;
  navigation: any;
  auth: Auth;
};
type ListItemProps = {
  onPress: () => void;
  itemText: string;
  icon?: IconProp;
  color?: string;
  alignSelf?: FlexAlignType;
};

const RBMenuPopup = ({ refRbSheet, navigation, auth }: RBMenuProps) => {
  const ListItem = ({
    onPress,
    itemText,
    icon,
    color,
    alignSelf,
  }: ListItemProps) => {
    return (
      <View
        style={{
          flexDirection: "row",
          marginBottom: 15,
          alignSelf: alignSelf,
        }}
      >
        {icon && (
          <FontAwesomeIcon
            icon={icon}
            size={widthPercentageToPixels(6.5)}
            color={color ?? "white"}
            style={{ marginRight: 15 }}
          />
        )}
        <Pressable style={{}} onPress={onPress}>
          <Text style={styles.optionStyle}>{itemText}</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.rbView}>
      <Pressable
        hitSlop={7}
        onPress={() => refRbSheet.current.close()}
        style={styles.icon}
      >
        <FontAwesomeIcon
          icon={faTimes}
          size={widthPercentageToPixels(9)}
          color={"white"}
        />
      </Pressable>

      <View
        style={{
          alignSelf: "center",
          justifyContent: "center",
          flexGrow: 1,
        }}
      >
        {/* About button */}
        <ListItem
          onPress={() => {
            refRbSheet.current.close();
            navigation.navigate(ScreenNames.MainTab, {
              screen: ScreenNames.About,
            });
          }}
          itemText={Lang.screens.about.title}
          icon={faInfo}
        />

        {/* Report a problem button*/}
        <ListItem
          onPress={() => {
            refRbSheet.current.close();
            navigation.navigate(ScreenNames.ReportProblem);
          }}
          itemText={Lang.screens.reportProblem.title}
          icon={faExclamation}
        />

        <Divider
          width={widthPercentageToPixels(50)}
          opacity={0.3}
          marginTop={10}
          marginBottom={10}
        />

        {/* Sign out button */}
        <ListItem
          onPress={async () => {
            refRbSheet.current.close();
            await auth.signOut();
          }}
          itemText={Lang.components.signOut}
          icon={faSignOutAlt}
          alignSelf={"center"}
        />
      </View>
    </View>
  );
};

export const Main = ({ navigation }: any) => {
  const [renderMainExp, setRenderMainExp] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      setRenderMainExp(!renderMainExp);

      return () => {
        isActive = false;
      };
    }, [])
  );

  const refRbSheet = useRef<any>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable
          onPress={() => refRbSheet.current.open()}
          style={{ paddingLeft: widthPercentageToPixels(2) }}
          hitSlop={10}
        >
          <FontAwesomeIcon
            icon={faBars}
            color="white"
            size={widthPercentageToPixels(8)}
          />
        </Pressable>
      ),
    });
  }, []);

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={styles.container}
      persistentScrollbar
    >
      <Section
        title={Lang.screens.main.inventories}
        redirectOnPress={() => navigation.navigate(ScreenNames.InventoryTab)}
      >
        <Inventories navigation={navigation} />
      </Section>

      <Section
        title={Lang.screens.main.expiring}
        redirectOnPress={() => {
          setRenderMainExp(!renderMainExp);
          navigation.navigate(ScreenNames.ExpirationDates);
        }}
      >
        <Expiration renderMainExp={renderMainExp} />
      </Section>

      <Section
        title={Lang.screens.main.weeklyMenu}
        redirect={Lang.screens.main.seeMenu}
        redirectOnPress={() => navigation.navigate(ScreenNames.WeeklyMenu)}
      >
        <Menu navigation={navigation} />
      </Section>

      <Section
        title={Lang.screens.main.recipes}
        redirect={Lang.screens.main.seeMore}
        redirectOnPress={() => navigation.navigate(ScreenNames.RecipeTab)}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <SuggestedRecipes />
        </View>
      </Section>

      <RBSheet
        ref={refRbSheet}
        customStyles={{
          container: styles.rbContainer,
        }}
      >
        <RBMenuPopup
          refRbSheet={refRbSheet}
          navigation={navigation}
          auth={auth}
        />
      </RBSheet>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.background,
    alignItems: "center",
    justifyContent: "space-evenly",
    flexGrow: 1,
    paddingBottom: "5%",
  },
  rbContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: Theme.colors.background,
    height: "40%",
  },
  optionStyle: {
    color: Theme.colors.mainText,
    fontSize: widthPercentageToPixels(5),
  },
  rbView: {
    // paddingBottom: 15,
    alignSelf: "center",
    height: "100%",
    width: "100%",
  },
  icon: {
    position: "absolute",
    top: 15,
    right: 15,
  },
});
