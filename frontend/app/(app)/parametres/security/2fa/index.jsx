import React from "react";
import {isWeb} from "../../../../../utils/platform";
import Twofaweb from "./2faweb";
import Twofamobile from "./2famobile";

export default function Index() {
    return isWeb ? <Twofaweb /> : <Twofamobile />;
}

