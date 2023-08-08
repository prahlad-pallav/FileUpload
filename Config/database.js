
const mongoose = require("mongoose");

require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(console.log("DataBase Connection Successful"))
    .catch((error) => {
        console.log("DataBase Connection Failed");
        console.error(error);
        process.exit(1);
    })
}