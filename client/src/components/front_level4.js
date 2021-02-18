import React,{useState,useEffect} from "react";
import axios from "axios";
import parser from "html-react-parser";

const Flevel4 = () => {
    const [array,setArray] = useState([]);

    const init  = async() => {
        let url = "/api/front";
        let params = {
            test:"test"
        }
        const config = {
            headers:{
                "content-type":"application/json"
            }
        }
        let res = await axios.post(url,params,config);
        if(res.data!=="error"){
            setArray(res.data)
        }
        console.log(res.data)
    }

    useEffect(()=>{
        init()
    },[])

    return (
        <div className="front_level4">
            <div>
                <div className="level4_title">
                    <span>MVP 대행 후기</span>
                </div>
                {
                    array?
                    <div className="level4_list">
                        <div className="leve4_reviewbox1">
                            <div className="leve4_reviewbox_levl1">
                                <span>{array[0]?array[0].re_title:""}</span>
                            </div>
                            <div className="leve4_reviewbox_levl2">
                                <span>ID :</span>
                                <span>{array[0]?array[0].user_pk:""}</span>
                            </div>
                            <div className="leve4_reviewbox_levl3">
                                <span>{array[0]?parser(array[0].re_content.replace("#imgLocation0","")):""}</span>
                            </div>
                            <div className="level4_reviewbox_levl4">
                                <span>더보기</span>
                            </div>
                        </div>
                        <div className="leve4_reviewbox2">
                            <div className="leve4_reviewbox_levl1">
                                <span>{array[1]?array[1].re_title:""}</span>
                            </div>
                            <div className="leve4_reviewbox_levl2">
                                <span>ID :</span>
                                <span>{array[1]?array[1].user_pk:""}</span>
                            </div>
                            <div className="leve4_reviewbox_levl3">
                                <span>{array[1]?parser(array[1].re_content.replace("#imgLocation0","")):""}</span>
                            </div>
                            <div className="level4_reviewbox_levl4">
                                <span>더보기</span>
                            </div>
                        </div>
                        <div className="leve4_reviewbox3">
                            <div className="leve4_reviewbox_levl1">
                                <span>{array[2]?array[2].re_title:""}</span>
                            </div>
                            <div className="leve4_reviewbox_levl2">
                                <span>ID :</span>
                                <span>{array[2]?array[2].user_pk:""}</span>
                            </div>
                            <div className="leve4_reviewbox_levl3">
                                <span>{array[2]?parser(array[2].re_content.replace("#imgLocation0","")):""}</span>
                            </div>
                            <div className="level4_reviewbox_levl4">
                                <span>더보기</span>
                            </div>
                        </div>
                        <div className="leve4_reviewbox4">
                            <div className="leve4_reviewbox_levl1">
                                <span>{array[3]?array[3].re_title:""}</span>
                            </div>
                            <div className="leve4_reviewbox_levl2">
                                <span>ID :</span>
                                <span>{array[3]?array[3].user_pk:""}</span>
                            </div>
                            <div className="leve4_reviewbox_levl3">
                                <span>{array[3]?parser(array[3].re_content.replace("#imgLocation0","")):""}</span>
                            </div>
                            <div className="level4_reviewbox_levl4">
                                <span>더보기</span>
                            </div>
                        </div>
                    </div>
                    :""
                }
            </div>
        </div>
    )
}

export default Flevel4;
