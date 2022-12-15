const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
//Schema
const expenseSchema = mongoose.Schema(
  {
    title: {
      required: [true, "Title is required"],
      type: String,
    },
    description: {
      required: [true, "Description is required"],
      type: String,
    },
    type: {
      type: String,
      default: "expense",
    },
    amount: {
      required: [true, "Amount is required"],
      type: Number,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId, //Must be MongoDB ID
      ref: "User",
      required: [true, "User ID is required"],
    },
  },
  {
    timestamp: true,
    toJSON:{
      virtual: true
    },
    toObject:{
      virtual: true
    }
  }
);
//Pagination
expenseSchema.plugin(mongoosePaginate);

//Complie schema into model
const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
