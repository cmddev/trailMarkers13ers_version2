import Mongoose from "mongoose";

const { Schema } = Mongoose;

const publicTrailSchema = new Schema({
  publicRange: String,
  publicMountain: String,
  publicDuration: Number,
  publicElevation: Number,  
  publicCategory: String,
  publicEffort: String,
  publicTrailRating: Number,
  publicReviewTrail: String,
  // publicImages: [
  //   {
  //     publicImg: String,
  //     publicImgid: String,
  //   },
  // ],
  publicCollectionid: {
    type: Schema.Types.ObjectId,
    ref: "PublicCollection",
  },
});

export const PublicTrail = Mongoose.model("PublicTrail", publicTrailSchema);
