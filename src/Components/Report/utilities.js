import server from '../../services/server';

let repairCountArry = [];
let filteredFlags = [];
let repairObj = [];
let countObj = [];
let otherRatings = [];
// let reCount = 0; // gloabl variable for maintaining count
let ttlAmt = 0; // gloabl variable for maintaining amount
// let totalAmt = 0;

export const drawEclipse = (boxWidth, boxHeight, imgWidth, imgHeight, decoration_begin_horizontal, decoration_end_horizontal, decoration_begin_vertical, decoration_end_vertical) => {
  const _endY = parseFloat(decoration_end_vertical);
  const _startY = parseFloat(decoration_begin_vertical);
  const _endX = parseFloat(decoration_end_horizontal);
  const _startX = parseFloat(decoration_begin_horizontal);
  let boxRatio = parseFloat(boxHeight/boxWidth);
  let imgRatio = parseFloat(imgHeight/imgWidth);
  let originalImgWidth = imgWidth;
  let originalImgHeight = imgHeight;

  // console.log('actual picture dimenssions', originalImgHeight,'x',originalImgWidth);
  if(boxRatio < imgRatio) {
    imgHeight = boxHeight;
    imgWidth = parseFloat(boxHeight * parseFloat(originalImgWidth/originalImgHeight));
    // console.log('calculated picture dimenssions', imgWidth,'x',imgHeight);
  } else {
    imgWidth = boxWidth;
    imgHeight = parseFloat(boxWidth * parseFloat(originalImgHeight/originalImgWidth));
  }

  let offsetX = parseFloat(boxWidth - imgWidth)*0.5;
  let offsetY = parseFloat(boxHeight - imgHeight)*0.5;

  let lineX1 = (imgWidth * _startX) + offsetX;
  let lineY1 = (imgHeight * _startY) + offsetY;
  let lineX2 = (imgWidth * _endX) + offsetX;
  let lineY2 = (imgHeight * _endY) + offsetY;

  let xx1 = parseFloat(decoration_begin_horizontal);
  let xx2 = parseFloat(decoration_end_horizontal);
  let yy1 = parseFloat(decoration_begin_vertical);
  let yy2 = parseFloat(decoration_end_vertical);
  let x1 = (xx1 * imgWidth) + offsetX;
  let x2 = (xx2 * imgWidth) + offsetX;
  let y1 = (yy1 * imgHeight) + offsetY;
  let y2 = (yy2 * imgHeight) + offsetY;
  const Vcx = (x1 + x2) / 2; 
  const Vcy = (y1 + y2) / 2;
  const Vrx = Vcx - x1;
  const Vry = Vcy - y1;

  const lengthFactorOval = (Math.sqrt(((lineX2 - lineX1) * (lineX2 - lineX1))+ ((lineY2 - lineY1) * (lineY2 - lineY1))));
  const penWidthOval = lengthFactorOval * 0.04;
  let arrowWidthOval = penWidthOval;

  if (penWidthOval < 3)
    arrowWidthOval = 3;
  if (penWidthOval > 100)
    arrowWidthOval = 100;

  return {
    'Vcx': Vcx,
    'Vcy': Vcy,
    'Vrx': Vrx,
    'Vry': Vry,
    'strokeWidth': arrowWidthOval
  }
}

