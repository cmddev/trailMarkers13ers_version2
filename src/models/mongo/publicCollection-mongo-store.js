import { PublicCollection } from "./publicCollection.js";
import { publicTrailMongoStore } from "./publicTrail-mongo-store.js";

export const publicCollectionMongoStore = {
  async getAllPublicCollections() {
    const publicCollections = await PublicCollection.find().lean();
    return publicCollections;
  },

  async getpublicCollectionById(id) {
    if (id) {
      const publicCollection = await PublicCollection.findOne({ _id: id }).lean();
      if (publicCollection) {
        publicCollection.trails = await publicTrailMongoStore.getPublicTrailsByCollectionId(publicCollection._id);
      }
      return publicCollection;
    }
    return null;
  },

  async addPublicCollection(publicCollection) {
    const newPublicCollection = new PublicCollection(publicCollection);
    const publicCollectionObj = await newPublicCollection.save();
    return this.getPublicCollectionById(publicCollectionObj._id);
  },

  async getUserPublicCollections(id) {
    const publicCollection = await PublicCollection.find({ userid: id }).lean();
    return publicCollection;
  },

  async deletePublicCollectionById(id) {
    try {
      await PublicCollection.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllPublicCollections() {
    await PublicCollection.deleteMany({});
  },

  async updatePublicCollection(updatedPublicCollection) {
    const publicCollection = await PublicCollection.findOne({ _id: updatedPublicCollection._id });
    publicCollection.title = updatedPublicCollection.title;
    publicCollection.img = updatedPublicCollection.img;
    publicCollection.imgid = updatedPublicCollection.imgid;
    await publicCollection.save();
  },

};
