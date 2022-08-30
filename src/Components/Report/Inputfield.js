import "../../assets/css/containers/_inputField.scss";
import CheckIcon from "@mui/icons-material/Check";
import { useEffect, useState } from "react";

export function Inputfield(props) {
  const [repairAmount, setrepairAmount] = useState("");
  const handleRepair = (value, elemId) => {
    let baseElem = document.getElementById(elemId);
    if (value === "") {
      setrepairAmount(value);
      baseElem.style.setProperty('display', 'none', 'important'); //display style changed from 'none' to 'block' to show the tick mark when there is no character in the text box
    } else {
      setrepairAmount(value);
      baseElem.style.setProperty('display', 'block', 'important');
    }
  };
  const repairAmountHandler = (e, value, elemId) => {
    let baseElem = document.getElementById(elemId);
    if(baseElem.style?.display === 'block') {
      baseElem.style.display = 'none';
    } else if(baseElem.style?.display === '') {
      baseElem.style.display = 'none';
    }
    props.repairAmountValue(e, value);
  };

  useEffect(() => {
    if(props.repairAmount) setrepairAmount(props.repairAmount);
  }, [props]);
  
  return (
    <div id={props.elemId} className={`dollar`} style={{ display: "none" }}>
      <input
        className="dollar-input"
        type="number"
        min="0"
        onKeyDown={(evt) => ["e", "E", "+", "-",'a','b','c','d','f','g','h','i','j','k','l', 'm','n','o','p','q','r','s','t',
        'u','v','w','x','y','z','A','B','C','D', 'F','G','H','I','J',
        'K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'].includes(evt.key) && evt.preventDefault()}
        step="0.01"
        onWheel={(e) => e.target.blur()}
        value={repairAmount}
        onChange={(e) => handleRepair(e.target.value, `inpt-${props.elemId}`)}
      />
      <span>
        <CheckIcon
          id={`inpt-${props.elemId}`}
          onClick={(e) => repairAmountHandler(e, repairAmount, `inpt-${props.elemId}`)}
          className={`inpt-checkicon`}
        />
      </span>
    </div>
  );
}
