import React from "react"

const Navi = () => {
    return (
        <div className="navi">
            <div className="navi_left">
                logo
            </div>
            <div className="navi_right">
                <div>
                    <span>공지사항</span>
                    <span>NOTIFICATION</span>
                </div>
                <div>
                    <span>이용 후기</span>
                    <span>REVIEW</span>
                </div>
                <div>
                    <span>Alice Shop</span>
                    <span>앨리스 마켓</span>
                </div>
                <div>
                    <span>제휴 업체</span>
                    <span>ALLIANCE</span>
                </div>
                <div>
                    <span>상품권몰</span>
                    <span>MALL</span>
                </div>
            </div>
        </div>
    )
}

export default Navi;