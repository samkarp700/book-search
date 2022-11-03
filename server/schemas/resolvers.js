const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = { 
    Query: {
        //pass placeholder parameter to access username argument
        me: async(parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    
                    
                    return userData;
            }
            throw new AuthenticationError('Not logged in!');
        }
    },
    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);

            return { token, user};
        }, 
        login: async(parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        }, 
        saveBook: async(parent, { BookData }, context) => {
            if (context.user) {
                const updateSaveBook = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $push: { savedBooks: BookData } },
                    { new: true, runValidators: true }
                );
                return updateSaveBook;

            }
                throw new AuthenticationError('You need to be loggin in.');
        },

        
        removeBook: async(parent, { bookId }, context) => {
            if (context.user) {
                const updateSaveBook = await User.findOneAndUpdate(
                    { _id: context.user.id },
                    { $pull: { savedBooks: { bookId } } },
                    {new: true }
                );
                return updateSaveBook
            }
            throw new AuthenticationError('You need to be logged in');
            
            }
        }
    };


    module.exports = resolvers;