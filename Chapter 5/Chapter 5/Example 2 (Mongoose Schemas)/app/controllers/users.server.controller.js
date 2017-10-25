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