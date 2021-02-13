import React,{useState} from "react";
import axios from "axios"

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
    const [input9,setInput9] = useState("");
    const [input10,setInput10] = useState("");
    const [input11,setInput11] = useState("");
    const [input12,setInput12] = useState("");
    const [input13,setInput13] = useState("");

    const handleInput1 = (e) => {setInput1(e.target.value)}
    const handleInput2 = (e) => {setInput2(e.target.value)}
    const handleInput3 = (e) => {setInput3(e.target.value)}
    const handleInput4 = (e) => {setInput4(e.target.value)}
    const handleInput5 = (e) => {setInput5(e.target.value)}
    const handleInput6 = (e) => {setInput6(e.target.value)}
    const handleInput7 = (e) => {setInput7(e.target.value)}
    const handleInput8 = (e) => {setInput8(e.target.value)}
    const handleInput9 = (e) => {setInput9(e.target.value)}
    const handleInput10 = (e) => {setInput10(e.target.value)}
    const handleInput11 = (e) => {setInput11(e.target.value)}
    const handleInput12 = (e) => {setInput12(e.target.value)}
    const handleInput13 = (e) => {setInput13(e.target.value)}
    
    const submit = async() => {
        if(clicked===true) return alert("잠시만 기다려주세요.")
        setClicked(true)
        let url = "/api/ordermvp";
        let params ={
            order_type:"MVP작",
            input1:input1,
            input2:input2,
            input3:input3,
            input4:input4,
            input5:input5,
            input6:input6,
            input7:input7,
            input8:input8,
            input9:input9,
            input10:input10,
            input11:input11,
            input12:input12,
            input13:input13
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
                <span>주문서 작성 - MVP대행</span>
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
                            <span>아이디 종류</span>
                        </div>
                        <div className="order_right">
                            <input type="text" className="medium" onChange={handleInput2} />
                            <span>예시: 넥슨,메이플,구글,페북,네이버</span>
                        </div>
                    </div>
                    <div className="order_line">
                        <div className="order_left">
                            <span>아이디</span>
                        </div>
                        <div className="order_right">
                            <input type="text" className="medium" onChange={handleInput3} />
                        </div>
                    </div>
                    <div className="order_line">
                        <div className="order_left">
                            <span>비밀번호</span>
                        </div>
                        <div className="order_right">
                            <input type="password" className="medium" onChange={handleInput4} />
                            <span>비밀번호는 암호화되어 안전하게 보관됩니다.</span>
                        </div>
                    </div>
                    <div className="order_line">
                        <div className="order_left">
                            <span>2차 비밀번호</span>
                        </div>
                        <div className="order_right">
                            <input type="password" className="medium" onChange={handleInput5} />
                            <span>비밀번호는 암호화되어 안전하게 보관됩니다.</span>
                        </div>
                    </div>
                    <div className="order_line">
                        <div className="order_left">
                            <span>전화번호(필수)</span>
                        </div>
                        <div className="order_right">
                            <input type="text" className="long" onChange={handleInput6} />
                        </div>
                    </div>
                    <div className="order_line">
                        <div className="order_left">
                            <span>본캐 레벨</span>
                        </div>
                        <div className="order_right">
                            <input type="text" className="short" onChange={handleInput7} />
                            <span>예시: 스카니아 230 (빈계정이나 활동이 거의 없는 계정의 경우 작업이 거절될 수 있습니다.)</span>
                        </div>
                    </div>
                    <div className="order_line">
                        <div className="order_left">
                            <span>접속 시간대</span>
                        </div>
                        <div className="order_right">
                            <input type="text" className="long" onChange={handleInput8} />
                            <span>(접속하시는 시간이 불규칙하시면 카톡으로 말씀해주세요.)</span>
                        </div>
                    </div>
                    <div className="order_line">
                        <div className="order_left">
                            <span>OTP가 걸려있나요?</span>
                        </div>
                        <div className="order_right">
                            <input type="text" className="short" onChange={handleInput9} />
                            <span>otp가 걸려있따면 지정PC처리해주시면 빠른 작업이 가능합니다. (넥슨 OTP권장)</span>
                        </div>
                    </div>
                    <div className="order_line">
                        <div className="order_left">
                            <span>당월 상품권으로 충전한 내역이 있나요?</span>
                        </div>
                        <div className="order_right">
                            <input type="text" className="short" onChange={handleInput10} />
                        </div>
                    </div>
                    <div className="order_line">
                        <div className="order_left">
                            <span>충전 내역이 있을 경우 액수</span>
                        </div>
                        <div className="order_right">
                            <input type="text" className="short" onChange={handleInput11} />
                        </div>
                    </div>
                    <div className="order_line">
                        <div className="order_left">
                            <span>방문 경로</span>
                        </div>
                        <div className="order_right">
                            <input type="text" className="short" onChange={handleInput12} />
                            <span>예시: 아프리카 bj, 네이버 검색</span>
                        </div>
                    </div>
                    <div className="order_line">
                        <div className="order_left">
                            <span>원하시는 금액</span>
                        </div>
                        <div className="order_right">
                            <input type="text" className="medium" onChange={handleInput13} />
                            <span>예시: 15만원 (예약시 순번이 되면 카카오톡으로 작업을 진행하기 전에 한번더 말씀드립니다)</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="order_button">
                <span>(신청 후 담당직원에게 카카오톡으로 문의주세요.)</span>
                <span onClick={submit}>등록</span>
            </div>
        </div>
    )
}

export default Order1;
