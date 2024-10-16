import dotenv from "dotenv";
import express from "express";
import { APP_URL } from "./contants.js";

dotenv.config({
  path: "./.env",
});

const app = express();

app.get("/api/get-weather/:city", async (req, res) => {
  // ?lat=18.5204&lon=73.8567&appid=${process.env.API_KEY}
  // for now hard coding the lat and long
  const { city } = req.params;

  if (!city) {
    return res.status(400).json({
      status: 400,
      message: "Please provide a valid city",
    });
  }

  try {
    const response = await fetch(
      `${APP_URL}?q=${city}&appid=${process.env.API_KEY}`
    );

    if (!response.ok) {
      //   throw new Error("Network response was not ok");
      return res.status(400).json({
        status: 400,
        message: "Not a valid city",
      });
    }

    const data = await response.json();
    // console.log(data);

    return res.status(200).json({
      status: 200,
      data: data,
      message: "Weather fetched successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: "Something went wrong",
    });
  }
});

app.listen(process.env.PORT || 8000, () => {
  console.log(`Server listning on port: ${process.env.PORT || 8000}`);
});
