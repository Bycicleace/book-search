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
        saveBook: async (parent, { bookData }, context) => {
            console.log(bookData);
            try {
                if (await context.data.user){
                    console.log(context.data.user);
                    const updatedUser = User.findOneAndUpdate(
                        { _id: context.data.user._id },
                        { $addToSet: { savedBooks: bookData } },
                        { new: true, runValidators: true }
                    );
                    return updatedUser;
                }
            } catch (e) {
                console.error(e);
            }
        },
        removeBook: async (parent, { bookId }, context) => {
            try {
                if (await context.data.user) {
                    const updatedUser = await User.findOneAndUpdate(
                        { _id: context.data.user._id },
                        { $pull: { savedBooks: { bookId: bookId } } },
                        { new: true}
                    );
                    return updatedUser;
                }
            } catch (e) {
                console.error(e);
            }
        },
        removeUser: async (parent, { _id }, context) => { // For development
            try {
                if (await context.data.user) {
                    const deletedUser = await User.findOneAndDelete(
                        { _id: _id},
                        { new: false }
                    );
                    return deletedUser;
                }
            } catch (e) {
                console.error(e);
            }
        }
    }
};

module.exports = resolvers;