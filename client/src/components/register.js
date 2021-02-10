import React,{useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

const Register = () => {
    const [input1,setInput1] = useState("");
    const [input2,setInput2] = useState("");
    const [input3,setInput3] = useState("");
    const [input4,setInput4] = useState("");

    const getRegister = async() => {
        let url = "/api/register";
        let params = {
            test:"test"
        };
        const config = {
            headers:{
                "content-type":"application/json"
            }
        }
        let res = await axios.post(url,params,config);
        console.log(res.data)
        console.log("register");
    }

    return ( 
        <div className="board">
            <div className="board_header">
                <span>회원가입</span>
            </div>
            <div className="board_body">
                <div className="register">
                    <div className="register_level1">
                        <span>아이디</span>
                        <input type="text" autoFocus />
                    </div>
                    <div className="register_level1">
                        <span>비밀번호</span>
                        <input type="password" />
                    </div>
                    <div className="register_level1">
                        <span>비밀번호 확인</span>
                        <input type="password" />
                    </div>
                    <div className="register_level1">
                        <span>이메일</span>
                        <input type="email" />
                    </div>
                    <div className="register_level5">
                        <span onClick={getRegister}>회원가입</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;