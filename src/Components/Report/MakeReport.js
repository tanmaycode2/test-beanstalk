import "../../assets/css/containers/_definitions.scss";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CheckIcon from "@mui/icons-material/Check";
import * as React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { BuildCostNComment } from "./BuildCostNComment";
import { Media } from "../Media/Media";
import { colors } from "./colors";

let chkindex = 0;
let dropdownIndex = 0;

const MakeReport = (props) => {
  // const [readState, setReadState] = React.useState(-1);
  const [readMore, setReadMore] = React.useState(false);
  const linkName = readMore ? "...Read Less" : "...Read More";
  let emptySummaryItemFindCount = 0; // flag to hide empty category heading in summary
  let emptyBuildItemCount = 0; // flag to hide empty category heading in build request
  // const readOpen = (index) => {
  //   setReadState(index);
  // };

  // const readClose = () => {
  //   setReadState(-1);
  // };

  const toggleSelection = (ele) => {
    let checkboxNodeList = document.querySelectorAll('*[id^="accordin_"]');
    for (let i = 0; i < checkboxNodeList.length; i++) {
      let elemDescription = document.getElementById(checkboxNodeList[i].id)
        .parentNode.nextElementSibling.childNodes[1].innerHTML;
      let nextElemId = document.getElementById(checkboxNodeList[i].id)
        .nextElementSibling.id;
      let nextElem = document.getElementById(nextElemId);
      let inptVal = nextElem.childNodes[1].childNodes[0].childNodes[0];
      let cmtVal = nextElem.childNodes[3].childNodes[0].childNodes[0]; 
      if (
        parseInt(ele.isRepairSelected) === 1 &&
        ele.unique_card_id === elemDescription
      ) {
        if(cmtVal)  cmtVal.value = ele.repairCommentEntered;
        if(inptVal) inptVal.value = ele.repairAmountEntered;       
      }
    }
  };

  const handleFilterCondition = (data) => {
    if (props.showSummaryReport) {
      return parseInt(data.showOnSummary) !== 0;
    } else if (props.showRepairReport) {
      let filteredData = props.filterRawData(data);
      if (filteredData !== undefined) {
        if (filteredData.reportContent !== "")
          toggleSelection(filteredData.reportContent);
        return filteredData.reportContent;
      }
    } else {
      return parseInt(props.show_empty_fields) !== 0
        ? data.rating !== null
        : data;
    }
  };

  let reportData =
    props.reportContent.findIndex((x) => x[props.categoryName]) !== -1
      ? props.reportContent[
          props.reportContent.findIndex((x) => x[props.categoryName])
        ][props.categoryName].filter(handleFilterCondition)
      : [];
  let disclaimer =
    reportData.length !== 0
      ? reportData[
          reportData?.findIndex((x) => x.categoryName === props.categoryName)
        ] !== undefined
        ? reportData[
            reportData?.findIndex((x) => x.categoryName === props.categoryName)
          ].categoryDisclaimer
        : ""
      : "";
  // console.log(reportData);

  const handleAmtChange = (
    event,
    value,
    content,
    appointmentId,
    isDemoUser
  ) => {
    props.handleAmountChange(event, value, content, appointmentId, isDemoUser);
  };

  const handleCmntChange = (
    event,
    value,
    content,
    appointmentId,
    isDemoUser
  ) => {
    props.handleCommentChange(event, value, content, appointmentId, isDemoUser);
  };

  const print_2nd_card = (index, data, prompt, description, opt_indx) => {
    return (
      <>
        <Card className="report-card-container report-2nd-card">
          <CardContent className="report-card-content">
            <div className="report-card-title-container">
              <p className="report-card-title">
                {!props.isLocationTexas
                  ? props.firstIndx + "." + index + "." + opt_indx
                  : ""}{" "}
                {prompt}
              </p>
            </div>
            <div className="report-card-content-body">
              {description === "Null" || description === "null" ? ( //not displaying description value with "Null" or "null"
                ""
              ) : (
                <p className="report-card-sub-category-title">
                  {!readMore && description?.substring(0, 48)}
                  {readMore && description}
                  <span
                    to="#"
                    className="read-more-less"
                    onClick={() => {
                      setReadMore(!readMore);
                    }}
                  >
                    {" "}
                    <>{description?.length > 48 && linkName}</>
                  </span>
                </p>
              )}
              <p style={{ display: "none" }}>{data.unique_card_id}</p>
            </div>
            <Media
              reportUrl={props.assetUrl}
              media={{
                images: data?.pictures,
                videos: data?.videos,
              }}
              picture_decorations={
                !Array.isArray(data.picture_decorations)
                  ? data.picture_decorations
                  : []
              }
            />
            <div style={{ marginTop: "5px" }}></div>
            <div className="report-card-content-main">
              {props.readState === index ? (
                <>
                  {data.answerText}
                  <span className="read-more-less" onClick={props.readClose}>
                    {/* {...Read less
                    <ExpandLessIcon className="report-substr-icon" />} */}
                    {data.answerText ? (
                      data.answerText.length > 150 ? (
                        <>
                          Read less
                          <ExpandLessIcon className="report-substr-icon" />
                        </>
                      ) : (
                        ""
                      )
                    ) : (
                      ""
                    )}
                  </span>
                </>
              ) : (
                <div>
                  {data.answerText
                    ? data.answerText.length > 150
                      ? data.answerText.substring(0, 150)
                      : data.answerText.substring(0, 150)
                    : ""}

                  <span
                    className="read-more-less"
                    onClick={() => props.readOpen(index)}
                  >
                    {data.answerText?.length > 150 ? "...Read more" : ""}
                    {data.answerText?.length > 150 ? (
                      <ExpandMoreIcon className="report-substr-icon" />
                    ) : (
                      ""
                    )}
                  </span>
                </div>
              )}
            </div>
            <div className="report-card-footer report-2nd-card-footer"></div>
          </CardContent>
        </Card>
      </>
    );
  };

  return (
    <>
      {/* {props.showSummaryReport && props.firstIndx === 1 ? ( // kushagara's changes here <==
        <div className="report-main-disclaimer">
          <h1 className="report-main-title">Disclaimer</h1>
          <br />
          {props.summaryrating.map((value, index) => {
            return (
              <>
                <div
                  className="rating-name"
                  style={{ marginLeft: "-1px" }}
                  key={index}
                >
                  {value.ratingName}:
                </div>
                <div className="rating-normal" key={index}>
                  {props.readstate === index ? (
                    <>
                      <div>
                        {value.ratingDisclaimer}
                        <span
                          className="read-more-less"
                          onClick={props.readClose}
                        >
                          ...Read less
                          <ExpandLessIcon className="report-substr-icon" />
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        {value.ratingDisclaimer
                          ? value.ratingDisclaimer.length > 250
                            ? value.ratingDisclaimer
                                .replace('"', "")
                                .substring(0, 250)
                            : value.ratingDisclaimer.substring(0, 250)
                          : ""}

                        <span
                          className="read-more-less"
                          onClick={() => props.readOpen(index)}
                        >
                          {value.ratingDisclaimer?.length > 200
                            ? "...Read more"
                            : ""}
                          {value.ratingDisclaimer?.length > 200 ? (
                            <ExpandMoreIcon className="report-substr-icon" />
                          ) : (
                            ""
                          )}
                        </span>
                      </div>
                    </>
                  )}
                </div>
                <br />
              </>
            );
          })}
        </div>
      ) : (
        ""
      )} */}

      {/* looping to check whether the contents in line items are not empty */}
      {reportData.forEach((content, index) => {
        // shreenath's changes here <==
        if (content.showOnSummary !== "0") {
          // for summary empty categories
          emptySummaryItemFindCount++;
        }
        if (content.prompt !== null) {
          //for build request empty filtered categories
          emptyBuildItemCount++;
        }
      })}
      <div id={props.categoryName}>
        <div
          className={
            emptyBuildItemCount === 0 ? "" : "report-main-title-container"
          }
        >
          {props.showSummaryReport ? ( //showing summary categories only if they have contents in it
            emptySummaryItemFindCount !== 0 ? ( // shreenath's changes here <==
              <h1 className="report-main-title">
                {!props.isLocationTexas ? props.firstIndx + "." : ""}{" "}
                {props.categoryName}
              </h1>
            ) : (
              <p className="empty-category">Empty categories space</p> //overlapping issue fix
            )
          ) : props.showRepairReport ? ( //showing build request categories only if they have contents in it
            emptyBuildItemCount !== 0 ? ( // shreenath's changes here <==
              <h1 className="report-main-title">
                {!props.isLocationTexas ? props.firstIndx + "." : ""}{" "}
                {props.categoryName}
              </h1>
            ) : (
              <p className="empty-category">Empty categories space</p> //overlapping issue fix
            )
          ) : (
            <h1 className="report-main-title">
              {!props.isLocationTexas ? props.firstIndx + "." : ""}{" "}
              {props.categoryName}
            </h1>
          )}
          {!props.showSummaryReport && !props.showRepairReport ? (
            <div className="report-main-disclaimer">
              {props.readState === props.index ? (
                <div className="disclaimer-content">
                  {reportData[
                    reportData?.findIndex(
                      (x) => x.categoryName === props.categoryName
                    )
                  ]
                    ? reportData[
                        reportData?.findIndex(
                          (x) => x.categoryName === props.categoryName
                        )
                      ].categoryDisclaimer
                    : ""}

                  {disclaimer ? (
                    <span className="read-more-less" onClick={props.readClose}>
                      Read less
                      <ExpandLessIcon className="report-substr-icon" />
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                <div className={disclaimer ? "disclaimer-content" : ""}>
                  {disclaimer
                    ? disclaimer.length > 500
                      ? disclaimer.substring(0, 400)
                      : disclaimer.substring(0, 400)
                    : ""}

                  <span
                    className="read-more-less"
                    onClick={() => props.readOpen(props.index)}
                  >
                    {disclaimer?.length > 400 ? "...Read more" : ""}
                    {disclaimer?.length > 400 ? (
                      <ExpandMoreIcon className="report-substr-icon" />
                    ) : (
                      ""
                    )}
                  </span>
                </div>
              )}
            </div>
          ) : (
            ""
          )}
        </div>
        <Grid container spacing={2}>
          {reportData.map((content, index) => {
            let subCategory = "";
            let subCategoryIdx = props.reportContent.findIndex(
              (x) => x[props.categoryName]
            );
            if (subCategoryIdx !== -1) {
              let subCat =
                props.reportContent[subCategoryIdx][content.categoryName][index]
                  ?.subCategory;
              subCategory = subCat ? subCat : content.subCategory;
            }
            return (
              <>
                {subCategory ? (
                  <Grid
                    item
                    xs={12}
                    md={12}
                    className="report-main-sub-category"
                  >
                      <div style={{ marginTop: "30px" }}>{subCategory}</div>
                  </Grid>
                ) : (
                  ""
                )}
                <Grid
                  item
                  xs={12}
                  md={6}
                  key={`child-${index}-${content.categoryName}`}
                >
                  <Card className="report-card-container">
                    <CardContent className="report-card-content">
                      <div className="report-card-title-container">
                        <p className="report-card-title">
                          {!props.isLocationTexas
                            ? props.firstIndx + "." + index
                            : ""}{" "}
                          {content.prompt}
                        </p>
                        {props.showRepairReport ? (
                          <>
                            <div
                              id={`accordin_${chkindex++}`}
                              className="report-card-checkbox"
                              style={{
                                backgroundColor: `${
                                  parseInt(content.isRepairSelected) !== 0
                                    ? colors["repairSelected"]
                                    : colors["repairNotSelected"]
                                }`,
                              }}
                              onClick={(e) =>
                                props.toggleActiveClass(
                                  e,
                                  content.categoryName,
                                  content,
                                  props.appointmentId,
                                  props.isDemoUser,
                                  true
                                )
                              }
                            >
                              <CheckIcon className="report-card-checkbox-icon" />
                            </div>
                            <BuildCostNComment
                              id={`dropdown_${dropdownIndex++}`}
                              elemId={`dropdown-${dropdownIndex}`}
                              elemIndex={dropdownIndex}
                              elemResizeId={`accordin_${chkindex}`}
                              initialCost={content.repairAmountEntered}
                              initialComment={content.repairCommentEntered}
                              isRepairItemSelected={parseInt(content.isRepairSelected)}
                              handleAmountChange={(event, value) =>
                                handleAmtChange(
                                  event,
                                  value,
                                  content,
                                  props.appointmentId,
                                  props.isDemoUser
                                )
                              }
                              handleCommentChange={(event, value) =>
                                handleCmntChange(
                                  event,
                                  value,
                                  content,
                                  props.appointmentId,
                                  props.isDemoUser
                                )
                              }
                            />
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="report-card-content-body">
                        <p
                          className={
                            props.isLocationTexas
                              ? "report-card-sub-category-title-texas"
                              : "report-card-sub-category-title"
                          }
                        >
                          {/* {!readMore && content?.description?.substring(0, 48)}
                          {readMore && content?.description}
                          <span
                            to="#"
                            className="read-more-less"
                            onClick={() => {
                              setReadMore(!readMore);
                            }}
                          >
                            {" "}
                            <>{content?.description?.length > 48 && linkName}</>
                          </span> */}

                          {props.titlereadState === index ? (
                            <>
                              <div>
                                {content.description}
                                <span
                                  className="read-more-less"
                                  onClick={props.titlereadClose}
                                >
                                  {content.description ? (
                                    content.description.length > 150 ? (
                                      <>
                                        Read less
                                        <ExpandLessIcon className="report-substr-icon" />
                                      </>
                                    ) : (
                                      ""
                                    )
                                  ) : (
                                    ""
                                  )}
                                </span>
                              </div>
                            </>
                          ) : (
                            <>
                              <div>
                                {content.description
                                  ? !props.isLocationTexas &&
                                    content.description?.length > 46
                                    ? content.description.substring(0, 46)
                                    : content.description === "null" ||
                                      content.description === "Null"
                                    ? ""
                                    : content.description
                                  : ""}

                                <span
                                  className="read-more-less"
                                  onClick={() => props.titlereadOpen(index)}
                                >
                                  {!props.isLocationTexas &&
                                  content.description?.length > 46
                                    ? "...Read more"
                                    : ""}
                                  {!props.isLocationTexas &&
                                  content.description?.length > 46 ? (
                                    <ExpandMoreIcon className="report-substr-icon" />
                                  ) : (
                                    ""
                                  )}
                                </span>
                              </div>
                            </>
                          )}
                        </p>
                        <p style={{ display: "none" }}>
                          {content.unique_card_id}
                        </p>
                      </div>
                      <Media
                        reportUrl={props.assetUrl}
                        media={{
                          images: content?.pictures,
                          videos: content?.videos,
                        }}
                        picture_decorations={
                          !Array.isArray(content.picture_decorations)
                            ? content.picture_decorations
                            : []
                        }
                      />
                      <div style={{ marginTop: "5px" }}></div>
                      <div className="report-card-content-main">
                        {props.readState === index ? (
                          <>
                            {content.answerText}
                            <span
                              className="read-more-less"
                              onClick={props.readClose}
                            >
                              {/* {...Read less
                              <ExpandLessIcon className="report-substr-icon" />} */}
                              {content.answerText ? (
                                content.answerText.length > 150 ? (
                                  <>
                                    Read less
                                    <ExpandLessIcon className="report-substr-icon" />
                                  </>
                                ) : (
                                  ""
                                )
                              ) : (
                                ""
                              )}
                            </span>
                          </>
                        ) : (
                          <div>
                            {content.answerText
                              ? content.answerText.length > 150
                                ? content.answerText.substring(0, 150)
                                : content.answerText.substring(0, 150)
                              : ""}

                            <span
                              className="read-more-less"
                              onClick={() => props.readOpen(index)}
                            >
                              {content.answerText?.length > 150
                                ? "...Read more"
                                : ""}
                              {content.answerText?.length > 150 ? (
                                <ExpandMoreIcon className="report-substr-icon" />
                              ) : (
                                ""
                              )}
                            </span>
                          </div>
                        )}
                      </div>
                      <div
                        className="report-card-footer"
                        style={{
                          backgroundColor: `${
                            colors[
                              props.ratingKeys[content.rating?.split(",").pop()]
                                ? props.ratingKeys[
                                    content.rating?.split(",").pop()
                                  ]
                                : content.rating?.includes(",")
                                ? content.rating?.split(",").pop()
                                : content.rating
                            ]
                          }`,
                        }}
                      >
                        <p className="report-card-footer-title">
                          {content.rating}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  {!props.showSummaryReport && !props.showRepairReport
                    ? content.prompt_2 !== null && content.prompt_3 !== null
                      ? [
                          print_2nd_card(
                            index,
                            content,
                            content.prompt_2,
                            content.description_2,
                            1
                          ),
                          print_2nd_card(
                            index,
                            content,
                            content.prompt_3,
                            content.description_3,
                            2
                          ),
                        ]
                      : content.prompt_2 !== null
                      ? print_2nd_card(
                          index,
                          content,
                          content.prompt_2,
                          content.description_2,
                          1
                        )
                      : content.prompt_3 !== null
                      ? print_2nd_card(
                          index,
                          content,
                          content.prompt_3,
                          content.description_3,
                          1
                        )
                      : ""
                    : ""}
                </Grid>
              </>
            );
          })}
        </Grid>
      </div>
    </>
  );
};

export default MakeReport;
