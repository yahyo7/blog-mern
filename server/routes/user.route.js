import express from "express";
import {
  deleteUser,
  test,
  updateUser,
  signOut,
  getUsers,
  getUserAlone
} from "../controllers/user.controller.js";
import verifyToken from "../utils/verifyUser.js";

const router = express.Router();

router.get("/test", test);
router.put("/update/:userId", verifyToken, updateUser);
router.delete("/delete/:userId", verifyToken, deleteUser);
router.post("/signout", signOut);
router.get('/get-users', verifyToken, getUsers)
router.get('/:userId', getUserAlone)

export default router;
