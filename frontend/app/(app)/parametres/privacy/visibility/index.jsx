import React from "react";
import {isWeb} from "../../../../../utils/platform";
import Accountvisibilityweb from "./accountvisibilityweb";
import Accountvisibilitymobile from "./accountvisibilitymobile";

export default function Index() {
    return isWeb ? <Accountvisibilityweb /> : <Accountvisibilitymobile />;
}

