const supabase = require("./supabase");
const bcrypt = require("bcrypt");

const createJockey = async ({email, password}) => {
    try {
        // console.log(email, password)
        const hashedPassword = await bcrypt.hash(password, 10);
        const {data, error} = await supabase
            .from("JOCKEYS")
            .insert([{email: email, password: hashedPassword, username: "jockey", role: "jockey"}]);

        if (error) {
            throw new Error(`Error creating jockey ${error}`);
        }
        console.log(data);
        return data;
    } catch (error) {
        throw new Error(`Error creating jockey ${error.message}`);
    }
};

module.exports = {createJockey};