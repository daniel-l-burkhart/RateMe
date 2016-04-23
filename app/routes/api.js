var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var Review = mongoose.model('Review');
//Used for routes that must be authenticated.
function isAuthenticated (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects

	//allow all get request methods
	if(req.method === "GET"){
		return next();
	}
	if (req.isAuthenticated()){
		return next();
	}

	// if the user is not authenticated then redirect him to the login page
	return res.redirect('/#login');
};

//Register the authentication middleware
router.use('/reviews', isAuthenticated);

//Returns all the reviews under one property
router.get('/reviews/:category', function (req, res) {
	if (req.params.category) {
		Review.find({ category: req.params.category }, function (err, reviews) {
			res.json(reviews);
		});
	}
});
router.route('/reviews')
    //creates a new post
    .post(function(req, res){
        var review = new Review();

        review.category = req.body.category;
        review.name = req.body.name;
        review.rating = req.body.rating;
        review.text = req.body.text;
		review.created_by = req.body.created_by;
		review.created_at = req.body.created_at;
        review.save(function(err, review) {
            if (err){
                return res.send(500, err);
            }
            return res.json(review);
        });
    })
    //gets all posts
    .get(function(req, res){
        console.log('debug1');
        Review.find(function(err, reviews){
            console.log('debug2');
            if(err){
                return res.send(500, err);
            }
            return res.send(200,reviews);
        });
    });


router.route('/reviews/:id')
	//gets specified post
	.get(function(req, res){
		Review.findById(req.params.id, function(err, review){
			if(err)
				res.send(err);
			res.json(review);
		});
	})

	//updates specified post
	.put(function(req, res){
		Review.findById(req.params.id, function(err, review){
			if(err)
				res.send(err);

            review.category = req.body.category;
			review.name = req.body.name;
			review.rating = req.body.rating;
			review.text = req.body.text;
			review.save(function(err, review){
				if(err)
					res.send(err);

				res.json(review);
			});
		});
	})
	//deletes the post
	.delete(function(req, res) {
		Review.remove({
			_id: req.params.id
		}, function(err) {
			if (err)
				res.send(err);
			res.json("deleted :(");
		});
	});

module.exports = router;