export const validateSchoolData = (req, res, next) => {
  const { name, address, latitude, longitude } = req.body;

  if (!req.body) {
    return res.status(400).json({ error: "Request body is missing" });
  }

  if (!name || !address || latitude === undefined || longitude === undefined) {
    return res.status(400).json({
      error: "Missing required fields",
    });
  }

  if (
    typeof name !== "string" ||
    typeof address !== "string" ||
    typeof latitude !== "number" ||
    typeof longitude !== "number"
  ) {
    return res.status(400).json({
      error: "Invalid data types",
    });
  }

  next();
};
