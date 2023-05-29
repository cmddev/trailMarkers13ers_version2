/**
 * Dashboard Controller within the application
 * @Author: Caroline Daly
 */

import { CollectionSpec, publicCollectionSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
// import { publicCollectionSpec } from "../models/joi-schemas.js";


export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const collections = await db.collectionStore.getUserCollections(loggedInUser._id);
      const publicCollections = await db.publicCollectionStore.getUserPublicCollections(loggedInUser._id);
      const viewData = {
        title: "TrailMark Dashboard",
        user: loggedInUser,
        collections: collections,
        publicCollections: publicCollections,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addCollection: {
    validate: {
      payload: CollectionSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("dashboard-view", { title: "Add Collection error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newCollection = {
        userid: loggedInUser._id,
        title: request.payload.title,
      };
      await db.collectionStore.addCollection(newCollection);
      return h.redirect("/dashboard");
    },
  },

  addPublicCollection: {
    validate: {
      payload: publicCollectionSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("dashboard-view", { title: "Add Public Collection error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newPublicCollection = {
        userid: loggedInUser._id,
        title: request.payload.title,
      };
      await db.publicCollectionStore.addPublicCollection(newPublicCollection);
      return h.redirect("/dashboard");
    },
  },

  deleteCollection: {
    handler: async function (request, h) {
      const collection = await db.collectionStore.getCollectionById(request.params.id);
      let collectionTrails =[];
      collectionTrails = await db.trailStore.getTrailsByCollectionId(collection._id);
      for (let i = 0; i < collectionTrails.length; i += 1) {
        await db.trailStore.deleteTrail(collectionTrails[i]);
      }
      await db.collectionStore.deleteCollectionById(collection._id);
      return h.redirect("/dashboard");
    },
  },

  deletePublicCollection: {
    handler: async function (request, h) {
      const publicCollection = await db.publicCollectionStore.getPublicCollectionById(request.params.id);
      let publicCollectionTrails =[];
      publicCollectionTrails = await db.publicTrailStore.getPublicTrailsByPublicCollectionId(publicCollection._id);
      for (let i = 0; i < publicCollectionTrails.length; i += 1) {
        await db.publicTrailStore.deletePublicTrail(publicCollectionTrails[i]);
      }
      await db.publicCollectionStore.deletePublicCollectionById(publicCollection._id);
      return h.redirect("/dashboard");
    },
  },
};
