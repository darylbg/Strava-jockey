const express = require("express")
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cookieJwtAuth = require("./middleware/cookieJwtAuth");

const app = express();
const PORT = process.env.PORT || 3001;

// Setup middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ limit: "50mb", extended: false }));
app.use(
    cors({
      origin: "http://localhost:3000", // Allow requests from this origin
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Allow only GET and POST requests
      allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
      credentials: true
    })
  );

// App routes
const landingRoutes = require("./routes/landingRoutes");
const adminRoutes = require("./routes/adminRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");


app.use("/api", landingRoutes); 
app.use("/api/admin", adminRoutes);
app.use("/api/admin/dashboard", cookieJwtAuth, dashboardRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`express server running on port ${PORT}. ${process.env.PG_USER}`);
});


