import React from "react";

const Article = () => {
    return (
        <div className="board">
            <div className="board_header">
                <span>공지사항</span>
            </div>
            <div className="article">
                <div>
                    <div className="article_title">
                        <span>타이틀</span>
                    </div>
                    <div className="article_info">
                        <span>글쓴이</span>
                        <div>
                            <span>조회수 </span>
                            <span>댓글 </span>
                        </div>
                    </div>
                    <div className="article_body">
                        몸땡이
                    </div>
                    <div className="article_bottom">
                        <span><i className="xi-bars xi-x" />&nbsp;목록</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Article;