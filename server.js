// core module require
const dotEnv = require("dotenv");
dotEnv.config({path: "config/config.env"})


// custome module require
const app = require("./app");
const connectDatabase = require("./config/database");

// port
const PORT = process.env.PORT || 3000;

// databaseConnection
connectDatabase()

// listen
app.listen(PORT, () =>{
    console.log(`Server is running at http://localhost:${PORT}`);
})