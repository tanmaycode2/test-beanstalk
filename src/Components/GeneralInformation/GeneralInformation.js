import React from "react";
import "../../assets/css/containers/_generalInformation.scss";
import "../../assets/css/buttons/_buttons.scss";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import moment from "moment";
import { useMediaQuery } from "react-responsive";

export const GeneralInformation = (props) => {
  const isMobileBreakpiont = useMediaQuery({ query: "(max-width: 900px)" });

  const change_format = (key, value) => {
    if (key === "Inspection Date")
      return moment(value).format("MMMM Do , YYYY");
  };

  return props.general_information !== undefined ? (
    <>
      <Grid id={props.categoryName} className="general-info-body">
        <div className="row" style={{ marginBottom: "10px" }}>
          <div className="inspectin-title">
            <Typography fontSize={{ xs: "20px", md: "22px" }}>
            {props.categoryName}
            </Typography>
          </div>
        </div>
        <Box sx={{ flexGrow: 1 }}>
          {
            props.general_information?.map(({prompt,answer},key)=>{
              return(
              prompt && answer && (
                <p className="info-para" key={key}>
                  <span
                    className={`${
                      isMobileBreakpiont ? "info-key-light" : "info-key-normal"
                    }`}
                  >
                    <span>{prompt}</span>:{" "}
                  </span>
                  <span
                    className={`${
                      isMobileBreakpiont
                        ? "info-value-light"
                        : "info-value-normal"
                    }`}
                  >
                     {change_format(prompt, answer)
                      ? change_format(prompt, answer)
                      : answer}
                  </span>
                </p>
              ))
            })
          }
          {/* {Object.entries(props.general_information).map(
            ([key, value]) =>
              value && (
                <p className="info-para" key={key}>
                  <span
                    className={`${
                      isMobileBreakpiont ? "info-key-light" : "info-key-normal"
                    }`}
                  >
                    <span>{key}</span> :{" "}
                  </span>
                  <span
                    className={`${
                      isMobileBreakpiont
                        ? "info-value-light"
                        : "info-value-normal"
                    }`}
                  >
                    {change_format(key, value)
                      ? change_format(key, value)
                      : value}
                  </span>
                </p>
              )
          )} */}
        </Box>
      </Grid>
    </>
  ) : (
    ""
  );
};
