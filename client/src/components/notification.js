import axios from "axios";
import React,{useEffect,useState} from "react";
import {Link} from "react-router-dom";

const Notification = () => {
    const [list,setList] = useState([]);
    const [pageArray,setPageArray] = useState([]);

    useEffect(()=>{
        init();
    },[window.location.href])

    const init = async() => {
        console.log("init")
        let page = window.location.href;
        if(page.split("notification?p=")[1]===undefined){
            page = 1;
        }else{
            page = page.split("notification?p=")[1];
        }

        let url = "/api/notification";
        let params = {
            page:page
        };
        const config = {
            headers:{
                "content-type":"application/json"
            }
        }
        let res = await axios.post(url,params,config)
        setList(res.data.Array)
        let t = Math.ceil(res.data.length/20)
        console.log(res.data)
        paging(t,page)
    }

    const paging = (totalpage,currentpage) => {
        let totalPagee = totalpage;
        let currentPagee = currentpage;
        let temp_viewArray = [];
        if(totalPagee < 7||currentPagee<4){
            for(let i=1;i<8;i++){
                if(i<totalPagee+1){
                    temp_viewArray[i] = i;
                }
            }
        }else{
            let limit = totalPagee-currentPagee;
            if(currentPagee>3&&limit>2){
                for(let i=(Number(currentPagee)-3);i<(Number(currentPagee)+4);i++){
                    temp_viewArray[i] = i;
                }
            }else{
                if(currentPagee>3&&limit>1){
                    for(let i=(Number(currentPagee)-4);i<(Number(currentPagee)+3);i++){
                        temp_viewArray[i] = i;
                    }
                }else{
                    if(Number(currentPagee)>3&&limit>0){
                        for(let i=(Number(currentPagee)-5);i<(Number(currentPagee)+2);i++){
                            temp_viewArray[i] = i;
                        }
                    }else{
                        if(Number(currentPagee)>3&&limit===0){
                            for(let i=(Number(currentPagee)-6);i<(Number(currentPagee)+1);i++){
                                temp_viewArray[i] = i;
                            }
                        }
                    }
                }   
            }
        }
        setPageArray(temp_viewArray)
    }


    return ( 
        <div className="board">
            <div className="board_header">
                <span>공지사항</span>
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
                                    <Link to={"notice?a="+c.id}>
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
                        {
                            pageArray?pageArray.map(c=>{
                                console.log(c)
                                return (
                                    <Link to={"/notification?p="+c} key={c}>
                                        <span>{c}</span>
                                    </Link>
                                )
                            }):""
                        }
                    </div>
                    {/* <Link to="/adminwrite"> */}
                        <span className="hidden"></span>
                    {/* </Link> */}
                </div>
            </div>
        </div>
    )
}

// 공지사항 작성은 관리자만
// 메인에 후기 띄우는거
// 메인에 후기 선택할 수 있게

export default Notification;