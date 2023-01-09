import express from "express";
import {
  userDeleteUser,
  userGetUser,
  userGetUsers,
  userSignIn,
  userSignUp,
  userUpdateUser,
} from "../controllers/user.js";

const router = express.Router();

router
  .route("/")
  .get(userGetUsers)
  .patch(userUpdateUser)
  .delete(userDeleteUser); // get user, create account, update account, delete account
router.route("/profile/:uId").get(userGetUser); // get user, create account, update account, delete account
router.route("/signup").post(userSignUp);
router.route("/signin").post(userSignIn);

export default router;
