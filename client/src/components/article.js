import axios from "axios";
import React, { useEffect,useState } from "react";
import {Link} from "react-router-dom";
import parser from "yargs-parser";

const Article = () => {
    const [array,setArray] = useState([])

    useEffect(()=>{
        init();
    },[])

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
        setArray(res.data)
        
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
                            parser(<div></div>)
                        }
                    </div>
                    <div className="article_bottom">
                        <Link to="/review">
                            <span><i className="xi-bars xi-x" />&nbsp;목록</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Article;