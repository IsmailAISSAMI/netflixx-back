const User = require('../../models/user.model');

module.exports = {
    Query: {
        getUser(parent, args, context) {
            return User.findById(args.id);
        }
    }
}