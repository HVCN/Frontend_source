import { locale } from "expo-localization"

const language = locale.slice(0, 2);

export const isEN = language === "en";
export const isNO = language === "nb";