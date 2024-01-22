const mongoose = require("mongoose");

const objSchema = new mongoose.Schema({
  name: { type: String, default: null, required: true },
  description: { type: String, default: null, required: true },
  price: { type: Number, default: null, required: true },
  category: { type: String, default: null },
  status: { type: String, default: "ACTIVE" },

  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

objSchema.set("toJSON", { getters: true });
objSchema.set("toObject", { getters: true });
objSchema.index({ name: `text`, category: `text` });
objSchema.plugin(require("mongoose-aggregate-paginate-v2"));

module.exports = mongoose.model("products", objSchema);
