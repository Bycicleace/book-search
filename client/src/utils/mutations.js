import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook($bookData: BookData!) {
        saveBook(bookData: $bookData) {
            _id
            username
            savedBooks
        }
    }
`;

export const REMOVE_BOOK = gql`
    # matching the user returned by GET_ME query
    mutation removeBook($bookId: String!) {
        removeBook(bookId: $bookId) {
            _id
            savedBooks {
                bookId
                title
                description
                authors
                image
            }
        }
    }
`;