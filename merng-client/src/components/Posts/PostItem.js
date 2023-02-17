import { Button, Confirm, Icon, Label , Loader} from "semantic-ui-react";

import moment from 'moment';
import { Link } from "react-router-dom";
import {AuthContext} from '../../context/auth';
import { useContext, useState } from "react";
import LikeButton from '../LikeButton';
import MyPopup from "../../util/MyPopup";
import {Image} from 'cloudinary-react';
import { useMutation, useQuery } from "@apollo/react-hooks";
import { FETCH_POSTS_QUERY, FETCH_USER } from "../../util/GraphQL";

import gql from 'graphql-tag';



const PostItem = ({post:{description,id,name,username,createdAt,likeCount,commentCount,likes,image}}) => {
 

    const context = useContext(AuthContext);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const {loading : loadingUser ,data:UserData} = useQuery(FETCH_USER,{
        variables:{
            username:username
        }
    });


 
    
    const [createPost ] = useMutation(CREATE_POST , {
      
            variables: {
                description: description,
                image:image
            },
            update(proxy,result){
                const data = proxy.readQuery({
                    query: FETCH_POSTS_QUERY
                });
                data.getPosts = [result.data.createPost , ...data.getPosts];
                proxy.writeQuery({query:FETCH_POSTS_QUERY , data})

            }

       
    })
    function createPostCallback() {
        createPost();
        setConfirmOpen(false);
    }


   
    
    return (
            <div>

        { loadingUser? <Loader active inline='centered' /> :
         (
            
          
               
            <div  className="mainpost p-5">
                <Link className="test" style={{textDecoration:'none'}}  to={`/posts/${id}`}>
                <div  className="userimg"><Image cloudName='ddlf8wxvm' publicId={UserData && UserData.getUser.image}/></div>
                <div className="username"><p className="name">{UserData && UserData.getUser.name}</p></div>
                <p  className="time float-left">{moment(createdAt).fromNow(true)}</p>
                <div style={{paddingTop:'20px'}}>
                <p className="quotes">
                    {description}
                </p>
                </div>
                
                <div className="post">
                    <Image  size="huge" className="postimg" cloudName='ddlf8wxvm' publicId={image}/>
                </div>
                </Link>
                <div className="likedislike pt-4">
                    
                    <LikeButton user={context.user} post={{ id,likes,likeCount  }}/>  
                    <MyPopup content="Comment on post">
                    <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
                        <Button color="blue" basic>
                        <Icon name="comments" />
                        </Button>
                        <Label basic color="blue" pointing="left">
                        {commentCount}
                        </Label>
                    </Button>
                   
                    </MyPopup>
   

                    
                        <Button color="blue"  onClick={() => setConfirmOpen(true)}  basic style={{borderRadius:'5px'}}>
                        <Icon name="share" />
                              Share
                        </Button>
     
                        <Confirm
                            open={confirmOpen}
                            onCancel={() => setConfirmOpen(false)}
                            onConfirm={createPostCallback}
                            content={`Are You Sure? By pressing ok you will be sharing this post to your profile.`}
                                    
                        />
         

                  
                </div>
                

            </div>
            
            
                    
        )

        }


</div>

      );
}
 

const CREATE_POST = gql`

    mutation createPost(
        $description: String! , $image:String!
    ){
        createPost(description:$description , image:$image){
            id description createdAt username name
            likes{
                id username createdAt 
            }
            likeCount
            comments{
                id body username createdAt
            }
            commentCount
            image
        }
    }
`;
 
export default PostItem;