import { pool } from "../connectDB/connectDB.js";

export const addSchool = async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;

    const [existingSchools] = await pool.execute(
      "SELECT * FROM school WHERE name = ? AND address = ?",
      [name, address]
    );

    if (existingSchools.length > 0) {
      return res.status(409).json({
        error: "School already exists",
        message: "A school with this name and address already exists",
        existingSchool: existingSchools[0],
      });
    }

    const [result] = await pool.execute(
      "INSERT INTO school (name, address, latitude, longitude) VALUES (?, ?, ?, ?)",
      [name, address, latitude, longitude]
    );

    res.status(201).json({
      message: "School added successfully",
      data: {
        id: result.insertId,
        name,
        address,
        latitude,
        longitude,
      },
    });
  } catch (err) {
    console.error("Error in addSchool:", err);
    res.status(500).json({
      error: "Failed to add school",
      details: err.message,
    });
  }
};

export const listSchools = async (req, res) => {
  try {
    const [rows] = await pool.execute("SELECT * FROM school");
    const { lat, lon } = req.query;

    if (lat && lon) {
      const latitude = parseFloat(lat);
      const longitude = parseFloat(lon);

      if (isNaN(latitude) || isNaN(longitude)) {
        return res.status(400).json({
          error: "Invalid coordinates",
          message: "Latitude and longitude must be valid numbers",
        });
      }

      rows.sort((row1, row2) => {
        const dist1 = Math.sqrt(
          Math.pow(row1.latitude - latitude, 2) +
            Math.pow(row1.longitude - longitude, 2)
        );
        const dist2 = Math.sqrt(
          Math.pow(row2.latitude - latitude, 2) +
            Math.pow(row2.longitude - longitude, 2)
        );

        return dist1 - dist2;
      });
    }

    if (!rows || rows.length === 0) {
      return res.status(200).json({
        message: "No schools found",
        data: [],
      });
    }

    res.status(200).json({
      message: "Schools fetched successfully",
      data: rows,
    });
  } catch (err) {
    console.error("Error in listSchools:", err);
    res.status(500).json({
      error: "Failed to fetch schools",
      details: err.message,
    });
  }
};
