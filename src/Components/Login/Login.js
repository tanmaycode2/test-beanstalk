import "../../assets/css/containers/_login.scss";
import "../../assets/css/buttons/_buttons.scss"; 
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import SimpleReactValidator from "simple-react-validator";
import server from "../../services/server";
import SweetAlert from 'react-bootstrap-sweetalert';
import axios from 'axios';
import { forgotPasswordUrl } from "../../config/config";
import { queryParams } from "../../helpers/queryParams";
import { Preloader } from "../../helpers/Preloader";
import { FlashMessages } from "../../FlashMessages/FlashMessages";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { origin } from "../../helpers/getOrigin";
import { isLoggedin } from '../../helpers/persistLogin';

export const Login = () => {
  const navigate = useNavigate();
  const validator = new SimpleReactValidator();
  const [values, setValues] = useState({
    showPassword: false,
    showForgotPassword: false,
    showSignup: false,
    isChecked: false,
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [roleId, setRoleId] = useState("");
  const [canEdit, setCanEdit] = useState(8);
  const [isInsp, setIsInp] = useState(false);
  const [isAgnt, setIsAgnt] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [tcpaStatus, setTcpaStatus] = useState(0);
  const [isLocationTexas, setIsLocationTexas] = useState(false);
  const [clientName, setClientName] = useState("");
  const [assetUrl, setAssetUrl] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");
  const [logoPresent , setLogoPresent] = useState(false);
  const [checked, setChecked] = useState(false);
  const is_logged_in = isLoggedin();
  const [showLoginPopup, setShowLoginPopup] = useState(true);
  const [user, setUser] = useState('');
  // const is_demo_user = isDemoUser();
  
  
  // const [errortext, seterrorText] = useState(false);

  const handleChange = (prop) => (event) => {
    if (prop === "email") setEmail(event.target.value);
    else if (prop === "password") setPassword(event.target.value);
    else if (prop === "confirmPassword") setConfirmPassword(event.target.value);
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  // commenting handleClickForgotPassword due to client requirement to remove forgot password

  // const handleClickShowForgotPassword = () => {
  //   setValues({
  //     ...values,
  //     showForgotPassword: !values.showForgotPassword,
  //   });
  // };

  const handleClickShowSignup = () => {
    setEmail("")
    setPassword("")
    setValues({
      ...values, showForgotPassword: false,
      showSignup: !values.showSignup,
    });
  };
  const handleClickShowSignin = () => {
    setValues({
      ...values, showForgotPassword: false,
      showSignup: false,
    });
  };

  const handleClickIsChecked = () => {
    setValues({
      ...values,
      isChecked: !values.isChecked,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const autoCompleteLogin = useCallback((data, query) => {
    if (query.queryId4 === "insp") {
      setRoleId(7);
      setCanEdit(1);
      setIsInp(true);
      setIsAgnt(false);
      setEmail(data.inspector_email);
      setPassword(data.inspector_password);
      setUser('insp')
    } else if (query.queryId4 === "agnt") {
      setRoleId(9);
      setCanEdit(1);
      setIsInp(false);
      setIsAgnt(true);
      setEmail(data.referrer_email);
      setPassword(data.referrer_password);
      setUser('agnt')
    } else if (query.queryId4 !== null) {
      if (query.queryId4.includes("@")) {
        setEmail("");
        setPassword("");
        setRoleId(8);
        setCanEdit(query.queryId5 ? query.queryId5 : 0);
        setUser("other");
      }
    } else {
      setEmail(data.client_email);
      setPassword(data.client_password);
      setRoleId(2);
      setCanEdit(1);
      setUser('clnt')
    }
    if(values.showSignup === true){ 
    if (query.queryId4 === null){
    setCanEdit(0);
    setRoleId(8);
    }
    }
  }, [values.showSignup]);
  useEffect(() => {    
    let key = !window.location.search
      ? localStorage.length === 0
        ? ""
        : "localStorage"
      : "window";
    let param = {
      [key]:
        key === "localStorage"
          ? { localStorage: localStorage }
          : { window: window.location.search },
    };
    let query = queryParams(param);   
    let paths = origin(); 

    if(!(query[1].queryId2 === forgotPasswordUrl[paths].DEMO_USER_PARAM_1 && query[1].queryId3 === forgotPasswordUrl[paths].DEMO_USER_PARAM_2)){  // login bypass for demo users   
    if(is_logged_in) {     
      server("/checkTcpa?", "GET", query[0], "").then((response) => {
        if (response.flag){
          FlashMessages(response.message, response.color, response.flag);
          setShowLoader(false);
        } else {
          server("/getReportDetails?", "GET", query[0], "").then((response) => {
            if (response.flag) {
              FlashMessages(response.message, response.color, response.flag);
              setShowLoader(false);
            } else {
              const data = response.data.data;
              setIsLocationTexas(data.isLocationTexas);
            }
          });
          const data = response.data.data;
          if (parseInt(data.is_tcpa_shown) !== 0) setTcpaStatus(data.show_tcpa);
          setAssetUrl(data.reportUrl);
          setLogoPresent(data.logoExist)
          setCompanyLogo(data.companyLogoFile);
          setClientName(data.client_name);
          autoCompleteLogin(data, query[1]);
          // kill the preloader
          setShowLoader(false);
        }
      });
    } else {
      if(isLocationTexas) navigate('/pdf-report');
      else navigate('/full-report');
    }
  }else{
    if(isLocationTexas) navigate('/pdf-report');
    else navigate('/full-report');
  }
  }, [autoCompleteLogin, isLocationTexas, is_logged_in, navigate]);

// signup validation
  const validateSignup = ()=>{  
    
    let setup_email = document.getElementById("setup-email");
    let setup_password = document.getElementById("setup-password");
    let setup_confirm_password = document.getElementById("setup-confirmPassword");
    setup_email.innerHTML = "";
    setup_password.innerHTML = "";
    setup_confirm_password.innerHTML = "";
    if(email === ""){
      setup_email.innerHTML = "* Please fill this field" 
    } else if(email.indexOf("@") < 1){
      setup_email.innerHTML = "* Enter correct email format"
    }
    if(password === ""){
      setup_password.innerHTML = "* Please fill this field"
    }
    else if (password.length < 8 ){
      setup_password.innerHTML = "* Minimum 8 characters"
    }
    if(confirmPassword === ""){
      setup_confirm_password.innerHTML = "* Please fill this field"
    }
    else if (confirmPassword.length < 8 ){
      setup_confirm_password.innerHTML = "* Minimum 8 characters"
    }
    else if(password !== confirmPassword){
      setup_confirm_password.innerHTML = "* Password not matching"
    }
    else{
      signup();
    }
  }

// login validation
  const validateLogin = ()=>{
    let login_checkbox = "";
    // let mailformat = (/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g);
    let login_email = document.getElementById("login-email");
    let login_password = document.getElementById("login-password");
    if(document.getElementById("login-checkbox")){
    login_checkbox = document.getElementById("login-checkbox");
    login_checkbox.innerHTML = "";
    login_checkbox.style.marginTop ="0px"
  }
    login_email.innerHTML = "";
    login_password.innerHTML = "";
   

    if(email === ""){
      login_email.innerHTML = "* Please fill this field"
    }  else if(email.indexOf("@") < 1){
      login_email.innerHTML = "* Enter correct email format"
    }
     if(password === ""){
      login_password.innerHTML = "* Please fill this field"
    }
    else if (password.length < 8 ){
      login_password.innerHTML = "* Minimum 8 characters"
    }
    if(login_checkbox !== "" && !checked){ 
      login_checkbox.style.marginTop ="20px"
      login_checkbox.innerHTML = `*Please acknowledge you are "${clientName}"
      or 
      click "Sign in as someone else" below`
    }
    else{
      login();
    }
  }
  const login = () => {
    if (validator.allValid()) {
      server("/loginUser", "POST", "", {
        userEmail: email,
        password: password,
        role_id: roleId,
        can_edit_report: canEdit,
      }).then((response) => {
        if (response.data) {
          if (isLocationTexas){
            navigate({ pathname: "/pdf-report" },
            { state: { tcpaStatus: tcpaStatus } })
          } 
          else if (!isLocationTexas){
            navigate(
              { pathname: "/full-report" },
              { state: { tcpaStatus: tcpaStatus } }
            );
          }
          // FlashMessages("successfully logged in", "success", true);
          console.log(response);
          localStorage.setItem("token", response.data.token);
        } else {
          console.log(response);
          FlashMessages(`Incorrect password`, response.color, response.color);
        }
      }, (error) => {
        FlashMessages(error.message, 'error', true);
      });
    } else {
      FlashMessages("Please enter required fields", "error", true);
    }
  };

  const signup = () => {
    
    if (validator.allValid() && password === confirmPassword) {
      server("/loginUser", "POST", "", {
        userEmail: email,
        password: password,
        role_id: roleId,
        can_edit_report: canEdit,
      }).then((response) => {
        if (response.data) {   
        if (isLocationTexas) navigate({ pathname: "/pdf-report" },{ state: { tcpaStatus: tcpaStatus,signupCanEdit: response.data?.can_edit_report, isNewUser:true } });
        FlashMessages("Set up successfully done", "success", true);
        navigate(
          { pathname: "/full-report" },
          { state: { tcpaStatus: tcpaStatus,signupCanEdit: response.data?.can_edit_report, isNewUser:true } }
        )
        localStorage.setItem("token", response.data.token);      
        } else {
          FlashMessages(response.message, response.color, response.color);
        }
      });
    } else {
       FlashMessages("Please enter required fields", "error", true);
    }
    
  };

  const forgotPassword = () => {
    let path = origin();
    // console.log(email);
    let formData = new FormData();
    formData.append('user_email', email);
    if (validator.allValid()) {
      axios.post(forgotPasswordUrl[path].FORGOT_PASSWORD_URL, formData).then(
        (response) => {
          FlashMessages(response.message ? response.message : 'Email sent successfully', response.color ? response.color : 'success', true);
          console.log(response);
          navigate({ pathname: "/" });
        }, (error) => {
          FlashMessages(error.message, 'error', true);
        }
      );
    } else {
      FlashMessages("please enter required fields", "error", true);
    }
  };

  return (
    <>
      {showLoader ? <Preloader flag={!showLoader} /> : ""}
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {/* <Grid item xs={12} md={3}></Grid> */}
          <Grid  className="login-card-container" item xs={12} md={6}>
            <div className="login-logo-container">
              {logoPresent? 
              <img
                src={assetUrl + "/" + companyLogo}
                // onError={(event) => event.target.style.display = 'none'}
                alt="Company logo"
              />:""}
             
            </div>
            <Card className="login-body">
              <CardContent className="login-content">
                {showLoginPopup && (user === 'insp' || user === 'agnt' || user === 'clnt') ?



                <SweetAlert style={{width:"35em"}}
                title="" 
                onConfirm={()=>setShowLoginPopup(false)}
                className="login-alert-title"
                primary
                customButtons={
                    <button onClick={()=>setShowLoginPopup(false)}  className="default-button">OK</button>
                }>
               <span className="login-alert-content"> We see that you are logging in to view your report and the system doesn't recognize your browser. We've automatically created credentials for you and will remember them for the future.
                <br/>Click SIGN IN to Continue. </span>
            </SweetAlert>
            :""}
                <p className="login-title">
                  {!values.showSignup ? "Log in" : "Set up"}
                </p>
                {!values.showForgotPassword ? (
                  <Box>
                    <div>
                    {!values.showSignup ?
                    <>
                     <FormControl
                     variant="standard"
                     sx={{ m: 1, mt: 4, width: "32ch" }}>
                     <InputLabel htmlFor="standard-adornment-password">
                       Email
                     </InputLabel>
                     
                     <Input
                       id="standard-adornment-email"
                       autoComplete="off"
                       name="email"                          
                       value={!values.showSignup ? email : ""}
                       onChange={handleChange("email")}
                       aria-describedby="standard-email-helper-text"
                       className="login-text-field-border-color"
                       required
                       inputProps={{
                         "aria-label": "email",
                       }}
                     />
                      <span className="validation-text" id="login-email"></span>
                    
                     {/* {validator.message("email", email, "required|email")} */}
                   </FormControl>
                   <FormControl
                     sx={{ m: 1, mt: 3, width: "32ch" }}
                     variant="standard"
                   >
                     <InputLabel htmlFor="standard-adornment-password">
                       Password
                     </InputLabel>
                     <Input
                       id="standard-adornment-password"
                       autoComplete="off"
                       type={values.showPassword ? "text" : "password"}
                       value={!values.showSignup ? password : ""}
                       onChange={handleChange("password")}
                       className="login-text-field-border-color"
                       required
                       endAdornment={
                         <InputAdornment position="end">
                           <IconButton
                             aria-label="toggle password visibility"
                             onClick={handleClickShowPassword}
                             onMouseDown={handleMouseDownPassword}
                           >
                             {values.showPassword ? (
                               <VisibilityOff />
                             ) : (
                               <Visibility />
                             )}
                           </IconButton>
                         </InputAdornment>
                       }
                     />
                      <span className="validation-text" id="login-password"></span>
                     {validator.message(
                       "password",
                       password,
                       "required|min:8"
                     )}
                   </FormControl>
                   </>
                   :""}
                     
                      {values.showSignup ? (
                        <>
                           <FormControl
                           variant="standard"
                           sx={{ m: 1, mt: 4, width: "32ch" }}>
                           <InputLabel htmlFor="standard-adornment-password">
                             Email
                           </InputLabel>
                           
                           <Input
                             id="standard-adornment-email"
                             autoComplete="off"  
                            
                             onChange={handleChange("email")}
                             aria-describedby="standard-email-helper-text"
                             className="login-text-field-border-color"
                             name="email"
                             required
                             
                           />
                            <span className="validation-text" id="setup-email"></span>
                           {validator.message("email", email, "required|email")}
                         </FormControl>
                         <FormControl
                           sx={{ m: 1, mt: 3, width: "32ch" }}
                           variant="standard"
                         >
                           <InputLabel htmlFor="standard-adornment-password">
                             Password
                           </InputLabel>
                           <Input
                             id="standard-adornment-password"
                             autoComplete="off"
                             name="password"
                            
                             type={values.showPassword ? "text" : "password"}
                             onChange={handleChange("password")}
                             className="login-text-field-border-color"
                             required
                             endAdornment={
                               <InputAdornment position="end">
                                 <IconButton
                                   aria-label="toggle password visibility"
                                   onClick={handleClickShowPassword}
                                   onMouseDown={handleMouseDownPassword}
                                 >
                                   {values.showPassword ? (
                                     <VisibilityOff />
                                   ) : (
                                     <Visibility />
                                   )}
                                 </IconButton>
                               </InputAdornment>
                             }
                           />
                           <span className="validation-text" id="setup-password"></span>
                           {validator.message(
                             "password",
                             password,
                             "required|min:8"
                           )}
                         </FormControl>
                        <FormControl
                          sx={{ m: 1, mt: 3, width: "32ch" }}
                          variant="standard"
                        >
                          <InputLabel htmlFor="standard-adornment-confirm-password">
                            Confirm Password
                          </InputLabel>
                          <Input
                            id="standard-adornment-confirm-password"
                            autoComplete="off"                           
                            type={values.showPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={handleChange("confirmPassword")}
                            className="login-text-field-border-color"
                          />
                          <span className="validation-text" id="setup-confirmPassword"></span>
                          {validator.message(
                            "confirm Password",
                            confirmPassword,
                            "required|min:8"
                          )}
                        </FormControl>
                        </>
                      ) : (
                        ""
                      )}
                      <FormGroup>
                        {isAgnt ||
                        isInsp ||
                        localStorage.getItem("queryId4")?.includes("@") ? (
                          ""
                        ) : (
                          <>
                          {!values.showSignup ?
                          <>
                          <FormControlLabel                          
                            sx={{ m: 0, mt: 3 }}
                            control={
                              <>
                                <Checkbox
                                className="confirm-checkbox" 
                                onClick={() => setChecked(!checked)}
                                checked={checked} 
                                onChange={handleClickIsChecked}
                                //   sx={{  width: 26,
                                //     height: 26,
                                //     color: grey[900],
                                //     "&.Mui-checked": { color: grey[900] },
                                //   }}                                 
                                />                                
                                {validator.message(
                                  "checkbox",
                                  values.isChecked,
                                  "required"
                                )}
                              </>
                            }
                            label={
                                <div className="checkbox-label" > 
                              <span 
                              style={{ marginTop:"18px !important",}}
                              className="login-checkbox-conscent">{`I am ${
                                !values.showSignup ? clientName : ""
                              } or I have the right to act on behalf of ${
                                !values.showSignup ? clientName : ""
                              }.`}</span>
                              
                              </div>
                            }
                          />
                          <span className="validation-text-checkbox" id="login-checkbox"></span>
                          </>:"" }
                          
                          </>
                          
                        )}
                      </FormGroup>                      
                      {!values.showSignup ?
                      <div style={{width:"300px", border:"none", marginTop:"20px",fontSize:"14px",marginLeft:"35px"}}
                        className="verify-user-button"
                        // sx={{ m: 1, mt: 0, width: "298px", height: "56px" }}
                        onClick={handleClickShowSignup}
                        variant="outlined"
                      >

                        <p>
                        {isAgnt ||
                        isInsp ||
                        localStorage.getItem("queryId4")?.includes("@") ?"":
                          <span className="login-client-name" > 
                        Not {clientName}?{" "}
                        </span>}
                        <span className="login-someone-else">
                          Sign in as someone else
                        </span>
                        </p>
                      </div>
                      :""}

                     
                      {!values.showSignup ?(                       
                          
                        <Button id="user-login"
                          className="login-signin-button"
                          sx={{ m: 1, mt: 5, width: "298px", height: "56px" }}
                          onClick={validateLogin}
                          variant="contained"
                        >
                          SIGN IN
                        </Button>

                      ) : (
                        <>
                        <Button id="user-setup"
                          className="login-setup-button"
                          sx={{ m: 1, mt: 5, width: "298px", height: "56px" }}
                          onClick={validateSignup}
                          variant="contained"
                        >
                          Set up
                        </Button>
                        <p className="signin-back" onClick={handleClickShowSignup}>Sign in</p>
                        </>
                      )}
                      {/* commenting ForgotPassword due to client requirement to remove forgot password */}
                      {/* <Button id="user-pwd-check"
                        className="login-forgot-button"
                        sx={{ m: 1, mt: 0, width: "298px", height: "16px" }}
                        onClick={handleClickShowForgotPassword}
                        variant="outlined"
                      >
                        Forgot your password?
                      </Button> */}
                    </div>
                  </Box>
                ) : (
                  <Box>
                    <div>
                      <FormControl
                        variant="standard"
                        sx={{ m: 1, mt: 4, width: "32ch" }}
                      >
                        <InputLabel htmlFor="standard-adornment-password">
                          Email
                        </InputLabel>
                        <Input
                          id="standard-adornment-email"
                          value={email}
                          onChange={handleChange("email")}
                          aria-describedby="standard-email-helper-text"
                          className="login-text-field-border-color"
                          inputProps={{
                            "aria-label": "email",
                          }}
                        />
                        {validator.message("email", email, "required|email")}
                      </FormControl>
                      <Button id="user-pwd-reset"
                        className="login-signin-button"
                        sx={{ m: 1, mt: 5, width: "298px", height: "56px" }}
                        onClick={forgotPassword}
                        variant="contained"
                      >
                        submit
                      </Button>
                      <p className="signin-back" onClick={handleClickShowSignin}>Sign in</p>
                    </div>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
          
        </Grid>
      </Box>
    </>
  );
};
// checking master code