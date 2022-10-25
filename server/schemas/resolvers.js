const { User, Book } = require('../models');

const resolvers = { 
    Query: {
        //pass placeholder parameter to access username argument
        books: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Book.find(params).sort({ savedAt: -1 });
        }
    }
};