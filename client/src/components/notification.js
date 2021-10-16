import React from "react";
import {Link} from "react-router-dom";

const Notification = () => {
    return ( 
        <div className="board">
            <div className="board_header">
                <span>공지사항</span>
            </div>
            <div className="board_body">
                <div className="board_content">
                    <div className="board_topbar">
                        <span>번호</span>
                        <span>제목</span>
                        <span>글쓴이</span>
                        <span>날짜</span>
                        <span>조회수</span>
                    </div>
                    <div className="board_bar">
                        <span>1</span>
                        <Link to={"/userguide"}>
                            <span>유저가이드</span>
                        </Link>
                        <span>앨리스샵</span>
                        <span>2020-08-14</span>
                        <span>5678</span>
                    </div>
                </div>
                <div className="board_page">
                    <span></span>
                    <div>
                        <Link to={"/notification"} >
                            <span>1</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notification;