import "../../assets/css/containers/_createreport.scss";

import React from "react";
import { useState } from "react";
import validator from "validator";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import server from "../../services/server";
import ClearIcon from "@mui/icons-material/Clear";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { FlashMessages } from "../../FlashMessages/FlashMessages";

export const ContactUs = (props) => {
  const [hidden] = useState(false);
  const [name, setName] = useState("");
  const [message, setmessage] = useState("");
  const [youremail, setyourEmail] = useState(props.contactusmail);
  const [ischanged, setisChanged] = useState(false);

  function closeModal() {
    props.hideModal(false);
  }
  const youremailhandle = (event) => {
    setisChanged(true);
    if (ischanged === true) {
      setyourEmail(event.target.value);
    } else {
      setyourEmail(props.contactusmail);
    }
  };
  const emailsent = () => {
    let result = name.trim();
    let recipientError = document.getElementById("recipient_name");
    let recipientErrorName = document.getElementById("recipient_error");
    let recipientErrorMessage = document.getElementById("recipient_message");
    recipientError.innerHTML = "";
    recipientErrorName.innerHTML = "";
    recipientErrorMessage.innerHTML = "";
    if (result === "") {
      recipientError.innerHTML = "Please Enter Name!";
    } else if (ischanged === false && youremail === "") {
      recipientErrorName.innerHTML = "Please enter Email!";
      setyourEmail(props.contactusmail);
    } else if (!validator.isEmail(youremail)) {
      recipientErrorName.innerHTML = "Please Enter Valid Email!";
    } else if (message === "") {
      recipientErrorMessage.innerHTML = "Please Enter Your Message!";
    } else {
      server("/contactUsEmail", "POST", "", {
        sender_name: name + "," + youremail,
        sender_email: youremail,
        subject: `Message for Inspection Report at ${props.address}`,
        recipient_email: !props.isDemoUser? props.inspectoremail:"info@palm-tech.com",
        email_body: message,
      }).then(
        (response) => {
          console.log(response);
          // console.log(props.inspectoremail, "inspectoremail");
          // console.log(youremail, "youremail");
          // console.log(props.address, "address");
        },
        (error) => {
          console.log(error);
        }
      );
      FlashMessages("Email sent successfully.", "success", true);
    }
  };

  return !hidden ? (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs></Grid>
          <Grid item xs={12} md={6} mt={4} mb={4}>
            <div className="popup-box">
              <div className="box" style={{ top: "50px", minHeight: "439px" }}>
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
                      <p>Contact us</p>
                    </span>

                    <div>
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
                          Your Name
                        </InputLabel>
                        <Input
                          id="component-simple"
                          onChange={(event) => setName(event.target.value)}
                          style={{
                            fontFamily: "Open Sans",
                            color: "#757575",
                          }}
                        />
                        <span
                          id="recipient_name"
                          style={{
                            color: "red",
                            fontFamily: "Open Sans",
                            marginTop: "10px",
                            fontSize: "14px",
                          }}
                        ></span>
                      </FormControl>
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
                          Your E-mail
                        </InputLabel>
                        <Input
                          id="component-simple"
                          defaultValue={!props.isDemoUser?props.contactusmail:""}
                          onChange={(event) => youremailhandle(event)}
                          style={{
                            fontFamily: "Open Sans",
                            color: "#757575",
                          }}
                        />
                        <span
                          id="recipient_error"
                          style={{
                            color: "red",
                            fontFamily: "Open Sans",
                            marginTop: "10px",
                            fontSize: "14px",
                          }}
                        ></span>
                      </FormControl>
                      <div>
                        <br />
                      </div>
                      <br />
                      <textarea
                        rows="8"
                        placeholder="Message"
                        name="message"
                        onChange={(event) => setmessage(event.target.value)}
                        style={{
                          scrollbarWidth: "thin",
                          padding: "20px",
                          fontSize: "16px",
                          width: "100%",
                          letterSpacing: "0.27px",
                          height: "132px",
                          color: "black",
                          resize: "none",
                        }}
                      ></textarea>
                      <span
                        id="recipient_message"
                        style={{
                          color: "red",
                          fontFamily: "Open Sans",
                          marginTop: "10px",
                          fontSize: "14px",
                        }}
                      ></span>
                    </div>
                    <Button
                      sx={{ float: "right", mt: 5 }}
                      className="tcpa-accept-button"
                      onClick={() => emailsent()}
                    >
                      Send
                    </Button>
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
