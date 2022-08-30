import * as React from "react";
import { useMediaQuery } from "react-responsive";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

export const SummaryDefinition = (props) => {
  const [readState, setReadState] = React.useState(-1);
  const [readMore, setReadMore] = React.useState(false);
  const isMobileBreakpiont = useMediaQuery({ query: "(max-width: 900px)" });
  const linkName = readMore ? (
    <>
      Read Less <ExpandLessIcon className="report-substr-icon" />
    </>
  ) : (
    <>
      ...Read More <ExpandLessIcon className="report-substr-icon" />
    </>
  );
  const readOpen = (index) => {
    setReadState(index);
  };
  const readClose = () => {
    setReadState(-1);
  };
  return (
    <>
      {Array.isArray(props.summaryrating) ? (
        <div className="report-main-disclaimer">
          <h1 className="report-main-title" style={{ marginTop: "30px" }}>
            Disclaimer
          </h1>
          {props.summaryrating.map((value, index) => {
            return (
              <>
                <div
                  className={` rating-name ${
                    isMobileBreakpiont ? "rating-small" : "rating-normal"
                  }`}
                  style={{
                    marginLeft: "-1px",
                    marginTop: "4px",
                    fontWeight: "bold",
                  }}
                  key={index}
                >
                  {value.ratingName}:
                </div>
                <div
                  className={`rating-definition  ${
                    isMobileBreakpiont
                      ? "definition-small"
                      : "definition-normal"
                  }`}
                  style={{ marginLeft: "-1px" }}
                  key={index}
                >
                  {readState === index ? (
                    <>
                      <div>
                        {value.ratingDisclaimer.replace(
                          new RegExp('"', "g"),
                          ""
                        )}
                        <span className="read-more-less" onClick={readClose}>
                          Read less
                          <ExpandLessIcon className="report-substr-icon" />
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        {value.ratingDisclaimer
                          ? value.ratingDisclaimer.length > 375
                            ? value.ratingDisclaimer
                                .replace('"', "")
                                .substring(0, 375)
                            : value.ratingDisclaimer
                                .replace('"', "")
                                .substring(0, 375)
                          : ""}

                        <span
                          className="read-more-less"
                          onClick={() => readOpen(index)}
                        >
                          {value.ratingDisclaimer?.length > 375
                            ? "...Read more"
                            : ""}
                          {value.ratingDisclaimer?.length > 375 ? (
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
        <>
          {" "}
          <h1 className="report-main-title" style={{ marginTop: "30px" }}>
            Disclaimer
          </h1>
          <div
            className="rating-name"
            style={{ marginLeft: "-1px", marginTop: "4px", fontWeight: "bold" }}
          >
            {props.summaryrating.ratingName === null ? (
              ""
            ) : (
              <>{props.summaryrating.ratingName}:</>
            )}
          </div>
          <div className="rating-normal">
            {!readMore &&
              props.summaryrating?.ratingDisclaimer?.substring(0, 375)}
            {readMore && props.summaryrating?.ratingDisclaimer}
            <span
              to="#"
              className="read-more-less"
              onClick={() => {
                setReadMore(!readMore);
              }}
            >
              {" "}
              <>
                {props.summaryrating?.ratingDisclaimer?.length > 375 &&
                  linkName}
              </>
            </span>
          </div>
        </>
      )}
    </>
  );
};
