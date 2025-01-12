import prismaClient from "../lib/prisma";

export const getNearby = async (req, res) => {
  const { lat, lng } = req.body;
  const radiusInMeters = 5000;

  try {
    // Query for nearby properties
    const nearBys = await prismaClient.property.find({
      where: {
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [lng, lat],
            },
            $maxDistance: radiusInMeters,
          },
        },
      },
    });

    res.status(200).json(nearBys);
  } catch (e) {
    console.error("Error fetching nearby properties:", e);
    res.status(500).json({ error: "Internal server error" });
  }
};
