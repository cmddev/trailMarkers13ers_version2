export const seedData = {
    users: {
      _model: "User",
      homer: {
        firstName: "Homer",
        lastName: "Simpson",
        email: "homer@simpson.com",
        password: "$2a$10$tlHzA4yAM.h6qhrf1PNrHeVOhANyHXpuNmmoewc2Nzga7m4UOD01."
        // password: "SuperSecret1!"
      },
      marge: {
        firstName: "Marge",
        lastName: "Simpson",
        email: "marge@simpson.com",
        password: "$2a$10$39minxp6E/Q6/gVMXhVjQedOewnPLNPdSmj3Npdg5OphkV8mH2BIC",
        // password: "SuperSecret1!"
      },
      bart: {
        firstName: "Bart",
        lastName: "Simpson",
        email: "bart@simpson.com",
        password: "$2a$10$IHVM27gsCRt27uzrmLsAjuurc/uCftyvBcz.pqxSJZLfIwYHISFSe",
        // password: "SuperSecret1!"
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
