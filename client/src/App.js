import React from "react";
import Flevel2 from "./components/front_level2";
import Flevel3 from "./components/front_level3";
import Flevel4 from "./components/front_level4";
import Flevel5 from "./components/front_level5";
import Notification from "./components/notification";
import Article from "./components/article";
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
// import {}


const App = () => {
    return (
        <Router>
            <div className="app">
                <div className="navi">
                    <div className="navi_left">
                        <Link to="/">
                            <img src="./logo.png" alt="logo"/>
                        </Link>
                    </div>
                    <div className="navi_right">
                        <Link to="/notification">
                            <span>공지사항</span>
                            <span>NOTIFICATION</span>
                        </Link>
                        <Link to="/review">
                            <span>이용 후기</span>
                            <span>REVIEW</span>
                        </Link>
                        <Link to="/shop">
                            <span>Alice Shop</span>
                            <span>앨리스 마켓</span>
                        </Link>
                        <Link to="/alliance">
                            <span>제휴 업체</span>
                            <span>ALLIANCE</span>
                        </Link>
                        <Link to="/mall">
                            <span>상품권몰</span>
                            <span>MALL</span>
                        </Link>
                    </div>
                </div>
                <div className="app_body">
                    <div className="front_level1">
                        <img src="./front.png" alt="front" />
                    </div>
                    <Switch>
                        <Route path="/article">
                            <Article />
                        </Route>
                        <Route path="/notification">
                            <Notification />
                        </Route>
                        <Route path="/review">
                            <Notification />
                        </Route>
                        <Route path="/">
                            <div>
                                <Flevel2 />
                                <Flevel3 />
                                <Flevel4 />
                                <Flevel5 />
                            </div>
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    )
}

export default App;
