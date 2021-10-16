import React, { useEffect } from "react";

const Article = () => {
    useEffect(()=>{
        window.scroll(0,0)
    },[])

    return (
        <div className="board">
            <div className="board_header">
                <span>유저가이드</span>
            </div>
            <div className="userguide_wrapper">
                <div>
                    <div className="usergudie">
                        <span className="header">MVP 등급별 혜택</span>
                        <img src="./chart1.png" alt="chart" />
                        <img src="./chart2.png" alt="chart" />
                        <img src="./chart3.png" alt="chart" />
                        <div>
                            <span className="body">[페어리 브로의 데일리 기프트 보상 2배] (브론즈~레드)</span>
                            <span className="body">[경매장 프리미엄 혜택] (실버~레드)</span>
                            <span className="body">경매장 판매/구매 슬롯 확장 : 10칸 → 30칸</span>
                            <span className="body">판매 등록 시간: 24시간 또는 48시간 설정 가능</span>
                            <span className="body">판매 수수료 감소 : 5% → 3%</span>
                            <span className="body">MVP대행을 이용하는 이유</span>
                            <span className="body">앨리스를 통해 MVP대행을 이용해주시는 고객님들을 통해가장 많이 말씀주신 이유를 설명 드리겠습니다.</span>
                            <span className="body">1. 엠브이피 등급을 올리기 위해 과도하게 많은 캐시를 충전하고 사용 해야 하는 부담이 없다.</span>
                            <span className="body">2. 게임 플레이 시간에 캐시템을 사고 경매장에 판매하는 시간과 발생된 메소를 다시 팔아야하는 많은 번거로움이 없다.</span>
                            <span className="body">3. 등급만 올리고 다시 현금으로 회수하고 싶은데 막상 캐시템을 구매 하게되면 사용하거나 발생된 메소를 사용해 계획하지 않은 큰 지출이 발생되는 일이 없다.</span>
                            <span className="body">4. MVP에 대해 잘 알지 못하여 계획적이지 못한 등급 유지를 보다 쉽고 편리하게 이용 할 수 있다.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Article;