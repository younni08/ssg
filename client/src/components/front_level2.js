import React,{useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const Flevel2 = () => {
    const [uid,setUid] = useState("");
    const [upw,setUpw] = useState("");
    const [clicked,setClicked] = useState(false);
    const [id,setId] = useState("");
    const [login,setLogin] = useState(false);

    const setCookie = (name, value, exp) => {
        var date = new Date();
        date.setTime(date.getTime() + exp*60*60*1000*2);
        document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
    };

    const deleteCookie = (name) => {
        document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
    }

    const getCookie = (name) => {
        var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return value? value[2] : null;
    }

    const cutToken = (token) => {
        if(token === null){
            return undefined
        }else{
            let temp_token = token;
            let getdot = temp_token.indexOf(".")
            let getdot2 = temp_token.lastIndexOf(".")
            let info = temp_token.substring(getdot+1,getdot2);
            let info2 = atob(info)
            let getdot3 = info2.indexOf('user_id":"');
            let getdot4 = info2.lastIndexOf('","iat');
            let user_id = info2.substring(getdot3+10,getdot4);
            return user_id;
        }
    }

    const checkLogin = async() => {
        deleteCookie("token")
        if(clicked===true) return alert("잠시만 기다려주세요.")
        setClicked(true);
        if(uid===""||uid===undefined) return alert("아이디를 입력해주세요.")
        if(upw===""||upw===undefined) return alert("비밀번호를 입력해주세요.")
        let url = "/api/login";
        let params = {
            id:uid,
            pw:upw
        }
        const config = {
            headers:{
                "content-type":"application/json"
            }
        }
        let res = await axios.post(url,params,config);
        setClicked(false);
        if(res.data ==="login denied") return alert("아이디 혹은 비밀번호를 다시 확인해주세요.")
        setId(res.data.user_id)
        setLogin(true)
        setCookie("token",res.data.token,2)
        console.log(res.data)
    }

    const handleId = (e) => {
        setUid(e.target.value)
    }

    const handlePass = (e) => {
        setUpw(e.target.value)
    }

    const logout = () => {
        setLogin(false);
        deleteCookie('token');
    }

    useEffect(()=>{
        let token = getCookie("token");
        if(token!==null){
            setLogin(true)
            let aa = cutToken(token)
            setId(aa)
            console.log(aa)
        };
    },[])

    const talk = () => {
        window.location.href="https://pf.kakao.com/_DmMVxb/chat";
    }

    const preparing = () => {
        return alert("상품 준비중입니다.")
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
                    {
                        login?
                        <div className="front_level2_mid">
                            <div className="front_level2_mid_login">
                                <div><span>{id}님 환영합니다.</span><Link to="/orderlist">주문 확인</Link></div>
                                <span onClick={logout}>로그아웃</span>
                            </div>
                        </div>:
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
                                    <input type="text" onChange={handleId}  />
                                </div>
                                <div className="front_login_left_level1">
                                    <span><i className="xi-lock-o xi-x"></i></span>
                                    <input type="password" onChange={handlePass} />
                                </div>
                            </div>
                            <div className="front_login_right">
                                <span onClick={checkLogin}>로그인</span>
                                <div>
                                    <Link to="/register"><span>회원가입</span></Link>
                                </div>
                            </div>
                        </div>
                    }
                    <div className="front_level2_right">
                        <div className="front_product_left">
                            <span><i className="xi-gift-o xi-4x"></i></span>
                            <span>Best</span>
                        </div>
                        <div className="front_product_right">
                            <div className="front_product_right_leve1l">
                                <span><i className="xi-star-o xi-x"></i> MVP대행 ##만원</span>
                                <Link to="/ordermvp">
                                    <span>구매하기</span>
                                </Link>
                            </div>
                            <div className="front_product_right_leve1l">
                                <span><i className="xi-star-o xi-x"></i> 넥슨 캐시 ##만원</span>
                                {/* <Link to="/ordercash"> */}
                                    <span onClick={preparing}>구매하기</span>
                                {/* </Link> */}
                            </div>
                            <div className="front_product_right_leve1l">
                                <span><i className="xi-star-o xi-x"></i> 메이플 포인트 ##만원</span>
                                <Link to="/orderpoint">
                                    <span>구매하기</span>
                                </Link>
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