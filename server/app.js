import express from "express";
import cors from "cors";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import postRoute from "./routes/post.route.js";
import { getImage } from "./utils/imageApi.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with the frontend URL
    credentials: true, // If you need to send cookies
  })
);
app.use(
  "/uploads",
  express.static(
    "/Users/nitishkumar/Desktop/react/rentalspace/server/uploadFiles"
  )
);
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);
app.get("/images/:id", getImage);
app.get("/user", userRoute);
app.listen(8800, () => {
  console.log("server is listening");
});
