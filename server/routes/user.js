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
router.route("/:userId").get(userGetUser); // get user, create account, update account, delete account
router.route("/auth").get(userSignIn).post(userSignUp);

export default router;
