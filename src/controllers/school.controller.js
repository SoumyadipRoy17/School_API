const prisma = require("../config/db");
const { haversine } = require("../utils/distance");
const {
  addSchoolSchema,
  listSchoolsSchema,
} = require("../validations/schoolValidation");
const { success, error } = require("../utils/response");

async function addSchool(req, res) {
  try {
    const { error: validationError, value } = addSchoolSchema.validate(
      req.body
    );
    if (validationError)
      return error(res, validationError.details[0].message, 400);

    const school = await prisma.school.create({ data: value });
    return success(res, { school }, "School added", 201);
  } catch (err) {
    console.error("addSchool error:", err);
    return error(res);
  }
}

async function listSchools(req, res) {
  try {
    // Validate query params (Joi will coerce strings to numbers if convert is true; we'll parse manually)
    const { error: validationError, value } = listSchoolsSchema.validate(
      req.query,
      { convert: true }
    );
    if (validationError)
      return error(res, validationError.details[0].message, 400);

    const userLat = parseFloat(value.latitude);
    const userLon = parseFloat(value.longitude);
    const limit = value.limit ? parseInt(value.limit) : null;
    const radiusKm =
      value.radiusKm !== undefined ? parseFloat(value.radiusKm) : null;

    const schools = await prisma.school.findMany();

    const schoolsWithDist = schools.map((s) => {
      const dist = haversine(userLat, userLon, s.latitude, s.longitude);
      return {
        id: s.id,
        name: s.name,
        address: s.address,
        latitude: s.latitude,
        longitude: s.longitude,
        distanceKm: parseFloat(dist.toFixed(4)),
      };
    });

    let filtered = schoolsWithDist;
    if (radiusKm !== null && !Number.isNaN(radiusKm)) {
      filtered = filtered.filter((s) => s.distanceKm <= radiusKm);
    }

    filtered.sort((a, b) => a.distanceKm - b.distanceKm);

    const result = limit ? filtered.slice(0, limit) : filtered;

    return success(res, {
      count: result.length,
      userLocation: { latitude: userLat, longitude: userLon },
      schools: result,
    });
  } catch (err) {
    console.error("listSchools error:", err);
    return error(res);
  }
}

module.exports = { addSchool, listSchools };
