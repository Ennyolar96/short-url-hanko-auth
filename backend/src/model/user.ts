const mongoo = require("mongoose");
const Schem = mongoo.Schema;

const UserSchema = new Schem(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const UserModel = mongoo.model("user", UserSchema);

module.exports = UserModel;