export const drawLineAndArrow = (boxWidth, boxHeight, imgWidth, imgHeight, decoration_begin_horizontal, decoration_end_horizontal, decoration_begin_vertical, decoration_end_vertical) => {
  const _endY = parseFloat(decoration_end_vertical);
  const _startY = parseFloat(decoration_begin_vertical);
  const _endX = parseFloat(decoration_end_horizontal);
  const _startX = parseFloat(decoration_begin_horizontal);
  let boxRatio = parseFloat(boxHeight/boxWidth);
  let imgRatio = parseFloat(imgHeight/imgWidth);

  let originalImgWidth = imgWidth;
  let originalImgHeight = imgHeight;

  // console.log('actual picture dimenssions', originalImgHeight,'x',originalImgWidth);
  if(boxRatio < imgRatio) {
    imgHeight = boxHeight;
    imgWidth = parseFloat(boxHeight * parseFloat(originalImgWidth/originalImgHeight));
    // console.log('calculated picture dimenssions', imgWidth,'x',imgHeight);
  } else {
    imgWidth = boxWidth;
    imgHeight = parseFloat(boxWidth * parseFloat(originalImgHeight/originalImgWidth));
  }

  let offsetX = parseFloat(boxWidth - imgWidth)*0.5;
  let offsetY = parseFloat(boxHeight - imgHeight)*0.5;
  
  /* calculation for line */
  let lineX1 = (imgWidth * _startX) + offsetX;
  let lineY1 = (imgHeight * _startY) + offsetY;
  let lineX2 = (imgWidth * _endX) + offsetX;
  let lineY2 = (imgHeight * _endY) + offsetY;

  const arrowNormalPointX = -1 * (lineY2 - lineY1);
  const arrowNormalPointY = (lineX2 - lineX1);

  const PERCENT_WIDTH = 0.1;
  const PERCENT_LENGTH = 0.2;

  // find the base of the arrow
  const arowBasePointX = parseFloat(lineX2) + parseFloat(-PERCENT_LENGTH * (lineX2 - lineX1));
  const arowBasePointY = parseFloat(lineY2) + parseFloat(-PERCENT_LENGTH * (lineY2 - lineY1));

  // build the points on the sides of the arrow
  const _arrow1StartX = parseFloat(arowBasePointX) + parseFloat(PERCENT_WIDTH * arrowNormalPointX);
  const _arrow1StartY = parseFloat(arowBasePointY) + parseFloat(PERCENT_WIDTH * arrowNormalPointY);
  const _arrow2StartX = parseFloat(arowBasePointX) - parseFloat(PERCENT_WIDTH * arrowNormalPointX);
  const _arrow2StartY = parseFloat(arowBasePointY) - parseFloat(PERCENT_WIDTH * arrowNormalPointY);
  
  const lengthFactor = (Math.sqrt(((lineX2 - lineX1) * (lineX2 - lineX1))+ ((lineY2 - lineY1) * (lineY2 - lineY1))));
  const penwWidth = lengthFactor * 0.04;
  let arrowWidth = penwWidth;

  if(penwWidth < 2) {
    arrowWidth = 2;
  } else if(penwWidth > 100) {
    arrowWidth = 100;
  }

  return {
    'LineX1': lineX1,
    'LineX2': lineX2,
    'LineY1': lineY1,
    'LineY2': lineY2,
    'arrowStartX1': _arrow1StartX,
    'arrowStartX2': _arrow2StartX,
    'arrowStartY1': _arrow1StartY,
    'arrowStartY2': _arrow2StartY,
    'strokeWidth': arrowWidth 
  }
  
}

export const drawText = (boxWidth, boxHeight, imgWidth, imgHeight, decoration_begin_horizontal, decoration_end_horizontal, decoration_begin_vertical, decoration_end_vertical) => {
  const _endY = parseFloat(decoration_end_vertical);
  const _startY = parseFloat(decoration_begin_vertical);
  const _endX = parseFloat(decoration_end_horizontal);
  const _startX = parseFloat(decoration_begin_horizontal);
  let X1text = imgWidth * 0;
  let Y1text = 27;

  /* if text at bottom-left point */

  let X2text = 0;
  let Y2text = imgHeight;

  /* if text at center point */

  let X3text = (imgWidth / 2 ) - 14;
  let Y3text = (imgHeight / 2) + 8;

  /* if text at top-right point */

  let X4text = imgWidth - 68;
  let Y4text = 27;

  /* if text at bottom-right point */

  let X5text = imgWidth - 68;
  let Y5text = imgHeight;

  const lengthFactor = (Math.sqrt(((_endX - _startX) * (_endX - _startX))+ ((_endY - _startY) * (_endY - _startY))));
  const penwWidth = lengthFactor * 0.04;
  let arrowWidth = 0;
  if(penwWidth < 2) {
    arrowWidth = 2;
  } else if (penwWidth < 1000) {
    arrowWidth = 3;
  } else if(penwWidth > 1000) {
    arrowWidth = 1000;
  }

  return { 
    'X1Text': X1text,
    'Y1Text': Y1text,
    'X2Text': X2text, 
    'Y2Text': Y2text, 
    'X3Text': X3text, 
    'Y3Text': Y3text, 
    'X4Text': X4text, 
    'Y4Text': Y4text, 
    'X5Text': X5text, 
    'Y5Text': Y5text,
    'strokeWidth': arrowWidth 
  }
}


