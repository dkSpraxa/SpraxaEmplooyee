const express = require("express")
const upload = require("../middleware/UploadeFiles")
const { userRegister, userLogin, getAllusers, editUserProfile, deleteUser, uploadUserPic, editloggedInUser } = require("../controller/user")
const {isAuthenticatedUser, authorizeRoles} = require("../middleware/authenticaton")

const router = express.Router()

router.route("/register").post(userRegister)
router.route('/login').post(userLogin)
router.route("/users").get(isAuthenticatedUser,getAllusers)
router.route("/user/edit").put(isAuthenticatedUser,editloggedInUser)
router.route("/user/add").post(isAuthenticatedUser,authorizeRoles("admin"),userRegister)
router.route("/user/update").put(isAuthenticatedUser,authorizeRoles("admin"),editUserProfile)
router.route("/user/delete/:id").delete(isAuthenticatedUser,authorizeRoles("admin"),deleteUser)
router.route("/upload/:id").post(isAuthenticatedUser,upload.single("profile"),uploadUserPic)

module.exports = router