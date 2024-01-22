const mongoose = require(`mongoose`);
require("dotenv").config();

mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.DB_CONNECT || "DB_CONNECT", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "bePos",
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connected !!!");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = mongoose.connection;
