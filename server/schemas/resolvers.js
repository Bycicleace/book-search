const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
        }
    },
    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials')
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials')
            }

            const token = signToken(user);
            return { token, user }
        },
        addUser: async (parent, body) => {
            const user = await User.create(body);
            const token = signToken(user);
            return({ token, user });
        },
        saveBook: async (parent, { data }, context) => {
            console.log("Save attempted");
            console.log(data);
            try {
                if (await context.data.user){
                    console.log(context.data.user);
                    const updatedUser = User.findOneAndUpdate(
                        { _id: context.data.user._id },
                        { $addToSet: { savedBooks: data } },
                        { new: true, runValidators: true }
                    );
                    return updatedUser;
                }
            } catch (e) {
                console.error(e);
            }
        },
        removeBook: async (parent, args) => {

        }
    }
};

module.exports = resolvers;