export const rgb2hex = (rgba) => { //converts the rgba color to hex code - rgba as input and produce hex code as output 
    if (rgba !== "") {
      return `#${rgba
        .match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/)
        .slice(1)
        .map((n, i) =>
          (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n))
            .toString(16)
            .padStart(2, "0")
            .replace("NaN", "")
        )
        .join("")}`;
    } else {
      return "none"; // #0ead7c
    }
};

/**
 * 
 * rgba(255, 145, 67)
 * (255, 145, 67)
 * 
 * FFFF - 15
 * 1010 - A
 */

// repair-list logic start from here
export const handleTTLAmtChange = (value) => {
  ttlAmt = 0;
  let amountNodeList = document.querySelectorAll('*[id^="dollarPopup-"]');
  for (let i = 0; i < amountNodeList.length; i++) {
    let currentAmount = parseInt(amountNodeList[i].childNodes[0].value);
    let prevColor =
      amountNodeList[i].parentNode.parentNode.previousSibling.style
        .backgroundColor;
    let hexColor = rgb2hex(prevColor);
    if (hexColor !== "#cccccc") {
      if (!Number.isNaN(currentAmount) && currentAmount > 0) {
        ttlAmt += currentAmount;
      }
    }
  }

  let totalAmt = totalRepairCount();
  return { 'repairAmt': value ? value : 0, 'ttlAmt': ttlAmt, 'reCount': totalAmt.repairCount }
}

