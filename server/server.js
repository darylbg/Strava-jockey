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
const homeRoutes = require("./routes/home");
const adminRoutes =require("./routes/admin");

app.use("/", homeRoutes);
app.use("/admin", adminRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`express server running on port ${PORT}. ${process.env.PG_USER}`);
});


