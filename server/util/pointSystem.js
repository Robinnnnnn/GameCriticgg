const axios = require("axios");

const points = {
  getIntPoints(user) {
    axios({
      method: "get",
      url: `http://localhost:3000/userreviews/${user}`,
    })
      .then((userObj) => {
        // because data is returned as an array of objects
        let user = userObj.data[0];
        console.log("The User Object:", user);

        let totalUp = 0;
        let totalDown = 0;
        // Traverses the review List
        user.reviews.forEach((review) => {
          // Adds up all upvotes and downvotes from each of the reviews for a total
          totalUp = totalUp + review.upvotes;
          totalDown = totalDown + review.downvotes;
        });
        // gains 1 point for each upvote
        // subtracts .5 points for each downvot (maybe less)
        let int = totalUp - totalDown * 0.2;
        console.log("Total Points", int);
        return { points: int, author: user.author };
      })
      .then((a) => {
        console.log("A Object: ", a)
        // Stores Int points back in the user obj
        axios.put(`http://localhost:3000/userintellectpoints/${a.author}`, {
          intellect: a.points,
        });
      })
      .catch((err) => console.log("Err updating Int Points", err));
  },
};

module.exports = points;
