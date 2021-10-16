import React from "react";

const Flevel2 = () => {
    const checkLogin = async() => {
        alert("관리자만 이용 가능합니다.")
    }

    const talk = () => {
        window.location.href="https://pf.kakao.com/_DmMVxb/chat";
    }

    return (
        <div>
            <div className="front_level2">
                <div className="front_level2_left" onClick={talk}>
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
                                    <span><i className="xi-profile-o xi-x"></i></span>
                                    <input type="text" />
                                </div>
                                <div className="front_login_left_level1">
                                    <span><i className="xi-lock-o xi-x"></i></span>
                                    <input type="password" />
                                </div>
                            </div>
                            <div className="front_login_right">
                                <span onClick={checkLogin}>로그인</span>
                            </div>
                        </div>
                    <div className="front_level2_right">
                        <div className="front_product_left">
                            <span><i className="xi-gift-o xi-4x"></i></span>
                            <span>Best</span>
                        </div>
                        <div className="front_product_right">
                            <div className="front_product_right_leve1l">
                                <span><i className="xi-star-o xi-x"></i> MVP대행 ##만원</span>
                                <div onClick={talk}>
                                    <span>구매하기</span>
                                </div>
                            </div>
                            <div className="front_product_right_leve1l">
                                <span><i className="xi-star-o xi-x"></i> 넥슨 캐시 ##만원</span>
                                <span onClick={talk}>구매하기</span>
                            </div>
                            <div className="front_product_right_leve1l">
                                <span><i className="xi-star-o xi-x"></i> 메이플 포인트 ##만원</span>
                                <div onClick={talk}>
                                    <span>구매하기</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="front_level2_mobile">
                <div>
                    <div className="mobile_front_level1">
                        <div>
                            <span><i className="xi-kakaotalk xi-2x"></i></span>
                            <span>카톡 상담</span>
                            <span>바로가기</span>
                            {/* <span>클릭하시면 카톡상담으로 이동합니다</span> */}
                        </div>
                        <div>
                            <div className="mobile_product_right_leve1l">
                                <span><i className="xi-star xi-x"></i> MVP대행 45만원</span>
                                <span> </span>
                                <span>구매하기</span>
                            </div>
                            <div className="mobile_product_right_leve1l">
                                <span><i className="xi-star xi-x"></i> 넥슨 캐시 10만원</span>
                                <span></span>
                                <span>구매하기</span>
                            </div>
                            <div className="mobile_product_right_leve1l">
                                <span><i className="xi-star xi-x"></i> 메이플 포인트 10만원</span>
                                <span></span>
                                <span>구매하기</span>
                            </div>
                        </div>
                    </div>
                    <div className="mobile_front_level2">
                        <div>로그인 열기</div>
                        <div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Flevel2;