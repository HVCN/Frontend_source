import { widthPercentageToPixels } from "./GeneralHelper";

const colors = {
  text: "#E1E4E8",
  placeholderText: "#E1E4E8",
  borderColor: "#E1E4E8",
  mainColor: "#0E0E10",
  mainLight: "#1e1e21",
  // mainContrast: "tomato",

  mainNavColor: "tomato",

  // proper named colors below. add new ones below this comment and use them.
  tomato: "tomato",
  screenBackground: "#0E0E10",
  screenBackgroundContrast: "#1e1e21",
  navBottomColor: "#2C2C2C",
  navHeaderColor: "tomato",

  // trying new color themes
  background: "#1f2127",
  mainContrast: "#fd6a02",
  lightContrast: "#F6872D",
  darkAccent: "#25282F",
  lightAccent: "#363A45",
  topBar: "#F65814",
  bottomBar: "#363A45",

  green: "#11451e",
  blue: "#7DBFE2",
  brown: "#c9a428",

  light: "#C4C4C4",

  mainText: "#E1E4E8",
};

export const Theme = {
  colors: colors,
  buttons: {
    borderRadius: 15,
  },
  inputFields: {
    borderRadius: 10,
  },
  spacing: {
    top: "5%",
  },
  fonts: {
    sizes: {
      small: widthPercentageToPixels(2),
      normal: widthPercentageToPixels(4.5),
      medium: widthPercentageToPixels(4.5),
    },
  },
};
