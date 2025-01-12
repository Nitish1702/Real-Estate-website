import express from "express";
import path from "path";

const app = express();

// Static folder to serve images
const IMAGE_DIR =
  "/Users/nitishkumar/Desktop/react/rentalspace/server/uploadFiles";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getImage = async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch image metadata from the database using Prisma
    const imageRecord = await prisma.picture.findUnique({
      where: { id: id }, // Adjust according to your schema
    });

    if (!imageRecord) {
      return res
        .status(404)
        .json({ error: "Image record not found in the database." });
    }

    const filePath = path.join(IMAGE_DIR, imageRecord.path.split("/").pop()); // Assumes `filename` is stored in the DB

    // Serve the file from disk
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error(`Error sending file: ${err}`);
        res.status(404).json({ error: "Image file not found on disk." });
      }
    });
  } catch (error) {
    console.error(`Error retrieving image: ${error}`);
    res.status(500).json({ error: "Server error retrieving image." });
  }
};