export const saveToDB = (category, data, value, comment, selected, appointmentId,isDemoUser,checkFlag) => {
    let dataObj = {};
    // dataObj.reportUrl = assetUrl;
    // dataObj.generalInformation = general_information;
    dataObj.previewItemList = "";
    // dataObj.categoryDetails = categories;

    // persistant logic
    if (repairObj.length !== 0) {
      repairObj.forEach((elem) => {
        let elemIndex = repairObj.findIndex((x) => x[category]);
        // console.log(elemIndex);
        if (!selected) {
          if (elemIndex !== -1) {
            let slectdElem = repairObj[elemIndex][category].filter(
              (x) => x.prompt === data.prompt && x.unique_card_id === data.unique_card_id
            );
            if (slectdElem.length !== 0) {
              let subElemIndex = repairObj[elemIndex][category].findIndex(
                (x) => x.prompt === slectdElem[0].prompt
              );
              if (subElemIndex !== -1)
                repairObj[elemIndex][category].splice(subElemIndex, 1);
            }
            if (repairObj[elemIndex][category].length === 0) {
              repairObj.splice(elemIndex, 1);
            }
          }
        } else {
          if (elemIndex !== -1) {
            if (elem[category] !== undefined) {
              let slectdElem = elem[category].filter(
                (x) => x.prompt === data.prompt && x.unique_card_id === data.unique_card_id
              );
              if (slectdElem.length !== 0) {
                let subElemIndex = repairObj[elemIndex][category].findIndex(
                  (x) => x.prompt === slectdElem[0].prompt
                );
                if (subElemIndex !== -1)
                  repairObj[elemIndex][category].splice(subElemIndex, 1);
                data.isRepairSelected = 1;
                data.repairAmountEntered = value;
                data.repairCommentEntered = comment;
                repairObj[elemIndex][category].push(data);
              } else {
                data.isRepairSelected = 1;
                data.repairAmountEntered = value;
                data.repairCommentEntered = comment;
                if (elemIndex !== -1) repairObj[elemIndex][category].push(data);
              }
            }
          } else {
            let items = [];
            data.isRepairSelected = 1;
            data.repairAmountEntered = value;
            data.repairCommentEntered = comment;
            items.push(data);
            repairObj.push({
              [category]: items,
            });
          }
        }
      });
    } else {
      let items = [];
      data.isRepairSelected = 1;
      data.repairAmountEntered = value;
      data.repairCommentEntered = comment;
      items.push(data);
      repairObj.push({
        [category]: items,
      });
    }

    dataObj.previewItemList = repairObj;
    // console.log(dataObj);
    // server('/addRepairList', 'POST', '', {
    //     userId: "1003746",
    //     appointmentId: appointmentId,
    //     repairListData: JSON.stringify(dataObj),
    //   })
    //   .then(
    //     (response) => {
    //       console.log(response);
    //     },
    //     (error) => {
    //       console.log(error);
    //     }
    //   );

    //commented above POST API call and saving to DB only if it is a normal user and saving to session if it is a demo user
    if(!isDemoUser){
      server('/addRepairList', 'POST', '', {
        userId: "1003746",
        appointmentId: appointmentId,
        repairListData: JSON.stringify(dataObj),
      })
      .then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error.message);
        }
      )
    }
    else{      
      sessionStorage.setItem("previewItemList", JSON.stringify(dataObj));
      let sessionData = JSON.parse(sessionStorage.getItem("reportContent"));
      sessionData.forEach((tets)=>{
        Object.values(tets).forEach((itm,index)=>{
          itm.forEach((list,i)=>{
            if(list.unique_card_id === data.unique_card_id){
              list.repairAmountEntered = data.repairAmountEntered;
              list.repairCommentEntered = data.repairCommentEntered
              if(checkFlag){
                if(list.isRepairSelected === "0") list.isRepairSelected = "1"
                else list.isRepairSelected = "0"
              }
            sessionStorage.setItem("reportContent", JSON.stringify(sessionData));
            }
          })
        })
      })
    } 
    return { 'reviewData': dataObj }
  };

  // function getTotalAmt() {
  //   let ttl_amt = 0;

  //   let elems = document.getElementsByClassName('report-card-checkbox');
  //   for(let i=0; i< elems.length; i++) {
  //     let amtRawValue = parseInt(elems[i].nextElementSibling.childNodes[1].childNodes[0].childNodes[0].value);
  //     if (!Number.isNaN(amtRawValue) && amtRawValue > 0) {
  //       ttl_amt += amtRawValue;
  //     }
  //   }

  //   return ttl_amt;
  // }

  export const totalRepairCount = () => {
    let count = 0;
    let ttl_amt = 0;

    let elems = document.getElementsByClassName('report-card-checkbox');
    for(let i=0; i< elems.length; i++) {
      // let elemUniqueId = elems[i].parentNode.nextElementSibling.childNodes[1].innerHTML;
      let amtRawValue = parseInt(elems[i].nextElementSibling.childNodes[1].childNodes[0].childNodes[0].value);
      let prevColor = rgb2hex(elems[i].style.backgroundColor);
      if(prevColor !== '#cccccc') {
        count = count + 1;
      }
      // if() {
      if (!Number.isNaN(amtRawValue) && amtRawValue > 0) {
        ttl_amt += amtRawValue;
      }
      //   count += 1;
      // }
      // console.log(elems[i].style.backgroundColor, prevColor);
    }
    // if(parseInt(data.isRepairSelected) !== 0) {
    //   count = count + 1;
    //   console.log(count, data);
    // }

    // if (!Number.isNaN(data.repairAmountEntered) && data.repairAmountEntered > 0) {
    //   ttl_amt += data.repairAmountEntered;
    // }
    return { 'repairCount': count, 'repairAmount': ttl_amt }
  }

  export const toggleActiveClass = (ele, category, data, repairCount, cntObj, repairAmount, appointmentId,isDemoUser,checkFlag) => {
    // reCount = repairCount !== 0 ? repairCount : reCount;
    countObj = countObj.length !== 0 ? countObj : cntObj;
    // totalAmt = totalAmt === 0 ? repairAmount : totalAmt;
    // console.log(repairAmount, totalAmt);
    // let rAmt = 0;
    let amtChanged = false;
    let currentElem = document.getElementById(ele.currentTarget.id);
    let elemUniqueId = document.getElementById(ele.currentTarget.id)
      .parentNode.nextElementSibling.childNodes[1].innerHTML;
    // let elemRawVal = document.getElementById(ele.currentTarget.id)
    //   .previousElementSibling.innerHTML;
    // let elemVal = elemRawVal.substring(elemRawVal.indexOf(" ") + 1);
    let nextElemId = document.getElementById(ele.currentTarget.id)
      .nextElementSibling.id;
    let nextElem = document.getElementById(nextElemId);
    // let inptVal = parseInt(nextElem.childNodes[1].childNodes[0].childNodes[0].value);
    let hexColor = rgb2hex(ele.currentTarget.style.backgroundColor);
    if (repairCountArry.length !== 0) {
      let cntIdx = countObj.findIndex((x) => x[category]);
      if (!repairCountArry.includes(ele.currentTarget.id) &&
      hexColor === "#cccccc") {
        if (data.unique_card_id === elemUniqueId) {
          repairCountArry.push(ele.currentTarget.id);
          currentElem.style.setProperty(
            "background-color",
            "#0ead7c",
            "important"
          );
          nextElem.style.setProperty("display", "block", "important");
          // reCount++;
          amtChanged = true;
          // if (!Number.isNaN(inptVal) && inptVal > 0) {
          //   totalAmt += inptVal;
          // }
          saveToDB(
            category,
            data,
            data.repairAmountEntered,
            data.repairCommentEntered,
            true,
            appointmentId,
            isDemoUser,
            checkFlag
          );
          if (cntIdx !== -1) {
            countObj[cntIdx][category][0].count++;
          } else {
            countObj.push({
              [category]: [{ category: data.categoryName, count: 1 }],
            });
          }
          // rAmt = handleTTLAmtChange(data.repairAmountEntered);
        }
      } else {
        if (
          repairCountArry.includes(ele.currentTarget.id) &&
          hexColor === "#cccccc"
        ) {
          if (data.unique_card_id === elemUniqueId) {
            currentElem.style.setProperty(
              "background-color",
              "#0ead7c",
              "important"
            );
            nextElem.style.setProperty("display", "block", "important");
            // if (reCount <= 0) {
            //   reCount = 0;
            //   if(totalAmt === 0) {
            //     totalAmt = 0;
            //   }
            // } else {
            //   reCount++;
            //   amtChanged = true;
            //   if (!Number.isNaN(inptVal) && inptVal > 0) {
            //     totalAmt += inptVal;
            //   }
            // }
            saveToDB(
              category,
              data,
              data.repairAmountEntered,
              data.repairCommentEntered,
              true,
              isDemoUser,
              checkFlag
            );
            if (cntIdx !== -1) {
              countObj[cntIdx][category][0].count++;
            } else {
              countObj.push({
                [category]: [{ category: data.categoryName, count: 1 }],
              });
            }
            // rAmt = handleTTLAmtChange(data.repairAmountEntered);
          }
        } else {
          if (data.unique_card_id === elemUniqueId) {
            currentElem.style.setProperty(
              "background-color",
              "#ccc",
              "important"
            );
            nextElem.style.setProperty("display", "none", "important");
            // if (reCount <= 0) {
            //   reCount = 0;
            //   if (totalAmt === 0) {
            //     totalAmt = 0;
            //   }
            // } else {
            //   reCount--;
            //   amtChanged = false;
            //   if (!Number.isNaN(inptVal) && totalAmt !== 0) {
            //     totalAmt -= inptVal;
            //   }
            // }
            saveToDB(
              category,
              data,
              data.repairAmountEntered,
              data.repairCommentEntered,
              false,
              appointmentId,
              isDemoUser,
              checkFlag
            );
            if (cntIdx !== -1) {
              if (!countObj[cntIdx][category][0].count <= 0)
                countObj[cntIdx][category][0].count--;
              else countObj[cntIdx][category][0].count = 0;
            } else {
              countObj.push({
                [category]: [{ category: data.categoryName, count: 1 }],
              });
            }
            // rAmt = handleTTLAmtChange(data.repairAmountEntered);
          }
        }
      }
    } else {
      // if (data.prompt === elemVal && data.unique_card_id === elemUniqueId) {
        let cntIdx = countObj.findIndex((x) => x[category]);
        if(cntIdx === -1 && hexColor !== '#cccccc') {
          repairCountArry.push(ele.currentTarget.id);
          currentElem.style.setProperty(
            "background-color",
            "#ccc",
            "important"
          );
          nextElem.style.setProperty("display", "none", "important");
          // reCount--;
          amtChanged = false;
          // if (!Number.isNaN(inptVal) && totalAmt !== 0) {
          //   totalAmt -= inptVal;
          // }
        } else {
          repairCountArry.push(ele.currentTarget.id);
          currentElem.style.setProperty(
            "background-color",
            "#0ead7c",
            "important"
          );
          nextElem.style.setProperty("display", "block", "important");
          // reCount++;
          amtChanged = true;
          // if (!Number.isNaN(inptVal) && inptVal > 0) {
          //   totalAmt += inptVal;
          // }
        }
        saveToDB(
          category,
          data,
          data.repairAmountEntered,
          data.repairCommentEntered,
          true,
          appointmentId,
          isDemoUser,
          checkFlag
        );
        if (cntIdx !== -1) {
          if (!countObj[cntIdx][category][0].count <= 0)
            countObj[cntIdx][category][0].count--;
          else countObj[cntIdx][category][0].count = 0;
        } else {
          countObj.push({
            [category]: [{ category: data.categoryName, count: 1 }],
          });
        }
        // rAmt = handleTTLAmtChange(data.repairAmountEntered);
      // }
    }

    let totalAmt = totalRepairCount();
    // console.log(totalAmt);
    return { 'repairCount': totalAmt.repairCount, 'repariCategory': category, 'ttlAmt': totalAmt.repairAmount, 'countObj': countObj, 'isAdded': amtChanged }
  };

