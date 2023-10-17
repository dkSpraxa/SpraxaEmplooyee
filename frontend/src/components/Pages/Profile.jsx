import { Box, Stack } from "@mui/system";
import { Avatar, Grid, Paper, Typography,Button } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import EditUser from "../EditUser";
import {useNavigate} from 'react-router-dom'

const Profile = () => {
  const { user } = useSelector((state) => state.userStore);
  const navigate = useNavigate()

  return (
    <Box width="90%" margin="100px auto" >
      <Grid container>
      <Grid item xs={4}>
          <Paper elevation={3}>
          <Stack alignItems="center" spacing={2} padding={4} height="50hv">
          <Avatar
                src={`http://localhost:8080/images/${
                  user.profile
                }?v=${Date.now()}`}

                style={{width:"200px", height:"200px"}}
              />
            <Typography variant="h5">{user.name}</Typography>
            <Typography variant="h6">{user.department}</Typography>
            <Typography>Spraxa Solution Pvt. Lmt.</Typography>
          </Stack>
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper elevation={3}>
          <Stack spacing={4} justifyContent="center" padding={8} height="50hv" >
            <Stack direction="row" spacing={6} justifyContent="space-between" alignItems="center">
              <Typography>Full Name:</Typography>
              <Typography fontFamily="cursive">{user.name}</Typography>
            </Stack>
            <Stack direction="row" spacing={6} justifyContent="space-between" alignItems="center">
              <Typography>Email:</Typography>
              <Typography fontFamily="cursive">{user.email}</Typography >
            </Stack>
            <Stack direction="row" spacing={6} justifyContent="space-between" alignItems="center">
              <Typography>Phone Number:</Typography>
              <Typography fontFamily="cursive">{user.phone}</Typography>
            </Stack>
            <Stack direction="row" spacing={6} justifyContent="space-between" alignItems="center">
              <Typography>Address:</Typography>
              <Typography fontFamily="cursive">{user.address}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-around" alignItems="center" spacing={4}>
                <Button variant="contained" >
                    <EditUser data={user}/>
                </Button>
                <Button variant="contained" onClick={()=>navigate("/home")}>Back</Button>
            </Stack>
          </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
