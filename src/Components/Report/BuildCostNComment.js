import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Inputfield } from './Inputfield';
import { Textinput } from './Textinput';
import ChatIcon from '@mui/icons-material/Chat';
import '../../assets/css/containers/_buildCostNComment.scss';
import '../../assets/css/containers/_report.scss';
import * as React from 'react';

export function BuildCostNComment(props) {
    const handleTooltip = (elemId) => {
        let svgElem = document.getElementById(elemId);
        if(svgElem.style.display === 'none') {
            svgElem.style.display = 'block';
        } else {
            svgElem.style.display = 'none';
        }
    };

    const handleTooltipComment = (elemId) => {
        let svgElem = document.getElementById(elemId);
        if(svgElem.style.display === 'none') {
            svgElem.style.display = 'block';
        } else {
            svgElem.style.display = 'none';
        }
    };
    const handleCommentChange = React.useCallback((e, value, elemId) => {
        handleTooltipComment(elemId);
        props.handleCommentChange(e, value);
    }, [props]);

    const handleAmtChange = React.useCallback((e, value, elemId) => {
        handleTooltip(elemId);
        props.handleAmountChange(e, value);
    }, [props]);

    React.useEffect(() => {
        let elem = document.getElementsByClassName(`accordin-drop-down-content`);
        for(let i=0; i<elem.length; i++) {
            elem[i].style.setProperty('display', 'none', 'important');
        }
    }, []);

    return  (
        <>
            <div id={props.elemId} style={{ display: props.isRepairItemSelected !== 0 ? 'block' : 'none' }} className={`report-card-checkbox-content`}>
                <AttachMoneyIcon
                    className={props.initialCost !== null ?"report-card-checkbox-dollar-icon-active":"report-card-checkbox-dollar-icon"}
                    onClick={() => handleTooltip(`dollarPopup-${props.elemIndex}`)} 
                />
                <div className={`inputfield-wrapper`}>
                    <Inputfield
                        elemId={`dollarPopup-${props.elemIndex}`}
                        repairAmount={props.initialCost}
                        // initialCost={props.initialCost}
                        className={`inputfield-content`}
                        repairAmountValue={(e, value) => handleAmtChange(e, value, `dollarPopup-${props.elemIndex}`)} />
                </div>
                <ChatIcon
                    className={props.initialComment !== null ?"report-card-checkbox-chat-icon-active":"report-card-checkbox-chat-icon"}
                    onClick={() => handleTooltipComment(`chatPopup-${props.elemIndex}`)} 
                />
                <div className={`textarea-wrapper`}>
                    <Textinput
                        elemId={`chatPopup-${props.elemIndex}`}
                        repairComment={props.initialComment}
                        // initialComment={props.initialComment}
                        elemHeight={document.getElementById(props.resizeElemId) !== null ? document.getElementById(props.resizeElemId).parentNode.parentNode.offsetHeight : 195}
                        repairCommentValue={(e, value) => handleCommentChange(e, value, `chatPopup-${props.elemIndex}`)} />
                </div>
            </div>
        </>
    );
}