import React, { useContext, useState, useRef } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import moment from 'moment';
import {
  Button,
  Card,
  Form,
  Grid,
  Icon,
  Label,
  Container
} from 'semantic-ui-react';
import {Image} from 'cloudinary-react';


import { AuthContext } from '../context/auth';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';
import { Link } from 'react-router-dom';
import { FETCH_USER } from '../util/GraphQL';

function SinglePost(props) {
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);
  const commentInputRef = useRef(null);


  const [comment, setComment] = useState('');


  const {data} = useQuery(FETCH_POST_QUERY,{
      variables:{
          postId 
      }
  });
  
 

  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {
      setComment('');
      commentInputRef.current.blur();
    },
    variables: {
      postId,
      body: comment,
      name:user.name
    }
  });

  function deletePostCallback() {
    props.history.push('/');
  }
  let postMarkup;
  let usernameprofile;
  if(!data){
    postMarkup = <p>Loading ...</p>
  }
  else{
    usernameprofile = data.getPost.username;
  }
  
  const {loading : loadingUser ,data:UserData} = useQuery(FETCH_USER,{
    variables:{
        username:usernameprofile? usernameprofile : ''
    }
});
  if(!data){
      postMarkup = <p> Loading ..</p>
  }else{

        const  {id , description ,createdAt, username,likes , comments , likeCount , commentCount , image} = data.getPost;
        postMarkup = (
          <Container className="p-5">
              <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                     
                    </Grid.Column>
                    <Grid.Column id="allpost2" width={10}>
                        <Card fluid>
                        <Card.Content>
                        { loadingUser ? <p>Loading ...</p> :
                         
                        
                         <div  className="userimg"> <Image  style={{borderRadius:'50%' , height: '70px' , width:'70px' , padding:'1%' , marginTop:'-10px',marginLeft:'10px'  }} id="imgsmall" cloudName='ddlf8wxvm' publicId={UserData && UserData.getUser.image}/> </div>
                     }
                        <Card.Header style={{textAlign:'right'}}><Link to={`/${username}/profile`}>{UserData && UserData.getUser.name}</Link></Card.Header>
                        <Card.Meta style={{textAlign:'right'}}>{moment(createdAt).fromNow()}</Card.Meta>
                        <Card.Description  className=" text-center pb-4"><Image className='image-adjust2' cloudName='ddlf8wxvm' publicId={image}/></Card.Description>
                        
                        <Card.Description style={{textAlign:'right' , padding:'10px'}}>{description}</Card.Description>
                        </Card.Content>
                        <hr />
                        <Card.Content extra>
                                <LikeButton user={user} post={{id,likeCount,likes}} />
                                <Button
                                    as="div"
                                    labelPosition="right"
                                    onClick={() => console.log('Comment on post')}
                                >
                                    <Button basic color="blue">
                                    <Icon name="comments" />
                                    </Button>
                                    <Label basic color="blue" pointing="left">
                                    {commentCount}
                                    </Label>
                                </Button>
                                {user && user.username === username && (
                                   <> <DeleteButton postId={id} callback={deletePostCallback} />
                                    <Button className="float-right">עריכה</Button> </>
                                )}
                        </Card.Content>
                        </Card>
                        {user && (
                        <Card fluid>
                          <Card.Content>
                            <p>Post a comment</p>
                            <Form>
                              <div className="ui action input fluid">
                                <input
                                  type="text"
                                  placeholder="Comment.."
                                  name="comment"
                                  value={comment}
                                  onChange={(event) => setComment(event.target.value)}
                                  ref={commentInputRef}
                                />
                                <button
                                  type="submit"
                                  className="ui button teal"
                                  style={{height:'30px'}}
                                  disabled={comment.trim() === ''}
                                  onClick={submitComment}
                                >
                                  Submit
                                </button>
                              </div>
                            </Form>
                          </Card.Content>
                        </Card>
                      )}
                       {comments.map((comment) => (
                        <Card fluid key={comment.id}>
                          <Card.Content>
                            {user && user.username === comment.username && (
                              <DeleteButton postId={id} commentId={comment.id} />
                            )}
                            <Card.Header>{comment.name}</Card.Header>
                            <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                            <Card.Description>{comment.body}</Card.Description>
                          </Card.Content>
                        </Card>
                      ))}
                    </Grid.Column>
                    
                </Grid.Row>
            </Grid>
          </Container>

        );
  }
  return postMarkup;
}

const SUBMIT_COMMENT_MUTATION = gql`
  mutation($postId: String!, $body: String! , $name:String!) {
    createComment(postId: $postId, body: $body , name:$name) {
      id
      comments {
        id
        body
        createdAt
        username
        name
      }
      commentCount
    }
  }
`;


const FETCH_POST_QUERY = gql`
    query Test($postId: ID!){

     getPost(postId: $postId) {
        id
        description
        image
        createdAt
        username
        name
        likeCount
        likes {
        username
        }
        commentCount
        comments {
        name
        id
        username
        createdAt
        body
    }
  }
}
`;
export default SinglePost;
