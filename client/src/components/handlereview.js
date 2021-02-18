import axios from "axios";
import React,{useEffect,useState} from "react";
import {Link, Redirect} from "react-router-dom";

const Notification = () => {
    const [list,setList] = useState([]);
    const [pageArray,setPageArray] = useState([]);
    const [redirect,setRedirect] = useState(false);
    const [list2,setList2] = useState([]);

    useEffect(()=>{
        init();
    },[window.location.href])

    const init = async() => {
        let token = getCookie("token");
        if(token===null) return setRedirect(true)
        let user_pk = cutToken(token)
        if(user_pk!=="ssg") return setRedirect(true)
        console.log("init")
        let page = window.location.href;
        if(page.split("handlereview?p=")[1]===undefined){
            page = 1;
        }else{
            page = page.split("handlereview?p=")[1];
        }

        let url = "/api/review";
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
        let url2 = "/api/notification";
        let params2 = {
            page:1
        };
        let res2 = await axios.post(url2,params2,config)
        setList2(res2.data.Array)
        let t = Math.ceil(res.data.length/20)
        console.log(res.data)
        paging(t,page)
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

    const getCookie = (name) => {
        var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return value? value[2] : null;
    }

    const removeSuper = async(e) => {
        let id = e.target.parentNode.getAttribute("id");
        let token = getCookie("token")
        let url = "/api/bbsremoveSuper";
        let params = {
            token:token,
            id:id
        }
        const config = {
            headers:{
                "content-type":"application/json"
            }
        }
        let res = await axios.post(url,params,config)
        if(res.data==="success") return alert("삭제되었습니다.")
        console.log(res.data)
    }

    const removeSuper22 = async(e) => {
        let id = e.target.parentNode.getAttribute("id");
        id = id.substr(1);
        let token = getCookie("token")
        let url = "/api/noticeremoveSuper";
        let params = {
            token:token,
            id:id
        }
        const config = {
            headers:{
                "content-type":"application/json"
            }
        }
        let res = await axios.post(url,params,config)
        if(res.data==="success") return alert("삭제되었습니다.")
        console.log(res.data)
    }

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
            <div className="board_body">
                <div className="board_content">
                    <div className="board_topbar">
                        <span>번호</span>
                        <span>제목</span>
                        <span>글쓴이</span>
                        <span>날짜</span>
                        <span>조회수</span>
                        <span>옵션</span>
                    </div>
                    {
                        list2?list2.map((c,index)=>{
                            return(
                                <div className="board_notice" id={"c"+c.id}>
                                    <span>공지</span>
                                    <Link to={"article2?a="+c.id}>
                                        <span>{c.re_title}</span>
                                    </Link>
                                    <span>앨리스샵</span>
                                    <span>{c.re_date?c.re_date.split("T")[0]:""}</span>
                                    <span>{c.re_view_cnt}</span>
                                    <span onClick={removeSuper22}>삭제</span>
                                </div>
                            )
                        }):""
                    }
                    {
                        list?list.map((c,index)=>{
                            return(
                                <div className="board_bar" id={c.id}>
                                    <span>{c.id}</span>
                                    <Link to={"article?a="+c.id}>
                                        <span>{c.re_title}</span>
                                    </Link>
                                    <span>{c.user_pk}</span>
                                    <span>{c.re_date?c.re_date.split("T")[0]:""}</span>
                                    <span>{c.re_view_cnt}</span>
                                    <span onClick={removeSuper}>삭제</span>
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
                                    <Link to={"/handlereview?p="+c} key={c}>
                                        <span>{c}</span>
                                    </Link>
                                )
                            }):""
                        }
                        {
                            redirect?<Redirect to="/" />:""
                        }
                    </div>
                    <span>삭제 클릭시 원클릭 삭제되니 주의!</span>
                </div>
            </div>
        </div>
    )
}

export default Notification;