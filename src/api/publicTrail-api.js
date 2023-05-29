import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdSpec, PublicTrailSpec, PublicTrailSpecPlus, PublicTrailArraySpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const publicTrailApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const publictrails = await db.publicTrailStore.getAllPublicTrails();
        return publictrails;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: PublicTrailArraySpec, failAction: validationError },
    description: "Get all trailApi",
    notes: "Returns all trailApi",
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const publicTrail = await db.publicTrailStore.getPublicTrailById(request.params.id);
        if (!trail) {
          return Boom.notFound("No trail with this id");
        }
        return publictrail;
      } catch (err) {
        return Boom.serverUnavailable("No trail with this id");
      }
    },
    tags: ["api"],
    description: "Find a Trail",
    notes: "Returns a trail",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: TrailSpecPlus, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const publictrail = await db.publicTrailStore.addPublicTrail(request.params.id, request.payload);
        if (publictrail) {
          return h.response(publictrail).code(201);
        }
        return Boom.badImplementation("error creating trail");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a trail",
    notes: "Returns the newly created trail",
    validate: { payload: PublicTrailSpec },
    response: { schema: PublicTrailSpecPlus, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.publicTrailStore.deleteAllPublicTrails();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all trailApi",
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const publicTrail = await db.publicTrailStore.getPublicTrailById(request.params.id);
        if (!trail) {
          return Boom.notFound("No Trail with this id");
        }
        await db.publicTrailStore.deletePublicTrail(publicTrail._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No Trail with this id");
      }
    },
    tags: ["api"],
    description: "Delete a trail",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  // uploadImage: {
  //   auth: {
  //     strategy: "jwt",
  //   },
  //   handler: async function (request, h) {
  //     try {
  //       const trail = await  db.trailStore.getTrailById(request.params.id);
  //       console.log("Returned",trail);
  //       const file = request.payload.imagefile;
  //       if (Object.keys(file).length > 0) {
  //         const response = await imageStore.uploadImage(request.payload.imagefile);
  //         trail.images.push({img : response.url,
  //           imgid: response.public_id})
  //         db.trailStore.updateTrail(trail._id, trail);
  //       }
  //       return h.response().code(200);
  //     } catch (err) {
  //       console.log(err);
  //       return h.response().code(500);
  //     }
  //   },
  //   tags: ["api"],
  //   description: "Upload an image",
  //   payload: {
  //     multipart: true,
  //     output: "data",
  //     maxBytes: 209715200,
  //     parse: true,
  //   },
  // },

  // deleteImage: {
  //   auth: {
  //     strategy: "jwt",
  //   },
  //   handler: async function (request, h) {
  //     try {
  //       const trail = await db.trailStore.getTrailById(request.params.id);
  //       await db.imageStore.deleteImage(request.params.imgid);
  //       console.log("trail",trail.images)
  //       trail.images = trail.images.filter((value) =>  value.imgid !== request.params.imgid );
  //       console.log("AH",trail.images)
  //       db.trailStore.updateTrail(trail._id, trail);
  //       return h.response().code(200);
  //     } catch (err) {
  //       console.log(err);
  //       return h.response().code(500);
  //     }
  //   },
  //   tags: ["api"],
  //   description: "Delete an image",
  // },
};
