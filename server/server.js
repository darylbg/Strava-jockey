const express = require("express")
const cors = require("cors");
const supabase = require("./db/supabase");
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

const supabaseTest = async () => {
    const {data, error} = await supabase.from("JOCKEYS").select("*");

    if (error) {
        console.log("SUPABASE connection error")
    }

    console.log("supabase connected", data);
}

supabaseTest();

app.listen(PORT, () => {
    console.log(`express server running on port ${PORT}`);
});


