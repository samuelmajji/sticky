require("dotenv").config();

module.exports = {
  dbURI: process.env.DB_URI || "mongodb://localhost:27017/myapp",
  secretKey: process.env.SECRET_KEY || "a_default_secret_key",
};
