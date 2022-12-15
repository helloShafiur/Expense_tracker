const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../../../middlewares/generateToken");
const User = require("../../model/User");

//Register
const registerUser = expressAsyncHandler(async (req, res) => {
  const { email, firstname, lastname, password } = req?.body;
  //Check if the user is already registered
  const userExists = await User.findOne({ email });
  if (userExists) throw new Error("User already registered");
  try {
    const user = await User.create({ email, firstname, lastname, password });
    res.status(200).json(user);
  } catch (error) {
    res.json(error);
  }
});
//Fetch all users from Database

const fetchUsersCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.json(error);
  }
});

//Login User
const loginUserCtrl = expressAsyncHandler(async (req, res) => {
  const { email, password } = req?.body;
  //Find the user in DB
  const userFound = await User.findOne({ email });
  //If the user password is matched
  if (userFound && (await userFound?.isPasswordMatch(password))) {
    res.json({
      _id: userFound?._id,
      firstname: userFound?.firstname,
      lastname: userFound?.lastname,
      email: userFound?.email,
      isAdmin: userFound?.isAdmin,
      token: generateToken(userFound?._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Login Credentials");
  }
});

module.exports = { registerUser, fetchUsersCtrl, loginUserCtrl };
