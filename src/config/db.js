const { PrismaClient } = require("../generated/prisma");

const prisma = global.prisma || new PrismaClient();

// Avoid creating multiple instances in dev (nodemon)
if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "dev") {
  global.prisma = prisma;
}

module.exports = prisma;
