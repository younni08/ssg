import React from "react";

const Write = () => {
    const talk = () => {
        window.location.href="https://open.kakao.com/o/sC0E5XUd";
    }

    return ( 
        <div className="board">
            <div className="board_header">
                <span className="showall">전체 상품</span>
            </div>
            <div className="board_body">
                <div className="weeklybest">
                    <div>
                        <div>
                            <span>이번주 BEST 상품 Top 5</span>
                            <span>앨리스샵 최고의 상품을 만나보세요.</span>
                        </div>
                    </div>
                    <div className="weeklybest_1">
                        <div className="weeklylist">
                            <div className="showcase2" onClick={talk}>
                                <div className="showcase2_level1">
                                    <img src="./mvp11.png" alt="mvp" />
                                </div>
                                <div className="showcase2_level2">
                                    <span>MVP 대행</span>
                                    <span>30만원</span>
                                </div>
                            </div>
                            <div className="showcase2" onClick={talk}>
                                <div className="showcase2_level1">
                                    <img src="./mvp33.png" alt="mvp" />
                                </div>
                                <div className="showcase2_level2">
                                    <span>MVP 대행</span>
                                    <span>60만원</span>
                                </div>
                            </div>
                            <div className="showcase2" onClick={talk}>
                                <div className="showcase2_level1">
                                    <img src="./mvp44.png" alt="mvp" />
                                </div>
                                <div className="showcase2_level2">
                                    <span>MVP 대행</span>
                                    <span>90만원</span>
                                </div>
                            </div>
                            <div className="showcase2" onClick={talk}>
                                <div className="showcase2_level1">
                                    <img src="./point1.png" alt="mvp" />
                                </div>
                                <div className="showcase2_level2">
                                    <span>MVP 대행</span>
                                    <span>150만원</span>
                                </div>
                            </div>
                            <div className="showcase2" onClick={talk}>
                                <div className="showcase2_level1">
                                    <img src="./point2.png" alt="mvp" />
                                </div>
                                <div className="showcase2_level2">
                                    <span>메이플 포인트</span>
                                    <span>판매</span>
                                </div>
                            </div>
                        </div>
                        <div className="showcase2bottom">
                            <span>30만원</span>
                            <span>90만원</span>
                            <span>150만원</span>
                            <span>메포 10만원</span>
                            <span>메포 20만원</span>
                        </div>
                        <img src="./table3.jpg" alt="showcase" />
                    </div>
                </div>
                <div className="showcase_wrapper">
                    <div className="showcase_tab">
                        <span className="on">전체 상품</span>
                        <span>MVP대행</span>
                        <span>메이플 포인트</span>
                    </div>
                    <div className="showcase_body">
                        <div className="showcase" onClick={talk}>
                            <div className="showcase_level1">
                                <img src="./mvp1.png" alt="mvp" />
                            </div>
                            <div className="showcase_level2">
                                <span>MVP 대행</span>
                                <span>30만원</span>
                            </div>
                        </div>
                        <div className="showcase" onClick={talk}>
                            <div className="showcase_level1">
                                <img src="./mvp2.png" alt="mvp" />
                            </div>
                            <div className="showcase_level2">
                                <span>MVP 대행</span>
                                <span>60만원</span>
                            </div>
                        </div>
                        <div className="showcase" onClick={talk}>
                            <div className="showcase_level1">
                                <img src="./mvp3.png" alt="mvp" />
                            </div>
                            <div className="showcase_level2">
                                <span>MVP 대행</span>
                                <span>90만원</span>
                            </div>
                        </div>
                        <div className="showcase" onClick={talk}>
                            <div className="showcase_level1">
                                <img src="./mvp4.png" alt="mvp" />
                            </div>
                            <div className="showcase_level2">
                                <span>MVP 대행</span>
                                <span>150만원</span>
                            </div>
                        </div>
                        <div className="showcase" onClick={talk}>
                            <div className="showcase_level1">
                                <img src="./point1.png" alt="mvp" />
                            </div>
                            <div className="showcase_level2">
                                <span>메이플 포인트</span>
                                <span>10만 메포</span>
                            </div>
                        </div>
                        <div className="showcase" onClick={talk}>
                            <div className="showcase_level1">
                                <img src="./point2.png" alt="mvp" />
                            </div>
                            <div className="showcase_level2">
                                <span>메이플 포인트</span>
                                <span>20만 메포</span>
                            </div>
                        </div>
                        <div className="showcase" onClick={talk}>
                            <div className="showcase_level1">
                                <img src="./point3.png" alt="mvp" />
                            </div>
                            <div className="showcase_level2">
                                <span>메이플 포인트</span>
                                <span>30만 메포</span>
                            </div>
                        </div>
                        <div className="showcase" onClick={talk}>
                            <div className="showcase_level1">
                                <img src="./point4.png" alt="mvp" />
                            </div>
                            <div className="showcase_level2">
                                <span>메이플 포인트</span>
                                <span>40만 메포</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Write;