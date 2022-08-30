import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import server from "../../services/server";
import Collapse from "@mui/material/Collapse";
import "../../assets/css/containers/_tcpa.scss";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

export const TCPA = ({ tcpaData }) => {
  const [expanded, setExpanded] = useState(false);
  const [hidden, setHidden] = useState(false);
  const linkName = expanded ? "Hide Learn more" : "Learn more";
  const [visible, setVisible] = useState(true);
  const [IsActive, setIsActive] = useState(false);
  const nextChunk = `At ${tcpaData.company_name} we want to make sure we are providing the best service possible. To do so, we work with Porch Group Inc., an independent third party, to collect ratings and reviews from our customers so we get feedback on where we excel and can improve
                As an additional benefit, we will provide you with the Porch Home Assistant service completely for free. Porch Home Assistant is there to make your move easier. Not only do you get $100 of handyman services credits (4 credits of $25 each) that you can use towards small projects around your home, Porch can help you arrange whatever home services you need: mounting the TV, transferring utilities, setting up TV/internet, painting a room, installing a home security system, getting insurance, and much more, from great providers of products and services like Hire A Helper (moving), ADT and Protect Your Home (home security systems), Liberty Mutual (homeowners insurance), Serviz (plumbing, electrical and appliance repair), Porch Services (handyman services), and others. You are consenting for Porch and the providers of the home products and services you request to contact you to provide quotes, information and offers. They may call or text you at the number you provide, even if it’s on a Do Not Call registry, using automated technology and/or prerecorded messages. Your consent to marketing communications is not required to make a purchase.You’ll receive an email from your Porch Home Assistant in a day or two. If you decide you don’t want to provide a review of your inspection or receive any additional communications from Porch or service providers, just let Porch know and you won’t be contacted further.
                If you would like to receive your inspection report without providing this consent and without providing consent to receive calls about Porch Home Assistant, please call or email us (your inspection company) to arrange for your report to be provided non-electronically.
                The handyman credits are subject to the terms and conditions located at `;
  const [Decline] = useState(
    "If you cancel, you will miss out on porch Home Assistant Free concierge moving services and four coupons for handyman services worth $100. Do you wish to accept the terms? "
  );
  const [NextPara] = useState(
    "Learn more, including examples of providers of products and services and how to get a copy of your inspection report without providing this consent."
  );
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  function clickHnadler() {
    setIsActive(true);
    setVisible(false);
  }

  function acceptDeclineTcpa(userConsent) {
    const { appointment_guid, company_id, porch_id } = tcpaData;
    server("/acceptTcpa", "POST", "", {
      appointment_guid: appointment_guid,
      is_tcpa_accepted: userConsent,
      is_mobile: "1",
      company_id: company_id,
      porch_id: porch_id,
    }).then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
    document.body.style.overflow = 'auto'
    setHidden(true);
  }
  return !hidden ? (
    <>
      <Box className="tcpa-background" sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={8} md={12}></Grid>
          <Grid className="tcpa-card-container" item xs={12} md={6}>
            <Card className="tcpa-body" variant="outlined">
              <CardContent className="login-content">
                <Typography
                  sx={{
                    mt: 4,
                    mb: 2,
                    fontSize: 28,
                    fontFamily: "Open Sans",
                    fontWeight: 600,
                    letterSpacing: "0.41px",
                  }}
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  Contact agreement
                </Typography>
                <Typography
                  sx={{
                    mt: 2,
                    maxHeight: 250,
                    scrollbarWidth: "thin",
                    overflowY: "auto",
                    fontFamily: "Open Sans",
                    fontSize: "14px",
                    letterSpacing: "0.27px",
                    color: "#3B3B3B",
                  }}
                  variant="body2"
                >
                  {IsActive ? (
                    Decline
                  ) : (
                    <p className="tcpa-para-content">
                      By clicking below, I {tcpaData.client_name} consent to
                      have Porch and (only if I request help with specific
                      services) providers of products and services call or text
                      me at the number I provide, including using automated
                      technology and or prerecorded message, about the Porch
                      home assistant services and the products and services of
                      interest to me. I understand that I will receive an email
                      introduction from Porch, and that I can choose to not be
                      contacted further if I don't want to provide a review of
                      &nbsp;{tcpaData.company_name} or receive the home
                      assistant service. I understand that my consent to
                      marketing communications is not required to make a
                      purchase.
                    </p>
                  )}
                  <br />
                  <br />
                  {IsActive ? "" : NextPara}
                </Typography>
              </CardContent>
              {visible ? (
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <Typography
                    sx={{
                      ml: 2,
                      mb: 1,
                      mr: 2,
                      mt: -2,
                      maxHeight: 65,
                      scrollbarWidth: "thin",
                      overflowY: "auto",
                      fontFamily: "Open Sans",
                      fontSize: "14px",
                      letterSpacing: "0.27px",
                      color: "#3B3B3B",
                    }}
                    variant="body2"
                  >
                    {" "}
                    <p className="tcpa-para-content">{nextChunk}</p>
                    <a href="https://porch.com/about/terms/ps-credits">
                      https://porch.com/about/terms/ps-credits
                    </a>
                  </Typography>
                </Collapse>
              ) : (
                ""
              )}
              <CardActions>
                {visible ? (
                  <Button
                    className="tcpa-learn-more"
                    onClick={handleExpandClick}
                  >
                    {linkName}
                  </Button>
                ) : (
                  ""
                )}
              </CardActions>
              <CardActions sx={{ float: "right", mt: 1 }}>
                {visible ? (
                  <Button
                    onClick={clickHnadler}
                    className="tcpa-decline-button"
                  >
                    DECLINE
                  </Button>
                ) : (
                  <Button
                    onClick={() => acceptDeclineTcpa(0)}
                    className="tcpa-decline-button"
                  >
                    DECLINE
                  </Button>
                )}
                <Button
                  className="tcpa-accept-button"
                  variant="contained"
                  onClick={() => acceptDeclineTcpa(1)}
                >
                  Accept
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  ) : (
    ""
  );
};
