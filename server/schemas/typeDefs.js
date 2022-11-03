//import the gql tagged template function
const { gql } = require('apollo-server-express');

//create typeDefs
const typeDefs = gql `
    type User {
        _id: ID!
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }
    type Book {
        bookId: String!
        title: String
        authors: [String]
        description: String
        image: String
        link: String

    }
     input BookData {
        bookId: String
        authors: [String]
        description: String
        title: String
        image: String
        link: String

    }
    type Query {
        me: User
        
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(BookData: BookData!): User
        removeBook(bookId: String!): User
    }

    type Auth {
        token: ID!
        user: User
    }
`;


//export typedefs
module.exports = typeDefs;