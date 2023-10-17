import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Button, IconButton, Tooltip, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Stack } from "@mui/system";
import EditUser from "./EditUser";
import { useNavigate } from "react-router";
import { getAllusers } from "../redux/userAction";
import { useAlert } from "react-alert";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import UserPictureUpdate from "./UserPictureUpdate";
import NewUser from "./NewUser";


export default function User() {
  const dispatch = useDispatch();
  const { user,allUsers, total,loading } = useSelector((state) => state.userStore);

  //pagination
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(5);


  const onchangeHadler = (params) =>{
    setPage(params.pagination.paginationModel.page)
    setPageSize(params.pagination.paginationModel.pageSize)
  }

  React.useEffect(() => {
    dispatch(getAllusers({page,pageSize}))
  }, [page, pageSize,dispatch]);

  const columns = [
    {
      field: "profile",
      headerName: "Profile",
      width: 0,
      renderCell: (param) => (
        <Tooltip title="Update profile picture">
          <IconButton>
            <UserPictureUpdate data={param.row} type="upload" />
          </IconButton>
        </Tooltip>
      ),
      sortable: false,
      filterable: false,
    },

    {
      field: "name",
      headerName: "Name",
      width: 180,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 180,
      editable: true,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 180,
      editable: true,
    },
    {
      field: "address",
      headerName: "Address",
      width: 180,
      editable: true,
    },
    {
      field: "department",
      headerName: "Department",
      width: 180,
      editable: true,
    },
    { field: "_id", headerName: "ID", width: 0 },
    user.role ==="admin" && {
      field: "action",
      headerName: "Action",
      width: 400,
      renderCell: (param) => {
        return (
          <Stack direction="row" spacing={2}>
            <Tooltip title="Edit User">
              <IconButton variant="contained" color="warning">
                <EditUser data={param.row} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete User">
              <IconButton
                variant="contained"
                color="error"
              >
                <UserPictureUpdate data={param.row} type="delete" />
              </IconButton>
            </Tooltip>
          </Stack>
        );
      },
    },
  ];


  return (
    <Paper elevation={3}
      sx={{
        width: "80%",
        margin: "100px auto",
        borderRadius: 4,
        
      }}
      id="tableBox"
    >
      {user.role ==="admin" && <Box
        
        display="flex"
        justifyContent="flex-start"
        alignItems="flex-end"
        width="90%"
        margin="auto"
        paddingTop={4}
      >
        <Tooltip title="Add New User">
          <Button variant="outlined" size="medium" color="success" startIcon={<PersonAddIcon />}>
            <NewUser />
          </Button>
        </Tooltip>

      </Box>}
      <Box bgcolor="#fff" padding={4}  borderRadius={4} id="gridBox">
        <DataGrid
          rows={allUsers}
          columns={columns}
          getRowId={(row) => row._id}
          rowCount={total}
          loading={loading}
          initialState={{
            pagination: { paginationModel: {page:page, pageSize: pageSize, } },
          }}
          pageSizeOptions={[5, 10, 25]}
          paginationMode="server"
          onStateChange={(params)=>onchangeHadler(params)}
          rowHeight={80}
        />
      </Box>
    </Paper>
  );
}
