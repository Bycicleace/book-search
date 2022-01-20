const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');

const resolvers = {
    Query: {
        me: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
        }
    },
    Mutation: {
        login: async (parent, { username, email, password }) => {
            return null;
        },
        addUser: async (parent, args) => {
            return null;
        },
        saveBook: async (parent, args) => {
            return null;
        },
        removeBook: async (parent, args) => {
            
        }
    }
};

module.exports = resolvers;