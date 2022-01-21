const { gql } = require('apollo-server-express');

const typeDefs = gql`
    # Exclamation point after type means field value cannot be null
    type Book {
        bookId: String!
        title: String!
        description: String!
        authors: [String]
        image: String
        link: String
    }

    type User {
        _id: ID
        username: String
        email: String
        savedBooks: [Book]
        bookCount: Int
    }

    type Auth {
        token: ID!
        user: User
    }

    # I couldn't get the calls to work with this, so had to abandon.
    input BookData {
        bookId: String!
        title: String!
        description: String!
        authors: [String]
        image: String
    }

    type Query {
        me(username: String!): User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(bookData: BookData!): User
        removeBook(bookId: String!): User
        removeUser(_id: String!): User # For development
    }
`;

module.exports = typeDefs;