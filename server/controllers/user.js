import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

export const userGetUsers = async (req, res) => {
  try {
    const allUsers = await User.find();

    res.status(200).json({ users: allUsers });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" + error });
  }
};

export const userGetUser = async (req, res) => {
  const { uId } = req.params;

  try {
    const existingUser = await User.findById(uId);

    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist." });

    res.status(200).json({ user: existingUser });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" + error });
  }
};

export const userDeleteUser = async (req, res) => {
  const { uId } = req.body;

  try {
    const deletedUser = await User.findByIdAndDelete(uId);

    if (!deletedUser)
      return res.status(404).json({ message: "Failed to delete user " + uId });

    res.status(200).json({ deletedUser: deletedUser });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" + error });
  }
};

export const userUpdateUser = async (req, res) => {
  const { uId, potentialUser } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(uId, potentialUser);

    if (!updatedUser)
      return res.status(404).json({ message: "Failed to update user " + uId });

    res.status(200).json({ updatedUser: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" + error });
  }
};

export const userSignIn = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist." });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials." });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "6h" }
    );

    res.status(200).json({ user: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" + error });
  }
};

export const userSignUp = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  try {
    console.log(req.body);

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords don't match" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "12h",
    });

    res.status(200).json({ user: result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong: " + error });
  }
};
