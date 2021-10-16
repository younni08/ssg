import React from "react";
import Flevel2 from "./components/front_level2";
import Flevel3 from "./components/front_level3";
import Flevel4 from "./components/front_level4";
import Flevel5 from "./components/front_level5";
import Notification from "./components/notification";
import Review from "./components/review";
import Article from "./components/article";
import Article2 from "./components/article2";
import Write from "./components/write";
import Write2 from "./components/adminwrite";
import Register from "./components/register";
import Order1 from "./components/order1";
import Order2 from "./components/order2";
import Order3 from "./components/order3";
import Orderlist from "./components/orderlist";
import Banner from "./components/haddlebanner";
import Orderview from "./components/orderview";
import HandleReview from "./components/handlereview";
import Maplemall from "./components/maplemall";
import Userguide from "./components/userguide";

import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";

const App = () => {
    const prepare = () => {
        alert("준비중 입니다.")
    }

    const talk2 = () => {
        window.location.href="https://pf.kakao.com/_DmMVxb/45169032";
    }

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
                        <div onClick={talk2}>
                            <span>이용 후기</span>
                            <span>REVIEW</span>
                        </div>
                        <Link to="/maplemall">
                            <span>메이플 몰</span>
                            <span>MAPLE MALL</span>
                        </Link>
                        <Link to="/alliance" onClick={prepare}>
                            <span>제휴 업체</span>
                            <span>ALLIANCE</span>
                        </Link>
                        <Link to="/mall" onClick={prepare}>
                            <span>상품권몰</span>
                            <span>MALL</span>
                        </Link>
                    </div>
                </div>
                <div className="app_body">
                    <div className="front_level1">
                        <Link to="/">
                            <img src="./front.png" alt="front" />
                        </Link>
                    </div>
                    <Switch>
                        <Route path="/article">
                            <Article />
                        </Route>
                        <Route path="/notice">
                            <Article2 />
                        </Route>
                        <Route path="/notification">
                            <Notification />
                        </Route>
                        <Route path="/review">
                            <Review />
                        </Route>
                        <Route path="/write">
                            <Write />
                        </Route>
                        <Route path="/ssgwrite">
                            <Write2 />
                        </Route>
                        <Route path="/register">
                            <Register />
                        </Route>
                        <Route path="/ordermvp">
                            <Order1 />
                        </Route>
                        <Route path="/orderpoint">
                            <Order2 />
                        </Route>
                        <Route path="/ordercash">
                            <Order3 />
                        </Route>
                        <Route path="/orderlist">
                            <Orderlist />
                        </Route>
                        <Route path="/orderview">
                            <Orderview />
                        </Route>
                        <Route path="/handlebanner">
                            <Banner />
                        </Route>
                        <Route path="/handlereview">
                            <HandleReview />
                        </Route>
                        <Route path="/maplemall">
                            <Maplemall />
                        </Route>
                        <Route path="/userguide">
                            <Userguide />
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
