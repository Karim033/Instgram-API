const mongoose = require('mongoose');

const connectDB = async () => {
    return await mongoose.connect(process.env.CONNECTION_STRING).then((result) => {
        console.log(`Success Connected..........${process.env.CONNECTION_STRING}`);
    }).catch((error) => {
        console.log("Fail To Connect.......", error);
    })
}

module.exports = connectDB