import Mongoose from "mongoose";

const { Schema } = Mongoose;

const trailSchema = new Schema({
  range: String,
  mountain: String,
  latitude: Number,
  longitude: Number,
  duration: Number,
  elevation: Number,  
  category: String,
  effort: String,
  images: [
    {
      img: String,
      imgid: String,
    },
  ],
  collectionid: {
    type: Schema.Types.ObjectId,
    ref: "Collection",
  },
});

export const Trail = Mongoose.model("Trail", trailSchema);
