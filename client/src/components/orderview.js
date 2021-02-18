import React,{useState,useEffect} from "react";
import axios from "axios"
import {Link} from "react-router-dom"

const Orderview = () => {
    const [order1,setOrder1] = useState(false);
    const [order2,setOrder2] = useState(false);
    const [order3,setOrder3] = useState(false);
    const [array,setArray] = useState([]);

    const getCookie = (name) => {
        var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return value? value[2] : null;
    }

    const init = async() => {
        let check = window.location.href;
        check = check.split("orderview?a=")[1]
        let url = "/api/orderview";
        let token = getCookie("token")
        let params = {
            id:check,
            token:token
        }
        const config = {
            headers:{
                "content-type":"application/json"
            }
        }
        let res = await axios.post(url,params,config);
        setArray(res.data);
        if(res.data.order_type==="MVP작") return setOrder1(true)
        if(res.data.order_type==="메이플포인트") return setOrder2(true)
        console.log(res.data)
    }

    useEffect(()=>{
        init();
    },[])

    return (
        <div className="board">
            <div className="board_header">
                <span>주문서 확인</span>
            </div>
            {
                order1?
                <div className="order">
                    <div>
                        <div className="order_line">
                            <div className="order_left">
                                <span>글쓴이</span>
                            </div>
                            <div className="order_right">
                                <span className="bubu">{array.order_1}</span>
                            </div>
                        </div>
                        <div className="order_line">
                            <div className="order_left">
                                <span>아이디 종류</span>
                            </div>
                            <div className="order_right">
                                <span className="bubu">{array.order_2}</span>
                            </div>
                        </div>
                        <div className="order_line">
                            <div className="order_left">
                                <span>아이디</span>
                            </div>
                            <div className="order_right">
                                <span className="bubu">{array.order_3}</span>
                            </div>
                        </div>
                        <div className="order_line">
                            <div className="order_left">
                                <span>비밀번호</span>
                            </div>
                            <div className="order_right">
                                <span className="bubu">{array.order_4}</span>
                            </div>
                        </div>
                        <div className="order_line">
                            <div className="order_left">
                                <span>2차 비밀번호</span>
                            </div>
                            <div className="order_right">
                                <span className="bubu">{array.order_5}</span>
                            </div>
                        </div>
                        <div className="order_line">
                            <div className="order_left">
                                <span>전화번호(필수)</span>
                            </div>
                            <div className="order_right">
                                <span className="bubu">{array.order_6}</span>
                            </div>
                        </div>
                        <div className="order_line">
                            <div className="order_left">
                                <span>본캐 레벨</span>
                            </div>
                            <div className="order_right">
                                <span className="bubu">{array.order_7}</span>
                            </div>
                        </div>
                        <div className="order_line">
                            <div className="order_left">
                                <span>접속 시간대</span>
                            </div>
                            <div className="order_right">
                                <span className="bubu">{array.order_8}</span>
                            </div>
                        </div>
                        <div className="order_line">
                            <div className="order_left">
                                <span>OTP가 걸려있나요?</span>
                            </div>
                            <div className="order_right">
                                <span className="bubu">{array.order_9}</span>
                            </div>
                        </div>
                        <div className="order_line">
                            <div className="order_left">
                                <span>당월 상품권으로 충전한 내역이 있나요?</span>
                            </div>
                            <div className="order_right">
                                <span className="bubu">{array.order_10}</span>
                            </div>
                        </div>
                        <div className="order_line">
                            <div className="order_left">
                                <span>충전 내역이 있을 경우 액수</span>
                            </div>
                            <div className="order_right">
                                <span className="bubu">{array.order_11}</span>
                            </div>
                        </div>
                        <div className="order_line">
                            <div className="order_left">
                                <span>방문 경로</span>
                            </div>
                            <div className="order_right">
                                <span className="bubu">{array.order_12}</span>
                            </div>
                        </div>
                        <div className="order_line">
                            <div className="order_left">
                                <span>원하시는 금액</span>
                            </div>
                            <div className="order_right">
                                <span className="bubu">{array.order_13}</span>
                            </div>
                        </div>
                    </div>
                </div>:""
            }
            {
                order2?
                <div className="order">
                    <div>
                        <div className="order_line">
                            <div className="order_left">
                                <span>글쓴이</span>
                            </div>
                            <div className="order_right">
                                <span className="bubu">{array.order_1}</span>
                            </div>
                        </div>
                        <div className="order_line">
                            <div className="order_left">
                                <span>신청인</span>
                            </div>
                            <div className="order_right">
                                <span className="bubu">{array.order_2}</span>
                            </div>
                        </div>
                        <div className="order_line">
                            <div className="order_left">
                                <span>전화번호(필수)</span>
                            </div>
                            <div className="order_right">
                                <span className="bubu">{array.order_3}</span>
                            </div>
                        </div>
                        <div className="order_line">
                            <div className="order_left">
                                <span>기타 요청 사항</span>
                            </div>
                            <div className="order_right">
                                <span className="bubu">{array.order_4}</span>
                            </div>
                        </div>
                        <div className="order_line">
                            <div className="order_left">
                                <span>서버/캐릭터 이름</span>
                            </div>
                            <div className="order_right">
                                <span className="bubu">{array.order_5}</span>
                            </div>
                        </div>
                        <div className="order_line">
                            <div className="order_left">
                                <span>입금자명</span>
                            </div>
                            <div className="order_right">
                                <span className="bubu">{array.order_6}</span>
                            </div>
                        </div>
                        <div className="order_line">
                            <div className="order_left">
                                <span>방문 경로</span>
                            </div>
                            <div className="order_right">
                                <span className="bubu">{array.order_7}</span>
                            </div>
                        </div>
                        <div className="order_line">
                            <div className="order_left">
                                <span>신청금액</span>
                            </div>
                            <div className="order_right">
                                <span className="bubu">{array.order_8}</span>
                            </div>
                        </div>
                    </div>
                </div>
                :""
            }
            <div className="orderview_button">
                <Link to="orderlist">
                    <span>목록</span>
                </Link>
            </div>
        </div>
    )
}

export default Orderview;