export const handleAmountChange = (value, category, data, comment, appointmentId,isDemoUser,checkFlag) => {
    // console.log(value, data.isRepairSelected);
    handleTTLAmtChange(value);
    if(value !== null) saveToDB(category, data, value, comment, true, appointmentId,isDemoUser,checkFlag);

    return { 'repairAmount': value }
};

export const handleCommentChange = (value, category, data, amount, appointmentId,isDemoUser,checkFlag) => {
    if(value !== null) saveToDB(category, data, amount, value, true, appointmentId,isDemoUser,checkFlag);
    return { 'repairComment': value }
};

const handleFilterCondition = (filters, data) => {
  if(data.rating.includes(',')) {
    let rating = data.rating.split(',')[1];
    if(filters.includes(rating)) {
      return data;
    }
  }
}

export const filterData = (filters, repairListBckp) => {
  if(repairListBckp.rating) {
    if(filters.includes(repairListBckp.rating)) {
      return repairListBckp;
    } else {
      return handleFilterCondition(filters, repairListBckp);
    }
  }
}

export const drawerContentCounts = (reportData) => {
  // repair-list data prepration here
  // console.log(reportData);
  let acceptableTTl = [];
  let notPresentTTl = [];
  let marginalTTl = [];
  let notInspectedTTl = [];
  let defectiveTTl = [];
  let safetyTTl = [];
  let otherRatingCounts = {};
  let temp = [];

  reportData.forEach((sitems) => {
      let arrkey = Object.keys(sitems)[0];
      return sitems[arrkey].forEach((items) => {
        let rating = '';
        if(items.rating?.includes(',')) {
          rating = items.rating.split(',').pop();
        } else {
          rating = items.rating;
        }
        if (rating === "Acceptable")
          acceptableTTl.push(rating);
        else if (rating === "Defective")
            defectiveTTl.push(rating);
        else if (rating === "Marginal")
          marginalTTl.push(rating);
        else if (rating === "Not Inspected")
          notInspectedTTl.push(rating);
        else if (rating === "Not Present")
          notPresentTTl.push(rating);
        else if (rating === "safety") safetyTTl.push(rating);
        else {
          if(rating !== null) {
            if(otherRatings.length !== 0) {
              if (otherRatings.findIndex(x => x[rating]) === -1) {
                if(temp.includes(rating) !== true) {
                  temp.push(rating);
                  otherRatings.push({
                    [rating]: 1
                  });
                }
              }
            } else {
              temp.push(rating);
              let key = rating;
              otherRatings.push({
                [key]: 1
              });
            }
          }
        }
        // console.log(temp);
        if(otherRatings.findIndex(x => x[rating]) !== -1) {
          otherRatingCounts[rating] = otherRatingCounts[rating] ? otherRatingCounts[rating] + 1 : 1;
          otherRatings[otherRatings.findIndex(x => x[rating])][rating] = otherRatingCounts[rating];
        }
      });
  });

  let resp = {
    acceptableCnt: acceptableTTl.length,
    notPresentCnt: notPresentTTl.length,
    marginalCnt: marginalTTl.length,
    notInspectedCnt: notInspectedTTl.length,
    defectiveCnt: defectiveTTl.length,
    safetyCnt: safetyTTl.length,
    otherRatings: otherRatings
  }
  // console.log(resp);
  
  return resp;
}
export const returncountObj = () => countObj

