import "../../assets/css/containers/_createreport.scss";
import "../../assets/css/buttons/_buttons.scss";
import React from "react";
import axios from "axios";
import validator from "validator";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Input from "@mui/material/Input";
import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import server from "../../services/server";
import { useEffect, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { queryParams } from "../../helpers/queryParams";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { FlashMessages } from "../../FlashMessages/FlashMessages";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import { forgotPasswordUrl } from "../../config/config";
import { origin } from "../../helpers/getOrigin";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export const RepairReportView = (props) => {
  const replyName = "Palm-Tech";
  const [url, seturl] = React.useState("");
  // eslint-disable-next-line
  const [previewUrl, setPreviewUrl] = React.useState("");
  const [count, setCount] = useState(0);
  const [email, setEmail] = useState();
  // eslint-disable-next-line
  const [link, setLink] = useState();
  //const [oneurl, setoneUrl] = React.useState(``);
  //const [lasturl, setlastUrl] = React.useState(``);
  const [recipientEmails, updateRecicpientEmails] = useState({});
  const [senderEmails, updateSenderEmails] = useState({});
  const [hidden] = useState(false);
  const [subject, setsubject] = useState("Inspection Request List");
  const [message, setmessage] = useState(`....`);
  const [showDemoPopup, setShowDemoPopup] = useState(false);
  const handleClose = () => setShowDemoPopup(false);
  let path = origin();
  //const [inspectorname, setinspectorName] = React.useState();
  //const [inspectorcompany, setinspectorCompany] = React.useState();
  function closeModal() {
    props.hideModal(false);
  }
  const changeSubjectHandler = (e) => {
    setsubject(e.target.value);
  };
  const changeMessageHandler = (e) => {
    setmessage(e.target.value);
  };

  const extratEmailList = (emailsList) => {
    if (!emailsList || !Object.keys(emailsList).length) {
      return;
    }

    return Object.values(emailsList);
  };
  const handleInputChange = (e, name, isSenderEmail) => {
    !isSenderEmail
      ? updateRecicpientEmails((prevState) => ({
          ...prevState,
          [name]: e.target.value,
        }))
      : updateSenderEmails((prevState) => ({
          ...prevState,
          [name]: e.target.value,
        }));
    setEmail(e.target.value);
  };

  function validate(recipientEmailsList, senderEmailsList) {
    let remails = [];
    const rEmails = extratEmailList(recipientEmailsList);
    //let recipientError = document.getElementById("recipient_error");
    let senderError = document.getElementById("sender_error");
    let validateerror = document.getElementsByClassName("recipient_error");
    //recipientError.innerHTML = "";
    validateerror.innerHTML = "";
    senderError.innerHTML = "";
    if (!Object.keys(recipientEmailsList).length) {
      return (validateerror[0].innerHTML = "Please enter recipient email!");
    }
    Object.keys(rEmails).forEach((key) => {
      remails.push(rEmails[key]);
    });
    // if () {
    //   return (senderError.innerHTML = "Please enter sender email!");
    // } else if (!validator.isEmail(email)) {
    //   return (senderError.innerHTML = "Please enter valid sender email!");
    // }
    // else if (!validator.isEmail(email)) {
    //   recipientError.innerHTML = "Please enter valid email!";
    // } else {
    //   sendEmail(recipientEmails, senderEmails);
    // }
    // eslint-disable-next-line
    // remails.map((val, id) => {
    //   if (validator.isEmpty(val)) {
    //     recipientError.innerHTML = `Please enter email for recipient email ${
    //       id + 1
    //     }!`;
    //   } else if (!validator.isEmail(val)) {
    //     if (id === 0) {
    //       recipientError.innerHTML = `Please enter valid email`;
    //     } else {
    //       recipientError.innerHTML = `Please enter valid email for recipient email ${
    //         id + 1
    //       }!`;
    //     }
    //   } else if (
    //     remails.every((e) => validator.isEmail(e)) &&
    //     remails.length - 1 === count
    //   ) {
    //     if (!validator.isEmail(email)) {
    //       senderError.innerHTML = "Please enter valid sender email!";
    //     } else {
    //       return sendEmail(recipientEmails, senderEmails);
    //     }
    //   }
    // });
    // eslint-disable-next-line
    remails.map((val, id) => {
      console.log(validateerror, "logic");
      if (validator.isEmpty(val)) {
        if (id === 0) {
          validateerror[0].innerHTML = "Please enter email!";
        }
        if (id === 1) {
          validateerror[1].innerHTML = "Please enter email!";
        }
        if (id === 2) {
          validateerror[2].innerHTML = "Please enter email!";
        }
        if (id === 3) {
          validateerror[3].innerHTML = "Please enter email!";
        }
        if (id === 4) {
          validateerror[4].innerHTML = "Please enter email!";
        }
      } else if (!validator.isEmail(val)) {
        if (id === 0) {
          validateerror[0].innerHTML = "Please enter valid email!";
        } else {
          if (id === 1) {
            validateerror[1].innerHTML = "Please enter valid email!";
          }
          if (id === 2) {
            validateerror[2].innerHTML = "Please enter valid email!";
          }
          if (id === 3) {
            validateerror[2].innerHTML = "Please enter valid email!";
          }
          if (id === 4) {
            validateerror[4].innerHTML = "Please enter valid email!";
          }
        }
      } else if (remails.length - 1 !== count) {
        validateerror[count].innerHTML = "Please enter required fields!";
      } else if (!validator.isEmail(email)) {
        senderError.innerHTML = "Please enter valid sender email!";
      } else if (validator.isEmpty(email)) {
        senderError.innerHTML = "Please enter sender email!";
      } else if (
        remails.every((e) => validator.isEmail(e)) &&
        remails.length - 1 === count
      ) {
        // console.log(remails.length, "email count");
        // console.log(count, "count");
        for (let i = 0; i < remails.length; i++) {
          validateerror[i].innerHTML = "";
        }
        if (!props.isDemoUser) return something();
        else {
          setShowDemoPopup(true);
        }
      }
    });
  }
  var something = (function () {
    var executed = false;
    return function () {
      if (!executed) {
        executed = true;
        sendEmail(recipientEmails, senderEmails);
      }
    };
  })();
  function sendEmail(recipientEmailsList, senderEmailsList) {
    console.log("datas", recipientEmailsList, senderEmailsList);
    setShowDemoPopup(false);
    console.log("submit data", recipientEmailsList);
    console.log("submit data", senderEmailsList);
    if (
      !Object.keys(recipientEmailsList).length ||
      !Object.keys(senderEmailsList).length
    ) {
      return;
    }
    const rEmails = extratEmailList(recipientEmailsList);
    const sEmails = extratEmailList(senderEmailsList);

    const reparirListData = {
      sender_email: sEmails[0],
      recipient_email: rEmails,
      subject: subject,
      // eslint-disable-next-line
      email_body: message.replace(new RegExp("\r?\n", "g"), "<br />"),

      reply_address: sEmails[0],
      reply_name: replyName,
    };

    const formData = new FormData();
    Object.keys(reparirListData).forEach((key) => {
      console.log(key, reparirListData[key]);
      if (key === "recipient_email") {
        for (let i = 0; i < reparirListData[key].length; i++) {
          const rKey = `${key}[${i}]`;
          const rEmail = reparirListData[key][i];
          formData.append(rKey, rEmail);
        }
      } else {
        formData.append(key, reparirListData[key]);
      }
    });

    axios.post("/sendReportEmail", formData).then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
    FlashMessages("Email sent successfully.", "success", true);
  }

  useEffect(() => {
    // eslint-disable-next-line
    let key = !window.location.search
      ? localStorage.length === 0
        ? ""
        : "localStorage"
      : "window";
    // let param = {
    //   [key]:
    //     key === "localStorage"
    //       ? { localStorage: localStorage }
    //       : { window: window.location.search },
    // };
    let origin = window.location.origin.toLowerCase();
    if (origin.replace("http://", "") === "undefined")
      origin = origin.replace("https://", "");
    else origin = origin.replace("http://", "");
    // let baseUrl = url_settings[origin]
    //   ? url_settings[origin].SERVER_URL
    //   : "https://develop.yourinspection.report/";
    let query = queryParams({ localStorage: localStorage });
    server("/getReportDetails?", "GET", query[0], "").then((response) => {
      !props.isDemoUser
        ? setmessage(
            `The request list for the property at ${response.data.data.inspectionDetails.locationAddress} is ready to view at \n${window.location.origin}/preview-report?appointmentId=${response.data.data.appointmentId}&id1=${query[1]["queryId1"]}&id2=${query[1]["queryId2"]}&id3=${query[1]["queryId3"]}&id4=${query[1]["queryId4"]}&e=${query[1]["queryId5"]}\nPlease review your inspection and feel free to contact us if you have questions. You can email us at ${response.data.data.inspectionDetails.inspectorEmail} or call and we would be happy to assist you.\n${response.data.data.inspectionDetails.inspectorName}\n${response.data.data.inspectionDetails.inspectorCompany}`
          )
        : setmessage(
            `The request list for the property at ${
              response.data.data.inspectionDetails.locationAddress
            } is ready to view at \n${
              window.location.origin +
              forgotPasswordUrl[path].DEMO_USER_SHARE_STATIC_LINK
            }\nPlease review your inspection and feel free to contact us if you have questions. You can email us at ${
              response.data.data.inspectionDetails.inspectorEmail
            } or call and we would be happy to assist you.\n${
              response.data.data.inspectionDetails.inspectorName
            }\n${response.data.data.inspectionDetails.inspectorCompany}`
          );
      // setoneUrl(
      //   `The Inspection report for the property at ${response.data.data.inspectionDetails.locationAddress} is ready to view at`
      // );

      // setlastUrl(
      //   `Please review your inspection and feel free to contact us if you have questions. You can email us at ${response.data.data.inspectionDetails.inspectorEmail} or call and we would be happy to assist you.`
      // );
      setLink(
        `${window.location.origin}/preview-report?appointmentId=${response.data.data.appointmentId}&id1=${query[1]["queryId1"]}&id2=${query[1]["queryId2"]}&id3=${query[1]["queryId3"]}&id4=${query[1]["queryId4"]}&e=${query[1]["queryId5"]}`
      );
      // setinspectorName(response.data.data.inspectionDetails.inspectorName);

      // setinspectorCompany(
      //   response.data.data.inspectionDetails.inspectorCompany
      // );
      // eslint-disable-next-line
      updateSenderEmails(() => ({
        // eslint-disable-next-line
        ["sender_email"]: response.data.data.inspectionDetails.clientEmail,
      }));
      // eslint-disable-next-line
    });
    if (window.location.search) {
      let params = new URLSearchParams(window.location.search);
      let queryId1 = params.get("id1");
      let queryId2 = params.get("id2");
      let queryId3 = params.get("id3");
      let queryId4 = params.get("id4");
      let queryId5 = params.get("id5");
      let appointmentId = params.get("appointmentId");
      localStorage.setItem("queryId1", queryId1);
      localStorage.setItem("queryId2", queryId2);
      localStorage.setItem("queryId3", queryId3);
      localStorage.setItem("queryId4", queryId4);
      localStorage.setItem("queryId5", queryId5);
      localStorage.setItem("appointmentId", appointmentId);

      seturl(
        (url) =>
          (url = `${window.location.origin}/preview-report?appointmentId=${appointmentId}&id1=${queryId1}&id2=${queryId2}&id3=${queryId3}&id4=${queryId4}&e=${queryId5}`)
      );
      setPreviewUrl(
        (previewUrl) =>
          (previewUrl = `/preview-report?appointmentId=${appointmentId}&id1=${queryId1}&id2=${queryId2}&id3=${queryId3}&id4=${queryId4}&e=${queryId5}`)
      );
    } else {
      setPreviewUrl((previewUrl) => (previewUrl = props.previewReportViewUrl));
      seturl((url) => (url = props.reportviewUrl));
    } // eslint-disable-next-line
  }, [props.previewReportViewUrl]);

  return !hidden ? (
    <>
      <Dialog
        open={showDemoPopup}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className="demo-title">
          Thanks!
          <ClearIcon
            sx={{
              position: "absolute",
              right: "35px",
              top: "28px",
              cursor: "pointer",
            }}
            onClick={() => setShowDemoPopup(false)}
          />
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            className="demo-content"
          >
            We aren't saving the data for this example inspection, so we will
            send you an already created Request List that will look like the
            ones your clients will create.
          </DialogContentText>
        </DialogContent>
        <DialogActions className="button-center">
          {/* <Button className="demo-user-button" sx={{ m: 1, mt: 5 }} variant="contained" onClick={()=>setShowDemoPopup(false)}>Cancel</Button> */}
          <Button
            className="default-button"
            sx={{ m: 1, mt: 5 }}
            variant="contained"
            onClick={() => sendEmail(recipientEmails, senderEmails)}
            autoFocus
          >
            DONE
          </Button>
        </DialogActions>
      </Dialog>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs></Grid>
          <Grid item xs={12} md={6} mt={4} mb={4}>
            <div className="popup-box">
              <div className="box">
                <div id="container1">
                  <div
                    id="container2"
                    style={{ marginLeft: "18px", marginRight: "9px" }}
                  >
                    <ClearIcon
                      sx={{
                        float: "right",
                        mt: -0.5,
                        mr: -2,
                        cursor: "pointer",
                      }}
                      onClick={closeModal}
                    />

                    <br />
                    <span className="heading">
                      <p>Request List</p>
                    </span>
                    <div style={{ marginTop: "15px" }}></div>
                    <span className="sub-heading">
                      <p>Your request list has been created.</p>
                    </span>
                    <div style={{ marginTop: "33px" }}></div>

                    <span className="other-heading">
                      View your request list:
                    </span>
                    <br />
                    {!props.isDemoUser ? (
                      <NavLink to={{ pathname: `${url}` }} target="_blank">
                        <span className="para">
                          Click to view the request List
                        </span>
                      </NavLink>
                    ) : (
                      //   <NavLink to={{ pathname:  forgotPasswordUrl[path].DEMO_USER_SHARE_STATIC_LINK }} target="_blank">
                      //   <span className="para">
                      //     Click to view the request List
                      //   </span>
                      // </NavLink>
                      <NavLink
                        to={`${url}`}
                        state={{
                          appointmentId: props.appointmentId,
                          assetUrl: props.assetUrl,
                          inspectionDetails: props.inspectionDetails,
                          isDemoUser: props.isDemoUser,
                        }}
                      >
                        <span className="para">
                          Click to view the request List
                        </span>
                      </NavLink>
                    )}

                    <div style={{ marginTop: "15px" }}></div>

                    <div style={{ marginTop: "34px" }}></div>
                    <span className="send-email">Send via email</span>
                    <br />

                    <div>
                      {" "}
                      <FormControl
                        variant="standard"
                        sx={{
                          mr: 4,
                          mt: "16px",
                          width: "280px",
                          justifyContent: "space-between",
                        }}
                      >
                        <InputLabel
                          htmlFor="component-simple"
                          style={{
                            color: "#757575",
                            fontFamily: "Open Sans",
                            justifyContent: "space-between",
                          }}
                        >
                          Recipient E-mail
                        </InputLabel>
                        <Input
                          style={{
                            color: "#3b3b3b",
                            fontFamily: "Open Sans",
                            justifyContent: "space-between",
                          }}
                          id="component-simple"
                          onChange={(event) =>
                            handleInputChange(event, "recipient_email_0", false)
                          }
                        />
                        <span className="recipient_error"></span>
                        {/* <span
                          id="recipient_error"
                          style={{ color: "red" }}
                        ></span> */}
                      </FormControl>
                      <FormControl
                        variant="standard"
                        sx={{
                          mt: "16px",
                          width: "280px",
                          justifyContent: "space-between",
                        }}
                      >
                        <InputLabel
                          htmlFor="component-simple"
                          style={{
                            color: "#757575",
                            fontFamily: "Open Sans",
                            justifyContent: "space-between",
                          }}
                        >
                          Sender E-mail (your email)
                        </InputLabel>
                        <Input
                          style={{
                            color: "#3b3b3b",
                            fontFamily: "Open Sans",
                            justifyContent: "space-between",
                          }}
                          id="component-simple"
                          defaultValue={
                            !props.isDemoUser ? props.senderEmail : ""
                          }
                          onChange={(event) =>
                            handleInputChange(event, "sender_email", true)
                          }
                        />
                        <span
                          id="sender_error"
                          style={{
                            color: "red",
                            marginTop: "10px",
                            fontSize: "14px",
                          }}
                        ></span>
                      </FormControl>
                    </div>
                    <br />
                    {[...Array(count)].map((val, index) => (
                      <div key={index}>
                        <div style={{ float: "left", display: "inline" }}>
                          {" "}
                          <FormControl
                            variant="standard"
                            sx={{ width: "280px", mr: 4 }}
                          >
                            <InputLabel
                              style={{
                                color: "#757575",
                                fontFamily: "Open Sans",
                                justifyContent: "space-between",
                              }}
                              htmlFor="component-simple"
                              sx={{
                                fontFamily: "Open Sans",
                                color: "rgba(0, 0, 0, 0.54)",
                              }}
                            >
                              Recipient E-mail
                            </InputLabel>
                            <Input
                              id="component-simple"
                              style={{
                                color: "#3b3b3b",
                                fontFamily: "Open Sans",
                                justifyContent: "space-between",
                              }}
                              onChange={(event) =>
                                handleInputChange(
                                  event,
                                  `recipient_email_${index++}`,
                                  false
                                )
                              }
                              name={`recipient_email_${index++}`}
                              key={`recipient_email_${index++}`}
                            />
                            <span className="recipient_error"></span>
                          </FormControl>
                          <br />
                          <br />
                        </div>
                        <div style={{ float: "right" }}></div>
                      </div>
                    ))}
                    <div
                      style={{
                        verticalAlign: "middle",
                        display: "flex",
                        width: "40ch",
                      }}
                    >
                      <span
                        style={{
                          verticalAlign: "middle",
                          color: "#3B3B3B",
                          fontFamily: "Open Sans",
                          fontSize: "14px",
                          fontWeight: 600,
                          letterSpacing: "0.23px",
                          lineHeight: "24px",
                        }}
                      >
                        Add another recipient
                      </span>
                      <span style={{ verticalAlign: "middle" }}>
                        <AddCircleIcon
                          sx={{ ml: 1, cursor: "pointer" }}
                          fontSize="small"
                          onClick={() => count < 4 && setCount(count + 1)}
                        />
                      </span>
                      <span style={{ verticalAlign: "middle" }}>
                        {count !== 0 ? (
                          <DoNotDisturbOnIcon
                            fontSize="small"
                            sx={{ ml: 0.25, cursor: "pointer" }}
                            onClick={() => count > 0 && setCount(count - 1)}
                          />
                        ) : (
                          ""
                        )}
                      </span>
                    </div>
                    <br />
                    <div style={{ float: "left", display: "inline" }}>
                      {" "}
                      <FormControl
                        variant="standard"
                        sx={{ width: "280px", mr: 4 }}
                      >
                        <InputLabel
                          htmlFor="component-simple"
                          style={{
                            color: "#757575",
                            fontFamily: "Open Sans",
                            justifyContent: "space-between",
                          }}
                        >
                          Subject
                        </InputLabel>
                        <Input
                          id="component-simple"
                          style={{ color: "#3b3b3b", fontFamily: "Open Sans" }}
                          value={subject}
                          onChange={(e) => changeSubjectHandler(e)}
                        />
                      </FormControl>
                      <br />
                      <br />
                    </div>
                    <br />
                    <span>
                      <Grid item xs={12}>
                        <textarea
                          rows="8"
                          placeholder="enter your message here"
                          name="message"
                          color="success"
                          value={message}
                          onChange={
                            !props.isDemoUser
                              ? (e) => changeMessageHandler(e)
                              : ""
                          }
                          style={{
                            scrollbarWidth: "thin",
                            padding: "20px",
                            fontSize: "16px",
                            width: "100%",
                            letterSpacing: "0.27px",
                            height: "172px",
                            color: "black",
                            resize: "none",
                          }}
                        ></textarea>
                      </Grid>
                    </span>
                    <div style={{ marginTop: "10px" }}></div>
                    {/* <span>
                      {" "}
                      <Button
                        className="tcpa-accept-button"
                        onClick={() => validate(recipientEmails)}
                      >
                        Send
                      </Button>
                      <Button
                        sx={{ float: "right", mt: 9 }}
                        className="tcpa-accept-button"
                        onClick={closeModal}
                      >
                        Cancel
                      </Button>
                    </span> */}
                    <Button
                      className="tcpa-accept-button"
                      onClick={() => validate(recipientEmails)}
                    >
                      Send
                    </Button>
                    <div style={{ float: "right", marginTop: "70px" }}>
                      <Button
                        className="tcpa-accept-button"
                        onClick={closeModal}
                      >
                        Cancel
                      </Button>
                    </div>
                    <div style={{ marginTop: "70px" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Box>
    </>
  ) : (
    ""
  );
};
