const express = require('express');
const bodyParser = require('body-parser');
const faker = require('faker');
const axios = require('axios');
const uniqid = require('uniqid');

const { Game, Review, User } = require('../database-mongo');

const app = express();

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json());

app.get('/gameslist', (req, res) => {
 Game.find({})
  .then(allGames => res.send(allGames))
})

app.post('/newreview/:gameid', async (req, res) => {

  // console.log("request data", req.body);
  // console.log("gameid: ", req.params.gameid);
  let gameObjId = req.params.gameid;
  let newReview = req.body;

  const game = await Game.findById(gameObjId);
  game.reviews.push(newReview);
  await game.save();

  res.send('Complete')

});

app.put('/downvote/:reviewid/:gameid', async (req, res) => {
  let reviewId = req.params.reviewid;
  let gameId = req.params.gameid;

  const game = await Game.findOne({'_id': gameId});
  const reviews = game.reviews;
  reviews.forEach(review => {
    if(review['_id'] == reviewId){
      let reviewToUpdate = review;
      reviewToUpdate.downvotes = reviewToUpdate.downvotes + 1;
    }
  })

  const complete = await game.save();
  res.send(complete)
});

app.put('/upvote/:reviewid/:gameid', async (req, res) => {
  let reviewId = req.params.reviewid;
  let gameId = req.params.gameid;

  const game = await Game.findOne({'_id': gameId});
  const reviews = game.reviews;
  reviews.forEach(review => {
    if(review['_id'] == reviewId){
      let reviewToUpdate = review;
      console.log(reviewToUpdate)
      reviewToUpdate.upvotes = reviewToUpdate.upvotes + 1;
    }
  })

  const complete = await game.save();
  res.send(complete)
});

app.post('/userreview/:author', async (req, res) => {
  //query the users table
    //if the user doesnt exist, create a user entry
      // add the review to that user
    // else if the user does exist
      // push the review to their reviews array
  let newReview = req.body;
  const authorName = req.params.author;
  const isUser = await User.find({author: authorName});
  // res.send(isUser)
  if(isUser.length > 0){
    isUser[0]["reviews"].push(newReview);
    const complete = await isUser[0].save();
    res.send(complete);
  }else{
    await User.create({
        author: authorName,
        reviews: newReview,
      })
      .then((user) => res.send(user))
  }

})



app.listen(3000, function() {
  console.log('listening on port 3000!');
});

/* -------------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------------- */

//***USED TO LOAD GAME DATA INTO DB***
// app.get('/games', function (req, res) {
//   let games;
//   axios.get('https://api.rawg.io/api/games', {
//     params: {
//       dates: '2017-01-01,2020-05-31',
//       page_size:100,
//     }
//   })
//     .then(results => {
//       let listOfGames = results.data.results;
//       console.log("List of Games: ", listOfGames.length)

//       listOfGames.forEach( async (game) => {
//         const genresArr = game.genres.map(genre => genre.name);
//         const platformsArr = game.platforms.map(aPlatform => aPlatform.platform.name);

//         //creates and adds a game to the db
//         await Game.create({
//           title: game.name,
//           platforms: platformsArr,
//           releaseData: game.released,
//           image: game.background_image,
//           metacritic: game.metacritic,
//           genres: genresArr,
//           gcRating_overall: 1,
//           gcRating_gameplay: 1,
//           gcRating_art: 1,
//           gcRating_sound: 1,
//           reviews: {
//             author:'Robin Lifshitz',
//             user_overall: 5,
//             user_gameplay: 5,
//             user_art: 5,
//             user_sound: 5,
//             upvotes: 0,
//             downvotes: 0,
//             review:'Tis good.'
//           }

//         });

//       })//end of looping through the games returned from RAWG
//     })
//     .catch((err) => res.send(err))
//     .then(() => res.send('All Games Added to DB'))

// });

/* Created User Table Seed */
// await User.create({
//   author: 'RobinLifshitz',
//   intPoints: 10000,
//   reviews: [{
//     author: 'RobinLifshitz',
//     user_overall: 5,
//     user_gameplay: 5,
//     user_art: 5,
//     user_sound: 5,
//     review: 'A test String for USer Table Creation',
//   }]
// })
// .then((user) => res.send(user))

