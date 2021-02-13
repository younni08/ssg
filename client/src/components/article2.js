import axios from "axios";
import React, { useEffect,useState } from "react";
import {Link, Redirect} from "react-router-dom";
import parser from "html-react-parser";

const Article = () => {
    const [array,setArray] = useState([])
    const [content,setContent] = useState("");
    const [redirect,setRedirect] = useState(false);
    const [dataString,setDataString] = useState("");
    const [imageType,setImageType] = useState("");

    useEffect(()=>{
        init();
    },[])

    // useEffect(()=>{
    //     init();
    // },[dataString])

    const getImage = async(image) => {
        let url = "/api/getimage";
        let params = {
            image:image
        }
        const config = {
            headers:{
                "content-type":"application/json"
            }
        }
        let res = await axios.post(url,params,config);
        setDataString(res.data)
    }

    const init = async() => {
        let id = window.location.href;
        console.log(id.split("notice?a=")[1])
        if(id.split("notice?a=")[1]===undefined) return 0;
        let url = "/api/notice";
        let params = {
            id:id.split("notice?a=")[1]
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
    // 호영두고보자

    return (
        <div className="board">
            <div className="board_header">
                <span>공지사항</span>
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