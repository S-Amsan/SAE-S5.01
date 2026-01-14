import React from "react";
import {isWeb} from "../../../../../utils/platform";
import Securitypasswordweb from "./securitypasswordweb";
import Securitypasswordmobile from "./securitypasswordmobile";

export default function Index() {
    return isWeb ? <Securitypasswordmobile /> : <Securitypasswordmobile />;
}

