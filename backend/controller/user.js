const catchAsyncError = require("../middleware/catchAsyncError.js");
const ErrorHandler = require("../middleware/ErrorHandler.js");
const userSchema = require("../model/userSchema.js");
const fs = require("fs");

//register user
exports.userRegister = catchAsyncError(async (req, res) => {
  const { name, email, phone, address, department, password } = req.body;

  const user = await userSchema.create({
    name,
    email,
    phone,
    address,
    department,
    password,
  });

  const token = await user.genrateToken();

  res.status(201).json({
    success: true,
    user,
    token,
  });
});

//user login

exports.userLogin = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("please provide email and password both"));
  }

  const user = await userSchema.findOne({ email });

  if (!user) {
    return next(new ErrorHandler("user not found", 404));
  }

  const isCorrectPass = await user.comparePassword(password);

  if (!isCorrectPass) {
    return next(new ErrorHandler("incorrect password", 401));
  }

  const token = await user.genrateToken();

  res.status(201).json({
    success: true,
    user,
    token,
  });
});

// get all users
exports.getAllusers = catchAsyncError(async (req, res, next) => {

  const page = parseInt(req.query.page)
  const perPage = parseInt(req.query.perPage) || 5;

  const skip = (page - 1)*perPage;

  const users = await userSchema.find().skip(skip).limit(perPage).select("-password")
  const total = await userSchema.count()

  res.status(201).json({
    success: true,
    users,
    total
  });
});

//edit users profile

exports.editUserProfile = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    department: req.body.department,
    address: req.body.address,
    role:req.body.role
  };

  // Update the user's information
  const updatedUser = await userSchema.findByIdAndUpdate(
    req.body.id,
    newUserData,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(201).json({
    success: true,
    message: "User updated successfully!",
    user: updatedUser,
  });
});


//edit logged in users profile

exports.editloggedInUser = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    department: req.body.department,
    address: req.body.address,
  };

  // Update the user's information
  const updatedUser = await userSchema.findByIdAndUpdate(
    req.user._id,
    newUserData,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(201).json({
    success: true,
    message: "Profile updated successfully!",
    user: updatedUser,
  });
});


//update password

exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;

  if (!oldPassword || !newPassword || !confirmPassword) {
    return next(new ErrorHandler("Please provide all fields", 401));
  }

  const user = await userSchema.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler("user not found", 404));
  }

  const isMatched = await user.comparePassword(oldPassword);

  if (!isMatched) {
    return next(new ErrorHandler("incorrect old pasword", 404));
  }

  if (newPassword !== confirmPassword) {
    return next(new ErrorHandler("Passwords doesn't matched ", 404));
  }

  user.password = newPassword;

  await user.save();

  res.status(201).json({
    success: true,
    message: "password updated successfully!",
  });
});

//user delete

exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await userSchema.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler("user not found", 404));
  }

  const filePath = `backend/public/images/${user.profile}`; // Replace with the actual file path

  // Use fs.unlink to delete the file
  debugger;
  if(user.profile !== "profiles.png"){
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting the file:", err);
      } else {
        console.log("File deleted successfully");
      }
    });
  }

  await user.deleteOne();

  res.status(201).json({
    success: true,
    message: "user deleted successfully!",
    user,
  });
});

//upload user picture

exports.uploadUserPic = catchAsyncError(async (req, res) => {
  const imageName = req.file.filename;

  const user = await userSchema.findById(req.params.id);

  user.profile = imageName;

  await user.save();

  res.status(200).json({
    success: true,
    user,
  });
});
