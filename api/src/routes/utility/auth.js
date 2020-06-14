const router = require("express").Router();
const UserService = require("../../services/UserService");
const JwtService = require("../../services/JwtService");
router.post("/login", async (req, res) => {
  let response = { msg: "FAILURE", data: [] };
  const { username, password } = req.body;
  let result = await UserService.auth({
    username: username,
    password: password,
  });
  res.json(result);
});

router.post("/verifyToken", JwtService.verifyUserToken, async (req, res) => {
  let response = { msg: "FAILURE", data: false };
  if (req.verified) {
    response.msg = "SUCCESS";
    response.data = req.verified;
    res.json(response);
  }
});

module.exports = router;
