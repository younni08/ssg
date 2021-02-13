import React,{useEffect, useState} from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { Redirect } from "react-router-dom";
import axios from "axios"

const Write = () => {
    const [body,setBody] = useState("");
    const [title,setTitle] = useState("");
    const [blockClick,setBlockClick] = useState(false);
    const [redirect,setRedirect] = useState(false)

    const handleBody = (html) => {
        setBody(html)
    }

    const getImgType = (string) => {
        let header = string.split(",")[0];
        let getDataStart = header.indexOf(":")
        let getDataEnd = header.indexOf(";")
        let dataType = header.substring(getDataStart+1,getDataEnd);
        return dataType;
    } 

    const cutB64 = (string) => {
        let byteString = string.split("base64,")[1];
        let stringLength = byteString.length;
        let cutString = byteString.substring(0,stringLength-2)
        return cutString
    }

    const submit = async() => {
        console.log("aaaaa")
        if(blockClick===true) return alert("잠시만 기다려주세요.");
        setBlockClick(true)
        let token = getCookie('token');
        let user_pk = cutToken(token)
        if(token === null) return alert("로그인 후 이용하세요");
        let url = "/api/adminwrite";
        const formData = new FormData();
        let imgCnt =0;
        const config = {
            headers : {
                "content-type" : "multipart/form-data"
            }
        };
        
        if(body.match(/<img/g)!==null){
            imgCnt = body.match(/<img/g).length
            let temphtml = body;
            let temp = ""
            let substring = "";
            let date = new Date();

            for(let i=0;i<imgCnt;i++){
                if(i === 0){
                    let begin = temphtml.indexOf("<img");
                    let end = temphtml.indexOf('">');
                    substring = temphtml.substring(begin,end+2)
                    temp = temphtml.replace(substring,"#imgLocation"+i);
                }else{
                    let begin = temp.indexOf("<img");
                    let end = temp.indexOf('">');
                    substring = temp.substring(begin,end+2)
                    temp = temp.replace(substring,"#imgLocation"+i);
                }
                let byteString = cutB64(substring)
                let imagetype = getImgType(substring)
                let fontImage = base64ToBlob(byteString,imagetype);
                formData.append('image',fontImage,user_pk+date.getTime())
                formData.append('image_name',user_pk+date.getTime())
                formData.append('image_type',imagetype)
            }
            formData.append("re_title",title);
            formData.append("re_content",temp);
            formData.append("token",token);
            formData.append("user",user_pk);
            formData.append("checkImage",true)
        }else{
            // no image
            let temphtml = body;
            if(temphtml==="") return alert("내용을 입력해주세요.")
            formData.append("re_title",title);
            formData.append("re_content",temphtml);  
            formData.append("token",token);
            formData.append("user",user_pk);
            formData.append("checkImage",false)
        }

        for (let p of formData){
            console.log(p);
        }
        // setBlockClick(false)
        let res = await axios.post(url,formData,config);
        if(res.data==="success") return setRedirect(true)
        console.log(res.data)
    }

    const handleTitle = (e) => {
        setTitle(e.target.value);
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

    useEffect(()=>{
        // let token = getCookie("token");
        // console.log(token);
    })

    function base64ToBlob(base64, mime){
        mime = mime || '';
        var sliceSize = 1024;
        var byteChars = window.atob(base64);
        var byteArrays = [];

        for (var offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
            var slice = byteChars.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }
        return new Blob(byteArrays, {type: mime});
    }

    return ( 
        <div className="board">
            <div className="board_header">
                <span>공지사항</span>
            </div>
            <div className="board_body">
                <div className="write_body">
                    <div className="write_title">
                        <span>제목</span>
                        <input type="text" autoFocus onChange={handleTitle} />
                    </div>
                    <span className="write_info">Tip: 사진은 한장만 업로드가 가능합니다.</span>
                    <form>
                        <ReactQuill
                            onChange={handleBody}
                            modules={{
                                toolbar: {
                                    container: [
                                        [{ header: [1,2,false]}],
                                        ['bold', 'italic', 'underline'],
                                        [{ color: [] }, { background: [] }],
                                        [{ list: 'ordered' }, { list: 'bullet' }],
                                        ['blockquote', 'image']
                                    ]
                                }
                            }}
                        />
                    </form>
                </div>
                <div className="write_button">
                    <span onClick={submit}>공지 업로드</span>
                </div>
            </div>
            {
                redirect?<Redirect to="/notification" />:""
            }
        </div>
    )
}

export default Write;