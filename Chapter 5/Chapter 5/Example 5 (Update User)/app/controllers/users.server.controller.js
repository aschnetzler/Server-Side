const User = require('mongoose').model('User');

exports.create = function(req, res, next){
	const user = new User(re.body);
	
	user.save((err) => {
		if(err){
			return next(err);
		}
		else{
			res.status(200).json(user);
		}
	});
};

exports.list = function(req, res, next) {
	User.find({}, (err, users) => {
		if(err){
			return next(err);
		} else {
			res.status(200).json(users);
		}
	});
};

exports.read = function(req, res){
	res.json(req.user);
};

exports.userByID = function( req, res, next, id){
	User.findOne({
		_id: id
	}, (err, user) => {
		if (err){
			return next(err);
		} else {
			req.user = user;
			next();
		}
	});
};

exports.update = function(req, res, next){
	User.findByIdAndUpdate(req.user.id, req.body, {
		'new': true
	}, (err, user) => {
		if(err){
			return next(err);
		} else {
			res.status(200).json(user);
		}
	});
};