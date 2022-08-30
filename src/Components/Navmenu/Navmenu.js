import React,{useState} from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import "../../assets/css/buttons/_buttons.scss";
import "../../assets/css/containers/_navmenu.scss";
import { NavLink } from "react-router-dom";
import Menu from "@mui/material/Menu";
import { Link as Scroll } from "react-scroll";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import Paper from "@mui/material/Paper";
import { useMediaQuery } from "react-responsive";

const Navmenu = (props) => {

  
  const isMobileBreakpiont = useMediaQuery({ query: "(max-width: 900px)" });
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const pathName = window.location.pathname.split("/")[1];
  return (
    <>
      <Box>
        <Grid className="navmenu-container" container alignItems="center">
          <Grid item xs={12} md={7} lg={6}>
            <Paper elevation={0} style={{ marginLeft: "20px" }}>
            {isMobileBreakpiont?
             (
              <>
            <NavLink
                to="/full-report"
                className={`list-item-small ${window.location.pathname !== "/full-report"? null : "nav-link"}`}
              >
                Full Report
              </NavLink>
              <NavLink
                to="/summary-report"
                className={`list-item-small ${window.location.pathname !== "/summary-report"? null : "nav-link"}`}               
              >
                Summary
              </NavLink>
              <NavLink
                to="/pdf-report"
                className={`list-item-small ${window.location.pathname !== "/pdf-report"? null : "nav-link"}`}               
              >
                Pdf
              </NavLink>
              <NavLink
                to="/media"
                className={`list-item-small ${window.location.pathname !== "/media"? null : "nav-link"}`}
              >
                Media
              </NavLink>
              </>)
            :
            (
              <>
            <NavLink
                to="/full-report"
                className={`list-item ${window.location.pathname !== "/full-report"? null : "nav-link"}`}
               
              >
                Full Report
              </NavLink>
              <NavLink
                to="/summary-report"
                className={`list-item ${window.location.pathname !== "/summary-report"? null : "nav-link"}`}               
              >
                Summary
              </NavLink>
              <NavLink
                to="/pdf-report"
                className={`list-item ${window.location.pathname !== "/pdf-report"? null : "nav-link"}`}               
              >
                Pdf
              </NavLink>
              <NavLink
                to="/media"
                className={`list-item ${window.location.pathname !== "/media"? null : "nav-link"}`}
              >
                Media
              </NavLink>
              </>)
            }
              
            </Paper>
            <div></div>
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            lg={6}
            display={{ xs: "none", md: "none", lg: "none" }}
          ></Grid>
        </Grid>
        {!props.showPDFReport?
        <Grid container>
        <Grid            
          className="dropdown-category"
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          display={{ xs: "block", md: "block", lg: "none" }}
        >
          {/* categories    */}
          <Box
            className=""
            display="flex"
            alignItems="center"
            height="inherit"
            sx={{ flexGrow: 1 }}
          >
            <Grid container spacing={1} >
              <Grid
                item
                
                className=""
              >
                <div
                  className=""
                >
                  <div
                    id="demo-positioned-button"
                    aria-controls="demo-positioned-menu"
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    <span style={{ display: "flex", alignItems: "center" }}>
                      {" "}
                      <AssignmentOutlinedIcon fontSize="small" />
                      <span className="category-title">
                        Select Categories
                      </span>{" "}
                      <KeyboardArrowDownIcon />
                    </span>
                  </div>
                  <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                  >
                    {props.categories.length > 0
                    ?pathName === "full-report"?
                     props.categories.map((cat, cindex) => {
                      
                      return (
                          cat.categoryName !== "General Information" &&
                          cat.categoryName !== "Definitions" &&
                          cat.categoryName !== "Inspection Details" ? (

                    <MenuItem
                    key={`${cindex}-${cat.categoryName}`}
                    >
                      <ListItemIcon>
                        <FiberManualRecordIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>
                        <Scroll
                          to={cat.categoryName}
                          spy={true}
                          smooth={true}                            
                          style={{ color: "black" }}
                          onClick={handleClose}
                        >
                          {cat.categoryName}
                          {props.showRepairReport ? (
                            <div className="navmenu-sidebar-icon-badge">
                              <span className="navmenu-sidebar-icon-badge-count">
                                0
                              </span>
                            </div>
                          ) : (
                            ""
                          )}
                        </Scroll>
                      </ListItemText>
                    </MenuItem>):"" )
                    }):
                    props.categories.map((cat, cindex) => {                        
                      return ( cat.is_category_empty === "1" &&
                          cat.categoryName !== "General Information" &&
                          cat.categoryName !== "Definitions" &&
                          cat.categoryName !== "Inspection Details" ? (

                    <MenuItem
                    key={`${cindex}-${cat.categoryName}`}
                    >
                      <ListItemIcon>
                        <FiberManualRecordIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>
                        <Scroll
                          to={cat.categoryName}
                          spy={true}
                          smooth={true}                            
                          style={{ color: "black" }}
                          onClick={handleClose}
                        >
                          {cat.categoryName}
                          {props.showRepairReport ? (
                            <div className="navmenu-sidebar-icon-badge">
                              <span className="navmenu-sidebar-icon-badge-count">
                                0
                              </span>
                            </div>
                          ) : (
                            ""
                          )}
                        </Scroll>
                      </ListItemText>
                    </MenuItem>):"" )
                    }):""}
                  </Menu>
                </div>
              </Grid>
            </Grid>
          </Box>
          {/* categories    */}
        </Grid>
      </Grid>:("")
        }        
      </Box>
    </>
    // ends here
  );
};

export default Navmenu;
