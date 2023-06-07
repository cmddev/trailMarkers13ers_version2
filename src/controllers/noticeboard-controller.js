/**
 * Dashboard Controller within the application
 * @Author: Caroline Daly
 */

import { publicCollectionSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";


export const noticeboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const publicCollection = await db.collectionStore.getAllCollections();
      const viewData = {
        title: "TrailMark Noticeboard",
        user: loggedInUser,
        publicCollections: publicCollections,
      };
      return h.view("noticeboard-view", viewData);
    },
  },  
};
