import { v4 } from "uuid";

let publicTrails = [];

export const publicTrailMemStore = {
  async getAllPublicTrailss() {
    return publicTrails;
  },

  async addPublicTrail(publicCollectionId, publicTrail) {
    publicTrail._id = v4();
    publicTrail.publicCollectionId = publicCollectionId;
    publicTrails.push(trail);
    return publicTrail;
  },

  async getPublicTrailsByPublicCollectionId(id) {
    return publicTrails.filter((trail) => publicTrail.publicCollectionId === id);
  },

  async getTrailById(id) {
    let publicTrail = publicTrails.find((publicTrail) => publicTrail._id === id);
    if (publicTrail == undefined) {
      publicTrail = null;
    }
    return publicTrail;
  },

  async getPublicCollectionPublicTrails(publicCollectionId) {
    return publicTrails.filter((trail) => publicTrail.publicCollectionId === publicCollectionId);
  },

  async deletePublicTrail(id) {
    const index = publicTrails.findIndex((publicTrail) => publicTrail._id === id);
    if (index !== -1) publicTrails.splice(index, 1);
  },

  async deleteAllPublicTrails() {
    publicTrails = [];
  },

  async updatePublicTrail(publicTrail, updatedPublicTrail) {
    publicTrail.publicRange = updatedPublicTrail.publicRange;
    publicTrail.publicMountain = updatedPublicTrail.publicMountain;
    publicTrail.publicDuration = updatedPublicTrail.publicDuration;
    publicTrail.publicElevation = updatedPublicTrail.publicElevation;
    publicTrail.publicCategory = updatedPublicTrail.publicCategory;
    publicTrail.publicEffort = updatedPublicTrail.publicEffort;
    publicTrail.publicReviewTrail = updatedPublicTrail.publicReviewTrail;
  },
};
