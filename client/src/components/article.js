import axios from "axios";
import React, { useEffect,useState } from "react";
import {Link, Redirect} from "react-router-dom";
import parser from "html-react-parser";

const Article = () => {
    const [array,setArray] = useState([])
    const [content,setContent] = useState("");
    const [redirect,setRedirect] = useState(false);

    useEffect(()=>{
        init();
    },[])

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

    const init = async() => {
        let id = window.location.href;
        console.log(id.split("article?a=")[1])
        let url = "/api/article";
        let params = {
            id:id.split("article?a=")[1]
        }
        const config = {
            headers:{
                "content-type":"application/json"
            }
        }
        let res = await axios.post(url,params,config);
        console.log(res.data)
        if(res.data==="error"){alert("잘못된 접근입니다."); return setRedirect(true)}
        setArray(res.data)
        
        if(res.data.re_image==="undefined"){
            setContent(res.data.re_content);
        }else{
            let url = "/api/getimage";
            let params = {
                image:res.data.re_image
            }
            const config = {
                headers:{
                    "content-type":"application/json"
                }
            }
            let res2 = await axios.post(url,params,config);
            let imgtag = "<img src='data:" + res.data.re_image_type + ";base64," + res2.data + "'/>";
            let ttt = res.data.re_content.replace("#imgLocation0",imgtag);
            setContent(ttt);
            // setContent(ttt);
        }
        
        console.log(res.data)

    }
    
    const remove = async() => {
        let id = window.location.href;
        let url = "/api/bbsremove";
        let token = getCookie("token");
        let user_pk = cutToken(token)
        let params = {
            id:id.split("article?a=")[1],
            user_pk:user_pk
        }
        const config = {
            headers:{
                "content-type":"application/json"
            }
        }
        let res = await axios.post(url,params,config);
        if(res.data==="fail") return alert("권한이 없습니다.")
        if(res.data==="success") { setRedirect(true);return alert("삭제되었습니다.")}
    }

    return (
        <div className="board">
            <div className="board_header">
                <span>이용 후기</span>
            </div>
            <div className="article">
                <div>
                    <div className="article_title">
                        <span>{array.re_title}</span>
                    </div>
                    <div className="article_info">
                        <span>글쓴이: {array.user_pk}</span>
                        <div>
                            <span>조회수 {array.re_view_cnt}</span>
                            {/* <span>댓글 </span> */}
                        </div>
                    </div>
                    <div className="article_body">
                        {
                            // array.re_content
                            parser(content)
                        }
                    </div>
                    <div className="article_bottom">
                        <Link to="/review">
                            <span><i className="xi-bars xi-x" />&nbsp;목록</span>
                        </Link>
                        <span onClick={remove}>삭제</span>
                    </div>
                    {
                        redirect?<Redirect to="/review" />:""
                    }
                </div>
            </div>
        </div>
    )
}

export default Article;