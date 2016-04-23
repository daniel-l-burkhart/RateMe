var mongoose = require("mongoose"),
	Schema = mongoose.Schema



var reviewSchema = new Schema({
	created_by: String,		//should be changed to ObjectId, ref "User"
	created_at: {type: Date, default: Date.now},
	name: String,
    rating: Number,
    text: String,
    category: String
});

var userSchema = new Schema({
	username: String,
	password: String, //hash created from password
	created_at: {type: Date, default: Date.now}
})

mongoose.model('Review', reviewSchema);
mongoose.model('User', userSchema);
