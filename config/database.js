const mongoose = require("mongoose");

const connectDatabase = () =>{
    mongoose.connect(process.env.DB)
    .then((data)=>{
        console.log(`Database is connected with ${data.connection.host}`);
    })
    .catch((error)=>{
        console.log("Database is not connect");
    })
}

module.exports = connectDatabase;