const bcrypt = require("bcrypt");
const user = require("../db/models/user");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const fs = require("fs").promises;

module.exports = {
  //signup
  signup: async function (userObj) {
    bcrypt.hash(userObj.password, saltRounds, (err, hash) => {
      if (hash) {
        userObj.password = hash;
        new user(userObj)
          .save()
          .then((u) => {
            console.log(u)
            return "saved";
          })
          .catch((e) => {
            console.log(e);
            return e;
          });
      }
    });
  },

  //authenticate
  auth: async function (userObj) {
    const response = { msg: "FAILURE", data: null };
    try {
      const result = await user.findOne({ username: userObj.username });
      if (result) {
        const comparisonResult = await bcrypt.compare(
          userObj.password,
          result.password
        );
        if (comparisonResult) {
          let signOption = {
            issuer: "cms",
            audience: "admin",
            expiresIn: "1h",
            algorithm: "RS256",
          };
          let payload = {
            username: userObj.username,
          };
          const privateKey = await fs.readFile("src/keys/private.key", "utf8");
          if (privateKey) {
            const token = await jwt.sign(payload, privateKey, signOption);
            if (token) {
              response.msg = "SUCCESS";
              response.data = { token: token, uid: result._id };
              return response;
            } else {
              return response;
            }
          } else {
            return response;
          }
        } else {
          response.msg = "WRONG CREDENTIALS";
          return response;
        }
      } else {
        response.msg = "INVALID USER";
        return response;
      }
    } catch (err) {
      return response;
    }
  },
};
