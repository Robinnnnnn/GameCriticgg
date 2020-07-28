var mongoose  = require('mongoose');
const uri = 'mongodb+srv://robinlifshitz:robinlifshitz@rl-demos.ogefe.mongodb.net/GameCritique?retryWrites=true&w=majority';


mongoose.connect( uri , { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB Atlas: GameCritique')
  })
  .catch(err => console.log(err))



//const db = mongoose.connection;


// is part of the game schema
const reviewSchema = new mongoose.Schema({
  author: 'String',
  user_overall: { type: Number, min: 1, max: 5 },
  user_gameplay: { type: Number, min: 1, max: 5 },
  user_art: { type: Number, min: 1, max: 5 },
  user_sound: { type: Number, min: 1, max: 5 },
  upvotes: { type: 'Number', default: 0},
  downvotes: { type: 'Number', default: 0},
  post_date: { type: Date, default: Date.now },
  review: 'String',
})

const gameSchema = new mongoose.Schema({
  title: 'String',
  platforms: [String],
  releaseDate: 'String',
  image: 'String',
  metacritic: 'Number',
  genres: [String],
  gcrating_overall: { type: Number, min: 1, max: 5 },
  gcrating_gameplay: { type: Number, min: 1, max: 5 },
  gcrating_art: { type: Number, min: 1, max: 5 },
  gcrating_sound: { type: Number, min: 1, max: 5 },
  reviews: [reviewSchema],
});

const userSchema = new mongoose.Schema({
  author: 'String',
  intPoints : {type: 'Number', default:0 },
  reviews: [reviewSchema],
})

userSchema.methods.calculatePoints = function() {
  let sum = 0;
  this.reviews.forEach(review => {
    let upvotePoints = review.upvotes * 2;
    let reviewPoint = upvotePoints - review.downvotes;
    sum = sum + reviewPoints;
  })
  let avg = sum / this.reviews.length;
  return avg;
}

const User = mongoose.model('User', userSchema )

var Game = mongoose.model('Game', gameSchema);

var Review = mongoose.model('Review', reviewSchema);

module.exports = { Game, Review, User };