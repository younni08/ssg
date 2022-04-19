import React from "react";

const Flevel4 = () => {
    const talk = () => {
        window.location.href="https://open.kakao.com/o/sC0E5XUd";
    }

    return (
        <div className="front_level4">
            <div>
                <div className="level4_title">
                    <div>
                        <span>MVP 대행 후기</span>
                    </div>
                    <div>
                        <span>카카오톡 실명인증이 완료된 조작없는 솔직한 후기입니다.</span>
                        <span>"조작이 가능한 홈페이지 내에 게시판은 운영하지 않습니다."</span>
                    </div>
                </div>
                <div className="level4_list">
                    <div className="level4_left">
                        <img src="./mush.gif" alt="mush" />
                    </div>
                    <div className="level4_right">
                        <div onClick={talk}>
                            <img src="./talk2.png" alt="talk" />
                            <span>인증 후기 확인</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Flevel4;
