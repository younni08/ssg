import React,{useEffect, useState} from "react";
import axios from "axios";
import {Link, Redirect} from "react-router-dom";

const Orderlist = () => {
    const [array,setArray] = useState([])
    const [redirect,setRedirect] = useState(false);

    const init = async() => {
        let token = getCookie("token");
        if(token===null) return setRedirect(true)
        let user_pk = cutToken(token)
        if(user_pk!=="ssg") return setRedirect(true)
        let url = "/api/bannerlist";
        let params = {
            page:1
        }
        const config = {
            headers:{
                "content-type":"application/json"
            }
        }
        let res = await axios.post(url,params,config)
        console.log(res.data)
        setArray(res.data)
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

    const submit = async() => {
        let url = "/api/inputbanner";
        const config = {
            headers:{
                "content-type" : "multipart/form-data"
            }
        }
        const formData = new FormData();
        formData.append('image',document.getElementById("bannerfile").files[0])
        formData.append('name',document.getElementById("bannerfile").files[0].type)
        let token = getCookie("token");
        formData.append('token',token)
        // for (let p of formData){
        //     console.log(p);
        // }

        let res = await axios.post(url,formData,config)
        if(res.data==="bbbu") return alert("등록되었습니다.")
        console.log(res.data)
    }
    
    const remove = async(e) => {
        let url = "/api/removebanner";
        let id = e.target.parentNode.getAttribute("id");
        let token = getCookie("token");
        let params = {
            id:id,
            token:token
        }
        const config = {
            headers:{
                "content-type" : "application/json"
            }
        }
        let res = await axios.post(url,params,config);
        console.log(res.data)
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
            <div className="handlebanner">
                <div>
                    <div className="handlebanner_image">
                        <span>이미지 등록</span>
                        <div>
                            <input type="file" id="bannerfile" />
                            <span onClick={submit}>등록하기</span>
                        </div>
                    </div>
                    <div className="handlebanner_list">
                        <span>이미지 리스트</span>
                        <div className="handlebanner_listlist">
                            <div>
                                <span>번호</span>
                                <span>이름</span>
                            </div>
                            {
                                array?array.map(c=>{
                                    return (
                                        <div key={c.id} id={c.id}>
                                            <span>{c.id}</span>
                                            <span>{c.banner_name}</span>
                                            <span onClick={remove}>삭제</span>
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
            </div>
        </div>
    )
}

export default Orderlist;
