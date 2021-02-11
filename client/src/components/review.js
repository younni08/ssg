import axios from "axios";
import React,{useEffect,useState} from "react";
import {Link} from "react-router-dom";

const Notification = () => {
    const [list,setList] = useState([]);
    const [page,setPage] = useState(0);

    useEffect(()=>{
        init();
    },[])

    const init = async() => {
        let url = "/api/review";
        let params = {
            page:1
        };
        const config = {
            headers:{
                "content-type":"application/json"
            }
        }
        let res = await axios.post(url,params,config)
        setList(res.data.Array)
        if(res.data.length<20){
            setPage(1)
        }
        console.log(res.data)
    }

    const paging = () => {

    }


    return ( 
        <div className="board">
            <div className="board_header">
                <span>이용 후기</span>
            </div>
            <div className="board_body">
                <div className="board_content">
                    <div className="board_topbar">
                        <span>번호</span>
                        <span>제목</span>
                        <span>글쓴이</span>
                        <span>날짜</span>
                        <span>조회수</span>
                    </div>
                    {
                        list?list.map((c,index)=>{
                            return(
                                <div className="board_bar">
                                    <span>{c.id}</span>
                                    <Link to={"article?a="+c.id}>
                                        <span>{c.re_title}</span>
                                    </Link>
                                    <span>{c.user_pk}</span>
                                    <span>{c.re_date?c.re_date.split("T")[0]:""}</span>
                                    <span>{c.re_view_cnt}</span>
                                </div>
                            )
                        }):""
                    }
                </div>
                <div className="board_page">
                    <span></span>
                    <div>
                        <span>이전</span>
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>이후</span>
                    </div>
                    <Link to="/write">
                        <span>글쓰기</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Notification;