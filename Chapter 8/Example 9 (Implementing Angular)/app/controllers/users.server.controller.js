const User = require('mongoose').model('User');
const passport = require('passport');

function getErrorMessage(err){
		let message = '';
		
		if(err.code){
			switch (err.code){
				case 11000:
				case 11001:
					message ='Username already exists';
					break;
				default:
					message = 'Something went wrong';
			}
		} else{
			for (var errName in err.errors){
				if(err.errors[errName].message) message = err.errors[errName].message;
			}
		}
		
		return message;
};

exports.renderSignin = function(req, res, next){
	if(!req.user){
		res.render('signin', {
			title: 'Sign-in Form',
			messages: req.flash('error') || req.flash('info')
		});
	} else{
		return res.redirect('/');
	}
};
exports.signup = function(req, res, next){
	if(!req.user){
		const user = new User(req.body);
		user.provider = 'local';
		
		user.save((err) => {
			if (err){
				const message = getErrorMessage(err);
				
				req.flash('error', message);
				return res.redirect('/signup');
			}
			req.login(user, (err) => {
				if(err) return next (err);
				return res.redirect('/');
			});
		});
	} else{
		return res.redirect('/');
	}
};
exports.signout = function(req, res){
	req.logout();
	res.redirect('/');
}
exports.saveOAuthUserProfile = function(req, profile, done){
	User.findOne({
		provider: profile.provider,
		providerId: profile.providerId
	}, (err, user) => {
		if (err){
			return done(err);
		} else { 
			if (!user){
				const possibleUsername = profile.username || 
					((profile.email) ? profile.email.split('@')[0] : '');
					
				User.findUniqueUsername(possibleUsername, null, 
					(availableUsername) => {
					const newUser = new User(profile);
					newUser.username = availableUsername;
					
					User.findUniqueUsername(possibleUsername, null,
						function(availableUsername) {
							profile.username = availableUsername;
							user = new User(profile);
							user.save((err) => {
						if (err) {
							const message =
							_this.getErrorMessage(err);
							req.flash('error', message);
							return res.redirect('/signup');
						}
						return done(err, user);
					});
				});
			} else {	
				return done(err, user);	
			}	
		}	
	});
};
exports.requiresLogin = function(req, res, next){
	if(!req.isAuthenticated()){
		return res.status(401).send({
			message: 'User is not logged in'
		});
	}
	next();
};