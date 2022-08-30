import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import "../../assets/css/buttons/_buttons.scss";
import "../../assets/css/containers/_header.scss";
import { NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Navmenu from "../Navmenu/Navmenu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import { ContactUs } from "../ContactUs/ContactUs";
import ListItemIcon from "@mui/material/ListItemIcon";
import { queryParams } from "../../helpers/queryParams";
import { ShareReportView } from "../ShareReportView/ShareReportView";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
// import OutsideClickHandler from "react-outside-click-handler";

// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';

const Header = (props) => {
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  // const [Hide, setHide] = React.useState(false);
  const open1 = Boolean(anchorEl1);
  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
    setHide(!Hide);
  };

  const handleClose0 = () => {
    setAnchorEl1(null);
  };
  const handleClose1 = () => {
    setAnchorEl1(null);
    setisShareReport(!isShareReport);
  };
  const handleClose2 = () => {
    setAnchorEl1(null);
    setisContactUs(!isContactus);
  };

  const [isContactus, setisContactUs] = React.useState(false);
  const [contactflag] = React.useState(false);
  const [Hide, setHide] = React.useState(true);
  const [shareflag] = React.useState(false);
  const [editPermission, setEditPermission] = React.useState(0);
  // const onClick = () => {
  //   setHide(!Hide);
  //   console.log("Hello This is onclick");
  // };

  // const [params, setParams] = React.useState({});
  const [isShareReport, setisShareReport] = React.useState(false);
  const [canEdit, setCanEdit] = React.useState(false);
  const showContactUs = (value) => {
    setisContactUs(value);
  };
  // const open = Boolean(anchorEl);
  const showShareReport = (value) => {
    setisShareReport(value);
  };
  // const mahilex = () => {
  //   var x = document.getElementById("basic-menu");

  //   if (x.style.zIndex === "0" && x.style.marginBottom === "20px") {
  //     console.log("if Section");
  //   } else {
  //     x.style.zIndex = "0";
  //     x.style.marginBottom = "20px";
  //     console.log("Else section");
  //   }
  // };

  // const handleclickshareflag = () => {
  //   setshareFlag(!shareflag);
  //   // setHide(false) ;
  //   mahilex();
  // };
  // const handleclickcontactflag = () => {
  //   setconstactFlag(!contactflag);
  // };
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  React.useEffect(() => {
    let query = queryParams({ localStorage: localStorage });
    if (query[1].queryId5 === "undefined") {
      setCanEdit(true);
      setEditPermission(1);
    } else if (query[1].queryId5 === null) {
      setCanEdit(true);
      setEditPermission(1);
    } else if (parseInt(query[1].queryId5) === 0) {
      setCanEdit(false);
      setEditPermission(0);
    } else {
      setCanEdit(true);
      setEditPermission(1);
    }
  }, [editPermission]);
  return (
    <>
      <Box>
        <Grid
          className="header-container"
          container
          spacing={2}
          alignItems="center"
        >
          <Grid item xs={6} md={1} lg={1}>
            <a
              href="/"
              style={{ pointerEvents: "none", cursor: "default" }}
              className="brand-logo"
            >
              {" "}
              {/* eslint-disable-next-line */}
              {props.logoPresent?
              <img
                className="logo"
                src={props.reportUrl + "/" + props.logo}
                // onError={(event) => event.target.style.display = ''}
                alt="logo"
              />:""}
              
            </a>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            lg={8}
            display={{ xs: "none", md: "block", lg: "block" }}
          ></Grid>
          <Grid
            item
            xs={6}
            md={5}
            lg={3}
            container
            spacing={2}
            alignItems="center"
            justifyContent="flex-end"
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginRight: "15px",
              }}
            >
              {props.signupCanEdit === 0 ? (
                ""
              ) : canEdit && editPermission === 1 ? (
                <NavLink
                  to={{
                    pathname: "/repair-list",
                  }}
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    className="header-build-request-button"
                    sx={{ width: "178", height: "44px" }}
                    variant="contained"
                    style={{
                      backgroundColor: canEdit
                        ? "$secondary-caribbean-green !important"
                        : "#ccc",
                    }}
                  >
                    <Typography
                      fontSize={{
                        lg: 14,
                        md: 14,
                        sm: 12,
                        xs: 10,
                      }}
                    >
                      BUILD REQUEST LIST
                    </Typography>
                  </Button>
                </NavLink>
              ) : (
                ""
              )}

              <div>
                {/* <OutsideClickHandler> */}
                <Button
                  id="basic-button"
                  aria-controls={open1 ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open1 ? "true" : undefined}
                  onClick={handleClick1}
                >
                  <MenuIcon className="menu-icon" />
                </Button>
                {/* </OutsideClickHandler> */}

                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl1}
                  open={open1}
                  onClick={handleClose0}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  {props.signupCanEdit === 0 ? (
                    <MenuItem
                      disabled
                      style={{
                        paddingBottom: "16px",
                      }}
                    >
                      <ListItemText>Share report</ListItemText>
                      <ListItemIcon style={{ marginLeft: "6px" }}>
                        <IosShareOutlinedIcon fontSize="small" />
                      </ListItemIcon>
                    </MenuItem>
                  ) : canEdit && editPermission === 1 ? (
                    <MenuItem
                      onClick={handleClose1}
                      style={{
                        paddingBottom: "16px",
                        cursor: "pointer",
                      }}
                    >
                      <ListItemText>Share report</ListItemText>
                      <ListItemIcon style={{ marginLeft: "6px" }}>
                        <IosShareOutlinedIcon fontSize="small" />
                      </ListItemIcon>
                    </MenuItem>
                  ) : (
                    <MenuItem
                      disabled
                      style={{
                        paddingBottom: "16px",
                      }}
                    >
                      <ListItemText>Share report</ListItemText>
                      <ListItemIcon style={{ marginLeft: "6px" }}>
                        <IosShareOutlinedIcon fontSize="small" />
                      </ListItemIcon>
                    </MenuItem>
                  )}

                  {/* <MenuItem disabled
                    className="dropdown"
                    style={{
                      paddingBottom: "16px",
                      color: "grey",
                      cursor: "default",
                    }}
                  >
                    <ListItemText>Profile</ListItemText>
                    <ListItemIcon style={{ marginLeft: "6px" }}>
                      <PersonOutlineOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                  </MenuItem>
                  <MenuItem disabled
                    className="dropdown"
                    style={{
                      paddingBottom: "16px",
                      color: "grey",
                      cursor: "default",
                    }}
                  >
                    <ListItemText>Invoice</ListItemText>
                    <ListItemIcon style={{ marginLeft: "6px" }}>
                      <ReceiptOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                  </MenuItem> */}
                  <MenuItem
                    style={{
                      paddingBottom: "16px",
                      cursor: "pointer",
                    }}
                  >
                    <ListItemText onClick={handleClose2}>
                      Contact us
                    </ListItemText>
                    <ListItemIcon>
                      <ForumOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                  </MenuItem>
                </Menu>
              </div>
            </div>
          </Grid>
        </Grid>
      </Box>
      {isContactus ? (
        <ContactUs
          shareflag={contactflag}
          baseUrl={props.reportUrl}
          hideModal={showContactUs}
          contactusmail={props.contactusmail}
          isDemoUser={props.isDemoUser}
          address={props.address}
          inspectoremail={props.inspectoremail}
        />
      ) : (
        ""
      )}
      {isShareReport ? (
        <ShareReportView
          shareflag={shareflag}
          baseUrl={props.reportUrl}
          hideModal={showShareReport}
          sharemsg={props.sharemsg}
          isDemoUser={props.isDemoUser}
          sharelink={props.sharelink}
          shareinspectionDetails={props.shareinspectionDetails}
        />
      ) : (
        ""
      )}

      <Navmenu
        categories={props.categories}
        showRepairReport={props.showRepairReport}
        showPDFReport={props.showPDFReport}
      />
    </>
  );
};

export default Header;
