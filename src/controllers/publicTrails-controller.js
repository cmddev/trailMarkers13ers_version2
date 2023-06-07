/**
 * Trail Controller within the application
 * @Author: Caroline Daly
 */
// 
import { PublicTrailSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const publicTrailController = {
  index: {
    handler: async function (request, h) {
      const publicCollection = await db.publicCollectionStore.getPublicCollectionById(request.params.id);
      const publicTrail = await db.publicTrailStore.getPublicTrailById(request.params.trailid);
      const viewData = {
        title: "Edit Public Trail",
        publicCollection: publicCollection,
        publicTrail: publicTrail,
      };
      return h.view("publicTrail-view", viewData);
    },
  },

  update: {
    validate: {
      payload: PublicTrailSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("publicTrail-view", { title: "Edit Public trail error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const publicTrailId = request.params.publicTrailId;
      const publicCollectionId = request.params.id;
      const publicCollection = await db.publicCollectionStore.getPublicCollectionById(publicCollectionId);
      const publicTrail = await db.publicTrailStore.getPublicTrailById(publicTrailId);
      console.log(request.payload);
      // const trail = await db.trailStore.getTrailById(request.params.trailid);
      const newPublicTrail = {
        publicRange: String(request.payload.range),
        publicMountain: request.payload.mountain,
        publicDuration: Number(request.payload.duration),
        publicElevation: Number(reqeust.payload.elevation),
        publicCategory: request.payload.category,
        publicEffort: request.payload.effort,
        publicTrailRating: Number(request.payload.trailRating),
        publicReviewTrail: String(request.payload.reviewTrail)
      };
      await db.publicTrailStore.updatePublicTrail(publicTrail, newPublicTrail);
      // await db.trailStore.updateTrail(request.params.trailid, newTrail);
      return h.redirect(`/publicCollection/${request.params.id}`);
    },
  }
};
