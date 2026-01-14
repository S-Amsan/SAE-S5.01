import React from "react";
import {isWeb} from "../../../../../utils/platform";
import NotifprefWeb from "./notifprefweb";
import NotifprefMobile from "./notifprefmobile";

export default function Index() {
    return isWeb ? <NotifprefWeb /> : <NotifprefMobile />;
}

