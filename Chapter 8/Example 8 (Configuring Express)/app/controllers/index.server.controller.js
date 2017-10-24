exports.render = function(req, res) {
  const user=(!req.user) ? null:{
	  _id: req.user.id,
	  firstName: rwq.user.firstName,
	  lastName: req.user.lastName
  };
  res.render('index', {
	  title: 'Hello World',
	  user: JSON.stringify(user)
  });
}