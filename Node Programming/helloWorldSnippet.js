var drone = require("ar-drone");
var client = drone.createClient();
client.takeoff();
client.after(5000, function () {
	this.up(0.01);
	this.left(0.01);
	this.right(0.01);
	this.back(0.01);
	this.animate('flipAhead', 5);
	this.animateLeds('leftMissile', 5);
	this.animateLeds('rightMissile', 5);
	
})
	.after(3000, function () {
		this.stop();
		this.land();
	});