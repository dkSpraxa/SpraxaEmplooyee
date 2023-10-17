import {
  addNewUser,
  deleteUser,
  editUserProfile,
  getAllusers,
  loggedInUser,
  uploadUserPicture,
  userLogin,
  userSignup,
} from "./userAction";

const { createSlice } = require("@reduxjs/toolkit");

const userReducer = createSlice({
  name: "users",
  initialState: {
    loading: false,
    user: !!localStorage.getItem("spraxaUser")
      ? JSON.parse(localStorage.getItem("spraxaUser"))
      : null,
    allUsers: [],
    token: !!localStorage.getItem("spraxaUser")
      ? JSON.parse(localStorage.getItem("spraxaToken"))
      : null,
    error: "",
    total: 0,
  },

  reducers: {
    userLogout: (state) => {
      state.user = null;
      localStorage.removeItem("spraxaUser");
      localStorage.removeItem("spraxaToken");
      state.allUsers = [];
    },
    resetError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // user register
      .addCase(userSignup.pending, (state) => {
        state.loading = true;
      })
      .addCase(userSignup.fulfilled, (state, action) => {
        state.loading = false;
        state.allUsers = state.allUsers.concat(action.payload.user);
      })
      .addCase(userSignup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //user login
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //add new user

      .addCase(addNewUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNewUser.fulfilled, (state, action) => {
        state.loading = false;
        state.allUsers = state.allUsers.concat(action.payload.user);
      })
      .addCase(addNewUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // get all user

      .addCase(getAllusers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllusers.fulfilled, (state, action) => {
        state.loading = false;
        state.allUsers = action.payload.users;
        state.total = action.payload.total;
      })
      .addCase(getAllusers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //update users
      .addCase(editUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(editUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        if (state.user._id === action.payload.user._id) {
          state.user = action.payload.user;
        }
        state.allUsers = state.allUsers.map((ele) => {
          if (ele._id === action.payload.user._id) {
            return (ele = action.payload.user);
          } else {
            return ele;
          }
        });
      })
      .addCase(editUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //delete user

      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.allUsers = state.allUsers.filter(
          (user) => user._id !== action.payload.user._id
        );
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //logged in user update

      .addCase(loggedInUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loggedInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(loggedInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //update user profile

      .addCase(uploadUserPicture.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadUserPicture.fulfilled, (state, action) => {
        state.loading = false;
        if (state.user._id === action.payload.user._id) {
          state.user = action.payload.user;
        }
        state.allUsers = state.allUsers.map((ele) => {
          if (ele._id === action.payload.user._id) {
            return (ele = action.payload.user);
          } else {
            return ele;
          }
        });
      })
      .addCase(uploadUserPicture.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userReducer.reducer;

export const {
  userLogout,
  resetError,
  resetDeleteUser,
  resetAuthenticate,
  resetUpdate,
  resetLogout,
} = userReducer.actions;
