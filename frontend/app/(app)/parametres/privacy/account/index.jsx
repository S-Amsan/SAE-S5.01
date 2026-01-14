import React from "react";
import {isWeb} from "../../../../../utils/platform";
import Accountprivacyweb from "./accountprivacyweb";
import Accountprivacymobile from "./accountprivacymobile";

export default function Index() {
    return isWeb ? <Accountprivacyweb /> : <Accountprivacymobile />;
}

