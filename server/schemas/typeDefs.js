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

    input BookData {
        bookId: String!
        title: String!
        description: String!
        authors: [String]
        image: String
        link: String
    }

    type Query {
        me(username: String!): User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(data: BookData!): User
        removeBook(bookId: String!): User
    }
`;

module.exports = typeDefs;