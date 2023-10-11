const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// interface IShort {
//   longURL: string;
//   shortURL: string;
//   alias: string;
//   data: String;
// }

const ShortURL = new Schema(
  {
    userID: { type: String, require: true },
    longURL: { type: String, required: true },
    shortURL: { type: String, required: true },
    count: { type: String, default: "0" },
    alias: { type: String, required: true },
  },
  { timestamps: true }
);

const URLModel = mongoose.model("Short_url", ShortURL);

module.exports = URLModel;

// userID: {
//       type: mongoose.Schema.Types.ObjectId,
//       require: true,
//       ref: "user",
//     },
