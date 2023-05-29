import { v4 } from "uuid";
import { publicTrailMemStore } from "./publicTrail-mem-store.js";

let publicCollections = [];

export const publicCollectionMemStore = {
  async getAllPublicCollections() {
    return publicCollections;
  },

  async addPublicCollection(publicCollection) {
    publicCollection._id = v4();
    publicCollections.push(publicCollection);
    return publicCollection;
  },

  async getPublicCollectionById(id) {
    const list = publicCollections.find((publicCollection) => publicCollection._id === id);
    if (list) {
      list.publicTrails = await publicTrailMemStore.getPublicTrailsByPublicCollectionId(list._id);
      return list;
    }
    return null;
  },

  async getUserPublicCollections(userid) {
    return publicCollections.filter((publicCollection) => publicCollection.userid === userid);
  },

  async deletePublicCollectionById(id) {
    const index = publicCollections.findIndex((publicCollection) => publicCollection._id === id);
    if (index !== -1) publicCollections.splice(index, 1);
  },

  async deleteAllPublicCollections() {
    publicCollections = [];
  },
};
