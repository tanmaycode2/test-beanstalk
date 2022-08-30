import React, { useState, useEffect, useRef } from "react";
import server from "../../services/server";
import "../../assets/css/buttons/_buttons.scss";
import "../../assets/css/containers/_previewReport.scss";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { NavLink } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import PrintIcon from "@mui/icons-material/Print";
import { Preloader } from "../../helpers/Preloader";
import { useLocation } from "react-router-dom";
import Vimeo from "@u-wave/react-vimeo";
import { useMediaQuery } from "react-responsive";
import ReactImageVideoLightbox from "react-image-video-lightbox";
import ThumbImage from "../../assets/images/video_thumb_preview.jpg";
import { useReactToPrint } from "react-to-print";
import { forgotPasswordUrl } from "../../config/config";
import { origin } from "../../helpers/getOrigin";
import {
  drawLineAndArrow,
  drawEclipse,
  drawText
} from '../Report/utilities';

const PreviewReport = (props) => {
  const [showLoader, setShowLoader] = useState(true);
  // const [previewItemList, setPreviewItemList] = useState([]);
  const [reportDate, setreportDate] = useState("");
  const isMobileBreakpiont = useMediaQuery({ query: "(max-width: 900px)" });
  const isSmBreakpiont = useMediaQuery({ query: "(max-width: 600px)" });
  const [isSharedPage, setIsSharedPage] = useState(false);
  // const [lightBoxMedia, setLightBoxMedia] = useState([]);
  const [mediaImages, setmediaImages] = useState([]);
  const [showLightBox, setShowLightBox] = useState(false);
  const [currIndx, setCurrentIndx] = useState(0);
  // const [media, setMedia] = useState([]);
  const [url, setUrl] = useState("");
  const [inspDetails, setInspDetails] = useState("");
  const [reportData, setReportData] = useState([{}]);
  const [menuItems, setMenuItems] = useState([{}]);
  // const [decorations, setPictureDecorations] = useState([]);
  const [staticDemoReport, setStaticDemoReport] = useState(false);
  const [loaded, setLoaded] = useState(false);

  let decor = [];
  // const imgWidth = 245;
  // const imgHeight = 170;
  let paths = origin(); 


  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const handleFilterCondition = (data) => {
    return parseInt(data.isRepairSelected) !== 0;
  };

  let location = useLocation();
  let appointmentId = "";
  if (location.state !== null) {
    appointmentId = location.state.appointmentId;
  } else {
    let params = new URLSearchParams(window.location.search);
    let queryId1 = params.get("id1");
    let queryId2 = params.get("id2");
    let queryId3 = params.get("id3");
    let queryId4 = params.get("id4");
    let queryId5 = params.get("id5");
    appointmentId = params.get("appointmentId");
    localStorage.setItem("queryId1", queryId1);
    localStorage.setItem("queryId2", queryId2);
    localStorage.setItem("queryId3", queryId3);
    localStorage.setItem("queryId4", queryId4);
    localStorage.setItem("queryId5", queryId5);
    localStorage.setItem("appointmentId", appointmentId);
    
  }
  useEffect(() => {
    if (location.state !== null) {
      if (!location.state.isDemoUser) {
        // setUrl(location.state.assetUrl);
        // setInspDetails(location.state.inspectionDetails);
        server(
          `/viewRepairList?`,
          "GET",
          `appointmentId=${appointmentId}`
        ).then(
          (response) => {
            setUrl(response.data?.data?.reportUrl);
            setInspDetails(response.data?.data?.inspectionDetails);
            setReportData(response.data?.data?.previewItemList);
            setMenuItems(response.data?.data?.categoryList);
            // const servData = response.data?.data;
            // setPreviewItemList(servData.previewItemList);
            setreportDate(location.state.inspectionDetails.inspectionDate);
            setShowLoader(false);
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        setUrl(location.state.assetUrl);
        setInspDetails(location.state.inspectionDetails);
        setreportDate(location.state.inspectionDetails.inspectionDate);
        if (sessionStorage.previewItemList) {
          let previewitems = sessionStorage;
          let sessionPreviewData = JSON.parse(
            previewitems.getItem("previewItemList")
          );
          // setPreviewItemList(sessionPreviewData.previewItemList);
          setReportData(sessionPreviewData.previewItemList);
          setMenuItems(sessionPreviewData.categoryList);
          setShowLoader(false);
        } else {
          setShowLoader(true);
        }
      }
    } else {
      server(`/viewRepairList?`, "GET", `appointmentId=${appointmentId}`).then(
        (response) => {
          const servData = response.data?.data;
          // setPreviewItemList(servData.previewItemList);
          setreportDate(servData.inspectionDetails.inspectionDate);
           setInspDetails(servData.inspectionDetails);
          setReportData(response.data?.data?.previewItemList);
          setMenuItems(response.data?.data?.categoryList);
          setUrl(servData.reportUrl);
          setIsSharedPage(true);
          let queryId2 = localStorage.getItem("queryId2");
          let queryId3 = localStorage.getItem("queryId3");
          if((queryId2 === forgotPasswordUrl[paths].DEMO_USER_SHARE_PARAM_1 && queryId3 === forgotPasswordUrl[paths].DEMO_USER_SHARE_PARAM_2)) setStaticDemoReport(true)
          setShowLoader(false);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }, [appointmentId, location.state, paths]);

  // slider function
  let boxWidth = 260;
  let boxHeight = 200;
  const picContent = [];
  const toggleLightBoxView = (media_array, pindex, picture_decoration) => {
    media_array.forEach((ele) => {
      if (ele.includes(".")) {
        picContent.push({
          url: url + "/" + ele,
          type: "photo",
          altTag: "House Inspection details - " + ele,
        });
      } else {
        picContent.push({
          url: `https://player.vimeo.com/video/${ele}`,
          type: "video",
          title: "Inspection Details Video",
        });
      }
    });
    if (!Array.isArray(picture_decoration)) {
      decor.push(picture_decoration);
    }
    // setPictureDecorations(decor);
    setmediaImages(picContent);
    setCurrentIndx(pindex);
    setShowLightBox(!showLightBox);
  };
  // slider function end
  return (
    <>
      {showLoader ? <Preloader flag={!showLoader} /> : ""}
      {showLightBox ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "fixed",
            zIndex: "9",
          }}
        >
          <ReactImageVideoLightbox
            data={mediaImages}
            startIndex={currIndx}
            showResourceCount={true}
            onCloseCallback={() => toggleLightBoxView([], currIndx)}
          />
        </div>
      ) : (
        ""
      )}
      <Box
        item
        borderLeft={{ xs: "none", md: "none", lg: "50px solid #8080801f" }}
        borderRight={{ xs: "none", md: "none", lg: "50px solid #8080801f" }}
      >
        <Grid container>
          {/*full page container */}
          <Grid
            item
            container
            className="preview-head"
            xs={12}
            sm={12}
            md={12}
            lg={12}
          >
            <span className="preview-print" onClick={handlePrint}>
              {" "}
              <PrintIcon />
              <span className="print-text">Print</span>
            </span>
            <div className="preview-close">
              {isSharedPage ? (
                ""
              ) : (
                <NavLink to="/repair-list">
                  <CloseIcon className="close-icon" />
                </NavLink>
              )}
            </div>
          </Grid>
          <Grid
            item
            ref={componentRef}
            id="printableArea"
            lg={12}
            md={12}
            xs={12}
          >
            {" "}
            {/* total print content row start */}
            <Grid>
              {/* content headding row start */}
              <Grid className="preview-address">
                {inspDetails.locationAddress ? inspDetails.locationAddress : ""}
                <br />
                {inspDetails.locationCityStateZip
                  ? inspDetails.locationCityStateZip
                  : ""}
              </Grid>
              <Grid style={{ textAlign: "center" }}>
                <p className="preview-content-title">Repair Request List</p>
                <p className="preview-content-date">{reportDate}</p>
                {staticDemoReport ?<p className="preview-static-heading">This is a sample report</p>:""}
              </Grid>
            </Grid>
            {menuItems?.map((category, categoryIndex) => {
              let emptyPreviewItemCount = 0;
              let reportDataFiltered =
                reportData.findIndex((x) => x[category.categoryName]) !== -1
                  ? reportData[
                      reportData.findIndex((x) => x[category.categoryName])
                    ][category.categoryName].filter(handleFilterCondition)
                  : [];
              //  looping to remove empty category name
              
                reportDataFiltered.map((item, index) => {
                  return item.isRepairSelected !== 0 ?                  
                      emptyPreviewItemCount++ : 0
                });              
              return (
                <div key={categoryIndex+category.categoryName}>
                  {emptyPreviewItemCount !== 0 ? (
                    <Grid  container className="preview-category">
                      <Grid
                        item
                        paddingLeft={{
                          xs: "5px",
                          sm: "10px",
                          md: "30px",
                          lg: "60px",
                        }}
                      >
                        <span>
                          {++categoryIndex}. {category.categoryName}
                        </span>
                      </Grid>
                    </Grid>
                  ) : (
                    ""
                  )}
                  {reportDataFiltered?.map((item, cindex) => {
                    const videos = item.videos;
                    const pictures = item.pictures;
                    const picture_decoration = item.picture_decorations;
                    const media_array = [...videos, ...pictures];

                    return (
                      <div key={categoryIndex+"."+cindex}>
                        <Grid style={{ paddingBottom: "25px" }}>
                          {" "}
                          {/* sub contents starts*/}
                          <Grid item container xs={12} md={12} lg={12}>
                            <Grid
                              className="preview-sub-category-container"
                              paddingLeft={{
                                xs: "10px",
                                sm: "15px",
                                md: "46px",
                                lg: "95px",
                              }} paddingRight={{xs: "10px",sm: "15px", md: "46px",lg: "95px", }} 
                            >
                              <p className="preview-sub-category">
                                {" "}
                                {categoryIndex}.{cindex + 1} {item.prompt}{" "}
                              </p>

                              <p className="preview-sub-category-description">
                                {" "}
                                {item.description}{" "}
                              </p>
                              <p className="preview-sub-category-description">
                                {item.answerText}{" "}
                              </p>

                              {/* media */}

                              <Grid item md={12}>
                                <div
                                  className={
                                    isSmBreakpiont
                                      ? "preview-media-container-light"
                                      : "preview-media-container"
                                  }
                                >
                                  {media_array?.length !== 0
                                    ? media_array?.map((elem, index) => {
                                        // if (!Array.isArray(picture_decoration)){
                                        //   console.log(picture_decoration[
                                        //     elem
                                        //   ])
                                        // }
                                        // console.log("decorations",picture_decoration, picture_decoration[elem], elem);
                                        return (
                                          <>
                                            {elem.includes(".") ? (
                                              <div  className="media-video-container">
                                              
                                                {!Array.isArray(
                                                  picture_decoration
                                                ) ? (
                                                  
                                                  <svg key={index}
                                                    className="svg-clickable" onClick={() =>
                                                      toggleLightBoxView(
                                                        media_array,
                                                        index,
                                                        picture_decoration
                                                      )
                                                    }
                                                    
                                                  >
                                                    {!Array.isArray(picture_decoration) && picture_decoration[elem] !== undefined
                                                      ? picture_decoration[
                                                          elem
                                                        ].map((markings) => {
                                                          let imgSize = new Image();
                                                          imgSize.src = `${url}/${elem}`;
                                                          let imgWidth = imgSize.width; 
                                                          let imgHeight = imgSize.height;
                                                          let lineAndArrow = drawLineAndArrow(boxWidth, boxHeight, imgWidth, imgHeight, markings.decoration_begin_horizontal, markings.decoration_end_horizontal, markings.decoration_begin_vertical, markings.decoration_end_vertical);
                                                          let drawEclipseContent = drawEclipse(boxWidth, boxHeight, imgWidth, imgHeight, markings.decoration_begin_horizontal, markings.decoration_end_horizontal, markings.decoration_begin_vertical, markings.decoration_end_vertical);
                                                          let drawTextContent = drawText(boxWidth, boxHeight, imgWidth, imgHeight, markings.decoration_begin_horizontal, markings.decoration_end_horizontal, markings.decoration_begin_vertical, markings.decoration_end_vertical);

                                                          return (
                                                            <>
                                                                {
                                                                    parseInt(markings.decoration_type) === 0 ?
                                                                    <>
                                                                        <line
                                                                            x1={lineAndArrow.LineX1} 
                                                                            y1={lineAndArrow.LineY1} 
                                                                            x2={lineAndArrow.LineX2} 
                                                                            y2={lineAndArrow.LineY2}
                                                                            style={{ stroke: markings.decoration_color.startsWith('#') ? markings.decoration_color : `#${markings.decoration_color}`}} 
                                                                            strokeWidth={lineAndArrow.strokeWidth} />
                                                                        <line
                                                                            x1={lineAndArrow.arrowStartX1}
                                                                            y1={lineAndArrow.arrowStartY1}
                                                                            x2={lineAndArrow.LineX2} 
                                                                            y2={lineAndArrow.LineY2}
                                                                            style={{ stroke: markings.decoration_color.startsWith('#') ? markings.decoration_color : `#${markings.decoration_color}`}} 
                                                                            strokeWidth={lineAndArrow.strokeWidth} />
                                                                        <line
                                                                            x1={lineAndArrow.arrowStartX2}
                                                                            y1={lineAndArrow.arrowStartY2}
                                                                            x2={lineAndArrow.LineX2} 
                                                                            y2={lineAndArrow.LineY2}
                                                                            style={{ stroke: markings.decoration_color.startsWith('#') ? markings.decoration_color : `#${markings.decoration_color}`}} 
                                                                            strokeWidth={lineAndArrow.strokeWidth} />
                                                                    </> : parseInt(markings.decoration_type) === 1 ?
                                                                    <>
                                                                        <ellipse
                                                                            fill="none"
                                                                            cx={drawEclipseContent.Vcx}
                                                                            cy={drawEclipseContent.Vcy}
                                                                            rx={drawEclipseContent.Vrx}
                                                                            ry={drawEclipseContent.Vry}
                                                                            style={{ stroke: markings.decoration_color.startsWith('#') ? markings.decoration_color : `#${markings.decoration_color}`}} 
                                                                            strokeWidth={drawEclipseContent.strokeWidth}
                                                                        />
                                                                    </> : ""
                                                                }
                                                                <text x={drawTextContent.X1Text} y={drawTextContent.Y1Text} fill="red" style={{fontSize:30}}>{markings.decoration_text ? markings.decoration_text : ""}</text>
                                                                <text x={drawTextContent.X2Text} y={drawTextContent.Y2Text} fill="red" style={{fontSize:30}}>{markings.decoration_text ? markings.decoration_text : ""}</text>
                                                                <text x={drawTextContent.X3Text} y={drawTextContent.Y3Text} fill="red" style={{fontSize:30}}>{markings.decoration_text ? markings.decoration_text : ""}</text>
                                                                <text x={drawTextContent.X4Text} y={drawTextContent.Y4Text} fill="red" style={{fontSize:30}}>{markings.decoration_text ? markings.decoration_text : ""}</text>
                                                                <text x={drawTextContent.X5Text} y={drawTextContent.Y5Text} fill="red" style={{fontSize:30}}>{markings.decoration_text ? markings.decoration_text : ""}</text>
                                                            </>
                                                          )
                                                        })
                                                      : ""}
                                                  </svg>
                                                ) : (
                                                  ""
                                                )}
                                                <img
                                                style={loaded ? {} : { display: 'none' }}
                                                  src={`${url}/${elem}`}
                                                  className="preview-media-images"
                                                  onLoad={() => setLoaded(true)}
                                                  alt={"palm-tech"+elem} onClick={() =>
                                                    toggleLightBoxView(
                                                      media_array,
                                                      index,
                                                      picture_decoration
                                                    )
                                                  }
                                                />
                                              </div>
                                            ) : (
                                              <div className="media-video-container">
                                                <img
                                                  className="preview-media-video print-thumb"
                                                  src={ThumbImage}
                                                  alt="" 
                                                />
                                                {/* <span className="preview-media-video print-thumb"> video content  here </span> */}
                                                <Vimeo
                                                  className="preview-media-video print-hide"
                                                  showPortrait={true}
                                                  controls={true}
                                                  responsive={true}
                                                  video={elem}
                                                />
                                              </div>
                                            )}
                                          </>
                                        );
                                      })
                                    : ""}
                                </div>
                              </Grid>
                              {/* media */}
                              <Grid>
                                <div
                                  className={
                                    isMobileBreakpiont
                                      ? "preview-item-box-light"
                                      : "preview-item-box"
                                  }
                                >
                                  <p className="">
                                    <span>
                                      <span className="preview-box-content">
                                        Comments:
                                      </span>
                                      <span className="box-inner-content">
                                        {item.repairCommentEntered}
                                      </span>
                                    </span>
                                    <br />
                                    <br />
                                    <span>
                                      <span className="preview-box-content">
                                        Credits Requested:
                                      </span>{" "}
                                      <span className="box-inner-content">
                                        {item.repairAmountEntered
                                          ? `$${item.repairAmountEntered}`
                                          : ""}
                                      </span>
                                    </span>
                                  </p>
                                </div>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>{" "}
                        {/* sub contents ends here*/}
                        {reportData?.length - 1 === cindex ? (
                          <>
                            <div className="top-margin"></div>
                            <hr style={{ color: "#DADADA" }} />
                          </>
                        ) : (
                          <div className="bottom-margin"></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
            <Grid item padding={{ xs: "3px", md: "8px", lg: "30px" }}>
              <span className="preview-footer">
                Palm-Tech Inspector, Copyright © 1998-2022, Palm-Tech
              </span>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      {/* ends here */}
    </>
  );
};

export default PreviewReport;