const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config()

const MONGOURI = process.env.MONGOURI || "mongodb://127.0.0.1:27017/mernChatApp";

const connectToMongodb = () => {
    mongoose
        .connect(MONGOURI)
        .then(() => {
            console.log(`Connected to MongoDB at ${MONGOURI}`);
        })
        .catch((error) => {
            console.error(`Error connecting to MongoDB at ${MONGOURI}:`, error);
        });
};


module.exports = connectToMongodb;
