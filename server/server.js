const express = require("express")
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

// Setup middleware
app.use(express.json());
app.use(express.urlencoded({ limit: "50mb", extended: false }));
app.use(cors());

// App routes
const landingRoutes = require("./routes/landingRoutes");
const adminRoutes = require("./routes/adminRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");


app.use("/", landingRoutes); 
app.use("/admin", adminRoutes);
app.use("/admin/dashboard", dashboardRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`express server running on port ${PORT}. ${process.env.PG_USER}`);
});


