import {  Card,  Icon } from "semantic-ui-react";

import { Link } from "react-router-dom";
import { Nav } from 'react-bootstrap';

import {Image} from 'cloudinary-react';
import './User.css'

const UserItem = ({User:{address,website,image,date,username,name}}) => {

    return (
      
        <li className="user-item">

                    <Card>
                        <Image className='image-adjust' cloudName='ddlf8wxvm' publicId={image}  wrapped ui={false}/>
                        <Card.Content>
                        
                        <Card.Header><Link to={`/${username}/profile`}>{name}</Link></Card.Header>
                        <Card.Meta>
                            <span  className='date'>Joined in {date}</span>
                        </Card.Meta>
                        <Card.Description>
                            {website}
                        </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                        <Nav.Link>
                            <Icon name='home' />
                            {address}
                        </Nav.Link>
                        </Card.Content>
                    </Card>
                
                    
                    
    

        

                    </li>

      );
}
 
export default UserItem;