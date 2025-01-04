const supabase = require("../db/supabase");

const supabaseTest = async () => {
    const {data, error} = await supabase.from("JOCKEYS").select("*");

    if (error) {
        console.log("SUPABASE connection error")
    }

    console.log("supabase connected", data);
}

const getAllAdmins = async () => {
    const { data, error } = await supabase.from("JOCKEYS").select("*");

    if (error) {
        console.log("supabase ADMINS error:", error);
        return [];  // Return an empty array if there's an error
    }

    console.log(data);
    return data || [];  // Ensure that `data` is always an array, or return an empty array
};

module.exports = { supabaseTest, getAllAdmins };
