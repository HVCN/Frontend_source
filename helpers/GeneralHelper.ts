import { Dimensions, PixelRatio } from "react-native";
import Constants from "expo-constants";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { InventoryTypings } from "../constants";
import Lang from "../language";

export const generateUUID = () => {
  return uuidv4();
};

export const widthPercentageToPixels = (percent: number) => {
  const screenWidth = Dimensions.get("window").width;

  // const elementHeight = parseFloat(percent.toString());
  return PixelRatio.roundToNearestPixel((screenWidth * percent) / 100);
};

export const heightPercentageToPixels = (percent: number) => {
  const screenHeight =
    Dimensions.get("window").height - Constants.statusBarHeight;

  // const elementHeight = parseFloat(percent.toString());
  return PixelRatio.roundToNearestPixel((screenHeight * percent) / 100);
};

export const capitalizeFirstChar = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const formatDateSimple = (date: Date | null) => {
  if (date) {
    return `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear().toString().substring(2, 4)}`;
  } else return "09/02/22";
};

export const typeLocalization = (type: string) => {
  if (type == InventoryTypings.Freezer) return Lang.screens.inventory.freezer;
  if (type == InventoryTypings.Fridge) return Lang.screens.inventory.fridge;
  if (type == InventoryTypings.Pantry) return Lang.screens.inventory.pantry;
  return "Oops";
};

export const weekDayLocalization = (weekId: number) => {
  switch (weekId) {
    case 0:
      return Lang.screens.weeklyMenu.monday;
    case 1:
      return Lang.screens.weeklyMenu.tuesday;
    case 2:
      return Lang.screens.weeklyMenu.wednesday;
    case 3:
      return Lang.screens.weeklyMenu.thursday;
    case 4:
      return Lang.screens.weeklyMenu.friday;
    case 5:
      return Lang.screens.weeklyMenu.saturday;
    case 6:
      return Lang.screens.weeklyMenu.sunday;
    default:
      return "hmm";
  }
};
