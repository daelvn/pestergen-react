var mongoose = require("mongoose");
// Access URI
const MONGODB_CREDENTIALS = process.env.MONGODB_CREDENTIALS;
const MONGODB_CLUSTER = process.env.MONGODB_CLUSTER;
const MONGODB_URI = `mongodb+srv://${MONGODB_CREDENTIALS}@${MONGODB_CLUSTER}/pestergen?retryWrites=true&w=majority`;

// Deprecation warning for strictQuery
mongoose.set("strictQuery", false);

async function connect() {
  await mongoose.connect(MONGODB_URI, {}, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to MongoDB");
    }
  });
}

module.exports = {
  mongoose,
  connect,
};
