import React from "react";
import Flevel2 from "./components/front_level2";
import Flevel3 from "./components/front_level3";
import Flevel4 from "./components/front_level4";
import Flevel5 from "./components/front_level5";
import Notification from "./components/notification";
import Article from "./components/article";
import Navi from "./components/navi"
// import {}


const App = () => {
    return (
        <div className="app">
            <Navi />
            <div className="app_body">
                <div className="front_level1">
                    <img src="./front.png" alt="front" />
                </div>
                <div>
                    <Flevel2 />
                    <Flevel3 />
                    <Flevel4 />
                    <Flevel5 />
                </div>
                {/* <Notification /> */}
                {/* <Article /> */}
            </div>
        </div>
    )
}

export default App;
