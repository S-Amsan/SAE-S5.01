import React from "react";
import {isWeb} from "../../../../../utils/platform";
import Termsweb from "./termsweb";
import Termsmobile from "./termsmobile";

export default function Index() {
    return isWeb ? <Termsweb /> : <Termsmobile />;
}

