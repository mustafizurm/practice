const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    name: {
        type: String
    },
    email:{
        type: String,
    },
    password: {
        type: String
    },
    avator: {
        public_id:{
            type: String
        },
        profile_id:{
            type: String
        }
    },
    role: {
        type: String
    }
});


 const Users = mongoose.model("User", userSchema)

 module.exports = Users;