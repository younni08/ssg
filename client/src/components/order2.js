import React,{useState} from "react";
import axios from "axios";

const Order1 = () => {
    const [clicked,setClicked] = useState(false);
    const [input1,setInput1] = useState("");
    const [input2,setInput2] = useState("");
    const [input3,setInput3] = useState("");
    const [input4,setInput4] = useState("");
    const [input5,setInput5] = useState("");
    const [input6,setInput6] = useState("");
    const [input7,setInput7] = useState("");
    const [input8,setInput8] = useState("");

    const handleInput1 = (e) => {setInput1(e.target.value)}
    const handleInput2 = (e) => {setInput2(e.target.value)}
    const handleInput3 = (e) => {setInput3(e.target.value)}
    const handleInput4 = (e) => {setInput4(e.target.value)}
    const handleInput5 = (e) => {setInput5(e.target.value)}
    const handleInput6 = (e) => {setInput6(e.target.value)}
    const handleInput7 = (e) => {setInput7(e.target.value)}
    const handleInput8 = (e) => {setInput8(e.target.value)}
    
    const submit = async() => {
        if(clicked===true) return alert("잠시만 기다려주세요.")
        setClicked(true)
        let url = "/api/ordermvp";
        let params ={
            order_type:"메이플포인트",
            input1:input1,
            input2:input2,
            input3:input3,
            input4:input4,
            input5:input5,
            input6:input6,
            input7:input7,
            input8:input8,
        }
        const config = {
            headers:{
                "content-type":"application/json"
            }
        }
        let res = await axios.post(url,params,config)
        setClicked(false)
        if(res.data === "bu") return alert("성공적으로 등록되었습니다.")
        console.log(res.data)
    }

    return (
        <div className="board">
            <div className="board_header">
                <span>주문서 작성 - 메이플포인트</span>
            </div>
            <div className="order">
                <div>
                    <div className="order_line">
                        <div className="order_left">
                            <span>글쓴이</span>
                        </div>
                        <div className="order_right">
                            <input type="text" className="long" onChange={handleInput1} />
                        </div>
                    </div>
                    <div className="order_line">
                        <div className="order_left">
                            <span>신청인</span>
                        </div>
                        <div className="order_right">
                            <input type="text" className="medium" onChange={handleInput2} />
                        </div>
                    </div>
                    <div className="order_line">
                        <div className="order_left">
                            <span>전화번호(필수)</span>
                        </div>
                        <div className="order_right">
                            <input type="text" className="long" onChange={handleInput3} />
                        </div>
                    </div>
                    <div className="order_line">
                        <div className="order_left">
                            <span>기타 요청 사항</span>
                        </div>
                        <div className="order_right">
                            <input type="text" className="long" onChange={handleInput4} />
                        </div>
                    </div>
                    <div className="order_line">
                        <div className="order_left">
                            <span>서버/캐릭터 이름</span>
                        </div>
                        <div className="order_right">
                            <input type="text" className="long" onChange={handleInput5} />
                        </div>
                    </div>
                    <div className="order_line">
                        <div className="order_left">
                            <span>입금자명</span>
                        </div>
                        <div className="order_right">
                        <input type="text" className="short" onChange={handleInput6} />
                            <span>입금자명은 반드시 본인명의로 해주셔야합니다.</span>
                        </div>
                    </div>
                    <div className="order_line">
                        <div className="order_left">
                            <span>방문 경로</span>
                        </div>
                        <div className="order_right">
                            <input type="text" className="short" onChange={handleInput7} />
                            <span>예시: 아프리카 bj, 네이버 검색</span>
                        </div>
                    </div>
                    <div className="order_line">
                        <div className="order_left">
                            <span>신청금액</span>
                        </div>
                        <div className="order_right">
                            <input type="text" className="medium" onChange={handleInput8} />
                            <span>예시: 15만원 (최소 5만원권부터 구매가능합니다)</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="order_button">
                <span>(신청 후 담당직원에게 카카오톡으로 문의주세요)</span>
                <span onClick={submit}>등록</span>
            </div>
        </div>
    )
}

export default Order1;