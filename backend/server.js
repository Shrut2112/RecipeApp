import express from "express";
import mongoose from "mongoose";
import User from "./model/User.js";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
const port = 3000;


// Middleware
app.use(bodyParser.json());
dotenv.config();
app.use(cors({ origin: "*" })); // Allow all origins for development
app.use(bodyParser.urlencoded({ extended: true }));



// MongoDB connection
const mongoUrl = process.env.MONGO_URL;
mongoose.connect(mongoUrl)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));


// Login endpoint
app.post("/api/auth/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("Login attempt:", { username });

  try {
    const user = await User.findOne({ username });
    if (!user) {
      console.log("User not found:", username);
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const userData = {
        username: user.username,
        email: user.email,
        image: user.image,
      };
      console.log("Login successful:", username);
      return res.status(201).json({ message: "Login Successful", user: userData });
    } else {
      console.log("Invalid password for:", username);
      return res.status(400).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// Register endpoint
app.post("/api/auth/register", async (req, res) => {
  const { username, email, password, image } = req.body;
  console.log("Register attempt:", { username, email });

  if (!username || !email || !password) {
    console.log("Missing fields:", { username, email, password });
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const hashpass = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashpass,
      image: image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    });
    await user.save();
    console.log("User registered:", username);
    return res.status(201).json({ message: "Successfully added" });
  } catch (error) {
    if (error.code === 11000) {
      console.log("Duplicate user:", username);
      return res.status(400).json({ message: "User already exists" });
    }
    console.error("Registration error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// Verify password endpoint
app.post("/api/auth/verify-password", async (req, res) => {
  const { username, password } = req.body;
  console.log("Verify password attempt:", { username });

  if (!username || !password) {
    console.log("Missing fields:", { username, password });
    return res.status(400).json({ message: "Username and password are required" });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      console.log("User not found:", username);
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      console.log("Password verified for:", username);
      return res.status(200).json({ message: "Password verified" });
    } else {
      console.log("Invalid password for:", username);
      return res.status(401).json({ message: "Invalid password" });
    }
  } catch (error) {
    console.error("Verify password error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// Update profile endpoint
app.put("/api/auth/update-profile", async (req, res) => {
  const { originalUsername, username, email } = req.body;

  console.log("Update profile attempt:", { originalUsername, username, email });

  if (!originalUsername || !username || !email) {
    console.log("Missing fields:", { originalUsername, username, email });
    return res.status(400).json({ message: "Original username, username, and email are required" });
  }

  try {
    

    const updatedUser = await User.findOneAndUpdate(
      { username: originalUsername }, // Find by originalUsername
      { username, email },
      { new: true }
    );

    if (!updatedUser) {
      console.log("User not found:", originalUsername);
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Profile updated:", username);
    return res.status(200).json({
      message: "Profile updated successfully",
      user: {
        username: updatedUser.username,
        email: updatedUser.email,
        image: updatedUser.image
      }
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

app.listen(port, () => {
  console.log(`App listening on http://192.168.1.7:${port}`);
});