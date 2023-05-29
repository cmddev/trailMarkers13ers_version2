import Boom from "@hapi/boom";
import { IdSpec, publicCollectionArraySpec, publicCollectionSpec, publicCollectionSpecPlus } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { validationError } from "./logger.js";

export const publicCollectionApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const publicCollections = await db.publicCollectionStore.getAllPublicCollections();
        return publicCollections;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: publicCollectionArraySpec, failAction: validationError },
    description: "Get all public collections",
    notes: "Returns all public collections",
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const publicCollection = await db.publicCollectionStore.getpublicCollectionById(request.params.id);
        if (!publicCollection) {
          return Boom.notFound("No public collection with this id");
        }
        return publicCollection;
      } catch (err) {
        return Boom.serverUnavailable("No public collection with this id");
      }
    },
    tags: ["api"],
    description: "Find a public collection",
    notes: "Returns a public collection",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: publicCollectionSpecPlus, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const publicCollection = request.payload;
        const newPublicCollection = await db.publicCollectionStore.addPublicCollection(publicCollection);
        if (newPublicCollection) {
          return h.response(newPublicCollection).code(201);
        }
        return Boom.badImplementation("error creating public collection");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a public collection",
    notes: "Returns the newly created public collection",
    validate: { payload: publicCollectionSpec, failAction: validationError },
    response: { schema: publicCollectionSpecPlus, failAction: validationError },
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const publicCollection = await db.publicCollectionStore.getpublicCollectionById(request.params.id);
        if (!publicCollection) {
          return Boom.notFound("No public collection with this id");
        }
        await db.publicCollectionStore.deletePublicCollectionById(publicCollection._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No public collection with this id");
      }
    },
    tags: ["api"],
    description: "Delete a public collection",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.publicCollectionStore.deleteAllPublicCollections();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all Public CollectionApi",
  },
};
