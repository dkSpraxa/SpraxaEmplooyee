import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Grid } from "@mui/material";
import { Stack } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { formAction, isValidEmail } from "./validation";
import { addNewUser } from "../redux/userAction";
import { useAlert } from "react-alert";
import { resetError } from "../redux/userReducer";
import GlobalForm from "./GlobalForm";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";

export default function NewUser() {
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();
  const alerts = useAlert();

  const { error,user } = useSelector((state) => state.userStore);

  const [userAddingData, setUserAddingData] = React.useState({
    name: "",
    phone: "",
    email: "",
    department: "",
    address: "",
    password: "",
    co_password: "",
  });

  const [stateError, setStateError] = React.useState({
    emailError: "",
    passwordError: "",
    matchError: "",
    phoneError: "",
  });

  const states = { signupData: userAddingData, ...stateError };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onChangehandler = (e) => {
    if (!e) return;
    setUserAddingData({ ...userAddingData, [e.target.name]: e.target.value });
  };

  const onSignUpSubmit = () => {
    const { name, email, password, co_password, phone, address, department } =
      userAddingData;

    if (!name || !email || !password || !phone || !department || !address) {
      alert("please provide all fields");
      return;
    }

    if (!isValidEmail(email)) {
      setStateError({
        ...stateError,
        emailError: "Please provide valid email",
      });
      return;
    } else {
      setStateError({ emailError: "" });
    }

    if (phone.length < 10 || phone.length > 12) {
      setStateError({
        ...stateError,
        phoneError: "Please provide valide phone number",
      });
      return;
    } else {
      setStateError({ phoneError: "" });
    }

    if (password.length < 8) {
      setStateError(...stateError, {
        passwordError: "Password should be at least 8 characters",
      });
      return;
    } else {
      setStateError({ passwordError: "" });
    }

    if (password !== co_password) {
      setStateError({ ...stateError, matchError: "Password doesn't matched" });
      return;
    } else {
      setStateError({ matchError: "" });
    }

    if(user.role === "user"){
      alerts.error("You are Unauthorized Person")
      return;
    }

    dispatch(addNewUser({ name, email, password, phone, address, department }))
      .then((res) => {
        if (res.payload.success) {
          alerts.success("added successfully!");
        }
      })
      .catch(() => {
        dispatch(resetError());
      });
    setUserAddingData({
      ...userAddingData,
      name: "",
      email: "",
      phone: "",
      address: "",
      department: "",
      password: "",
      co_password: "",
    });
    setOpen(false);
  };

  React.useEffect(()=>{
    if(error){
      alerts.error(error)
    }
  },[alerts,error])

  const atttributes = formAction({
    states: states,
    onChangeHandler: onChangehandler,
    onclick: onSignUpSubmit,
  });

  const leftContainer = ["name", "email", "phone", "address"];

  const leftSideForm = atttributes.filter((ele) => {
    return (ele = leftContainer.includes(ele.name));
  });

  const rightContainer = ["password", "co_password", "department"];

  const rightSideForm = atttributes.filter((ele) => {
    return (ele = rightContainer.includes(ele.name));
  });
  //    style popup
  const theme = useTheme();
  const useStyles = makeStyles(() => ({
    dialogWrapper: {
      padding: theme.spacing(2),
      position: "absolute",
      top: theme.spacing(5),
    },
  }));

  const classes = useStyles();

  return (
    <div>
      <span variant="outlined" onClick={handleClickOpen}>
        Add user
      </span>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        classes={{ paper: classes.dialogWrapper }}
      >
        <DialogTitle textAlign="center">Add New User</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Stack
                spacing={1}
                bgcolor={"#fff"}
                padding={{ sx: 0, md: 2 }}
                justifyContent="center"
                alignContent="center"
                borderRadius={4}
              >
                {leftSideForm.map((ele, index) => (
                  <GlobalForm key={index} element={ele} />
                ))}
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack
                spacing={1}
                bgcolor={"#fff"}
                padding={{ sx: 0, md: 2 }}
                justifyContent="center"
                alignContent="center"
                borderRadius={4}
              >
                {rightSideForm.map((ele, index) => (
                  <GlobalForm key={index} element={ele} />
                ))}
                <Stack direction="row" spacing={2}>
                    <Button
                      variant="contained"
                      sx={{ width: "40%", margin: "auto" }}
                      onClick={onSignUpSubmit}
                    >
                      Submit
                    </Button>
                    <Button onClick={handleClose} variant="outlined">
                    Cancel
                  </Button>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}
