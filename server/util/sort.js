const axios = require("axios");

const sort = {
  getTopUsers(listOfUsers) {
    return listOfUsers.sort((user1, user2) => {
      if (user1.intPoints > user2.intPoints) return 1;
      if (user1.intPoints < user2.intPoints) return -1;
      return 0;
    });
  },
};

module.exports = sort;

//   [
//     {
//         "author": "Master1",
//         "intPoints": 27.8,
//         "numberOfReviews": 1
//     },
//     {
//         "author": "Master 2",
//         "intPoints": 31.8,
//         "numberOfReviews": 1
//     },
//     {
//         "author": "Devon",
//         "intPoints": 0,
//         "numberOfReviews": 1
//     },
//     {
//         "author": "Iluvatar",
//         "intPoints": 4,
//         "numberOfReviews": 2
//     }
// ]
