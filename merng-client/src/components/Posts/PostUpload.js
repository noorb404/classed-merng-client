import gql from 'graphql-tag';
import React, { useState } from 'react';
import useForm from '../../util/hooks';
import {useMutation} from '@apollo/react-hooks';
import  {FETCH_POSTS_QUERY} from '../../util/GraphQL';
import axios from 'axios';
import Image from 'cloudinary-react/lib/components/Image';
import { Form, Loader } from 'semantic-ui-react';
import './Post.css'

const PostUpload = () => {

    const [image,setImage] = useState(null);
    const [loadImage,setLoadImage] = useState(null);

    let FakeEvent;

    
    async function onInputChange(e) {
        setLoadImage(true);
        const formData = new FormData();
        formData.append('file',e.target.files[0]);
        formData.append('upload_preset','xgpstnd9');

        const response = await axios.post(
        `https://api.cloudinary.com/v1_1/ddlf8wxvm/image/upload`,
        formData,
        ).then((response) =>{
            setImage(response.data.public_id);
            // Going arround the e.target.value , name for OnChange function
             FakeEvent = {
             target: {
                 name:'image',
                 value:response.data.public_id
             }
         }
         });
         console.log(response);
      
         onChange(FakeEvent);
     
     
        
};

    const {values , onChange , onSubmit } = useForm(createPostCallback , {
        description : '',
        image:''
    });

 
    
    const [createPost , {error}] = useMutation(CREATE_POST , {
      
            variables: values,
            update(proxy,result){
                const data = proxy.readQuery({
                    query: FETCH_POSTS_QUERY
                });
                data.getPosts = [result.data.createPost , ...data.getPosts];
                proxy.writeQuery({query:FETCH_POSTS_QUERY , data})
                values.description = '';
            }

       
    })
        function createPostCallback() {
        createPost();
    }
    
    function test(){
        setImage(null);
        setLoadImage(null);

    }


    return ( 
              <>
              
              
            <div className="main mainpost" style={{marginBottom:'20px', paddingBottom:'20px'}}>	

                    <p className="quotes">
                        <textarea name="description" value={values.description} onChange={onChange} style={{textAlign:'right' , fontFamily: 'Calibri'}} placeholder="שתף רעיון, תמונה"></textarea>
                    </p>
                    <div className="text-center p-3">
                    {    loadImage==null? null :
                        <>
                               {
                                   image==null? <Loader active inline='centered' /> :
                                   <Image className='image-adjust2' cloudName='ddlf8wxvm' publicId={image}  wrapped ui={false}/>

                               }
                       </>
                    } 
                    
                    </div>

                    <Form className="postbar" onSubmit={onSubmit}>
                        <input  id="chooseimg" onChange={onInputChange} name='image' type='file'  values={values.image}/>
                        <button type="button" className="imgbttn" id="imgbttn">&#x1f4f7; תמונה</button>
                        <button type="submit" onClick={test} id="postmypost" className="postmypost" >פרסם</button>
                    </Form>

                   

            </div>
            {error && (
                <div className="ui error message">
                    <ul className="list">
                         <li>{error && error.graphQLErrors[0]?error.graphQLErrors[0].message: {}}</li>
                    </ul>
                </div>
            )}
        </>
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
 
export default PostUpload;