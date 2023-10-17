import React, { Component } from "react";
import { Box, Typography,Button } from "@mui/material";
import { Stack } from "@mui/system";
import { formAction, isValidEmail } from "./validation";
import { Link, useNavigate } from "react-router-dom";
import { userSignup } from "../redux/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { resetError } from "../redux/userReducer";
import GlobalForm from "./GlobalForm";
import Spraxa from "./assets/spraxa2.png";
import logo from "./assets/logo.png";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signupData: {
        name: "",
        phone: "",
        email: "",
        department: "",
        address: "",
        password: "",
        co_password: "",
      },
      emailError: "",
      passwordError: "",
      matchError: "",
      phoneError: "",
      addressError: "",
      departmentError: "",
    };
  }

  onChangehandler = (e) => {
    if (!e) return;
    this.setState((preState) => ({
      signupData: {
        ...preState.signupData,
        [e.target.name]: e.target.value,
      },
    }));

    
  };

  onSignUpSubmit = () => {
    const { name, email, password, co_password, phone, address, department } =
      this.state.signupData;

    if (!name || !email || !password || !phone || !department || !address) {
      this.props.alert.error("please provide all fields");
      return;
    }

    if (!isValidEmail(email)) {
      this.setState({ emailError: "Please provide valid email" });
      return;
    } else {
      this.setState({ emailError: "" });
    }

    if (phone.length < 10 || phone.length > 12) {
      this.setState({ phoneError: "Please provide valide phone number" });
      return;
    } else {
      this.setState({ phoneError: "" });
    }

    if (password.length < 8) {
      this.setState({
        passwordError: "Password should be at least 8 characters",
      });
      return;
    } else {
      this.setState({ passwordError: "" });
    }

    if (password !== co_password) {
      this.setState({ matchError: "Password doesn't matched" });
      return;
    } else {
      this.setState({ matchError: "" });
    }

    this.props
      .dispatch(
        userSignup({ name, email, password, phone, address, department })
      )
      .then((res) => {
        if (res.payload.success) {
          this.props.alert.success("Register successfully!"); // Display a success message
          this.props.navigate("/"); // Navigate to the '/users' route
        }
      })
      .catch(() => {
        this.props.alert.error(this.props.error);
        this.props.dispatch(resetError());
      });

    console.log(this.state);
  };

  render() {
    const atttributes = formAction({
      states: this.state,
      onChangeHandler: this.onChangehandler,
      onclick: this.onSignUpSubmit,
    });

    const rigisterAtt = atttributes.filter((ele)=>{
      return ele = (ele.name !== "role")
    })
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
        <Box width="40%" height="100vh" bgcolor="white" id="loginBox">
          <Stack
            spacing={3}
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
              <Typography variant="h3" color={"#0f3b6c"} textAlign="center" id="signup-title">
                Sign up
              </Typography>
            </Stack>
            {rigisterAtt.map((ele, index) => (
              <GlobalForm key={index} element={ele} />
            ))}

            <Box>
              <Button
                variant="contained"
                sx={{ width: "40%", margin: "auto" }}
                onClick={this.onSignUpSubmit}
              >
                sign up
              </Button>
            </Box>

            <Link to="/">Have an account? Login</Link>
          </Stack>
        </Box>
      </Box>
    );
  }
}

export function RegisterParent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { error } = useSelector((state) => state.userStore);

  return (
    <Register
      dispatch={dispatch}
      navigate={navigate}
      alert={alert}
      error={error}
    />
  );
}

export default Register;
