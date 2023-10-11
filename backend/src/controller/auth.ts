import asyncHandler from "express-async-handler";
const User = require("../model/user");
const { loginData, regData } = require("../helper/validate");
const jw = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (id: string) => {
  return jw.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

module.exports = {
  Login: asyncHandler(async (req: any, res: any) => {
    try {
      const { email, password } = req.body;
      const { error } = await loginData(email, password);
      if (error) {
        const { details } = error;
        res.json({
          success: false,
          message: details[0].message,
        });
        return;
      }

      const user = await User.findOne({ email: email });
      if (user === null) {
        res.status(400).json({
          success: false,
          message: "Incorrect Email or Password",
        });

        return;
      }

      if (user && (await bcrypt.compare(password, user.password))) {
        const data = {
          _id: user.id,
          name: user.username,
          email: user.email,
          token: generateToken(user._id),
        };

        res.status(200).json({
          success: true,
          message: "Successful",
          data,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Incorrect Email or Password",
        });
      }

      // const;
    } catch (error) {
      console.log(error);
    }
  }),

  Register: asyncHandler(async (req: any, res: any) => {
    try {
      const { username, email, password } = req.body;
      const { error } = await regData(username, email, password);
      if (error) {
        const { details } = error;
        res.json({
          success: false,
          message: details[0].message,
        });
        return;
      }

      const findEmail = await User.findOne({ email: email });
      if (findEmail) {
        res.status(400).json({
          success: false,
          message: "User already exist",
        });

        return;
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(password, salt);

      const user = {
        username,
        email,
        password: hashedPass,
      };

      const newUser = await User.create(user);

      const data = {
        _id: newUser.id,
        username: newUser.username,
        token: generateToken(newUser.id),
      };

      if (newUser) {
        res.status(201).json({
          success: true,
          message: "Successful",
          data,
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Invalid user data",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }),
};
