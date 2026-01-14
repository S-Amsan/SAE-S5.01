import React from "react";
import {isWeb} from "../../../../../utils/platform";
import Helpmweb from "./helpweb";
import Helpmobile from "./helpmobile";

export default function Index() {
    return isWeb ? <Helpmweb /> : <Helpmobile />;
}

