import React from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import "../../assets/css/containers/_definitions.scss";
import "../../assets/css/buttons/_buttons.scss";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { color } from "./colors";
import { useMediaQuery } from "react-responsive";

export const Definitions = (props) => {
  // console.log(props);
  const isMobileBreakpiont = useMediaQuery({ query: "(max-width: 900px)" });
  return props.ratingsInfo !== undefined ? (
    <Grid id={props.categoryName} className="definition-body">
      <div className="row" style={{ marginBottom: "20px" }}>
        <div className="inspectin-title">
          <Typography fontSize={{ xs: "20px", md: "22px" }}>
            {props.categoryName}
          </Typography>
        </div>
      </div>
      <Box sx={{ flexGrow: 1 }}>
        <ul className="definitions-list">
          {props.ratingsInfo.map((ratings, rindex) => {
            if (ratings.ratingName === "Not Inspected")
              return (
                <li className="definitions-list-item" key={rindex}>
                  <p style={{ display: "flex", alignItems: "center" }}>
                    <FiberManualRecordIcon
                      className="rating-circle"
                      style={{
                        color: `${
                          ratings.ratingName === "Not Inspected"
                            ? color[ratings.ratingName]
                            : color["extra-4"]
                        }`,
                      }}
                    />
                    <span
                      className={` rating-name ${
                        isMobileBreakpiont ? "rating-small" : "rating-normal"
                      }`}
                    >
                      {ratings.ratingName}
                    </span>
                    :
                  </p>{" "}
                  <span
                    className={`rating-definition  ${
                      isMobileBreakpiont
                        ? "definition-small"
                        : "definition-normal"
                    }`}
                  >
                    {ratings.ratingDefinition.replace(new RegExp('"', "g"), "")}
                  </span>
                </li>
              );
            else if (ratings.ratingName === "Not Present")
              return (
                <li className="definitions-list-item" key={rindex}>
                  <p style={{ display: "flex", alignItems: "center" }}>
                    <FiberManualRecordIcon
                      className="rating-circle"
                      style={{
                        color: `${
                          ratings.ratingName === "Not Present"
                            ? color[ratings.ratingName]
                            : color["extra-5"]
                        }`,
                      }}
                    />
                    <span
                      className={` rating-name ${
                        isMobileBreakpiont ? "rating-small" : "rating-normal"
                      }`}
                    >
                      {ratings.ratingName}
                    </span>
                    :{" "}
                  </p>{" "}
                  <span
                    className={`rating-definition  ${
                      isMobileBreakpiont
                        ? "definition-small"
                        : "definition-normal"
                    }`}
                  >
                    {ratings.ratingDefinition.replace(new RegExp('"', "g"), "")}
                  </span>
                </li>
              );
            else if (ratings.ratingName === "Not Applicable")
              return (
                <li className="definitions-list-item" key={rindex}>
                  <p style={{ display: "flex", alignItems: "center" }}>
                    <FiberManualRecordIcon
                      className="rating-circle"
                      style={{
                        color: `${
                          ratings.ratingName === "Not Applicable"
                            ? color[ratings.ratingName]
                            : color["extra-4"]
                        }`,
                      }}
                    />
                    <span
                      className={` rating-name ${
                        isMobileBreakpiont ? "rating-small" : "rating-normal"
                      }`}
                    >
                      {ratings.ratingName}
                    </span>{" "}
                    :{" "}
                  </p>{" "}
                  <span
                    className={`rating-definition  ${
                      isMobileBreakpiont
                        ? "definition-small"
                        : "definition-normal"
                    }`}
                  >
                    {ratings.ratingDefinition.replace(new RegExp('"', "g"), "")}
                  </span>{" "}
                </li>
              );
            else {
              return (
                <li className="definitions-list-item" key={rindex}>
                  <p style={{ display: "flex", alignItems: "center" }}>
                    <FiberManualRecordIcon
                      className="rating-circle"
                      style={{
                        color: `${
                          props.ratingKeys[ratings.ratingName]
                            ? color[props.ratingKeys[ratings.ratingName]]
                            : color[ratings.ratingName]
                        }`,
                      }}
                    />
                    <span
                      className={` rating-name ${
                        isMobileBreakpiont ? "rating-small" : "rating-normal"
                      }`}
                    >
                      {ratings.ratingName}
                    </span>
                    :{" "}
                  </p>{" "}
                  <span
                    className={`rating-definition  ${
                      isMobileBreakpiont
                        ? "definition-small"
                        : "definition-normal"
                    }`}
                  >
                     {ratings.ratingDefinition.replace(new RegExp('"', "g"), "")}
                  </span>
                </li>
              );
            }
          })}
        </ul>
        {/* <h5 style={{
                    fontSize: "14px",
                    color: "black",
                    fontWeight: "bold",
                    marginLeft: "10px",
                    marginTop: "15px"
                }}>{props.ratingDisclaimer}</h5> */}
        <br />
        <p className="definition-footer" style={{ display: "flex" }}>
          NOTE: All definitions listed above refer to the property or item
          listed as inspected on this report at the time of inspection.{" "}
        </p>
      </Box>
    </Grid>
  ) : (
    ""
  );
};
