const users = require('../../app/controllers/users.server.controller');
const test = require('../../app/controllers/test.server.controller');

module.exports = function(app) {
    app.route('/api/test')
        .get(test.list)
        .post(test.create);

    app.route('/api/test/:testId')
        .get(test.read)
        .put(test.hasAuthorization, test.update)
        .delete( test.delete);

    app.param('testId', test.testByID);
};