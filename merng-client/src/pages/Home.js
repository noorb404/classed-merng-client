import {useQuery} from '@apollo/react-hooks';
import '../css/Home.css';
import '../css/Header.css';
import PostList from '../components/Posts/PostList';
import PostUpload from '../components/Posts/PostUpload';
import  {FETCH_POSTS_QUERY , FETCH_USER} from '../util/GraphQL';
import {AuthContext} from '../context/auth';
import { useContext } from 'react';
import { Icon, Loader } from 'semantic-ui-react';
import {Image} from 'cloudinary-react';





const Home = () => {
   
    const date = new Date().getMonth();
    const auth = useContext(AuthContext);
    const {loading , data} = useQuery(FETCH_POSTS_QUERY);
    
    const {loading : loadingUser ,data:UserData} = useQuery(FETCH_USER,{
        variables:{
            username: auth.user.username 
        }
    });
    console.log(auth.user.image);
    return ( 

        <div>
                <div  className="content">
                    <div id="background" className="wrapper">
 
                    { loadingUser? <Loader active inline='centered' /> : (
                                <>
                                {UserData &&
                                    <>


                        <div id='test' className="leftfixed">
                            <div  className="sidebarleft text-center p-4">
                        
                                    <Image  cloudName='ddlf8wxvm' publicId={UserData.getUser.image}/>
                                    <p id="sidename">{UserData.getUser.name}</p>
                                    <p id="ssn">{UserData.getUser.address}</p>
                                    <p id="country">{UserData.getUser.phone}</p>
                                    <p id="nosociety"></p>
                                    <p id="societyname"><strong>{UserData.getUser.website}</strong></p>
                           
                            </div>
                        </div>

              
                    { UserData.getUser.type==='1' &&
                        <div  id="test" className="rightfixed">

                            <div className="sidebarright">
                          
                                    <p style={{fontFamily:'Calibri', textAlign:'right' , fontSize:'25px' , fontWeight:'600' , color:'teal'}}>מדדים</p>
                                    <p style={{fontFamily:'Calibri', textAlign:'right' , fontSize:'18px' , fontWeight:'600' , color:'gray'}}>דפים - <span style={{color:'darkslategray'}}> {UserData.getUser.paper[date]} </span><span style={{fontSize:'12px'}}>ש"ח לחודש זה </span> <Icon style={{paddingLeft:'10px'}} color='green' name='sticky note'></Icon></p>
                                    <p style={{fontFamily:'Calibri', textAlign:'right' , fontSize:'18px' , fontWeight:'600' , color:'gray'}}>חשמל - <span style={{color:'darkslategray'}}> {UserData.getUser.electricity[date]} </span><span style={{fontSize:'12px'}}>ש"ח לחודש זה </span> <Icon style={{paddingLeft:'10px'}} color='green' name='plug'></Icon></p>
                                    <p style={{fontFamily:'Calibri', textAlign:'right' , fontSize:'18px' , fontWeight:'600' , color:'gray'}}>מים - <span style={{color:'darkslategray'}}> {UserData.getUser.water[date]} </span><span style={{fontSize:'12px'}}>ש"ח לחודש זה </span> <Icon style={{paddingLeft:'10px'}} color='green' name='shower'></Icon></p>
                                    <p style={{fontFamily:'Calibri', textAlign:'right' , fontSize:'18px' , fontWeight:'600' , color:'gray'}}>גז - <span style={{color:'darkslategray'}}> {UserData.getUser.gas[date]}</span> <span style={{fontSize:'12px'}}>ש"ח לחודש זה </span> <Icon style={{paddingLeft:'10px'}} color='green' name='hotjar'></Icon></p>
                                
                            </div>

                        </div>
                        }
 
                        </>
                    }
                 </> )
                 }
                        <div id="background"  className="mainnotfixed">
  
                           <PostUpload />


                            <hr />

        
                            <div id="allpost"  className="allpost">
                            {loading ? (
                                <Loader active inline='centered' />
                            ): (
                                <div>
                                    { data && <PostList items={data.getPosts} />}
                                </div>
                            )}	 

                            </div>

                        </div>











                    </div>
                </div>   
















         </div>

    
    );
}


export default Home;