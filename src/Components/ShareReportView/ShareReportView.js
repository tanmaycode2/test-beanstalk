import "../../assets/css/containers/_createreport.scss";

import React from "react";
import validator from "validator";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import server from "../../services/server";
import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import ClearIcon from "@mui/icons-material/Clear";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { Item, renderEmail } from "react-html-email";
// import { queryParams } from "../../helpers/queryParams";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FlashMessages } from "../../FlashMessages/FlashMessages";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import { useMediaQuery } from "react-responsive";

export const ShareReportView = (props) => {
  const replyName = "Palm-Tech";
  const [hidden] = useState(false);
  const [link] = useState(props.sharelink);
  const [count, setCount] = useState(0);
  const clientemail = "info@palmtech.com";
  const [message, setmessage] = useState(props.sharemsg);
  const [inspectionDetails] = useState(props.shareinspectionDetails);
  const [recipientEmails, updateRecicpientEmails] = useState({});
  const [subject, setsubject] = useState("Home Inspection Report");
  const isMobileBreakpiont = useMediaQuery({ query: "(max-width: 900px)" });

  // useEffect(() => {
  //   let query = queryParams({ localStorage: localStorage });
  //   server("/getReportDetails?", "GET", query[0], "").then((response) => {
  //     setLink(
  //       `${window.location.origin}/?id1=${query[1]["queryId1"]}&id2=${query[1]["queryId2"]}&id3=${query[1]["queryId3"]}&id4=`
  //     );
  //     setinspectionDetails(response.data.data.inspectionDetails);
  //   });
  // });

  //render the email
  const emailrender = (link, emailparams, params) => {
    return renderEmail(
      <Item>
        <a
          href={link + emailparams + params}
          style={{
            color: "#219F8C",
            textUnderlineOffset: "none",
            width: "153px",
            height: "44px",
          }}
        >
          Click to view the inspection report
        </a>
        <br />
        <br />
      </Item>
    );
  };
  const handleondynamicvalue = (e) => {
    console.log(e.target.value);
  };
  const handlepermission = (index, value) => {
    updateRecicpientEmails((currentRecipients) => ({
      ...currentRecipients,
      [index]: {
        ...currentRecipients[index],
        allow: value,
      },
    }));
  };
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
  const handleInputChange = (e, name) => {
    updateRecicpientEmails((prevState) => ({
      ...prevState,
      [name]: {
        email: e.target.value,
      },
    }));
  };
  function closeModal() {
    props.hideModal(false);
  }

  function validate(recipientEmailsList) {
    let remails = [];
    const rEmails = extratEmailList(recipientEmailsList);
    //let recipientError = document.getElementById(`recipient_error`);
    let validateerror = document.getElementsByClassName("recipient_error");
    //recipientError.innerHTML = "";
    validateerror.innerHTML = "";
    if (!Object.keys(recipientEmailsList).length && remails.length === 0) {
      return (validateerror[0].innerHTML = "Please enter email!");
    }
    Object.keys(rEmails).forEach((key) => {
      remails.push(rEmails[key].email);
    });
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
      } else if (
        remails.every((e) => validator.isEmail(e)) &&
        remails.length - 1 === count
      ) {
        // console.log(remails.length, "email count");
        // console.log(count, "count");
        for (let i = 0; i < remails.length; i++) {
          validateerror[i].innerHTML = "";
        }

        return something();
      }
    });
  }
  var something = (function () {
    var executed = false;
    return function () {
      if (!executed) {
        executed = true;
        sendEmail(recipientEmails, inspectionDetails, props.url, props.baseUrl);
      }
    };
  })();
  function sendEmail(recipientEmailsList, inspectionDetails, url, baseUrl) {
    console.log("result", recipientEmailsList);
    if (!Object.keys(recipientEmailsList).length) {
      return;
    }

    // const rEmails = extratEmailList(recipientEmailsList);
    const rEmails = extratEmailList(recipientEmailsList);
    let remails = [];
    let ownerUrl = [];
    let rEmailBody = [];
    Object.keys(rEmails).forEach((key) => {
      remails.push(rEmails[key].email);
      if (rEmails[key].email === inspectionDetails.inspectorEmail) {
        ownerUrl.push(baseUrl + url + "&id4=insp");
        rEmailBody.push(
          emailrender(link, "insp", "") + // eslint-disable-next-line
            message.replace(new RegExp("\r?\n", "g"), "<br />")
        );
      } else if (rEmails[key].email === inspectionDetails.referrerEmail) {
        ownerUrl.push(baseUrl + url + "&id4=agnt");
        rEmailBody.push(
          emailrender(link, "agnt", "") + // eslint-disable-next-line
            message.replace(new RegExp("\r?\n", "g"), "<br />")
        );
      } else if (rEmails[key].email === inspectionDetails.clientEmail) {
        ownerUrl.push(baseUrl + url);
        // eslint-disable-next-line
        rEmailBody.push(
          emailrender(link, "", "") + // eslint-disable-next-line
            message.replace(new RegExp("\r?\n", "g"), "<br />")
        );
      } else {
        if (rEmails[key].allow) {
          ownerUrl.push(baseUrl + url + `&id4=${rEmails[key].email}&e=1`);
          rEmailBody.push(
            emailrender(link, rEmails[key].email, "&e=1") + // eslint-disable-next-line
              message.replace(new RegExp("\r?\n", "g"), "<br />")
          );
        } else {
          ownerUrl.push(baseUrl + url + `&id4=${rEmails[key].email}&e=0`);
          rEmailBody.push(
            emailrender(link, rEmails[key].email, "&e=0") + // eslint-disable-next-line
              message.replace(new RegExp("\r?\n", "g"), "<br />")
          );
        }
      }
      // getting the url(id 4 and e=0 or e=1) of respective recipients as required in the ownerUrl variable
    });
    const reparirListData = {
      sender_email: clientemail,
      recipient_email: remails,
      subject: subject,
      email_body: rEmailBody,
      reply_address: clientemail,
      reply_name: replyName,
    };

    console.log("reparirListData", reparirListData);
    const formData = new FormData();
    Object.keys(reparirListData).forEach((key) => {
      if (key === "recipient_email") {
        for (let i = 0; i < reparirListData[key].length; i++) {
          const rKey = `${key}[${i}]`;
          const rEmail = reparirListData[key][i];
          formData.append(rKey, rEmail);
        }
      } else if (key === "email_body") {
        for (let i = 0; i < reparirListData[key].length; i++) {
          const rKey = `${key}[${i}]`;
          const rEmail = reparirListData[key][i];
          formData.append(rKey, rEmail);
        }
      } else {
        formData.append(key, reparirListData[key]);
      }
    });

    server("/shareReportEmail", "POST", "", formData).then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
    FlashMessages("Email sent successfully.", "success", true);
  }
  return !hidden ? (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          X<Grid item xs></Grid>
          <Grid item xs={12} md={6} mt={4} mb={4}>
            <div className="popup-box">
              <div className="box">
                <div id="container1">
                  <div
                    id="container2"
                    style={{ marginLeft: "18px", marginRight: "9px" }}
                  >
                    <ClearIcon
                      sx={{ float: "right", mt: -1, mr: -2, cursor: "pointer" }}
                      onClick={closeModal}
                    />
                    <br />
                    <span className="heading">
                      <h>Share Inspection Report</h>
                    </span>
                    <br />
                    <br />
                    <div>
                      <Grid container>
                        <Grid item xs={12} md={6}>
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
                              }}
                            >
                              Recipient E-mail
                            </InputLabel>
                            <Input
                              id="component-simple"
                              onChange={(event) =>
                                handleInputChange(event, "recipient_0", false)
                              }
                              style={{
                                fontFamily: "Open Sans",
                              }}
                            />
                            <span className="recipient_error"></span>
                            {/* <span
                          id="recipient_error"
                          style={{
                            color: "red",
                            fontFamily: "Open Sans",
                            marginTop: "10px",
                            fontSize: "14px",
                          }}
                        ></span> */}
                          </FormControl>
                        </Grid>
                        <Grid xs={12} md={6}>
                          <FormControlLabel
                            sx={{
                              mt: 3,
                              color: "#757575",
                              fontFamily: "Open Sans",
                              marginTop: "10px",
                            }}
                            control={
                              <Checkbox
                                style={{
                                  color: "#757575",
                                }}
                                onChange={({ target: { checked } }) => {
                                  handlepermission("recipient_0", checked);
                                }}
                              />
                            }
                            label={
                              <span
                                className={
                                  isMobileBreakpiont
                                    ? "label-light"
                                    : "label-normal"
                                }
                              >
                                Allow them to share the report and work on the
                                Request List
                              </span>
                            }
                          />
                        </Grid>
                      </Grid>
                      <div>
                        <br />
                      </div>
                      {[...Array(count)].map((val, index) => (
                        <div key={index}>
                          <div style={{ float: "left" }}>
                            <Box
                              component="form"
                              sx={{
                                "& > :not(style)": {
                                  marginRight: 4,
                                  // width: "280px",
                                },
                              }}
                              noValidate
                              autoComplete="off"
                            >
                              <Grid container>
                                <Grid xs={12} md={6}>
                                  {" "}
                                  <FormControl
                                    variant="standard"
                                    style={{
                                      width: "280px",
                                      marginTop: "10px",
                                    }}
                                  >
                                    <InputLabel
                                      htmlFor="component-simple"
                                      style={{
                                        color: "#757575",
                                        fontFamily: "Open Sans",
                                      }}
                                    >
                                      Recipient E mail
                                    </InputLabel>
                                    <Input
                                      id="component-simple"
                                      onChange={(event) =>
                                        handleInputChange(
                                          event,
                                          `recipient_${index}`,
                                          false
                                        )
                                      }
                                      name={`recipient_email_${index++}`}
                                      key={`recipient_email_${index++}`}
                                    />
                                    <span className="recipient_error"></span>
                                  </FormControl>
                                </Grid>
                                <Grid xs={12} md={6}>
                                  <FormControlLabel
                                    style={{
                                      color: "#757575",
                                      fontFamily: "Open Sans",
                                    }}
                                    control={
                                      <Checkbox
                                        color="default"
                                        onChange={({ target: { checked } }) => {
                                          handlepermission(
                                            `recipient_${index}`,
                                            checked
                                          );
                                        }}
                                      />
                                    }
                                    label={
                                      <span
                                        className={
                                          isMobileBreakpiont
                                            ? "label-light"
                                            : "label-normal"
                                        }
                                      >
                                        Allow them to share the report and work
                                        on the Request List
                                      </span>
                                    }
                                    name={`allow_user_edit_${index++}`}
                                  />
                                  <div>
                                    <br />
                                  </div>
                                </Grid>
                              </Grid>
                            </Box>
                          </div>
                          <div style={{ float: "right" }}></div>
                          <br />
                          <br />
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
                      <div style={{ marginTop: "20px" }}></div>
                      <FormControl
                        variant="standard"
                        sx={{ mt: "16px", width: "280px" }}
                      >
                        <InputLabel
                          htmlFor="component-simple"
                          style={{
                            color: "#757575",
                            fontFamily: "Open Sans",
                          }}
                        >
                          Subject
                        </InputLabel>
                        <Input
                          id="component-simple"
                          value={subject}
                          onChange={changeSubjectHandler}
                          style={{
                            fontFamily: "Open Sans",
                          }}
                        />
                      </FormControl>
                      <br />
                      <br />
                      <textarea
                        rows="8"
                        placeholder="Enter your message here:"
                        onBlur={handleondynamicvalue}
                        onChange={(e) => changeMessageHandler(e)}
                        defaultValue={props.sharemsg}
                        name="message"
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
                    </div>
                    <div style={{ marginTop: "10px" }}></div>
                    {!props.isDemoUser ? (
                      <Button
                        className="tcpa-accept-button"
                        onClick={() => validate(recipientEmails)}
                      >
                        Send
                      </Button>
                    ) : (
                      <Button disabled className="send-button-disabled">
                        Send
                      </Button>
                    )}

                    <div style={{ float: "right", marginTop: "70px" }}>
                      <Button
                        className="tcpa-accept-button"
                        onClick={closeModal}
                      >
                        Done
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
