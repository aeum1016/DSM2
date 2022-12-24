import express from "express";
import {
  friendAddFriend,
  friendAddRequest,
  friendGetFriends,
  friendGetRequests,
  friendRemoveFriend,
  friendRemoveRequest,
} from "../controllers/friend.js";

const router = express.Router();

router
  .route("/")
  .get(friendGetFriends)
  .post(friendAddFriend)
  .delete(friendRemoveFriend); // get list of friends, add friend, delete friend

router
  .route("/request")
  .get(friendGetRequests)
  .post(friendAddRequest)
  .delete(friendRemoveRequest); // get list of friend requests, add friend request, delete friend request

export default router;
