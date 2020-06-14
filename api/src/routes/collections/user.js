const router = require("express").Router();
const UserService = require("../../services/UserService");
const JwtService = require("../../services/JwtService");

// router.post("/users", async (req, res) => {
//   const user = req.body;
//   const response = { msg: "FAILURE", data: [] };
//   let result = await UserService.signup(user);
//   // console.log("result", result);
//   if (result == "saved") {
//     response.msg = "SUCCESS";
//     res.json(response);
//   } else {
//     res.json(response);
//   }
// });

module.exports = router;
