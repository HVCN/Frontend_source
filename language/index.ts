// import { locale } from "expo-localization"
import no from "./norwegian"
import en from "./english"
import { isEN } from "./Lang";

const Lang = isEN ? en : no
export default Lang;