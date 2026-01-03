import { Platform } from "react-native";

import web from "./styles.web";
import native from "./styles.native";

export default Platform.OS === "web" ? web : native;
