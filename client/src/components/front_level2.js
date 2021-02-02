import React from "react";

const Flevel2 = () => {
    return (
        <div className="front_level2">
            <div className="front_level2_left">
                <div>
                    <span><i className="xi-kakaotalk xi-4x"></i></span>
                    <span>카톡 상담 바로가기</span>
                    <span>클릭하시면 카톡상담으로 이동합니다</span>
                </div>
            </div>
            <div className="front_level2_rr">
                <div className="front_level2_mid">
                    <div className="front_login_leftt">
                        <div>
                            <i className="xi-lock-o xi-4x"></i>
                            <span>로그인</span>
                        </div>
                    </div>
                    <div className="front_login_left">
                        <div className="front_login_left_level1">
                            <span>아이디</span>
                            <input type="text" />
                        </div>
                        <div className="front_login_left_level1">
                            <span>비밀 번호</span>
                            <input type="password" />
                        </div>
                    </div>
                    <div className="front_login_right">
                        <span>로그인</span>
                        <div>
                            <span>회원가입</span>
                        </div>
                    </div>
                </div>
                <div className="front_level2_right">
                    <div className="front_product_left">
                        <span><i className="xi-gift-o xi-4x"></i></span>
                        <span>Best</span>
                    </div>
                    <div className="front_product_right">
                        <div className="front_product_right_leve1l">
                            <span><i className="xi-star-o xi-x"></i> MVP대행 45만원</span>
                            <span>구매하기</span>
                        </div>
                        <div className="front_product_right_leve1l">
                            <span><i className="xi-star-o xi-x"></i> 넥슨 캐시 10만원</span>
                            <span>구매하기</span>
                        </div>
                        <div className="front_product_right_leve1l">
                            <span><i className="xi-star-o xi-x"></i> 메이플 포인트 10만원</span>
                            <span>구매하기</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Flevel2;