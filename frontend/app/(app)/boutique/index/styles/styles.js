import { Platform } from "react-native";

import web from "./styles";
import native from "./styles";

export default Platform.OS === "web" ? web : native;
