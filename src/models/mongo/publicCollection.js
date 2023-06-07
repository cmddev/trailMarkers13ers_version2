import Mongoose from "mongoose";

const { Schema } = Mongoose;

const publicCollectionSchema = new Schema({
  title: String,
  // img: String,
  // imgid: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const PublicCollection = Mongoose.model("PublicCollection", publicCollectionSchema);