export const handleFilteredFlag = (value, flag, repairListBckp) => {
    if(parseInt(repairListBckp.showOnSummary) !== 0) {
      let rating = repairListBckp.rating?.includes(',') ? repairListBckp.rating.split(',').pop() : repairListBckp.rating;
      if(flag === undefined) {
        if(!filteredFlags.includes(rating)) {
          filteredFlags.push(rating);
        }
      }
      if(!flag) {
        let idx = filteredFlags.findIndex((x) => x === value);
        if (idx !== -1) filteredFlags.splice(idx, 1);
      } else {
        if(!filteredFlags.includes(value)) {
          filteredFlags.push(value);
        }
      }
    }
    if (!flag) {
      let idx = filteredFlags.findIndex((x) => x === value);
      if (idx !== -1) filteredFlags.splice(idx, 1);
    } else {
      if (filteredFlags.length !== 0) {
          for (let i = 0; i < filteredFlags.length; i++) {
            if (!filteredFlags.includes(value)) filteredFlags.push(value);
          }
      } else {
        filteredFlags.push(value);
      }
    }
    
    if (filteredFlags.length !== 0) {
      let repairFilterObj = '';
      let filteredData = filterData(filteredFlags, repairListBckp);
      if (filteredData) {
          repairFilterObj = filteredData;
      }
        return { 'reportContent': repairFilterObj, 'activeFilters': filteredFlags }
    }

}
  // ends here