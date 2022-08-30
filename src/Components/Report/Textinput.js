
import '../../assets/css/containers/_inputField.scss';
import CheckIcon from '@mui/icons-material/Check';
import { useState, useEffect } from 'react';

export function Textinput(props) {
    const [commentVal, setcommentVal] = useState("");
    const handleComment = (value, elemId) => {
        let childElem = document.getElementById(elemId);
        if(value === '') {
            setcommentVal(value);
            childElem.style.setProperty('display', 'none', 'important');  //display style changed from 'none' to 'block' to show the tick mark when there is no character in the text box
        } else {
            setcommentVal(value);
            childElem.style.setProperty('display', 'block', 'important');
        }
    }

    const handleKeyPressedEvent = (event, elemId) => {
        let childElem = document.getElementById(elemId);
        let key = event.keyCode;
        if(key === 8 || key === 46) {
            setcommentVal('');
            childElem.style.setProperty('display', 'block', 'important');
        }
    }

    const commentChangeHandler = (e, value, elemId) => {
        let baseElem = document.getElementById(elemId);
        if(baseElem.style.display === 'block') {
            baseElem.style.display = 'none';
        } else if(baseElem.style.display === '') {
            baseElem.style.display = 'none';
        }
        props.repairCommentValue(e, value);
    }

    useEffect(() => {
        if(props.repairComment) setcommentVal(props.repairComment)
    }, [props]);
    
    return (
        <>
            <div id={props.elemId}
                style={{
                    display: 'none'
                }}
            >
                <textarea 
                    rows="3" 
                    style={{
                        border: '1px solid #2491EB',
                        width: '280px',
                        height: '68px',
                        borderRadius: '3px',
                        backgroundColor: 'white',
                        paddingLeft: "1px",
                        resize: "vertical",
                        maxHeight: `${parseInt(props.elemHeight) < 200 ? '100px' : (parseInt(props.elemHeight)*0.75)+'px'}`
                    }}
                    contenteditable="true"
                    value={commentVal}
                    onChange={(e) => handleComment(e.target.value, `comment-${props.elemId}`)}
                    onKeyDown={(e) => handleKeyPressedEvent(e, `comment-${props.elemId}`)}>
                </textarea>
                <span><CheckIcon id={`comment-${props.elemId}`} onClick={(e) => commentChangeHandler(e, commentVal, `comment-${props.elemId}`)} className={`comment-checkicon`}/></span>
            </div>
        </>
    );
}