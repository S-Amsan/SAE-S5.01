import React from "react";
import {isWeb} from "../../../../../utils/platform";
import AccountInfoWeb from "./accountinfoweb";
import AccountInfoMobile from "./accountinfomobile";

export default function Index() {
    return isWeb ? <AccountInfoWeb /> : <AccountInfoMobile />;
}

