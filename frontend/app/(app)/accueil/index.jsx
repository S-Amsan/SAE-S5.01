import React from "react";
import { isWeb } from "../../../utils/platform";
import AccueilWeb from "./AccueilWeb";
import AccueilMobile from "./AccueilMobile";

export default function Index() {
    return isWeb ? <AccueilWeb /> : <AccueilMobile />;
}
