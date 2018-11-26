import gql from 'graphql-tag';

// language=GraphQL
export const GET_POSTS = gql`
    query allPosts($count: Int = 20) {
        allPosts(count: $count) {
            id
            title
            body
            published
            createdAt
        }
    }
`;