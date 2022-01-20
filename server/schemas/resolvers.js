const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');

const resolvers = {
    Query: {
        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
        }
    }
};

module.exports = resolvers;