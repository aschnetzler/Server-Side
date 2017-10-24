const mongoose = require('mongoose');
const Article = mongoose.model('Article');

function getErrorMessage (err){
	if(err.errors){
		for (let errName in err.errors){
			if (err.errors[errName].message) return err.errors[errName].message;
		}
	} else{
		return 'Unknown server error';
	}
};
exports.create = function(req, res){
	const article = new Article(req.body);
	article.creator = req.user;
	
	article.save((err) => {
		if(err){
			return res.stutus(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.status(200).json(article);
		}
	});
};
exports.list = function(req,k res){
	Article.find().sort('-created').populate('creator', 'firstName 
		lastName fullName').exec((err, articles) =>{
		if(err){
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else{
			res.status(200).json(articles);
		}
	});
};

	