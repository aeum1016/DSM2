import express from "express";
import {
  attemptCreateAttempt,
  attemptDeleteAttempt,
  attemptGetAttempt,
  attemptGetAttempts,
} from "../controllers/attempt.js";

const router = express.Router();

router
  .route("/")
  .get(attemptGetAttempts)
  .post(attemptCreateAttempt)
  .delete(attemptDeleteAttempt); // get all attempts, create attempt, delete attempt
router.route("/:attemptId").get(attemptGetAttempt); // get single attempt

export default router;
