import React from "react";
import {isWeb} from "../../../../../utils/platform";
import Policyweb from "./policyweb";
import Policymobile from "./policymobile";

export default function Index() {
    return isWeb ? <Policyweb /> : <Policymobile />;
}

