import React from "react";
import "../../assets/css/containers/_inspectionDetails.scss";
import "../../assets/css/buttons/_buttons.scss";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useMediaQuery } from "react-responsive";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ContactUs } from "../ContactUs/ContactUs";

export const InspectionDetails = (props) => {
  const isMobileBreakpoint = useMediaQuery({ query: "(max-width: 900px)" });
  const isSmBreakpiont = useMediaQuery({ query: "(max-width: 600px)" });
  const [contactflag] = React.useState(false);
  const [isContactus, setisContactUs] = React.useState(false);
  // const sendMessage = () => {
  //   setShowMessageDialog(!showMessageDialog);
  // };
  const showContactUs = (value) => {
    setisContactUs(value);
  };
  // const handleclickcontactflag = () => {
  //   setconstactFlag(!contactflag);
  // };
  return props.inspectionDetails !== undefined ? (
    <Grid id={props.categoryName} container className="inspection-body">
      <div className="inspection-title-row">
        <div>
          {isContactus ? (
            <ContactUs
              shareflag={contactflag}
              hideModal={showContactUs}
              contactusmail={props.contactusmail}
              isDemoUser={props.isDemoUser}
              address={props.address}
              inspectoremail={props.inspectoremail}
            />
          ) : (
            ""
          )}
        </div>
        <div className="inspectin-title">
          <Typography fontSize={{ xs: "20px", md: "22px" }}>
            {props.categoryName}
          </Typography>
        </div>
      </div>
      <Grid container>
        <Grid item xs={12} sm={12} md={6}>
          <div
            className={
              isMobileBreakpoint
                ? "inspection-cover-image-light"
                : "inspection-cover-image"
            }
          >
            {isMobileBreakpoint ? (
              props.inspectionDetails.coverPageImage ? (
                <img
                  className="insp-image"
                  src={
                    props.reportUrl +
                    "/" +
                    props.inspectionDetails.coverPageImage
                  }
                  height="100%"
                  width="100%"
                  alt=""
                />
              ) : (
                ""
              )
            ) : props.inspectionDetails.coverPageImage ? (
              <img
                className="insp-image"
                src={
                  props.reportUrl + "/" + props.inspectionDetails.coverPageImage
                }
                height="100%"
                width="100%"
                alt=""
              />
            ) : (
              ""
            )}
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Grid
            container
            className={isMobileBreakpoint ? "" : "content-container"}
          >
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              className={
                isMobileBreakpoint
                  ? "inspection-datas-container-light"
                  : "inspection-datas-container"
              }
            >
              <div>
                <Typography
                  fontSize={{ xs: "14px", sm: "14px", md: "17px", lg: "18px" }}
                  className="inspection-address"
                >
                  <span>{props.inspectionDetails.locationAddress}</span>
                  <br />

                  <span>{props.inspectionDetails.locationCityStateZip}</span>
                </Typography>
              </div>
              <div className="row">
                <Typography
                  fontSize={{ xs: "14px", sm: "14px", md: "14px" }}
                  className="inspection-details-title"
                >
                  CLIENT INFORMATION
                </Typography>
              </div>
              <div>
                <Typography
                  fontSize={{ xs: "14px", sm: "14px", md: "14px", lg: "15px" }}
                  className={
                    isMobileBreakpoint
                      ? "inspection-details-content-light"
                      : "inspection-details-content"
                  }
                >
                  {props.inspectionDetails.clientName},
                  <br />
                  {props.inspectionDetails.clientAddress}
                  <br />
                  {props.inspectionDetails.clientCityStateZip}
                </Typography>

                <Typography
                  fontSize={{ xs: "14px", sm: "14px", md: "14px", lg: "15px" }}
                  className={
                    isMobileBreakpoint
                      ? "inspection-details-content-light"
                      : "inspection-details-content"
                  }
                >
                  <span className="InspectionDetails">
                    {props.inspectionDetails.clientPhone}
                  </span>
                  <br />
                  <span className="InspectionDetails">
                    {props.inspectionDetails.clientEmail}{" "}
                  </span>
                </Typography>

                <Typography
                  fontSize={{ xs: "14px", sm: "14px", md: "14px", lg: "15px" }}
                  className={
                    isMobileBreakpoint
                      ? "inspection-details-content-light"
                      : "inspection-details-content"
                  }
                >
                  <span>Referrer: {props.inspectionDetails.referrerName}</span>
                  <br />
                  <span className="InspectionDetails">
                    {props.inspectionDetails.referrerPhone}
                  </span>
                  <br />
                  <span className="InspectionDetails">
                    {props.inspectionDetails.referrerEmail}
                  </span>
                </Typography>
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              className={isMobileBreakpoint ? "" : "info-details-column"}
            >
              <div
                className={`${
                  isMobileBreakpoint
                    ? isSmBreakpiont
                      ? "inspector-details-row-small"
                      : "inspector-details-row-light"
                    : "inspector-details-row-normal"
                }`}
              >
                <Typography
                  fontSize={{ xs: "14px", sm: "14px", md: "14px" }}
                  className="inspection-details-title"
                >
                  INSPECTOR INFORMATION
                </Typography>
              </div>
              <div>
                <Typography
                  fontSize={{ xs: "14px", sm: "14px", md: "14px", lg: "15px" }}
                  className={
                    isMobileBreakpoint
                      ? "inspection-details-content-light"
                      : "inspection-details-content"
                  }
                >
                  {props.inspectionDetails.inspectorName},
                  <br />
                  {props.inspectionDetails.inspectorCompany}
                  <br />
                  {props.inspectionDetails?.inspectorAddress}
                  <br />
                  {props.inspectionDetails?.cityStateZip}
                </Typography>

                <Typography
                  fontSize={{ xs: "14px", sm: "14px", md: "14px", lg: "15px" }}
                  className={
                    isMobileBreakpoint
                      ? "inspection-details-content-light"
                      : "inspection-details-content"
                  }
                >
                  <span className="InspectionDetails">
                    {props.inspectionDetails.inspectorPhone}
                  </span>
                  <br />
                  <span className="InspectionDetails">
                    {props.inspectionDetails.inspectorEmail}
                    <br />
                    {props.inspectionDetails.inspectorWebsite
                      ? props.inspectionDetails.inspectorWebsite
                      : ""}
                  </span>
                </Typography>
                <Typography>
                  <span
                    //   onClick={SendUsMessageText}
                    className=""
                    style={{
                      color: " #0EAD7C",
                      cursor: "pointer",
                    }}
                  >
                    <span
                      onClick={() => setisContactUs(!isContactus)}
                      className={`${
                        isMobileBreakpoint
                          ? "send-message-text-light"
                          : "send-message-text"
                      }`}
                    >
                      {" "}
                      Send us a message <ChevronRightIcon />
                    </span>
                  </span>
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  ) : (
    ""
  );
};
