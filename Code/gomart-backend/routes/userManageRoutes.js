const express = require("express");
const {
  registerUser,
  loginUser,
  currentUser,
  getOneUser,
  updateUser,
  deleteUser,
} = require("../controllers/UserManagerControllers");

const router = express.Router();

router.post("/sign-up", registerUser);
router.post("/login", loginUser);
router.get("/current", currentUser);

//get one user
router.get("/current/:id", getOneUser);

//update user
router.put("/updateUser/:id", updateUser);

//delete user
router.delete("/deleteUser", deleteUser);


module.exports = router;
