import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import "../../assets/css/buttons/_buttons.scss";
import "../../assets/css/containers/_drawer.scss";
import { NavLink } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { RepairReportView } from "../RepairReportView/RepairReportView";
import {
  drawerContentCounts
} from '../Report/utilities';

const Drawer = (props) => {
  const [isRepairReport, setisRepairReport] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});
  const [drawerContent, setDrawerContent] = useState({});

  const showRepairReport = (value) => {
    setisRepairReport(value);
  };
  
  useEffect(() => {
    let drawerCounts = drawerContentCounts(props.reportContent);
    setDrawerContent(drawerCounts);
  }, [props.reportContent]);

  const changeHandler = (value, flag) => {
    setActiveFilters({
      ...activeFilters,
      [value]:flag
    });
    if (value === "Acceptable") props.filteredFlags(value, flag);
    if (value === "Defective") props.filteredFlags(value, flag);
    if (value === "Marginal") props.filteredFlags(value, flag);
    if (value === "Not Inspected") props.filteredFlags(value, flag);
    if (value === "Not Present") props.filteredFlags(value, flag);
    if (value === "Safety") props.filteredFlags(value, flag);
    else props.filteredFlags(value, flag);

    console.log(activeFilters);
  };

  // const handleDefaultCheck = (filters, rating) => {
  //   console.log(activeFilters);
  //   if(filters?.includes(rating)) {
  //     setActiveFilters({
  //       ...activeFilters,
  //       [rating]: true
  //     });
  //   } else {
  //     setActiveFilters({
  //       ...activeFilters,
  //       [rating]: false
  //     });
  //   }
  // }

  // useEffect(() => {
  //   let ratObj = {};
  //   props.ratingsInfo.forEach((rating) => {
  //     let key = rating.ratingName;
  //     if(Object.keys(ratObj)[0] !== key) {
  //       ratObj[key] = props.activeFilters.includes(key);
  //     } else {
  //       ratObj[key] = props.activeFilters.includes(key);
  //     }
  //   });

  //   setActiveFilters(ratObj);
  // }, [props.activeFilters, props.ratingsInfo]);
  
  return (
    <>
      {isRepairReport ? (
        <RepairReportView
          hideModal={showRepairReport}
          reportUrl={props.assetUrl}
          senderEmail={props.senderEmail}
          reportviewUrl={props.reportviewUrl}
          previewReportViewUrl={props.previewReportViewUrl}
          isDemoUser={props.isDemoUser}
          appointmentId={props.appointmentId}
          assetUrl={props.assetUrl}
          inspectionDetails={props.inspectionDetails}
        />
      ) : (
        ""
      )}
      <Box className="drawer-container">
        <Grid className="drawer-head" container item xs={12} sm={12} md={12} lg={12}>
          <span className="drawer-head-text">Create a Request List</span>
          <div className="close-icon">
            <NavLink to="/full-report">
              <CloseIcon style={{color:"#3B3B3B"}} />
            </NavLink>
          </div>
        </Grid>
        <Grid container className="drawer-content-container">
          <Grid item xs={12} sm={12} md={2} lg={2}>
            {/* blank content */}
          </Grid>
          <Grid className="checkbox-area" item xs={12} sm={12} md={5} lg={5}>
            <Grid container>
              {" "}
              <span className="checkbox-heading"> SHOW FINDINGS</span>
            </Grid>
            <Grid container>
              {
                props.ratingsInfo?.map((checkboxItm,key)=>{
                  // console.log(props.activeFilters);
                  return (
                    <>
                      {
                        props.activeFilters !== "" ? 
                        <FormControlLabel key={`checkbox-${checkboxItm.ratingName}-${key}`} className="checkbox-control"
                          control={
                            <Checkbox
                              id="checkbox-default-check"
                              defaultChecked={props.activeFilters?.includes(checkboxItm.ratingName) ? true : false}
                              value={checkboxItm.ratingName}
                              onClick={(e) =>
                                changeHandler(e.target.value, e.target.checked)
                              }
                              sx={{ color: "#000", "&.Mui-checked": { color: "#000" } }}
                            />
                          }
                          label={
                            <Typography className="label-text">
                              {`${checkboxItm.ratingName} (${checkboxItm.ratingName === "Acceptable"?drawerContent.acceptableCnt:checkboxItm.ratingName === "Defective"?drawerContent.defectiveCnt:checkboxItm.ratingName === "Not Present"?drawerContent.notPresentCnt:checkboxItm.ratingName === "Safety"?drawerContent.safetyCnt:checkboxItm.ratingName === "Not Inspected"?drawerContent.notInspectedCnt:checkboxItm.ratingName === "Marginal"?drawerContent.marginalCnt:drawerContent.otherRatings?.findIndex(x => x[checkboxItm.ratingName]) !== -1 ? drawerContent.otherRatings ? Object.values(drawerContent.otherRatings[drawerContent.otherRatings?.findIndex(x => x[checkboxItm.ratingName])])[0] : "" : "" })`}{" "}
                            </Typography>
                          }
                        /> : ""
                      }
                    </>
                  ) 
                })
              }            
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={2} lg={2} className="items-content">
            <Grid style={{ marginBottom: "5px" }}>
              <span className="build-items">
                {" "}
                Total items <br /> Selected:
              </span>{" "}
              <span className="build-rate"> {props.repairCount}</span>
            </Grid>
            <Grid>
              <span className="build-cost"> Total Repair Cost : </span>
              <br /> <span className="build-rate"> ${props.repairTtlAmt}</span>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} className="drawer-buttons">
          {props.repairCount=== 0?               
              <Button disabled className="build-req-preview-button-disabled" variant="outlined">
                Preview
              </Button>:
            <NavLink
            to={"/preview-report"}
            state={{
              appointmentId: props.appointmentId,
              assetUrl: props.assetUrl,
              inspectionDetails: props.inspectionDetails,
              isDemoUser: props.isDemoUser
            }}
            style={{ textDecoration: "none" }}
          >
            <Button  className="build-req-preview-button" variant="outlined">
              Preview
            </Button>
          </NavLink>
            }            
            <Button disabled={props.repairCount=== 0?true:false}
              className={props.repairCount=== 0?"build-req-create-button-disabled":"build-req-create-button"}
              variant="contained"
              onClick={() => setisRepairReport(!isRepairReport)}
            >
              Create
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Drawer;