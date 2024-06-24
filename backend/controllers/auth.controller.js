import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

const signup = async (req, res) => {
  try {
    const { fullName, username, email, password } = req.body;

    console.log(req.body);

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username is already taken." });
    }
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "email is already taken." });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "password length must be greater than 6 character." });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      username,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        email: newUser.email,
        followers: newUser.followers,
        following: newUser.following,
        profileImg: newUser.profileImg,
        coverImg: newUser.coverImg,
      });
    } else {
      res.status(400).json({ error: "invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ error: "internal server error." });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(req.body);
    if(!username || !password){
      return res.status(400).json({error:"both field are required."})
    }
    const user = await User.findOne({ username });
    console.log(user);
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password
    );
console.log(isPasswordCorrect);
    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "invalid username or password." });
    }

    generateTokenAndSetCookie(user?._id, res);

    res.status(200).json({
      _id: user?._id,
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      followers: user.followers,
      following: user.following,
      profileImg: user.profileImg,
      coverImg: user.coverImg,
    });
  } catch (error) {
    res.status(500).json({ error: "internal server error." });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "logged out successfully." });
  } catch (error) {
    res.status(500).json({ error: "internal server error." });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "internal server error." });
  }
};

export { signup, login, logout, getCurrentUser };
