import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Navbar , Nav } from 'react-bootstrap';
import './NavigationBar.css';
import { Container, Icon, Loader } from 'semantic-ui-react';
import {AuthContext} from '../../context/auth';
import { gql, useMutation, useQuery,useSubscription } from '@apollo/react-hooks';
import { FETCH_USER } from '../../util/GraphQL';
import {Image} from 'cloudinary-react';


const NEW_LIKE = gql`

    subscription{
        newLike{
            id
            description
            commentCount
            username
            name
        }
    }

`;


const NavigationBar = () => {
        const context = useContext(AuthContext);
        const s='sad';
        const {loading,data} = useQuery(FETCH_USER,{
            variables:{
                username: context.user? context.user.username : null
            }
        });

        const { data: notifData , loading:notifLoad } = useSubscription(
            NEW_LIKE
          );
        return (     
            <Container style={{width:'100%' , padding:'0'}}>
                  
                    <Navbar collapseOnSelect expand="lg" className="navbar navbar-expand-md navbar-dark  border-bottom shadow-sm">
                            <Container>
                                
                            
                        <Navbar.Toggle className="custom-toggler" aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                        <Navbar.Brand  id="Green" href="/">GreenIT</Navbar.Brand>
                      
                        {context.user &&<>
                            {loading?  <Loader active inline='centered' /> : ( data && <> 
                                <Nav.Link id="miniuser">   <Image  style={{borderRadius:'50%' , height: '50px' , width:'50px' ,  verticalAlign: 'middle' }}   cloudName='ddlf8wxvm' publicId={data.getUser.image}/></Nav.Link>
                                <Nav.Link id="miniuser" style={{ fontFamily:'Calibri', marginLeft:'-22px' }} href={`/${data.getUser.username}/Profile`}>{data.getUser.name}</Nav.Link>
                                
                            </>)}
                        <Nav.Link style={{ fontFamily:'Calibri' }} onClick={context.logout} id="Home" href="/login"><Icon size='small' name="sign-out"></Icon>התנתק </Nav.Link>
                     

                        <Nav className="ml-auto">
                            
                           
                            <Nav.Link style={{fontSize:'larger' , fontFamily:'Calibri' }}   id="Home" href="/AllUsers">משתמשים</Nav.Link>
                            <div id='v2' className="vl"></div>
                            {context.user.type==='1' && <> <Nav.Link style={{fontSize:'larger' , fontFamily:'Calibri' }} id="Home" href="/">הטבות</Nav.Link>
                            <div id='v2' className="vl"></div>
                            <Nav.Link style={{fontSize:'larger' , fontFamily:'Calibri' }} id="Home" href="/statistics">נתונים סטטיסטיים</Nav.Link>
                            <div id='v2' className="vl"></div>
                            <Nav.Link style={{fontSize:'larger' , fontFamily:'Calibri' }} id="Home" href="/organizations">ארגונים ירוקים</Nav.Link> </>}


                            {context.user.type==='2' && <>
                            <Nav.Link style={{fontSize:'larger' , fontFamily:'Calibri' }} id="Home" href="/GraphHelp">גרף השוואות</Nav.Link>
                            <div id='v2' className="vl"></div>
                            <Nav.Link style={{fontSize:'larger' , fontFamily:'Calibri' }} id="Home" href="/TableHelp">טבלת השוואות</Nav.Link> </>}

                            <div id='v2' className="vl"></div>
                            <Nav.Link style={{fontSize:'larger' , fontFamily:'Calibri' }}  id="Home" href="/">לוח שנה</Nav.Link>
                            <div id='v2' className="vl"></div>
                            <Nav.Link style={{fontSize:'larger' , fontFamily:'Calibri' }}   id="Home" href={`/${context.user.username}/Profile`}>פרופיל שלי</Nav.Link>
                            <div id='v2' className="vl"></div>
                            <Nav.Link style={{fontSize:'larger' , fontFamily:'Calibri' }}   id="Home" href="/">דף הבית</Nav.Link>
                            <div id='v2' className="vl"></div>
                            <Nav.Link style={{fontSize:'larger' , fontFamily:'Calibri' }} class="notif" id="notif" href="#"><Icon name='bell'></Icon>
                            <div id="notify"  >
                                    <hr style={{background:'white',width:'90%'}}></hr>
                                    <p>{notifLoad? 'Loading...' : notifData && notifData.newLike.username}</p>
                            </div>
                            </Nav.Link>
       
                        </Nav></>}
                       
                        </Navbar.Collapse>
                        </Container>
                    </Navbar>
            </Container>
        );
   
}

 
export default NavigationBar;