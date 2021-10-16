import React from "react";

const Flevel4 = () => {
    const talk = () => {
        window.location.href="https://pf.kakao.com/_DmMVxb/45169032";
    }

    return (
        <div className="front_level4">
            <div>
                <div className="level4_title">
                    <span>MVP 대행 후기</span>
                </div>
                <div className="level4_list">
                    <div className="level4_left">
                        <img src="./mush.gif" alt="mush" />
                    </div>
                    <div className="level4_right">
                        <div className="front_level4_right" onClick={talk}>
                            <div>
                                <span>카톡 상담 바로가기</span>
                                <span>클릭하시면 카톡상담으로 이동합니다</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Flevel4;
