import React,{useEffect, useState} from "react";
import axios from "axios";
import {Link, Redirect} from "react-router-dom";

const Orderlist = () => {
    const [array,setArray] = useState([])
    const [redirect,setRedirect] = useState(false);

    const init = async() => {
        let url = "/api/orderlist";
        let token = getCookie("token");
        if(token===null) return setRedirect(true)
        let user_pk = cutToken(token)
        if(user_pk!=="ssg") return setRedirect(true)
        let params = {
            page:1,
            token:token
        }
        const config = {
            headers:{
                "content-type":"application/json"
            }
        }
        let res = await axios.post(url,params,config)
        setArray(res.data.Array)
        console.log(res.data)
        console.log(res.data.Array[0])
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

    useEffect(()=>{
        init()
    },[])

    return (
        <div className="board">
            <div className="board_header">
                <Link to="/orderlist">
                    <span>주문 리스트</span>
                </Link>
                <Link to="/handlebanner">
                    <span>배너 설정</span>
                </Link>
                <Link to="/handlereview">
                    <span>리뷰 삭제</span>
                </Link>
                <Link to="/ssgwrite">
                    <span>공지 작성</span>
                </Link>
            </div>
            <div className="order">
                <div className="order_list">
                    <div className="board_topbar">
                        <span>번호</span>
                        <span>종류</span>
                        <span>글쓴이</span>
                        <span>날짜</span>
                    </div>
                    {
                        array?array.map((c,index)=>{
                            return(
                                <div className="order_bar">
                                    <span>{c.id}</span>
                                    <Link to={"orderview?a="+c.id}>
                                        <span>{c.order_type}</span>
                                    </Link>
                                    <span>{c.order_1}</span>
                                    <span>{c.re_date?c.re_date.split("T")[0]:""}</span>
                                </div>
                            )
                        }):""
                    }
                    {
                        redirect?<Redirect to="/" />:""
                    }
                </div>
            </div>
        </div>
    )
}

export default Orderlist;
