import mongoose from "mongoose";

const drugSchema = mongoose.Schema({
  drug_name: {
    type: String,
    required: true,
    unique: true,
  },
  labo_name: {
    type: String,
  },
  substance: {
    type: String,
  },
  monthly_search_volume: [
    {
      month: {
        type: String,
        required: true,
      },
      year: {
        type: Number,
        required: true,
      },
      search_volume: {
        type: Number,
        required: true,
      },
      month_num: {
        type: Number,
        required: true,
      },
      mmyy: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
  },
  subcategory: {
    type: String,
  },
  trend: {
    type: String,
    required: true,
  },
});

const Drug = mongoose.model("Drug", drugSchema);
export default Drug;
