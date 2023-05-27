export const seedData = {
    users: {
      _model: "User",
      homer: {
        firstName: "Homer",
        lastName: "Simpson",
        email: "homer@simpson.com",
        password: "SuperSecret1!"
      },
      marge: {
        firstName: "Marge",
        lastName: "Simpson",
        email: "marge@simpson.com",
        password: "SuperSecret1!"
      },
      bart: {
        firstName: "Bart",
        lastName: "Simpson",
        email: "bart@simpson.com",
        password: "SuperSecret1!"
      }
    },
    collections: {
      _model: "Collection",
      mozart: {
        title: "Colorado Front Range Favourites",
        userid: "->users.bart"
      }
    },
    trails: {
      _model : "Trail",
      trail_1 : {
        range: "Front Range",
        mountain: "Massive",
        duration: 11,
        elevation: 12000,
        cateogry: "Class 1",
        effort: "Medium",
        trailRating: 2,
        reviewTrail: "It was never ending",
        collectionid: "->collections.mozart"
      },
      trail_2 : {
        range: "Front Range",
        mountain: "Massive",
        duration: 11,
        elevation: 12000,
        cateogry: "Class 1",
        effort: "Medium",
        trailRating: 2,
        reviewTrail: "It was never ending",
        collectionid: "->collections.mozart"
      },
      trail_3 : {
        range: "Front Range",
        mountain: "Massive",
        duration: 11,
        elevation: 12000,
        cateogry: "Class 1",
        effort: "Medium",
        trailRating: 2,
        reviewTrail: "It was never ending",
        collectionid: "->collections.mozart"
      }
    }
  };
