import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "http://localhost:8080/api/v1";
const token = JSON.parse(localStorage.getItem("spraxaToken"));

const axiosInstance = axios.create({
  baseURL:baseURL,
  headers: {
    "Content-Type": "application/json"
  }
})

const axiosInstanceAuth = axios.create({
  baseURL:baseURL,
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  }
})

//user register

export const userSignup = createAsyncThunk("signup", async ({name,email,password,phone,address,department }) => {
  try {
  
    const {data} = await axiosInstance.post("/register",{name,email,password,phone,address,department })
    
    return data;
  } catch (error) {
    return Promise.reject(error.response.data);
  }
});

// user login

export const userLogin = createAsyncThunk("login",async ({ email, password }) => {
    try {
      
      const res = await axiosInstance.post("/login",{email,password})

      localStorage.setItem("spraxaUser", JSON.stringify(res.data.user));
      localStorage.setItem("spraxaToken", JSON.stringify(res.data.token));
      return res.data;
    } catch (error) {
      return Promise.reject(error.response.data);
    }
  }
);

//add new user

export const addNewUser = createAsyncThunk("addnewuser", async ({ name,email,password,phone,address,department }) => {
  try {
    
    const {data} = await axiosInstanceAuth.post("/user/add",{name,email,password,phone,address,department})

    return data;
  } catch (error) {
    return Promise.reject(error.response.data);
  }
});

// get all users

export const getAllusers = createAsyncThunk("all users", async ({page,pageSize}) => {
  try {


    const { data } = await axiosInstanceAuth.get(
      `/users?page=${page+1}&perPage=${pageSize}`
    );
    return data;
  } catch (error) {
    return Promise.reject(error.response.data);
  }
});

//user profile update

export const editUserProfile = createAsyncThunk("edit",async ({id,name,email,phone,address,department,role }) => {
    try {

      const res = await axiosInstanceAuth.put(
        `user/update`,
        {id,name,email,phone,address,department,role},
      );
      return res.data;
    } catch (error) {
      return Promise.reject(error.response.data);
    }
  }
);

//logged in user update

export const loggedInUser = createAsyncThunk("edit-user",async ({name,email,phone,address,department }) => {
  try {
    
    const res = await axiosInstanceAuth.put(
      `/user/edit`,
      {name,email,phone,address,department}
    );
    return res.data;
  } catch (error) {
    return Promise.reject(error.response.data);
  }
}
);

//user delete

export const deleteUser = createAsyncThunk("delete", async ({ id }) => {
  try {
    
    const { data } = await axiosInstanceAuth.delete(
      `user/delete/${id}`
    );
    return data;
  } catch (error) {
    return Promise.reject(error.response.data);
  }
});




//update user pic

export const uploadUserPicture = createAsyncThunk("userPic", async ({id,formdata}) => {
  try {
    const token = JSON.parse(localStorage.getItem("spraxaToken"));
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(
      `${baseURL}/upload/${id}`,formdata,
      config
    );
    localStorage.setItem("spraxaUser", JSON.stringify(data.user));
    return data;
  } catch (error) {
    return Promise.reject(error.response.data);
  }
});
