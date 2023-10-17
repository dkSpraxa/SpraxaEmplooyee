import React, { Component } from "react";
import { Button, Typography } from "@mui/material";
import { Box, height, Stack } from "@mui/system";
import { formAction, isValidEmail } from "./validation";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../redux/userAction";
import { useAlert } from "react-alert";
import { resetError } from "../redux/userReducer";
import GlobalForm from "./GlobalForm";
import Spraxa from "./assets/spraxa2.png";
import logo from "./assets/logo.png";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginData: {
        email: "",
        password: "",
      },
      emailError: "",
    };
  }

  onChangehandler = (e) => {
    this.setState((preState) => ({
      loginData: {
        ...preState.loginData,
        [e.target.name]: e.target.value,
      },
    }));
  };

  onLoginSubmit = () => {
    const { email, password } = this.state.loginData;

    if (!isValidEmail(email)) {
      this.setState({ emailError: "Please provide valid email" });
      return;
    } else {
      this.setState({ emailError: "" });
    }

    // this.props.userLogin({email,password})

    this.props
      .dispatch(userLogin({ email, password }))
      .then((res) => {
        if (res.payload.success) {
          this.props.alert.success("Login Successfully!");
          this.props.navigate("/home");
        }
      })
      .catch(() => {
        this.props.alert.error(this.props.error);
        this.props.dispatch(resetError());
      });
  };

  render() {
    const states = {
      emailError: this.state.emailError,
      signupData: this.state.loginData,
    };

    const atttributes = formAction({
      states: states,
      onChangeHandler: this.onChangehandler,
      onclick: this.onLoginSubmit,
    });

    const loginAttributes = atttributes.filter((ele) => {
      return (ele = ele.name === "password" || ele.name === "email");
    });


    return (
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box
          width="60%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          id="main-img"
        >
          <img src={Spraxa} alt="" style={{ width: "100%", height: "100vh" }} />
        </Box>
        <Box width="40%" height="100vh" bgcolor="white" id="loginBox" >
          <Stack
            spacing={6}
            margin={4}
            bgcolor={"#fff"}
            padding={8}
            justifyContent="center"
            alignContent="center"
            borderRadius={4}
          >
            <Stack
              direction="row"
              spacing={2}
              width="100%"
              bgcolor="white"
              alignItems="center"
              justifyContent="center"
            >
              <img src={logo} alt="logo" />
              <Typography variant="h3" color={"#0f3b6c"} textAlign="center" id="form-title">
                Log in
              </Typography>
            </Stack>
            {loginAttributes.map((ele, index) => (
              <GlobalForm element={ele} key={index} />
            ))}
            <Box>
              <Button
                variant="contained"
                sx={{ width: "40%", margin: "auto" }}
                onClick={this.onLoginSubmit}
              >
                Login
              </Button>
            </Box>
            <Link to="/signup">New User? Sign Up</Link>
          </Stack>
        </Box>
      </Box>
    );
  }
}

export function LoginParent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error } = useSelector((state) => state.userStore);

  return (
    <Login
      navigate={navigate}
      dispatch={dispatch}
      alert={alert}
      error={error}
    />
  );
}

export default Login;
