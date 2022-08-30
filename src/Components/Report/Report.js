import "../../assets/css/containers/_report.scss";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import server from "../../services/server";
import Drawer from "../Drawer/Drawer";
import StickyBox from "react-sticky-box";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Header from "../Header/Header";
import MakeReport from "./MakeReport";
import { Link } from "react-scroll";
import { queryParams } from "../../helpers/queryParams";
import { Preloader } from "../../helpers/Preloader";
import { FlashMessages } from "../../FlashMessages/FlashMessages";
import { useMediaQuery } from "react-responsive";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { PDFReport } from "./PDFReport";
import { TCPA } from "../TCPA/TCPA";
import { colors } from "./colors";
import { MediaComp } from "../Media/MediaComp";
import palmTechLogo from "../../assets/images/palmTechLogo.png";
import {forgotPasswordUrl} from "../../config/config"
import { origin } from "../../helpers/getOrigin";
import { useNavigate } from "react-router-dom";

import SweetAlert from 'react-bootstrap-sweetalert';

import {
  handleFilteredFlag,
  rgb2hex
} from "./utilities";
import { GeneralInformation } from "../GeneralInformation/GeneralInformation";
import { Definitions } from "../Definitions/Definitions";
import { SummaryDefinition } from "../SummaryDefinition/SummaryDefinition";
import { InspectionDetails } from "../InspectionDetails/InspectionDetails";

