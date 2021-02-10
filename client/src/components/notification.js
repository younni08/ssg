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
                        <span>제목</span>
                        <span>글쓴이</span>
                        <span>날짜</span>
                        <span>조회수</span>
                    </div>
                    <div className="board_bar">
                        <span>1</span>
                        <span>제목</span>
                        <span>글쓴이</span>
                        <span>날짜</span>
                        <span>조회수</span>
                    </div>
                    <div className="board_bar">
                        <span>1</span>
                        <span>제목</span>
                        <span>글쓴이</span>
                        <span>날짜</span>
                        <span>조회수</span>
                    </div>
                    <div className="board_bar">
                        <span>1</span>
                        <span>제목</span>
                        <span>글쓴이</span>
                        <span>날짜</span>
                        <span>조회수</span>
                    </div>
                </div>
                <div className="board_page">
                    <span></span>
                    <div>
                        <span>이전</span>
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>이후</span>
                    </div>
                    <Link to="/write">
                        <span>글쓰기</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Notification;