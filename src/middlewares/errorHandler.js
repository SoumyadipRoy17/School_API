function notFound(req, res) {
  res.status(404).json({ error: "Not Found" });
}

function generalError(err, req, res, next) {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal server error" });
}

module.exports = { notFound, generalError };
