
import '../css/Home.css';
import '../css/Header.css';
import '../css/Profile.css';
import { Button, Card,  Form, Grid, Icon, Loader, Modal, Segment } from 'semantic-ui-react';
import {Image} from 'cloudinary-react';
import {AuthContext} from '../context/auth';
import { useContext, useState } from 'react';
import  {FETCH_POSTS_QUERY , FETCH_USER} from '../util/GraphQL';
import { gql, useMutation, useQuery } from '@apollo/react-hooks';
import PostList from '../components/Posts/PostList';
import UseForm from '../util/hooks';
import { useParams } from 'react-router-dom';
import PostUpload from '../components/Posts/PostUpload';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';


const Profile = () => {
    const date = new Date().getMonth();
    const {loading: loadingPosts , data: PostsData} = useQuery(FETCH_POSTS_QUERY);
    const userId = useParams().userId;
    const [open, setOpen] = useState(false);
 
    const [btn,setBtn] = useState(true);
    let context = useContext(AuthContext);


    const [name, setname] = useState(false);
    const [phone, setphone] = useState(false);
    const [address, setaddress] = useState(false);
    const [website, setwebsite] = useState(false);
    const [email, setemail] = useState(false);
    const [image,setImage] = useState(null);    
    const [loadImage,setLoadImage] = useState(null);




 
    async function onInputChange(e) {
        setLoadImage(true);

           const formData = new FormData();
           formData.append('file',e.target.files[0]);
           formData.append('upload_preset','xgpstnd9');
           let FakeEvent;
   
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

    const {loading,data} = useQuery(FETCH_USER,{
        variables:{
            username: userId
        }
    });
    const {values , onChange , onSubmit } = UseForm(createPostCallback , {

        phone:data? data.getUser.phone : context.user.phone,
        username: userId,
        address:data? data.getUser.address : context.user.address,
        website:data? data.getUser.website : context.user.website,
        email:data? data.getUser.email : context.user.email,
        name:data? data.getUser.name : context.user.name,
        image:data? data.getUser.image : context.user.image
      
    });

    const [submitUpdate] = useMutation(SUBMIT_UPDATE_MUTATION, {
        
        variables: {
            phone:values.phone,
            name:values.name,
            username: userId,
            address:values.address,
            website:values.website,
            email:values.email,
            image:values.image
        },
        refetchQueries:[{query:FETCH_USER , variables:{username: context.user.username}}]
   
      });

  
    function createPostCallback() {
        submitUpdate();
    }
    function checkValues(){
      if(name!==false && address!==false && website!==false && email!==false && phone!==false){
            return true;
      }
      return false;
    }

    function setFalse () {
        setBtn(false);
    };
    const onChange2 = e =>{
        switch(e.target.name){
            case 'name':
                setname(e.target.value);
                break;
            case 'address':
                setaddress(e.target.value);
                break;
            case 'website':
                setwebsite(e.target.value);
                break;
            case 'email':
                setemail(e.target.value);
                break;
            case 'phone':
                setphone(e.target.value);
                break;
            
            default:
                                
        }
        onChange(e);
    }

    async function setTrue () {
        if(checkValues())
            setBtn(true);
    };
    return ( 

        <div>
                <div class="content">
                    <div id="background" class="wrapper">
                        <div id="background" style={{float:'left', width:'750px'}}>
                             
                               <Grid id="grid">
                                   <Grid.Row>
                                       <Card fluid>
                                           <Card.Content>
                                           {  loading? <Loader active inline='centered' /> : (
                                                    <>{ data &&
                                                        <> 
                                                            <Card.Description   className=" text-center pb-4"><Image style={{borderRadius:'50%' , height: '150px' , width:'160px' ,  verticalAlign: 'middle' }}    cloudName='ddlf8wxvm' publicId={data.getUser.image}/></Card.Description>
                                                            <Card.Header style={{textAlign:'center' , fontFamily:'Calibri', fontSize:'25px'}}>{data.getUser.name}</Card.Header>
                                                            <Card.Meta style={{textAlign:'center' , color:'gray', fontFamily:'Calibri', fontSize:'20px'}}>{data.getUser.address}</Card.Meta>
                                                        </>
                                                    }</>
                                                    )
                                                    }
                                            <Card.Description style={{textAlign:'center'}}>


                                            <Modal
                                            onClose={() => setOpen(false)}
                                            onOpen={() => setOpen(true)}
                                            open={open}
                                            trigger={context.user.username===userId && <Button  onClick={setFalse} color='green'>ערוך פרופיל</Button>}
                                            >
                                            <Modal.Content image>
                                               
                                                <Modal.Description >
                                                <Form onSubmit={onSubmit}  className={loading? 'loading' : ''}>
                                                        <Segment >
                                                    {  loading? <Loader active inline='centered' /> : (
                                                    <>{ data &&
                                                        <>
                                                            <div  className='text-center m-auto teto'>
                                                                <Col md={4}></Col>
                                                                   <Col  md={4}>
                                                                     <Row style={{alignItems:'center' }}  className='text-center'>
                                                                       {    loadImage==null? null :
                                                                            <>
                                                                            {
                                                                                image==null? <Loader active inline='centered' /> :
                                                                                <Image style={{borderRadius:'50%' , height: '150px' , width:'160px' ,  verticalAlign: 'middle' }}    cloudName='ddlf8wxvm' publicId={image}/>  
                                                                            }
                                                                            </>
                                                                        }   
                                                                     </Row>
                                                                     <Row className='text-center'>
                                                                        <input onChange={onInputChange} style={{maxWidth:'300px' , border:0, height:'50px'}}  name='image' type='file'  values={values.image}/>
                                                                     </Row>
                                                                   </Col>
                                                                   <Col md={4}></Col>
                                                            </div>
                                                        <Form.Input style={{minWidth:'400px'}} required  fluid name='name' onChange={onChange2}   values={values.name} icon='user' iconPosition='left' placeholder={data.getUser.name} />
                                                        <Form.Input style={{minWidth:'400px'}} required   fluid name='phone' onChange={onChange2}  values={values.phone} icon='phone' iconPosition='left' placeholder={data.getUser.phone} />
                                                        <Form.Input style={{minWidth:'400px'}} required   fluid name='email' onChange={onChange2}  values={values.email} icon='mail' iconPosition='left' placeholder={data.getUser.email} />
                                                        <Form.Input style={{minWidth:'400px'}} required   fluid name='website' onChange={onChange2}  values={values.website} icon='chrome' iconPosition='left' placeholder={data.getUser.website} />
                                                        <Form.Input style={{minWidth:'400px'}} required   fluid name='address' onChange={onChange2}   values={values.address} icon='home' iconPosition='left' placeholder={data.getUser.address} />

                                                        </>
                                                    }</>
                                                    )
                                                    }
                                                        <Button onClick={setTrue} type="submit" color={!btn? 'grey' : 'green'} fluid size='large'>
                                                            {!btn? "Change" : "Changed!"}
                                                        </Button>
                                                        </Segment>
                                                </Form>
                                                </Modal.Description>
                                            </Modal.Content>
                                            <Modal.Actions>
                                                <Button
                                                content="זהו סיימתי"
                                                labelPosition='right'
                                                fontFamily='Calibri'
                                                icon='checkmark'
                                                onClick={() => setOpen(false)}
                                                positive
                                                />
                                            </Modal.Actions>
                                            </Modal>



                                            </Card.Description>
                                           </Card.Content>


                                  {loading ? ( <Loader active inline='centered' />) : (
                                     
                                         <> {data && <Card.Content extra>
                                            <Card.Meta id="gedo" style={{textAlign:'right' , fontFamily:'Calibri', fontSize:'20px' , paddingRight:'20px'}}> {data.getUser.phone} - טלפון <Icon  size='small' name='phone'></Icon> </Card.Meta>
                                            <Card.Meta id="gedo" style={{textAlign:'right' , fontFamily:'Calibri', fontSize:'20px' , paddingRight:'20px'}}> {data.getUser.email} - דואר אלקטרוני <Icon  size='small' name='mail'></Icon> </Card.Meta>
                                            <Card.Meta id="gedo" style={{textAlign:'right' , fontFamily:'Calibri', fontSize:'20px' , paddingRight:'20px'}}> {data.getUser.website} - אתר <Icon  size='small' name='chrome'></Icon> </Card.Meta>
                                            <Card.Meta id="gedo" style={{textAlign:'right' , fontFamily:'Calibri', fontSize:'20px' , paddingRight:'20px'}}>{data.getUser.address} - כתובת<Icon  size='small' name='home'></Icon> </Card.Meta>
                                            <Card.Meta id="gedo" style={{textAlign:'right' , fontFamily:'Calibri', fontSize:'20px' , paddingRight:'20px'}}> {data.getUser.date} - שנת יצור <Icon  size='small' name='clock'></Icon> </Card.Meta>
                                        </Card.Content>}</>


                                  )}      
                                           
                                       
                                       </Card>
                                   </Grid.Row>

                               </Grid>
                                    
                   

                               {loadingPosts? <div className="pt-5 mt-5"><Loader active inline='centered' /> </div>: (
                                   <div id="grid2" className="pt-5 pb-5 pr-2 mr-5">
                                                    { context.user.username === userId &&
                                                        <div>
                                                            <PostUpload />
                                                        </div>
                                                    }

                                       {PostsData && <PostList items={PostsData.getPosts.filter(post => post.username === userId)}/>}
                                    </div>
                               )}
                             
                        </div>

                        {loading ? ( <Loader active inline='centered' />) : (
                                     
                        <> {data && data.getUser.username.charAt(0)==='S' &&  
                        <div id='test' className="rightfixed">

                            <div className="sidebarright">

                                    <p style={{fontFamily:'Calibri', textAlign:'right' , fontSize:'25px' , fontWeight:'600' , color:'teal'}}>מדדים</p>
                                    <p style={{fontFamily:'Calibri', textAlign:'right' , fontSize:'18px' , fontWeight:'600' , color:'gray'}}>דפים - <span style={{color:'darkslategray'}}> {data.getUser.paper[date]} </span><span style={{fontSize:'12px'}}>ש"ח לחודש זה </span> <Icon style={{paddingLeft:'10px'}} color='green' name='sticky note'></Icon></p>
                                    <p style={{fontFamily:'Calibri', textAlign:'right' , fontSize:'18px' , fontWeight:'600' , color:'gray'}}>חשמל - <span style={{color:'darkslategray'}}> {data.getUser.electricity[date]} </span><span style={{fontSize:'12px'}}>ש"ח לחודש זה </span> <Icon style={{paddingLeft:'10px'}} color='green' name='plug'></Icon></p>
                                    <p style={{fontFamily:'Calibri', textAlign:'right' , fontSize:'18px' , fontWeight:'600' , color:'gray'}}>מים - <span style={{color:'darkslategray'}}> {data.getUser.water[date]} </span><span style={{fontSize:'12px'}}>ש"ח לחודש זה </span> <Icon style={{paddingLeft:'10px'}} color='green' name='shower'></Icon></p>
                                    <p style={{fontFamily:'Calibri', textAlign:'right' , fontSize:'18px' , fontWeight:'600' , color:'gray'}}>גז - <span style={{color:'darkslategray'}}> {data.getUser.gas[date]}</span> <span style={{fontSize:'12px'}}>ש"ח לחודש זה </span> <Icon style={{paddingLeft:'10px'}} color='green' name='hotjar'></Icon></p>
                                
                            </div>

                            </div>
                        }</>

                     )}          



                    </div>  

                </div>
        </div> 
    );
}
 


const SUBMIT_UPDATE_MUTATION = gql`
  mutation update($phone:String! , $address:String! , $website:String! , $email:String!, $username:String! , $name:String! , $image:String!)  {
    updateUser(updateInput:{
        phone: $phone,
        address: $address,
        website: $website,
        email: $email,
        name:$name,
        username:$username,
        image:$image
    }) {
        phone address website email username name image
    }
  }
`;



export default Profile;