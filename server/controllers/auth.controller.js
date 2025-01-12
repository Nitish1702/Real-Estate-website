import bcrypt from "bcrypt";
import prismaClient from "../lib/prisma.js";
import cookie from "cookie-parser";
import jwt from "jsonwebtoken";
import { create2DsphereIndex } from "../utils/createIndex.js";

export const register = async (req, res) => {
  const { name, email, password, phone, role } = req.body;
  // create2DsphereIndex();
  try {
    // Check if the email already exists
    const existingUser = await prismaClient.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const newUser = await prismaClient.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        role,
      },
    });

    console.log(newUser);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);

    if (error.code === "P2002") {
      // Prisma unique constraint error
      res.status(409).json({ message: "Email already exists" });
    } else {
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await prismaClient.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const { password: userPassword, ...userDetails } = user;
    // Check if the password is valid
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const age = 1000 * 60 * 60 * 7; // 7 hours
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY);

    // Set the token in a cookie
    res.cookie("token", token, {
      httpOnly: true,
      // secure: true, // Uncomment this if using HTTPS
      maxAge: age,
    });

    res.status(200).json(userDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to login" });
  }
};

export const logout = (req, res) => {
  // Clear the session data or token (if applicable)

  res.clearCookie("token", { path: "/" }); // Make sure to match the path you set when the cookie was created

  // Send a response to the client
  return res.status(200).json({ message: "Logout successful" });
};
