import { v4 } from "uuid";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { publicTrailJsonStore } from "./publicTrail-json-store.js";

const db = new Low(new JSONFile("./src/models/json/publicCollections.json"));
db.data = { publicCollections: [] };

export const publicCollectionJsonStore = {
  async getAllPublicCollections() {
    await db.read();
    return db.data.publicCollections;
  },

  async addPublicCollection(publicCollection) {
    await db.read();
    publicCollection._id = v4();
    db.data.publicCollections.push(publicCollection);
    await db.write();
    return publicCollection;
  },

  async getPublicCollectionById(id) {
    await db.read();
    let list = db.data.publicCollections.find((publicCollection) => publicCollection._id === id);
    if (list) {
      list.publicTrails = await publicTrailJsonStore.getPublicTrailsByPublicCollectionId(list._id);
    } else {
      list = null;
    }
    return list;
  },

  async getUserPublicCollections(userid) {
    await db.read();
    return db.data.publicCollections.filter((publicCollection) => publicCollection.userid === userid);
  },

  async deletePublicCollectionById(id) {
    await db.read();
    const index = db.data.publicCollections.findIndex((publicCollection) => publicCollection._id === id);
    if (index !== -1) db.data.publicCollections.splice(index, 1);
    await db.write();
  },

  async deleteAllPublicCollections() {
    db.data.publicCollections = [];
    await db.write();
  },
};
