import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const addPost = async (req, res) => {
  const files = req.files; // Uploaded files

  const {
    name,
    address,
    city,
    state,
    country,
    postalCode,
    type,
    price,
    description,
    userID: userId,
    location, // Location should be passed as a valid GeoJSON object in string format
  } = req.body;

  try {
    // Validate input
    if (
      !name ||
      !address ||
      !city ||
      !state ||
      !country ||
      !postalCode ||
      !type ||
      !price ||
      !description ||
      !userId ||
      !location
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Ensure price is a valid number
    if (isNaN(price) || price <= 0) {
      return res
        .status(400)
        .json({ error: "Price must be a valid positive number" });
    }

    // Parse location string into JSON (assuming it's a valid GeoJSON format)
    const jsonLocation = JSON.parse(location);

    // Create the property
    const newProperty = await prisma.property.create({
      data: {
        name,
        address,
        city,
        state,
        country,
        postalCode,
        type,
        price: parseFloat(price),
        description,
        userId,
        location: jsonLocation, // Store the location as JSON
      },
    });

    // Save the uploaded files as Picture entries
    const pictures = files.map((file) => ({
      originalName: file.originalname,
      mimeType: file.mimetype,
      path: file.path,
      size: file.size,
      propertyId: newProperty.id,
    }));

    for (const picture of pictures) {
      await prisma.picture.create({ data: picture });
    }
    
    res.status(201).json({
      message: "Property added successfully",
      property: newProperty,
      pictures,
    });
    
  } catch (error) {
    console.error("Detailed error:", error);
    res
      .status(500)
      .json({ error: "Failed to create property", details: error.message });
  }
};

// Get all properties or a specific property by ID
export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    if (id) {
      const property = await prisma.property.findUnique({
        where: { id },
        include: { pictures: true },
      });
      if (!property) {
        return res.status(404).json({ error: "Property not found" });
      }

      return res.status(200).json(property);
    }

    // Get all properties
    const properties = await prisma.property.findMany({
      include: { pictures: true },
    });
    res.status(200).json(properties);
  } catch (error) {
    console.error("Error fetching property:", error);
    res.status(500).json({ error: "Failed to fetch property" });
  }
};

// Update a property by ID
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const formData = req.body;
  const files = req.files;

  try {
    if (!id) {
      return res.status(400).json({ error: "Property ID is required" });
    }

    // Update property details
    const updatedProperty = await prisma.property.update({
      where: { id },
      data: formData,
    });

    if (files) {
      const newPictures = files.map((file) => ({
        originalName: file.originalname,
        mimeType: file.mimetype,
        path: file.path,
        size: file.size,
        propertyId: id,
      }));

      await prisma.picture.createMany({ data: newPictures });
    }

    res.status(200).json({
      message: "Property updated successfully",
      property: updatedProperty,
    });
  } catch (error) {
    console.error("Error updating property:", error);
    res.status(500).json({ error: "Failed to update property" });
  }
};

// Delete a property by ID
export const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    // Validate input
    if (!id) {
      return res.status(400).json({ error: "Property ID is required" });
    }
    await prisma.picture.deleteMany({ where: { propertyId: id } });
    await prisma.property.delete({
      where: { id },
    });

    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    console.error("Error deleting property:", error);
    res.status(500).json({ error: "Failed to delete property" });
  }
};
