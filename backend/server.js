const app = require("./app");
const connectDatabase = require("./config/databaseConnetion");
require("dotenv").config({"path":"backend/config/config.env"})

app.listen(8080,()=>{
    console.log(`server is running on http://localhost:8080`);
})

connectDatabase()
