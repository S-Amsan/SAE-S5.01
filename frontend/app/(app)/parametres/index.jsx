import React from "react";
import {isWeb} from "../../../utils/platform";
import ParametresWeb from "./parametresweb";
import ParametresMobile from "./parametresmobile";

export default function Index() {
    return isWeb ? <ParametresWeb /> : <ParametresMobile />;
}

