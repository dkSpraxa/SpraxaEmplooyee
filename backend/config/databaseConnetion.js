const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.db_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((res) => {
      console.log(`database is connected to ${res.connection.host}`);
    })
    .catch((error) => {
      console.log("error during database connection: ", error);
    });
};

module.exports = connectDatabase;
