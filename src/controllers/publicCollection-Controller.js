/**
 * Public Collection Controller within the application
 * @Author: Caroline Daly
 */

import { PublicTrailSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
// import { PublicImageStore } from "../models/image-store.js";

export const publicCollectionController = {
  index: {
    handler: async function (request, h) {
      const publicCollection = await db.publicCollectionStore.getPublicCollectionById(request.params.id);
      const viewData = {
        title: "Public Collection",
        publicCollection: publicCollection,
      };
      return h.view("publicCollection-view", viewData);
    },
  },

  addPublicTrail: {
    validate: {
      payload: publicTrailSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("publicCollection-view", { title: "Add Public Trail error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const publicCollection = await db.publicCollectionStore.getPublicCollectionById(request.params.id);
      const newPublicTrail = {
        publicRange: String(request.payload.range),
        publicMountain: request.payload.mountain,
        publicDuration: Number(request.payload.duration),
        publicElevation: Number(request.payload.elevation),
        publicCategory: request.payload.category,
        publicEffort: request.payload.effort,
        publicTrailRating: Number(request.payload.trailRating),
        publicReviewTrail: String(request.payload.reviewTrail),
      };
      await db.publicTrailStore.addPublicTrail(publicCollection._id, newPublicTrail);
      return h.redirect(`/publicCollection/${publicCollection._id}`);
    },
  },

  deletePublicTrail: {
    handler: async function (request, h) {
      const publicCollection = await db.publicCollectionStore.getPublicCollectionById(request.params.id);
      await db.publicTrailStore.deletePublicTrail(request.params.trailid);
      return h.redirect(`/publicCollection/${publicCollection._id}`);
    },
  },

  uploadPublicImage: {
    handler: async function(request, h) {
      try {
        const publicCollection = await db.publicCollectionStore.getPublicCollectionById(request.params.id);
        const publicfile = request.payload.publicImagefile;
        if (Object.keys(publicfile).length > 0) {
          const url = await publicImageStore.uploadPublicImage(request.payload.publicImagefile);
          publicCollection.img = url;
          db.publicCollectionStore.updatePublicCollection(publicCollection);
        }
        return h.redirect(`/publicCollection/${publicCollection._id}`);
      } catch (err) {
        console.log(err);
        return h.redirect(`/publicCollection/${publicCollection._id}`);
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true
    }
  },

  deletePublicImage: {
    handler: async function( request, h) {
      const publicCollection = await db.publicCollectionStore.getPublicCollectionById(request.params.id);
      await db.publicImageStore.deletePublicImage(publicCollection.imgid);
      publicCollection.img = undefined;
      publicCollection.imgid = undefined;
      db.publicCollectionStore.updatePublicCollection(publicCollection);
      return h.redirect(`/publicCollection/${publicCollection._id}`);
    }
  }
};
