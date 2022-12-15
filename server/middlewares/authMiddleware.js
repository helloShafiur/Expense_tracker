const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../src/model/User");

const authMiddleware = expressAsyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req?.headers?.authorization.split(" ")[1];
    try {
      if (token) {
        const decodeUser = jwt.verify(token, process.env.JWT_KEY);
        //FInd the user
        const user = await User.findById(decodeUser?.id);
        console.log(user);
        //Attach the user to the req object
        req.user = user;
        next();
      }
    } catch (error) {
      throw new Error("Not Authorized token expired");
    }
  } else {
    throw new Error("There is no token attached in the header");
  }
});

module.exports = authMiddleware;
