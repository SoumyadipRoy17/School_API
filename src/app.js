const express = require("express");
const cors = require("cors");

const schoolRoutes = require("./routes/school.routes");
const { notFound, generalError } = require("./middlewares/errorHandler");

const app = express();
app.use(cors());
app.use(express.json());

// health
app.get("/health", (req, res) => res.json({ status: "ok" }));

app.use("/", schoolRoutes);

// 404 + general error handler
app.use(notFound);
app.use(generalError);

module.exports = app;
