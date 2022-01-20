const { gql } = require('apollo-server-express');

const typeDefs = gql`
    # Exclamation point after type means field value cannot be null
    type Book {
        authors: [String]
        description: String!
        bookId: String!
        image: String
        link: String
        title: String!
    }

    type User {
        _id: ID!
        username: String
        email: String
        savedBooks: [Book]
        bookCount: Int
    }

    type Query {
        user(username: String!): User
        book(bookId: String!): Book
    }
`;

module.exports = typeDefs;