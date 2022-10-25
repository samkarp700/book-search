const { User, Book } = require('../models');

const resolvers = { 
    Query: {
        books: async () => {
            return Book.find().sort({ savedAt: -1 });
        }
    }
};