import { PublicTrail } from "./publicTrail.js";
import { PublicCollection } from "./publicCollection.js";

export const publicTrailMongoStore = {
  async getAllPublicTrails() {
    const publicTrails = await PublicTrail.find().lean();
    return publicTrails;
  },

  async addPublicTrail(publicCollectionId, publicTrail) {
    publicTrail.collectionid = collectionId;
    const newPublicTrail = new PublicTrail(publicTrail);
    const publicTrailObj = await newPublicTrail.save();
    return this.getPublicTrailById(trailObj._id);
  },

  async getPublicTrailsByPublicCollectionId(id) {
    const publicTrails = await PublicTrail.find({ publicCollectionid: id }).lean();
    return publicTrails;
  },

  async getPublicTrailById(id) {
    if (id) {
      const publicTrail = await PublicTrail.findOne({ _id: id }).lean();
      return publicTrail;
    }
    return null;
  },

  async deletePublicTrail(id) {
    try {
      await PublicTrail.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllPublicTrails() {
    await Trail.deleteMany({});
  },

  async updatePublicTrail(publicTrail, updatedPublicTrail) {
    const publicTrailDoc = await PublicTrail.findOne({ _id: publicTrail._id });
    publicTrailDoc.publicRange = updatedPublicTrail.publicRange;
    publicTrailDoc.publicMountain = updatedPublicTrail.publicMountain;
    publicTrailDoc.publicDuration = updatedPublicTrail.publicDuration;
    publicTrailDoc.publicElevation = updatedPublicTrail.publicElevation;
    publicTrailDoc.publicCategory = updatedPublicTrail.publicCategory;
    publicTrailDoc.publicEffort = updatedPublicTrail.publicEffort;
    publicTrailDoc.publicTrailRating = updatedPublicTrail.publicTrailRating;
    publicTrailDoc.publicImages = updatedPublicTrail.publicImages;
    publicTrailDoc.publicReviewTrail = updatedPublicTrail.publicReviewTrail;
    await publicTrailDoc.save();
  },
};
