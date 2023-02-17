import gql from "graphql-tag";

export const FETCH_POSTS_QUERY = gql`
 {
    getPosts{
        id description createdAt username likeCount name image
        likes{
            username
        }
        commentCount
        comments{
            id username createdAt body
        }
        
    }
 }

`

export const FETCH_USERS_QUERY = gql`
 {
    getUsers{
      id type phone address email website image date gas water paper username  name electricity   
    }
 }

`



export const FETCH_USER = gql`
 query($username: String!){
    getUser(username:$username){
      id type phone address email website image date gas water paper username token name electricity
    }
 }

`;

export const FETCH_POST_QUERY = gql`
query($postId: ID!) {
  getPost(postId: $postId) {
    id
    description
    image
    createdAt
    username
    likeCount
    likes {
      username
    }
    commentCount
    comments {
      id
      username
      createdAt
      body
    }
  }
}
`;