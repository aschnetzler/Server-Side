// Load the module dependencies
const mongoose = require('mongoose');
const Test = mongoose.model('Test');

// Create a new error handling controller method
const getErrorMessage = function(err) {
    if (err.errors) {
        for (const errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].message;
        }
    } else {
        return 'Unknown server error';
    }
};

// Create a new controller method that creates new test
exports.create = function(req, res) {
    // Create a new test object
    const test = new Test(req.body);

    // Set the test's 'creator' property
    test.creator = req.user;

    // Try saving the test
    test.save((err) => {
        if (err) {
            // If an error occurs send the error message
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            // Send a JSON representation of the test 
            res.json(test);
        }
    });

    console.log(test);
};

// Create a new controller method that retrieves a list of test
exports.list = function(req, res) {
    // Use the model 'find' method to get a list of test
    Test.find().sort('-created').populate('creator', 'firstName lastName fullName').exec((err, test) => {
        if (err) {
            // If an error occurs send the error message
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            // Send a JSON representation of the test 
            res.json(test);
        }
    });
};

// Create a new controller method that returns an existing test
exports.read = function(req, res) {
    res.json(req.test);
};

// Create a new controller method that updates an existing test
exports.update = function(req, res) {
    // Get the test from the 'request' object
    const test = req.test;

    // Update the test fields
    test.title = req.body.title;
    test.content = req.body.content;

    // Try saving the updated test
    test.save((err) => {
        if (err) {
            // If an error occurs send the error message
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            // Send a JSON representation of the test 
            res.json(test);
        }
    });
};

// Create a new controller method that delete an existing test
exports.delete = function(req, res) {
    // Get the test from the 'request' object
    const test = req.test;

    // Use the model 'remove' method to delete the test
    test.remove((err) => {
        if (err) {
            // If an error occurs send the error message
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            // Send a JSON representation of the test 
            res.json(test);
        }
    });
};

// Create a new controller middleware that retrieves a single existing test
exports.testByID = function(req, res, next, id) {
    // Use the model 'findById' method to find a single test 
    Test.findById(id).populate('creator', 'firstName lastName fullName').exec((err, test) => {
        if (err) return next(err);
        if (!test) return next(new Error('Failed to load test ' + id));

        // If an test is found use the 'request' object to pass it to the next middleware
        req.test = test;

        // Call the next middleware
        next();
    });
};

// Create a new controller middleware that is used to authorize an test operation 
exports.hasAuthorization = function(req, res, next) {
    // If the current user is not the creator of the test send the appropriate error message
    if (req.test.creator.id !== req.user.id) {
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }

    // Call the next middleware
    next();
};