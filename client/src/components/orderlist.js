import React,{useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const Orderlist = () => {
    const [array,setArray] = useState([])

    const init = async() => {
        let url = "/api/orderlist";
        let params = {
            page:1
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

    useEffect(()=>{
        init()
    },[])

    return (
        <div className="board">
            <div className="board_header">
                <span>주문 리스트</span>
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
                </div>
            </div>
        </div>
    )
}

export default Orderlist;
