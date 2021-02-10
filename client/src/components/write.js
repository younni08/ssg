import React,{useState} from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { Redirect } from "react-router-dom";

const Write = () => {
    const [body,setBody] = useState("");

    const handleBody = (html) => {
        setBody(html)
    }

    return ( 
        <div className="board">
            <div className="board_header">
                <span>후기 작성</span>
            </div>
            <div className="board_body">
                <div className="write_body">
                    <div className="write_title">
                        <span>제목</span>
                        <input type="text" autoFocus />
                    </div>
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
                </div>
                <div className="write_button">
                    <span>후기 업로드</span>
                </div>
            </div>
        </div>
    )
}

export default Write;