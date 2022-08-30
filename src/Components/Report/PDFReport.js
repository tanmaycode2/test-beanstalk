import { useEffect, useState } from "react";
import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "../../assets/css/containers/_report.scss";
import { queryParams } from "../../helpers/queryParams";
import server from "../../services/server";
import { TCPA } from "../TCPA/TCPA";
import { Grid } from "@mui/material";
import { useLocation } from "react-router-dom";

export const PDFReport = (props) => {
  const [showTcpa, setshowTcpa] = useState(0);
  const [tcpaData, settcpaData] = useState([]);
  const location = useLocation();
  let pdf = `${props.assetUrl}/${props.pdf_name}`;
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs: (defaultTabs) => [defaultTabs[0]],
  });
  useEffect(() => {
    let query = queryParams({ localStorage: localStorage });
    server("/checkTcpa?", "GET", query[0], "").then((res) => {
      const data = res.data.data;
      settcpaData(data);
      if (
        query[1]["queryId4"] === "insp" ||
        query[1]["queryId4"] === "agnt" ||
        query[1]["queryId4"].includes("@")
      ) {
        setshowTcpa(0);
      }else if(location.state?.isNewUser){
        setshowTcpa(0);
      }  else {
        if (data.show_tcpa === "1" && data.is_tcpa_shown === "0") {
          setshowTcpa(1);
        } else {
          setshowTcpa(0);
        }
      }
    });
  }, [location.state]);

  const LoadError = (error) => {
    let message = "";
    switch (error.name) {
      case "InvalidPDFException":
        message = "The document is loading...";
        break;
      case "MissingPDFException":
        message =
          "PDF Version of this Home Inspection report is still generating.Please try again after some time.";
        break;
      case "UnexpectedResponseException":
        message =
          "PDF Version of this Home Inspection report is still generating.Please try again after some time.";
        break;
      default:
        message =
          "PDF Version of this Home Inspection report is still generating.Please try again after some time.";
        break;
    }

    return (
      <div
        style={{
          alignItems: "center",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          fontSize:"18px",
          marginRight:"5px"
        }}
      >
        {message}
      </div>
    );
  };

  return (
    <>
      {props.isLocationTexas ? (
        parseInt(showTcpa) !== 0 ? (
          <TCPA tcpaData={tcpaData} />
        ) : (
          ""
        )
      ) : (
        ""
      )}
      <Grid
        container
        spacing={2}
        sx={{ mt: 0.2 }}
        marginLeft={{ lg: 13, xl: 20 }}
      >
        <Grid item xs={12} md={12} lg={12}>
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
            <Viewer
              fileUrl={pdf}
              plugins={[defaultLayoutPluginInstance]}
              renderError={LoadError}
            />
          </Worker>
        </Grid>
      </Grid>
    </>
  );
};
