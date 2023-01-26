const mongoose = require("mongoose");
const { Page } = require("./Page");

// Access URI
const MONGODB_CREDENTIALS = process.env.MONGODB_CREDENTIALS;
const MONGODB_URI = `mongodb+srv://${MONGODB_CREDENTIALS}@cluster0.tbmc2ai.mongodb.net/pestergen?retryWrites=true&w=majority`;

// Deprecation warning for strictQuery
mongoose.set("strictQuery", false);

async function initialSetup() {
  // Connect to the database
  await mongoose.connect(MONGODB_URI, {}, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to MongoDB");
    }
  });
  // Create first Page
  const homepage = new Page({
    id: "home",
    title: "Welcome!",
    panel: {
      uri: "tezi.gif",
      kind: "image/gif",
    },
  });
  await homepage.save();
  console.log("Saved!");
}

module.exports = {
  initialSetup: initialSetup,
};
