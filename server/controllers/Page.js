const mongoose = require("mongoose");
//import { nanoid } from "nanoid";
const Schema = mongoose.Schema;

// Page : mongoose Schema
// --------------------
// id: String -> user-choice OR nanoid of 9 characters
// title: String
// date: Date
// next: [ -> Array of links
//   {
//     text: String -> Text to the next page
//     id: String -> ID of next page
//   }
// ]
// panel: {
//   uri: String -> URI to panel image
//   kind: String -> MIME type of image
// }

const PageSchema = new Schema({
  // id : String
  id: {
    type: String,
    required: [true, "ID cannot be omitted"],
    validate: {
      message: (props) => "The ID is already in use",
      validator: async function (id) {
        const page = this.constructor.findOne({ id: id });
        return !(page.id === this.id);
      },
    },
  },
  // title : String
  title: String,
  // date : Date
  date: { type: Date, default: Date.now },
  // next : [{text: String, id: String}]
  next: [{ text: String, id: String }],
  // panel : {uri: String, kind: String}
  panel: { uri: { type: String }, kind: { type: String } },
});

const Page = mongoose.model("Page", PageSchema);

module.exports = {
  PageSchema: PageSchema,
  Page: Page,
};
