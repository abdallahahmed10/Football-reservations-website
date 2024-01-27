import React from "react";
import FanNavBar from "./FanNavBar";
import Home from "../Home";
function FanDashBoard(probs)
{
    return(
        <div>
        <FanNavBar></FanNavBar>
        <Home HomePage={false}></Home>
        </div>
    )

}
export default FanDashBoard;