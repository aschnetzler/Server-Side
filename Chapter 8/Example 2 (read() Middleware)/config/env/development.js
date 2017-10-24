module.exports = {
	db: 'mongodb://localhost/mean-book',
	sessionSecret: 'developmentSessionSecret',
	facebook:{
		clientID: '352027828582261',
		clientSecret: '41a445d603a07e8004dd199060b570fe',
		callbackURL: 'http://localhost:3000/oauth/facebook/callback'
	},
	google:{
		clientID: '999844138810-o68eo5bahb6cbuod342crui61i07pg4e.apps.googleusercontent.com',
		clientSecret: 'YM2uTOYlWnOLU2R0-CVhT8iv',
		callbackURL: 'http://localhost:3000/oauth/google/callback'
	}
};