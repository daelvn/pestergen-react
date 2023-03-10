const controller = require("./index");
//import { nanoid } from "nanoid";
const Schema = controller.mongoose.Schema;

// Page : mongoose Schema
// --------------------
// id: String -> user-choice OR nanoid of 9 characters
// title: String
// date: Date
// password: String -> allow for editing later
// log: String -> JSON of the log
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
  // password : String
  password: String,
  salt: String,
  // log : String
  log: String,
  // links : String
  links: String,
  // panel : {uri: String, kind: String}
  panel: { uri: { type: String }, kind: { type: String } },
});

const Page = controller.mongoose.model("Page", PageSchema);

module.exports = {
  PageSchema: PageSchema,
  Page: Page,
};
