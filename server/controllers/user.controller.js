import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Create a new user
export const addUser = async (req, res) => {
  const { name, email, password, phone, role } = req.body;

  try {
    // Validate input
    if (!name || !email || !password || !phone || !role) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Create the new user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password, // Make sure to hash the password before saving (using bcrypt or similar)
        phone,
        role,
      },
    });

    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Detailed error:", error);
    res.status(500).json({ error: "Failed to create user", details: error.message });
  }
};

// Get all users or a specific user by ID
export const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    if (id) {
      const user = await prisma.user.findUnique({
        where: { id },
      });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.status(200).json(user);
    }

    // Get all users
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// Update a user by ID
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const formData = req.body;

  try {
    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Update user details
    const updatedUser = await prisma.user.update({
      where: { id },
      data: formData,
    });

    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
};

// Delete a user by ID
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // Delete user
    await prisma.user.delete({
      where: { id },
    });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
};
