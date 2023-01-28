var mongoose = require("mongoose");
// Access URI
const MONGODB_CREDENTIALS = process.env.MONGODB_CREDENTIALS;
const MONGODB_URI = `mongodb+srv://${MONGODB_CREDENTIALS}@cluster0.tbmc2ai.mongodb.net/pestergen?retryWrites=true&w=majority`;

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
