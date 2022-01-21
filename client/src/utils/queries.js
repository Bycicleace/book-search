import { gql } from '@apollo/client';

export const GET_ME = gql`
    query me($username: String!) {
        me(username: $username) {
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

// make a search to google books api
// https://www.googleapis.com/books/v1/volumes?q=harry+potter
export const searchGoogleBooks = (query) => {
    return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};