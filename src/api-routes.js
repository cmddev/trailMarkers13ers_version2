import { userApi } from "./api/user-api.js";
import { collectionApi } from "./api/collection-api.js";
import { trailApi } from "./api/trail-api.js";
import { publicCollectionApi } from "./api/publicCollection-api.js";
import { publicTrailApi } from "./api/publicTrail-api.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
  // { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },

  { method: "POST", path: "/api/collections", config: collectionApi.create },
  { method: "DELETE", path: "/api/collections", config: collectionApi.deleteAll },
  { method: "GET", path: "/api/collections", config: collectionApi.find },
  { method: "GET", path: "/api/collections/{id}", config: collectionApi.findOne },
  { method: "DELETE", path: "/api/collections/{id}", config: collectionApi.deleteOne },

  { method: "POST", path: "/api/publicCollections", config: publicCollectionApi.create },
  { method: "DELETE", path: "/api/publicCollections", config: publicCollectionApi.deleteAll },
  { method: "GET", path: "/api/publicCollections", config: publicCollectionApi.find },
  { method: "GET", path: "/api/publicCollections/{id}", config: publicCollectionApi.findOne },
  { method: "DELETE", path: "/api/publicCollections/{id}", config: publicCollectionApi.deleteOne },

  { method: "GET", path: "/api/trails", config: trailApi.find },
  { method: "GET", path: "/api/trails/{id}", config: trailApi.findOne },
  { method: "POST", path: "/api/collections/{id}/trails", config: trailApi.create },
  { method: "DELETE", path: "/api/trails", config: trailApi.deleteAll },
  { method: "DELETE", path: "/api/trails/{id}", config: trailApi.deleteOne },
  { method: "POST", path: "/api/trails/{id}/uploadimage", config: trailApi.uploadImage },
  { method: "DELETE", path: "/api/trails/{id}/deleteimage/{imgid}", config: trailApi.deleteImage },

  { method: "GET", path: "/api/publicTrails", config: publicTrailApi.find },
  { method: "GET", path: "/api/publicTrails/{id}", config: publicTrailApi.findOne },
  { method: "POST", path: "/api/publicCollections/{id}/publicTrails", config: publicTrailApi.create },
  { method: "DELETE", path: "/api/publicTrails", config: publicTrailApi.deleteAll },
  { method: "DELETE", path: "/api/publicTrails/{id}", config: publicTrailApi.deleteOne },
  // { method: "POST", path: "/api/publicTrails/{id}/uploadimage", config: publicTrailApi.uploadImage },
  // { method: "DELETE", path: "/api/publicTrails/{id}/deleteimage/{imgid}", config: publicTrailApi.deleteImage },

  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },
];
