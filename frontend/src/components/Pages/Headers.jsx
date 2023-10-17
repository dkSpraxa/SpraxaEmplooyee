import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Logo from "../assets/logo.png";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router";
import { userLogout } from "../../redux/userReducer";

export default function Headers() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { user } = useSelector((state) => state.userStore);
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const ShowProfile = () => {
    navigate("/profile")
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    dispatch(userLogout());
    alert.success("log out seccessfully!");
    navigate("/");
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "white" }}>
        <Toolbar>
          <IconButton
            size="small"
            edge="start"
            color="white"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <img src={Logo} alt="logo" width="50px" />
            <Typography
              variant="h4"
              component="span"
              fontWeight="bold"
              color="primary"
            >
              Spraxa
            </Typography>
          </IconButton>
          <Typography
            variant="h4"
            component="div"
            sx={{ flexGrow: 1 }}
            color="primary"
            fontWeight="bold"
            fontFamily="Roboto"
            id="list-title"
          >
            Employees Lists
          </Typography>
          <div style={{position:"absolute",right:"20px"}}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar
                src={`http://localhost:8080/images/${
                  user.profile
                }?v=${Date.now()}`}
              />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={ShowProfile}>Profile</MenuItem>
              <MenuItem onClick={logoutHandler}>Log out</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