export const Report = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobileBreakpiont = useMediaQuery({ query: "(max-width: 1200px)" });
  const [showSummaryReport, setShowSummaryReport] = useState(false);
  const [link, setLink] = useState();
  const [shareinspectionDetails, setshareinspectionDetails] = useState({});
  const [useremail , setuserEmail] = useState("");
  const [showRepairReport, setShowRepairReport] = useState(false);
  const [showPDFReport, setShowPDFReport] = useState(false);
  const [pdf_name, setPDFName] = useState("");
  const [showTcpa, setshowTcpa] = useState(0);
  const [reportViewUrl, setReportViewUrl] = useState("");
  const [previewReportViewUrl, setPreviewReportViewUrl] = useState("");
  const [showLoader, setShowLoader] = useState(true);
  const [isLocationTexas, setIsLocationTexas] = useState(false);
  const [assetUrl, setAssetUrl] = useState("");
  const [sidebarMenu, setSidebarMenu] = useState([{}]);
  const [reportContent, setReportContent] = useState([]);
  const [showMedia, setShowMedia] = useState(false);
  const [istcpashown, setistcpaShown] = useState(false);
  const [tcpaData, settcpaData] = useState([]);
  const [companyLogo, setCompanyLogo] = useState("");
  const [logoPresent , setLogoPresent] = useState(false);
  const [inspectionDetails, setinspectionDetails] = useState({});
  const [isPropertyInspectionReport, setIsPropertyInspectionReport] =
    useState(false);
  const [isGeneralInfoEmpty, setIsGeneralInfoEmpty] = useState(false);
  const [general_information, setgeneral_information] = useState([]);
  const [ratingsInfo, setratingsInfo] = useState([]);
  const [senderemail, setsenderEmail] = useState("");
  const [show_empty_fields, setShowEmptyFields] = useState(0);
  const [repairCount, setRepairCount] = useState(0);
  const [repairTTlamt, setRepairTTlAmt] = useState(0);
  // const [selectedCheckbox, setselectedCheckbox] = useState([]);
  const [readState, setReadState] = useState(-1);
  const [appointmentId, setAppointmentId] = useState("");
  const [summaryrating, setsummaryRating] = useState([]);
  const [ratingdisclaimer, setratingDisclaimer] = useState("");
  const [countObj, setCountObj] = useState([]);
  const [totalVideos, setTotalVideos] = useState([]);
  const [totalPictures, setTotalPictures] = useState([]);
  const [activeFilters, setActiveFilters] = useState("");
  const [activeFilter, setActiveFilter] = useState("");
  const [ratingKeys, setRatingKeys] = useState({});
  const [sharemsg, setshareMsg] = useState("");
  const [signupCanEdit, setSignupCanEdit] = useState("");
  const [isDemoUser,setIsDemoUser] = useState(false);
  const [address, setAddress] = useState("");
  const [inspectoremail, setInspectorEmail] = useState("");
  const [titlereadState, setTitleReadState] = useState(-1);
  // const [isLocationNewUser, setIsLocationNewUser] = useState(false)
  // const [firstLoaded,setFirstLoaded] = useState(false); //for navigating to pdf on texas report
  const[clientName,setClientName] = useState("")
  const[showLandingPopup,setShowLandingPopup] = useState(false);
  const [tcpaLandingStatus,setTcpaLandingStatus] = useState(0);
  const [showLandingTcpa,setShowLandingTcpa] = useState(0);
  
  const [values, setValues] = useState({
    amount: "",
    message: "",
    showChatIcon: false,
    showDollarIcon: false,
  });
  let reCount = 0;
  let ttlAmt = 0;
  let menuCountObj = [];
  let paths = origin(); 

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowDollarIcon = () => {
    setValues({
      ...values,
      showDollarIcon: !values.showDollarIcon,
    });
  };

  const handleClickShowChatIcon = () => {
    setValues({
      ...values,
      showChatIcon: !values.showChatIcon,
    });
  };
  const titlereadOpen = (index) => {
    setTitleReadState(index);
  };
  const titlereadClose = () => {
    setTitleReadState(-1);
  };
  const readOpen = (index) => {
    setReadState(index);
  };

  const readClose = () => {
    setReadState(-1);
  };

  const handleLandingPopup =()=>{
   
    if(showLandingTcpa === '1' && tcpaLandingStatus === '0' ){       
        setshowTcpa(1);
      } else {
        setshowTcpa(0);
      }     
      setShowLandingPopup(false);
  }
  const handleLandingPopupOtherUser =()=>{
    // setSignupCanEdit(0)
   
    sessionStorage.setItem("LandingPopupShown",true);
    setShowLandingPopup(false);
  }
  window.addEventListener(
    "scroll",
    function (event) {
      var top = this.scrollY;
      let firstSidebarElement = document.getElementById("initial-active");
      if (top > 200) {
        if (firstSidebarElement !== null) {
          firstSidebarElement.classList.remove("first-active");
        }
      }
    },
    false
  );

  const pathName = window.location.pathname.split("/")[1];

  const getPathName = useCallback(() => {
    const pathname = {
      "full-report": "full-report",
      "summary-report": "summary-report",
      "repair-list": "repair-list",
      "pdf-report": "pdf-report",
      "media": "media",
    };
    if (pathname[pathName] === "summary-report") {
      setReadState(-1);
      setTitleReadState(-1);
      setShowSummaryReport(true);
      setShowRepairReport(false);
      setShowPDFReport(false);
      setShowMedia(false);
    } else if (pathname[pathName] === "repair-list") {
      setReadState(-1);
      setTitleReadState(-1);
      setShowRepairReport(true);
      setShowSummaryReport(false);
      setShowPDFReport(false);
      setShowMedia(false);
    } else if (pathname[pathName] === "pdf-report") {
      setShowPDFReport(true);
      setShowSummaryReport(false);
      setShowRepairReport(false);
      setShowMedia(false);
    } else if (pathname[pathName] === "media") {
      setShowMedia(true);
      setShowPDFReport(false);
      setShowSummaryReport(false);
      setShowRepairReport(false);
    } else {
      setShowSummaryReport(false);
      setShowRepairReport(false);
      setShowPDFReport(false);
      setShowMedia(false);
    }
  }, [pathName]);

  parseInt(showTcpa) !== 0?document.body.style.overflow = 'hidden': document.body.style.overflow = 'auto';
  
  useEffect(() => {
    let key = !window.location.search
      ? localStorage.length === 0
        ? ""
        : "localStorage"
      : "window";
    let param = {
      [key]:
        key === "localStorage"
          ? { localStorage: localStorage }
          : { window: window.location.search },
    };
    let query = queryParams(param);
    let queryForPopup = queryParams({ localStorage: localStorage });
    let popUpShown = sessionStorage?.getItem("LandingPopupShown")
    if (queryForPopup[1]) {  
      popUpShown? setShowLandingPopup(false): setShowLandingPopup(true);
    }
    // eslint-disable-next-line
    getPathName(); // eslint-disable-next-line
    if (location.state) {
      sessionStorage.setItem("isLocationNewUser",location.state.isNewUser)
      if (location.state.tcpaStatus !== "0") {
        // settcpaFlag(true);
        setistcpaShown(false);
      } else {
        // settcpaFlag(false);
        setistcpaShown(true); 
      }
      setSignupCanEdit(location.state.signupCanEdit);
    }

    server("/checkTcpa?", "GET", query[0], "").then((res) => {
      setLogoPresent(res.data?.data.logoExist)
      setCompanyLogo(res.data?.data.companyLogoFile);
      setClientName(res.data?.data.client_name)
      const data = res.data?.data;
      if (data) {
        settcpaData(data);
        setTcpaLandingStatus(data.is_tcpa_shown);
        setShowLandingTcpa(data.show_tcpa);
        if (
          query[1]["queryId4"] === "insp" ||
          query[1]["queryId4"] === "agnt" ||
          query[1]["queryId4"]?.includes("@")
        ) {
          setshowTcpa(0);
        } else if(sessionStorage?.getItem("isLocationNewUser") === "true" || location.state?.isNewUser){
          setshowTcpa(0);
        }      
        // else {
        //   if (data.show_tcpa === "1" && data.is_tcpa_shown === "0") {
        //     setshowTcpa(1);
        //   } else {
        //     setshowTcpa(0);
        //   }
        // }
      }
    });

    server("/getReportDetails?", "GET", query[0], "").then((response) => {
      
      if (response.flag) {
        FlashMessages(response.message, response.color, response.flag);
        setShowLoader(false);
      } else {
        const data = response.data.data;
        setIsLocationTexas(data.isLocationTexas);
        if(data.isLocationTexas && sessionStorage.getItem("firstLoaded") === null) navigate('/pdf-report');
        else if(!data.isLocationTexas && sessionStorage.getItem("firstLoaded") === null) navigate('/full-report');
        sessionStorage.setItem("firstLoaded",true)
        // setFirstLoaded(true)
        // console.log("data",data)
        setShowEmptyFields(data.showEmptyFields);
        setsummaryRating(data.ratingsDisclaimer);
        setLink(
          `${window.location.origin}/?id1=${query[1]["queryId1"]}&id2=${query[1]["queryId2"]}&id3=${query[1]["queryId3"]}&id4=`
        );
        setshareinspectionDetails(response.data.data.inspectionDetails);
        setAddress(data.inspectionDetails.locationAddress);
        setInspectorEmail(data.inspectionDetails.inspectorEmail);
        setAssetUrl(data.reportUrl);
        setTotalPictures(data.total_pictures);
        setTotalVideos(data.total_videos);
        setsenderEmail(data.inspectionDetails.clientEmail);
        setshareMsg(
          `The Inspection report for the property at ${response.data.data.inspectionDetails.locationAddress} is ready to view.\n\nPlease review your inspection and feel free to contact us if you have questions. You can email us at ${response.data.data.inspectionDetails.inspectorEmail} or call and we would be happy to assist you.\n\n${response.data.data.inspectionDetails.inspectorName}\n${response.data.data.inspectionDetails.inspectorCompany}`
        );
        setReportViewUrl(
          `/preview-report?appointmentId=${data.appointmentId}&id1=${query[1]["queryId1"]}&id2=${query[1]["queryId2"]}&id3=${query[1]["queryId3"]}&id4=${query[1]["queryId4"]}&e=${query[1]["queryId5"]}`
        );
        setPreviewReportViewUrl(
          `${window.location.origin}/preview-report?appointmentId=${data.appointmentId}&id1=${query[1]["queryId1"]}&id2=${query[1]["queryId2"]}&id3=${query[1]["queryId3"]}&id4=${query[1]["queryId4"]}&e=${query[1]["queryId5"]}`
        );
        if(query[1]["queryId4"] === "insp"){
          setuserEmail(data.inspectionDetails.inspectorEmail);
        }
        else if(query[1]["queryId4"] === "agnt"){
          setuserEmail(data.inspectionDetails.referrerEmail);
        }
        else{
          setuserEmail(query[1]["queryId4"]);
        }
        // if(data.categoryDetails.includes('Inspection Details') && data.categoryDetails.includes('Definitions') && data.categoryDetails.includes('General Information')) {

        // } else {
        //   setSidebarMenu(data.categoryDetails);
        // }
        if(!isDemoUser) setReportContent(data.summaryItems);        
        else{
          if(!sessionStorage['reportContent']){
            sessionStorage.setItem("reportContent", JSON.stringify(data.summaryItems));
          }          
          setReportContent(JSON.parse(sessionStorage.getItem("reportContent")));
        }
        // setratingName(data.ratingsDisclaimer.ratingName);
        setratingDisclaimer(data.ratingsDisclaimer.ratingDisclaimer);
        setAssetUrl(data.reportUrl);
        setinspectionDetails(data.inspectionDetails);
        setratingsInfo((s) =>
          data.definitions !== undefined
            ? data.definitions.ratingsInfo
            : undefined
        );
        if (data.isLocationTexas) {
          setIsPropertyInspectionReport(true);
          setgeneral_information(data.property_inspection_report);
        } else if (data.general_information !== undefined) {
          setgeneral_information(data.general_information);
        } else setIsGeneralInfoEmpty(true);
        if (isGeneralInfoEmpty === true) data.categoryDetails.splice(0, 2);
        else data.categoryDetails.splice(0, 3);
        setSidebarMenu(data.categoryDetails);
        if (data.id === forgotPasswordUrl[paths].DEMO_USER_GUID){
          setIsDemoUser(true);
          console.log("demo user");
        }
        if (data.definitions !== undefined) {
          let ratingsKeys = {};
          data.definitions.ratingsInfo.forEach((ratings, rindex) => {
            let key = `${ratings.ratingName}`;
            if (colors[key] === undefined) {
              // console.log(colors[key]);
              if (Object.keys(ratingsKeys).length !== 0) {
                if (Object.keys(ratingsKeys)[0] !== "undefined") {
                  ratingsKeys[key] = "extra-" + rindex;
                } else {
                  ratingsKeys[ratings.ratingName] = "extra-" + rindex;
                }
              } else {
                ratingsKeys[key] = "extra-" + rindex;
              }
            }
          });
          setRatingKeys(ratingsKeys);
          // console.log(ratingsKeys);
        }
        // data.categoryDetails.forEach((data_val) => {
        //   if (data_val.categoryName === "property_inspection_report") {
        //     setIsPropertyInspectionReport(data_val.categoryName);
        //     setgeneral_information(data.property_inspection_report);
        //   }
        // });
        setAppointmentId(data.appointmentId);
        setPDFName(data.pdfFileName);

        
        if (appointmentId !== "" && appointmentId !== undefined) {
          server(
            "/viewRepairList?",
            "GET",
            `appointmentId=${appointmentId}`,
            ""
          ).then((response) => {
            // console.log(response);
            const reportData = data.summaryItems;
            const sideMenu = data.categoryDetails;
            // const items = response.data?.data.previewItemList; // commented and checking condition for demo user for items
            let items = !isDemoUser ? response.data?.data?.previewItemList : JSON.parse(sessionStorage.getItem("previewItemList"))?.previewItemList;
            // console.log("items",items,isDemoUser);
            let cnt = 0;
            let ttl_amt = 0;
            let repairMenuCntObj = [];
            // console.log(items);
            if (items) {
              sideMenu.forEach((item) => {
                let catIndx = items?.findIndex((x) => x[item.categoryName]);
                if (catIndx !== -1) {
                  const content = items[catIndx][item.categoryName];
                  // console.log(content);
                  if (content.length !== 0) {
                    content.forEach((ele) => {
                      if (
                        parseInt(ele.isRepairSelected) !== 0
                      ) {
                        let ctnIdx = reportData.findIndex(x => x[ele.categoryName]);
                        if(ctnIdx !== -1) {
                          let ctnSubIdx = reportData[ctnIdx][ele.categoryName].findIndex(x => x.unique_card_id === ele.unique_card_id);
                          reportData[ctnIdx][ele.categoryName][ctnSubIdx].isRepairSelected = parseInt(ele.isRepairSelected);
                          reportData[ctnIdx][ele.categoryName][ctnSubIdx].repairAmountEntered = ele.repairAmountEntered;
                          reportData[ctnIdx][ele.categoryName][ctnSubIdx].repairCommentEntered = ele.repairCommentEntered;
                          cnt++;
                          if(repairMenuCntObj.length !== 0) {
                            let repairMCntIdx = repairMenuCntObj.findIndex(x => x[ele.categoryName]);
                            if(repairMCntIdx !== -1) repairMenuCntObj[repairMCntIdx][ele.categoryName][0].count++;
                            else {
                              let key = ele.categoryName;
                              repairMenuCntObj.push({
                                [key]: [{ category: ele.categoryName, count: 1 }]
                              });
                            }
                          } else {
                            let key = ele.categoryName;
                            repairMenuCntObj.push({
                              [key]: [{ category: ele.categoryName, count: 1 }]
                            });
                          }
                          let amt = ele.repairAmountEntered;
                          if (!Number.isNaN(parseFloat(ele.repairAmountEntered)) && parseFloat(ele.repairAmountEntered) > 0) {
                            ttl_amt += parseFloat(ele.repairAmountEntered);
                          }
                          toggleSelection(ele, cnt, ttl_amt, amt, reportData, repairMenuCntObj);
                        }
                      }
                    });
                  }
                }
              });
            }
            // setReportContent(reportData); // commented and setting reportContent by checking demo user or not
            if(!isDemoUser) setReportContent(reportData);       
            else{ //setting report content from session storage for demo user and will be updated from API only once whenever sessionstorage is empty
              if(!sessionStorage['reportContent']){
              sessionStorage.setItem("reportContent", JSON.stringify(reportData));
            }            
            setReportContent(reportData); 
          }
          });
        }

        function toggleSelection(ele, cnt, ttl_amt, amt, reportData, menuCnt) {
          let checkboxNodeList =
            document.querySelectorAll('*[id^="accordin_"]');
          for (let i = 0; i < checkboxNodeList.length; i++) {
            let currentElem = document.getElementById(checkboxNodeList[i].id);
            let elemDescription = document.getElementById(
              checkboxNodeList[i].id
            ).parentNode.nextElementSibling.childNodes[1].innerHTML;
            let nextElemId = document.getElementById(checkboxNodeList[i].id)
              .nextElementSibling.id;
            let nextElem = document.getElementById(nextElemId);
            let inptVal = nextElem.childNodes[1].childNodes[0].childNodes[0];
            let cmtVal = nextElem.childNodes[3].childNodes[0].childNodes[0];
            if (ele.unique_card_id === elemDescription) {
              currentElem.style.setProperty(
                "background-color",
                "#0ead7c",
                "important"
              );
              // nextElem.style.setProperty("display", "block", "important");
              inptVal.value = amt;
              cmtVal.value = ele.repairCommentEntered;
              setRepairCount(cnt);
              setRepairTTlAmt(ttl_amt);
              setReportContent(reportData);
              setCountObj(menuCnt);
            }
          }
        }
      }
      // kill the preloader
      setShowLoader(false);
    });
  }, [appointmentId, getPathName, isDemoUser, isGeneralInfoEmpty, location.state, navigate, paths]);
  // console.log(props);

  // appointmentId, getPathName, isDemoUser, isGeneralInfoEmpty, location.state, paths

  const handleFilterCondition = (data) => {
    if (showSummaryReport) {
      return parseInt(data.showOnSummary) !== 0;
    } else if (showRepairReport) {
      return parseInt(data.showOnSummary) !== 0;
    } else if (showMedia) {
      return parseInt(data.showOnSummary) !== 0;
    } else {
      return data;
    }
  };

  const toggleClass = (e, categoryName, content, appointmentId, isDemoUser, checkFlag) => {
    reCount = repairCount;
    ttlAmt = repairTTlamt;
    menuCountObj = countObj;
    
    const baseElem = document.getElementById(e.currentTarget.id);
    const baseElemColor = rgb2hex(baseElem.style.backgroundColor);
    const domDropDownTrigger = baseElem.nextElementSibling;
    const domCardUniqueId = parseInt(baseElem.parentNode.nextElementSibling.childNodes[1].innerHTML);

    if(parseInt(content.unique_card_id) === domCardUniqueId) {
      // console.log(content);
      // console.log('matched ');
      // console.log('base color ==> ', baseElemColor, parseInt(content.isRepairSelected) !== 0 && baseElemColor === "none", parseInt(content.isRepairSelected), baseElemColor === "none");
      if(parseInt(content.isRepairSelected) !== 0 && baseElemColor === "none") {
        baseElem.style.setProperty(
          "background-color",
          "#ccc",
          "important"
        );
        domDropDownTrigger.style.setProperty('display', 'none', 'important');
        if(reportContent.findIndex(x => x[content.categoryName]) !== -1) {
          const cntIdx = reportContent[reportContent.findIndex(x => x[content.categoryName])][content.categoryName].findIndex(x => x.unique_card_id === content.unique_card_id);
          reportContent[reportContent.findIndex(x => x[content.categoryName])][content.categoryName][cntIdx].isRepairSelected = 0;
        }
        if(reCount <= 0) reCount = 0;
        else reCount--;
        if(menuCountObj.length !== 0) {
          let mCntIdx = menuCountObj.findIndex(x => x[content.categoryName]);
          if(mCntIdx !== -1) {
            if(parseInt(menuCountObj[mCntIdx][content.categoryName][0].count) <= 0) {
              menuCountObj[mCntIdx][content.categoryName][0].count = 0;
            } else {
              menuCountObj[mCntIdx][content.categoryName][0].count--;
            }
          }
          else {
            countObj.push({
              [categoryName]: [{ category: content.categoryName, count: 1 }],
            });
          }
        } else {
          countObj.push({
            [categoryName]: [{ category: content.categoryName, count: 1 }],
          });
        }
        if(ttlAmt <= 0) ttlAmt = 0;
        else {
          if(!Number.isNaN(content.repairAmountEntered) && parseInt(content.repairAmountEntered) > 0) {
            ttlAmt = ttlAmt - parseFloat(content.repairAmountEntered);
          }
        }
      } else if(baseElemColor === "#cccccc") {
        baseElem.style.setProperty(
          "background-color",
          "#0ead7c",
          "important"
        );
        domDropDownTrigger.style.setProperty('display', 'block', 'important');
        if(reportContent.findIndex(x => x[content.categoryName]) !== -1) {
          const cntIdx = reportContent[reportContent.findIndex(x => x[content.categoryName])][content.categoryName].findIndex(x => x.unique_card_id === content.unique_card_id);
          reportContent[reportContent.findIndex(x => x[content.categoryName])][content.categoryName][cntIdx].isRepairSelected = 1;
        }
        reCount++;
        if(menuCountObj.length !== 0) {
          let mCntIdx = menuCountObj.findIndex(x => x[content.categoryName]);
          if(mCntIdx !== -1) menuCountObj[mCntIdx][content.categoryName][0].count++;
          else {
            countObj.push({
              [categoryName]: [{ category: content.categoryName, count: 1 }],
            });
          }
        } else {
          countObj.push({
            [categoryName]: [{ category: content.categoryName, count: 1 }],
          });
        }
        if(!Number.isNaN(content.repairAmountEntered) && parseFloat(content.repairAmountEntered) > 0) {
          ttlAmt = ttlAmt + parseFloat(content.repairAmountEntered);
        }
      } else if(baseElemColor !== "#cccccc" && baseElemColor !== "none") {
        baseElem.style.setProperty(
          "background-color",
          "#ccc",
          "important"
        );
        domDropDownTrigger.style.setProperty('display', 'none', 'important');
        if(reportContent.findIndex(x => x[content.categoryName]) !== -1) {
          const cntIdx = reportContent[reportContent.findIndex(x => x[content.categoryName])][content.categoryName].findIndex(x => x.unique_card_id === content.unique_card_id);
          reportContent[reportContent.findIndex(x => x[content.categoryName])][content.categoryName][cntIdx].isRepairSelected = 0;
        }
        if(reCount <= 0) reCount = 0;
        else reCount--;
        
        if(menuCountObj.length !== 0) {
          let mCntIdx = menuCountObj.findIndex(x => x[content.categoryName]);
          if(mCntIdx !== -1) {
            if(parseInt(menuCountObj[mCntIdx][content.categoryName][0].count) <= 0) {
              menuCountObj[mCntIdx][content.categoryName][0].count = 0;
            } else {
              menuCountObj[mCntIdx][content.categoryName][0].count--;
            }
          }
          else {
            countObj.push({
              [categoryName]: [{ category: content.categoryName, count: 1 }],
            });
          }
        } else {
          countObj.push({
            [categoryName]: [{ category: content.categoryName, count: 1 }],
          });
        }

        if(ttlAmt <= 0) ttlAmt = 0;
        else {
          if(!Number.isNaN(content.repairAmountEntered) && parseInt(content.repairAmountEntered) > 0) {
            ttlAmt = ttlAmt - parseInt(content.repairAmountEntered);
          }
        }
      } else if(baseElemColor === "none") {
        baseElem.style.setProperty(
          "background-color",
          "#0ead7c",
          "important"
        );
        domDropDownTrigger.style.setProperty('display', 'block', 'important');
        if(reportContent.findIndex(x => x[content.categoryName]) !== -1) {
          const cntIdx = reportContent[reportContent.findIndex(x => x[content.categoryName])][content.categoryName].findIndex(x => x.unique_card_id === content.unique_card_id);
          reportContent[reportContent.findIndex(x => x[content.categoryName])][content.categoryName][cntIdx].isRepairSelected = 1;
        }
        reCount++;
        if(menuCountObj.length !== 0) {
          let mCntIdx = menuCountObj.findIndex(x => x[content.categoryName]);
          if(mCntIdx !== -1) menuCountObj[mCntIdx][content.categoryName][0].count++;
          else {
            countObj.push({
              [categoryName]: [{ category: content.categoryName, count: 1 }],
            });
          }
        } else {
          countObj.push({
            [categoryName]: [{ category: content.categoryName, count: 1 }],
          });
        }
        if(!Number.isNaN(content.repairAmountEntered) && parseInt(content.repairAmountEntered) > 0) {
          ttlAmt = ttlAmt + parseInt(content.repairAmountEntered);
        }
      }
      setRepairCount(reCount);
      setRepairTTlAmt(ttlAmt);
      setCountObj(menuCountObj);
      saveData(reportContent, isDemoUser, appointmentId, sidebarMenu, assetUrl, inspectionDetails);
    }
  };

  const saveData = (data, isDemoUser, appointmentId, categoryList, reportUrl, inspectionDetails) => {
    let dataObj = {};
    dataObj.previewItemList = data;
    dataObj.categoryList = categoryList;
    dataObj.reportUrl = reportUrl;
    dataObj.inspectionDetails = inspectionDetails;
    
    if(!isDemoUser) {
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
    } else {

    //  console.log("dataObj",dataObj)
      const sessionExists = sessionStorage.getItem('previewItemList');     
      if(sessionExists) {
        sessionStorage.clear();
        sessionStorage.setItem("reportContent", JSON.stringify(dataObj.previewItemList));
        sessionStorage.setItem("previewItemList", JSON.stringify(dataObj));
        setReportContent(dataObj.previewItemList);
      }
      else {       
        sessionStorage.clear();
        sessionStorage.setItem("reportContent", JSON.stringify(dataObj.previewItemList));
        sessionStorage.setItem("previewItemList", JSON.stringify(dataObj));
        setReportContent(dataObj.previewItemList);
      }
    }
  }

  const handleTTLAmt = (event, value, content, appointmentId, isDemoUser) => {
    let temp = parseFloat(value);
    ttlAmt = repairTTlamt;
    // console.log(temp, ttlAmt, value, content.isRepairSelected, content.repairAmountEntered, parseInt(content.repairAmountEntered));
    if(parseFloat(content.isRepairSelected) !== 0) {
      if(content.repairAmountEntered === null) {
        ttlAmt = ttlAmt + parseFloat(value);
        if(reportContent.findIndex(x => x[content.categoryName]) !== -1) {
          const cntIdx = reportContent[reportContent.findIndex(x => x[content.categoryName])][content.categoryName].findIndex(x => x.unique_card_id === content.unique_card_id);
          reportContent[reportContent.findIndex(x => x[content.categoryName])][content.categoryName][cntIdx].repairAmountEntered = parseFloat(value);
        }
      } else if(parseFloat(content.repairAmountEntered) !== temp) {
        if(!Number.isNaN(content.repairAmountEntered) && parseFloat(content.repairAmountEntered) > 0) {
          ttlAmt = parseFloat(ttlAmt - parseFloat(content.repairAmountEntered)) + parseFloat(value);
          if(reportContent.findIndex(x => x[content.categoryName]) !== -1) {
            const cntIdx = reportContent[reportContent.findIndex(x => x[content.categoryName])][content.categoryName].findIndex(x => x.unique_card_id === content.unique_card_id);
            reportContent[reportContent.findIndex(x => x[content.categoryName])][content.categoryName][cntIdx].repairAmountEntered = parseFloat(value);
          }
        } else if(parseFloat(content.repairAmountEntered) === 0) {
          ttlAmt = ttlAmt + parseFloat(value);
          if(reportContent.findIndex(x => x[content.categoryName]) !== -1) {
            const cntIdx = reportContent[reportContent.findIndex(x => x[content.categoryName])][content.categoryName].findIndex(x => x.unique_card_id === content.unique_card_id);
            reportContent[reportContent.findIndex(x => x[content.categoryName])][content.categoryName][cntIdx].repairAmountEntered = parseFloat(value);
          }
        }
      } else if(temp === content.repairAmountEntered) {
        if(reportContent.findIndex(x => x[content.categoryName]) !== -1) {
          const cntIdx = reportContent[reportContent.findIndex(x => x[content.categoryName])][content.categoryName].findIndex(x => x.unique_card_id === content.unique_card_id);
          reportContent[reportContent.findIndex(x => x[content.categoryName])][content.categoryName][cntIdx].repairAmountEntered = parseFloat(value);
        }
      } else {
        if(!Number.isNaN(content.repairAmountEntered) && parseFloat(content.repairAmountEntered) > 0) {
          ttlAmt = ttlAmt + parseFloat(value);
          if(reportContent.findIndex(x => x[content.categoryName]) !== -1) {
            const cntIdx = reportContent[reportContent.findIndex(x => x[content.categoryName])][content.categoryName].findIndex(x => x.unique_card_id === content.unique_card_id);
            reportContent[reportContent.findIndex(x => x[content.categoryName])][content.categoryName][cntIdx].repairAmountEntered = parseFloat(value);
          }
        }
      }
    } 
    setRepairTTlAmt(ttlAmt);
    saveData(reportContent, isDemoUser, appointmentId, sidebarMenu, assetUrl, inspectionDetails);
  };

  const handleCmntChange = (event, value, content, appointmentId, isDemoUser) => {
    if(parseFloat(content.isRepairSelected) !== 0) {
      if(reportContent.findIndex(x => x[content.categoryName]) !== -1) {
        const cntIdx = reportContent[reportContent.findIndex(x => x[content.categoryName])][content.categoryName].findIndex(x => x.unique_card_id === content.unique_card_id);
        reportContent[reportContent.findIndex(x => x[content.categoryName])][content.categoryName][cntIdx].repairCommentEntered = value;
      }
    }
    saveData(reportContent, isDemoUser, appointmentId, sidebarMenu, assetUrl, inspectionDetails);
  }

  const filterSelection = (value, flag) => {
    setActiveFilters({
      value: value,
      flag: flag,
    });
  };

  const makeData = (data) => {
    // let ratObj = {};
    let resp = handleFilteredFlag(
      activeFilters.value,
      activeFilters.flag,
      data
    );
    // ratingsInfo.forEach(rating => {
    //   if(Object.keys(ratObj)[0] !== rating.ratingName) {
    //     let key = rating.ratingName;
    //     ratObj[key] = resp?.activeFilters.includes(rating.ratingName);
    //   } else {
    //     ratObj[rating.ratingName] = resp?.activeFilters.includes(rating.ratingName);
    //   }
    // });
    setActiveFilter(resp?.activeFilters);
    return handleFilteredFlag(activeFilters.value, activeFilters.flag, data);
  };

  return (
    <>
      {showLoader ? <Preloader flag={!showLoader} /> : ""}
      {parseInt(showTcpa) !== 0 ? <TCPA tcpaData={tcpaData} /> : ""}
      { showLandingPopup && showLandingTcpa ==="1"  && tcpaLandingStatus === '0'? 
        <SweetAlert  style={{width:"40em",height:"53%%"}}
        title="Open Inspection Report" 
        // onConfirm={()=>setBypassLogin(false)}
        className="login-alert-title"
        primary
        customButtons={
            <div style={{display:'flex',flexDirection:'column'}}>
            <button onClick={handleLandingPopup} className="default-btn-bypass">{`I am ${clientName}`} </button>
            <button onClick={handleLandingPopupOtherUser} className="default-btn-bypass">I am someone else</button>
            </div>
        }>
        </SweetAlert>:""}
      {!showRepairReport ? (
        <Header
          categories={sidebarMenu}
          reportUrl={assetUrl}
          logo={companyLogo}
          showRepairReport={showRepairReport}
          sharemsg={sharemsg}
          sharelink={link}
          shareinspectionDetails={shareinspectionDetails}
          signupCanEdit={signupCanEdit}
          logoPresent={logoPresent}
          contactusmail={useremail === "null" ? senderemail : useremail}
          isDemoUser={isDemoUser}
          address={address}
          inspectoremail={inspectoremail}
          showPDFReport={showPDFReport}
        />
      ) : (
        <Drawer
          reportContent={reportContent}
          appointmentId={appointmentId}
          filteredFlags={(value, flag) => filterSelection(value, flag)}
          repairCount={repairCount}
          repairTtlAmt={repairTTlamt}
          inspectionDetails={inspectionDetails}
          assetUrl={assetUrl}
          ratingsInfo={ratingsInfo}
          senderEmail={senderemail}
          reportviewUrl={reportViewUrl}
          previewReportViewUrl={previewReportViewUrl}
          activeFilters={activeFilter}
          isDemoUser={isDemoUser}
        />
      )}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {!isMobileBreakpiont ? (
            !showPDFReport ? (
              <Grid
                key={`mobile-breakpoint-${istcpashown}`}
                item
                xs={12}
                md={2}
              >
                <StickyBox>
                  <div id="sidebar" className="report-sidebar-main-body">
                    {!showSummaryReport && !showRepairReport && !showMedia ? (
                      <>
                        <Link
                          to={"Inspection Details"}
                          spy={true}
                          smooth={true}
                          className="report-sidebar-menu-title first-active"
                          id="initial-active"
                        >
                          {/* <span className="static-icon"> */}
                          {/* <AssignmentIcon className="report-sidebar-content-static-icon" /> */}
                          <div className="sidebar-wrapper">
                            <FiberManualRecordIcon className="report-sidebar-content-icon" />
                            <span> Inspection Details</span>
                          </div>

                          {/* </span> */}
                        </Link>
                        <Link
                          to={"Definitions"}
                          spy={true}
                          smooth={true}
                          className="report-sidebar-menu-title"
                        >
                          <div className="sidebar-wrapper">
                            <FiberManualRecordIcon className="report-sidebar-content-icon" />
                            <span>Definitions</span>
                          </div>
                        </Link>
                        {!isGeneralInfoEmpty ? (
                          <Link
                            to={!isLocationTexas?"General Information":"Property Inspection Report"}
                            spy={true}
                            smooth={true}
                            className="report-sidebar-menu-title"
                          >
                            <div className="sidebar-wrapper">
                              <FiberManualRecordIcon className="report-sidebar-content-icon" />
                              <span>
                                {" "}
                                {isPropertyInspectionReport
                                  ? "Property Inspection Report"
                                  : " General Information"}
                              </span>
                            </div>
                          </Link>
                        ) : (
                          ""
                        )}
                      </>
                    ) : (
                      ""
                    )}
                    {sidebarMenu.length !== 0
                      ? sidebarMenu
                          .filter(handleFilterCondition)
                          .map((menu, sideindx) => {
                            let cntIdx = countObj
                              ? countObj.findIndex((x) => x[menu.categoryName])
                              : "";
                            return (
                              <Link
                                key={`menu-${sideindx}-${menu.categoryName}`}
                                to={menu.categoryName}
                                spy={true}
                                smooth={true}
                                className="report-sidebar-menu-title"
                              >
                                <div className="sidebar-outer-wrapper">
                                  <div className="sidebar-wrapper">
                                    {!isLocationTexas ? (
                                      <FiberManualRecordIcon
                                        key={`icon-${menu.categoryName}`}
                                        className="report-sidebar-content-icon"
                                      />
                                    ) : (
                                      ""
                                    )}{" "}
                                    <span>{menu.categoryName}</span>{" "}
                                  </div>
                                  {showRepairReport ? (
                                    <div
                                      key={`badge-${menu.categoryName}`}
                                      className={
                                        cntIdx !== ""
                                          ? cntIdx !== -1
                                            ? countObj[cntIdx][
                                                menu.categoryName
                                              ][0].count === 0
                                              ? "report-sidebar-icon-badge"
                                              : "report-sidebar-icon-badge-active"
                                            : "report-sidebar-icon-badge"
                                          : "report-sidebar-icon-badge"
                                      }
                                    >
                                      <span
                                        key={`badge-count-${menu.categoryName}`}
                                        className="report-sidebar-icon-badge-count"
                                      >
                                        {cntIdx !== ""
                                          ? cntIdx !== -1
                                            ? countObj[cntIdx][
                                                menu.categoryName
                                              ][0].count
                                            : 0
                                          : 0}
                                      </span>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              </Link>
                            );
                          })
                      : ""}
                    <div>
                      <span className="report-sidebar-logo">
                        {" "}
                        <span>Powered by</span>
                        <img
                          src={palmTechLogo}
                          width="120"
                          height="47"
                          alt="logo"
                        />
                      </span>
                    </div>
                  </div>
                </StickyBox>
              </Grid>
            ) : (
              ""
            )
          ) : (
            ""
          )}

          <Grid item xs={12} md={12} lg={10} className="report-card-body">
            {!showSummaryReport &&
            !showRepairReport &&
            !showPDFReport &&
            !showMedia ? (
              <>
                <InspectionDetails
                  id="Inspection Details"
                  categoryName="Inspection Details"
                  inspectionDetails={inspectionDetails}
                  reportUrl={assetUrl}
                  contactusmail={useremail === "null" ? senderemail : useremail}
                  isDemoUser={isDemoUser}
                  address={address}
                  inspectoremail={inspectoremail}
                />

                <Definitions
                  id="Definitions"
                  categoryName="Definitions"
                  ratingsInfo={ratingsInfo}
                  ratingKeys={ratingKeys}
                />
                {!isGeneralInfoEmpty ? (
                  isPropertyInspectionReport ? (
                    <GeneralInformation
                      id="General Information"
                      categoryName="Property Inspection Report"
                      inspectionDetails={inspectionDetails}
                      general_information={general_information}
                    />
                  ) : (
                    <GeneralInformation
                      id="General Information"
                      categoryName="General Information"
                      inspectionDetails={inspectionDetails}
                      general_information={general_information}
                    />
                  )
                ) : (
                  ""
                )}
                {/* <GeneralInformation
                  id="General Information"
                  inspectionDetails={inspectionDetails}
                /> */}
              </>
            ) : (
              ""
            )}

            {showPDFReport ? (
              <>
                <PDFReport assetUrl={assetUrl} pdf_name={pdf_name} />
              </>
            ) : showMedia ? (
              sidebarMenu
                .filter(handleFilterCondition)
                .map((content, index) => {
                  return reportContent.length !== 0 ? (
                    <MediaComp
                      reportUrl={assetUrl}
                      media={reportContent}
                      totalPictures={totalPictures}
                      totalVideos={totalVideos}
                      firstIndx={++index}
                      categoryName={content.categoryName}
                      key={`media-${index}-${content.categoryName}`}
                    />
                  ) : (
                    ""
                  );
                })
            ) : (
              <Box sx={{ flexGrow: "1" }}>
                {showSummaryReport ? (
                  <SummaryDefinition
                    summaryrating={summaryrating}
                    readOpen={readOpen}
                    readClose={readClose}
                    readState={readState}
                  />
                ) : (
                  ""
                )}
                {sidebarMenu
                  .filter(handleFilterCondition)
                  .map((content, index) => {
                    return reportContent.length !== 0 ? (
                      <MakeReport
                        categoryName={content.categoryName}
                        isLocationTexas={isLocationTexas}
                        reportContent={reportContent}
                        handleClickShowChatIcon={handleClickShowChatIcon}
                        handleClickShowDollarIcon={handleClickShowDollarIcon}
                        showSummaryReport={showSummaryReport}
                        showRepairReport={showRepairReport}
                        showPDFReport={showPDFReport}
                        summaryrating={summaryrating}
                        ratingdisclaimer={ratingdisclaimer}
                        values={values}
                        handleAmountChange={(event, value, content, appointmentId, isDemoUser) => handleTTLAmt(event, value, content, appointmentId, isDemoUser)}
                        handleCommentChange={(event, value, content, appointmentId, isDemoUser) => handleCmntChange(event, value, content, appointmentId, isDemoUser)}
                        handleChange={handleChange}
                        toggleActiveClass={(
                          e,
                          categoryName,
                          content,
                          appointmentId,
                          isDemoUser,
                          checkFlag
                        ) =>
                          toggleClass(e, categoryName, content, appointmentId,isDemoUser,checkFlag)
                        }
                        assetUrl={assetUrl}
                        show_empty_fields={show_empty_fields}
                        appointmentId={appointmentId}
                        firstIndx={++index}
                        readOpen={readOpen}
                        readClose={readClose}
                        readState={readState}
                        titlereadOpen={titlereadOpen}
                        titlereadClose={titlereadClose}
                        titlereadState={titlereadState}
                        filterRawData={(data) => makeData(data)}
                        key={`report-${index}-${content.categoryName}`}
                        ratingKeys={ratingKeys}
                        isDemoUser={isDemoUser}
                      />
                    ) : (
                      ""
                    );
                  })}
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
