import { v4 } from "uuid";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const db = new Low(new JSONFile("./src/models/json/publicTrails.json"));
db.data = { publicTrails: [] };

export const publicTrailJsonStore = {
  async getAllPublicTrails() {
    await db.read();
    return db.data.publicTrails;
  },

  async addPublicTrail(publicCollectionId, publicTrail) {
    await db.read();
    publicTrail._id = v4();
    publicTrail.publicCollectionId = publicCollectionId;
    db.data.publicTrails.push(publicTrails);
    await db.write();
    return publicTrail;
  },

  async getPublicTrailsByPublicCollectionId(id) {
    await db.read();
    return db.data.publicTrails.filter((publicTrail) => publicTrails.publicCollectionId === id);
  },

  async getPublicTrailById(id) {
    await db.read();
    return db.data.publicTrails.find((publicTrail) => publicTrail._id === id);
  },

  async deletePublicTrail(id) {
    await db.read();
    const index = db.data.publicTrails.findIndex((publicTrail) => publicTrail._id === id);
    db.data.publicTrails.splice(index, 1);
    await db.write();
  },

  async deleteAllPublicTrails() {
    db.data.publicTrails = [];
    await db.write();
  },

  async updatePublicTrail(publicTrail, updatedPublicTrail) {
    publicTrail.publicRange = updatedPublicTrail.publicRange;
    publicTrail.publicMountain = updatedPublicTrail.publicMountain;
    publicTrail.publicDuration = updatedPublicTrail.publicDuration;
    publicTrail.publicElevation = updatedPublicTrail.publicElevation;
    publicTrail.publicCategory = updatedPublicTrail.publicCategory;
    publicTrail.publicEffort = updatedPublicTrail.publicEffort;
    publicTrail.publicReviewTrail = updatedPublicTrail.publicReviewTrail;
    await db.write();
  },
};
