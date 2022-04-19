import React from "react";


const Flevel3 = () => {

    const talk = () => {
        window.location.href="https://open.kakao.com/o/sC0E5XUd";
    }

    return (
        <div className="front_level3">
            <div>
                <div>
                    <span>당신만을 위한</span>
                    <span>공지사항</span>
                </div>
            </div>
            <div className="front_level3_list">
                <div className="front_noticebox" onClick={talk}>
                    <div>
                        <img src="./1.jpg" alt="notice" />
                    </div>
                    <span>공지</span>
                    <span>★ MVP 대행 전문업체 ★</span>
                </div>
                <div className="front_noticebox" onClick={talk}>
                    <div>
                        <img src="./2.png"  alt="notice" />
                    </div>
                    <span>공지</span>
                    <span>★ 메소 or 골드 판매 ★</span>
                </div>
                <div className="front_noticebox" onClick={talk}>
                    <div>
                        <img src="./3.png"  alt="notice" />
                    </div>
                    <span>공지</span>
                    <span>★ 상품권 최고가 매입중 ★</span>
                </div>
                <div className="front_noticebox" onClick={talk}>
                    <div>
                        <img src="./4.png"  alt="notice" />
                    </div>
                    <span>공지</span>
                    <span>★ 메이플포인트 상시판매 ★</span>
                </div>
            </div>
        </div>
    )
}

export default Flevel3;