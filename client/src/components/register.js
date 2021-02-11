import React,{useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

const bcrypt = require('bcryptjs');
const saltRounds = 10;

const Register = () => {
    const [input1,setInput1] = useState("");
    const [input2,setInput2] = useState("");
    const [input3,setInput3] = useState("");
    const [input4,setInput4] = useState("");
    const [checkPass,setCheckPass] = useState(true);
    const [clicked,setClicked] = useState(false);

    // 회원가입중 잠시만 기다려주세요;

    const getRegister = async() => {
        if(clicked===true) return alert("잠시만 기다려주세요.")
        setClicked(true);
        let url = "/api/register";

        if(input1===""||input1===undefined) return alert("아이디를 입력해주세요.");
        if(input2===""||input2===undefined) return alert("비밀번호를 입력해주세요.");
        if(input4===""||input4===undefined) return alert("이메일를 입력해주세요.");
        
        let params = {
            id:input1,
            pass:input2,
            email:input4
        };

        const config = {
            headers:{
                "content-type":"application/json"
            }
        }
        let res = await axios.post(url,params,config);
        setClicked(false);
        if(res.data === "success") return alert("회원가입되었습니다.")
        if(res.data === "empty id") return alert("아이디를 입력해주세요")
        if(res.data === "empty pass") return alert("비밀번호를 입력해주세요")
        if(res.data === "empty email") return alert("이메일를 입력해주세요")
        if(res.data === "matching email") return alert("중복된 이메일이 있습니다. 이메일를 다시 입력해주세요")
        if(res.data === "matching id") return alert("중복된 아이디이 있습니다. 아이디를 다시 입력해주세요")
    }

    const handleInput1 = (e) => {
        setInput1(e.target.value);
    }

    const handleInput2 = (e) => {
        bcrypt.hash(e.target.value, saltRounds, (err,hash) => {
            console.log(hash)
            setInput2(hash);
        })

    }

    const handleInput3 = (e) => {
        if(input2!==e.target.value){
            setCheckPass(false)
        }
        if(input2===e.target.value){
            setCheckPass(true)
        }
    }

    const handleInput4 = (e) => {
        setInput4(e.target.value);
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
                        <input type="text" autoFocus onChange={handleInput1} />
                    </div>
                    <div className="register_level1">
                        <span>비밀번호</span>
                        <input type="password" onChange={handleInput2} />
                    </div>
                    <div className="register_level1">
                        <span>비밀번호 확인</span>
                        <input type="password" onChange={handleInput3} />
                    </div>
                    {
                        checkPass ? "" : <div className="register_checkPass"><span>비밀번호가 일치하지 않습니다.</span></div>
                    }
                    <div className="register_level1">
                        <span>이메일</span>
                        <input type="email" onChange={handleInput4} />
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