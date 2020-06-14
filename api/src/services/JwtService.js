const jwt = require("jsonwebtoken");
const fs = require("fs").promises;
const path = require("path");
module.exports = {
  verifyUserToken: async function (req, res, next) {
    try {
      let verifyOptions = {
        issuer: "cms",
        audience: "admin",
        expiresIn: "1h",
        algorithm: ["RS256"],
      };
      req.verified = false;
      let response = { msg: "INVALID TOKEN", data: false };
      if (req.headers.authorization) {
        let token = req.headers.authorization.split("Bearer ")[1];
        const publicKey = await fs.readFile(
          path.join(__dirname, "../keys/public.key"),
          "utf8"
        );
        if (publicKey) {
          jwt.verify(token, publicKey, verifyOptions, (err, verified) => {
            if (err) {
              res.json(response);
            } else {
              req.verified = true;
              next();
            }
          });
        } else {
          console.log("Error in retrieving public key: ", err);
          response.msg = "FAILURE";
          res.json(response);
        }
      } else {
        response.msg = "AUTHORIZATION HEADER NOT FOUND";
        res.json(response);
      }
    } catch (err) {
      const response = { msg: "FAILURE", data: false };
      res.json(response);
    }
  },
};
