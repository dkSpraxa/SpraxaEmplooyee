import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import { useNavigate } from "react-router-dom";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Tooltip, Typography } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { deleteUser, uploadUserPicture } from "../redux/userAction";
import { useAlert } from "react-alert";
import { resetError } from "../redux/userReducer";
import { Box } from "@mui/system";
import question_pic from "./assets/question.png";

export default function UserPictureUpdate({ data, type }) {
  const [open, setOpen] = React.useState(false);
  const [picture, setPicture] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState(data.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { error, user } = useSelector((state) => state.userStore);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onChangeHandler = (e) => {
    setPicture(e.target.files[0]);
  };

  const photoSubmit = () => {
    const formdata = new FormData();
    formdata.append("profile", picture);

    dispatch(uploadUserPicture({ id: data._id, formdata }))
      .then((resultAction) => {
        if (uploadUserPicture.fulfilled.match(resultAction)) {
          // The upload was successful; update the image URL in local state
          alert.success("profile updated!");
          setImageUrl(resultAction.payload.user.profile);
        }
        setOpen(false);
      })
      .catch(() => {
        alert.error(error);
        dispatch(resetError());
      });
  };

  const deleteHandler = (id) => {
    if (user._id === id) {
      alert.show("logedd in user can't be deleted");
      return;
    }
    dispatch(deleteUser({ id }))
      .then((res) => {
        if (res.payload.success) {
          alert.success("deleted successfully!");
          navigate("/home");
        }
      })
      .catch(() => {
        alert.error(error);
        dispatch(resetError());
      });
  };

  return (
    <>
      {type === "upload" ? (
        <div>
          <span variant="outlined" onClick={handleClickOpen}>
            <Avatar
              src={`http://localhost:8080/images/${imageUrl}?v=${Date.now()}`}
            />
          </span>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle textAlign="center" marginBottom={2}>Upload Profile Picture</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                type="file"
                fullWidth
                variant="standard"
                onChange={onChangeHandler}
              ></TextField>
              <Box
                display="flex"
                justifyContent="space-around"
                marginTop={4}
                padding={2}
              >
                <Tooltip title="Upload">
                  <Button onClick={photoSubmit} variant="contained">
                    upload
                  </Button>
                </Tooltip>
                <Tooltip title="Cancel">
                  <Button onClick={handleClose} variant="outlined">
                    Cancel
                  </Button>
                </Tooltip>
              </Box>
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <div>
          <span variant="outlined" onClick={handleClickOpen}>
            <DeleteForeverIcon />
          </span>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle textAlign="center">Delete an user</DialogTitle>
            <DialogContent>
              <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                <img
                  src={question_pic}
                  alt="?"
                  style={{ width: "100px", height: "100px" }}
                />
                <Typography variant="h5">Are you sure to delete this ?</Typography>
                <Typography variant="body" fontWeight="bold">You can't undo this action ?</Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="space-around"
                marginTop={4}
                padding={2}
              >
                <Tooltip title="Delete">
                  <Button onClick={()=>deleteHandler(data._id)} variant="contained" color="error">
                    Yes
                  </Button>
                </Tooltip>
                <Tooltip title="Cancel">
                  <Button onClick={handleClose} variant="contained" color="success">
                    No
                  </Button>
                </Tooltip>
              </Box>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </>
  );
}
