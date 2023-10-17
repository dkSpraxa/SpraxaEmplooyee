import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid, Stack, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { formAction, isValidEmail } from "./validation";
import { editUserProfile, loggedInUser } from "../redux/userAction";
import { useAlert } from "react-alert";
import { resetError } from "../redux/userReducer";
import EditIcon from "@mui/icons-material/Edit";
import GlobalForm from "./GlobalForm";
import { useTheme } from "@mui/material/styles";

export default function EditUser({ data }) {
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, user } = useSelector((state) => state.userStore);

  const [userAddingData, setUserAddingData] = React.useState({
    name: data.name,
    phone: data.phone,
    email: data.email,
    department: data.department,
    address: data.address,
    role:data.role
  });

  const [stateError, setStateError] = React.useState({
    emailError: "",
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
    
    const { name, email, phone, address, department,role } = userAddingData;
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

    if (user.role === "user" && user._id !== data._id) {
      alert.error("You are Unauthorized Person");
      return;
    }

    {user.role==="admin" ? dispatch(
      editUserProfile({ id: data._id, name, email, phone, address, department,role })
    )
      .then((res) => {
        if (res.payload.success) {
          alert.success("Update Successfully!");
          setOpen(false);
        }
      })
      .catch(() => {
        dispatch(resetError());
      }):
      dispatch(
        loggedInUser({ name, email, phone, address, department })
      )
        .then((res) => {
          if (res.payload.success) {
            alert.success("Update Successfully!");
            setOpen(false);
          }
        })
        .catch(() => {
          dispatch(resetError());
        });
    }
  };

  const atttributes = formAction({
    states: states,
    onChangeHandler: onChangehandler,
    onclick: onSignUpSubmit,
  });

  const leftContainer = ["name", "email", "phone"];

  const leftSideForm = atttributes.filter((ele) => {
    return (ele = leftContainer.includes(ele.name));
  });

  const rightContainer = user.role ==="admin" ? ["address", "department","role"] : ["address", "department"];

  const rightSideForm = atttributes.filter((ele) => {
    return (ele = rightContainer.includes(ele.name));
  });

  // style popup
  const theme = useTheme();
  const useStyles = makeStyles(() => ({
    dialogWrapper: {
      padding: theme.spacing(2),
      position: "absolute",
      top: theme.spacing(5),
    },
  }));

  const classes = useStyles();

  React.useEffect(()=>{
    if(error){
      alert.error(error)
    }
  },[alert,error])

  return (
    <div>
      <span variant="outlined" onClick={handleClickOpen}>
        <EditIcon />
      </span>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        classes={{ paper: classes.dialogWrapper }}
      >
        <DialogTitle textAlign="center">Update User</DialogTitle>
        <DialogContent>
          <Box sx={{ width: "100%" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Stack
                  spacing={2}
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
                  spacing={2}
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
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}
