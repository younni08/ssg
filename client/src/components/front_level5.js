import React,{useState,useEffect} from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import {Link} from "react-router-dom";
import axios from "axios";
import parser from "html-react-parser";

const Flevel5 = () => {
    const [list,setList] = useState([])
    const [tt,setTt] = useState("")
    const init = async() => {
        let url = "/api/getbanner";
        let params = {

        }
        const config = {
            headers:{
                "content-type":"application/json"
            }
        }
        let res = await axios.post(url,params,config);
        console.log(res.data)
        let array = [];
        if(res.data!==undefined||res.data!==null||res.data!==""||res.data!=="error"){
            for(let i=0;i<res.data.length;i++){
                let imgtag = "<img src='data:" + res.data[i].type + ";base64," + res.data[i].image + "'/>";
                array[i] = imgtag;
                setTt(imgtag)
            }
            setList(array)
        }

    }
    useEffect(()=>{
        init()
    },[])

    return ( 
        <div className="front_level5">
            <div className="front_level5_left">
                <div className="level5_title">
                    <span>배너</span>
                    <span>Banner</span>
                </div>
                <div  className="level5_image">
                    <Carousel autoPlay infiniteLoop>
                        {
                            list?list.map((c,index)=>{
                                return (
                                    <div key={index}>
                                        {
                                            parser(c)
                                        }
                                        {/* <p className="legend">Legend 1</p> */}
                                    </div>
                                )
                            })
                            :""
                        }
                    </Carousel>
                </div>
            </div>
            <div className="front_level5_right">
                <div className="level5_title">
                    <span>초보자 가이드</span>
                    <span>앨리스 온라인을 더 쉽게 이용할 수 있는 초보자 가이드</span>
                </div>
                <div  className="level5_image">
                    <Link to="/userguide">

                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Flevel5;