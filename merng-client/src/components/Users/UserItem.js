import { Button, Card, Container, Icon, Label , Loader } from "semantic-ui-react";

import moment from 'moment';
import { Link } from "react-router-dom";
import {AuthContext} from '../../context/auth';
import { useContext } from "react";
import LikeButton from '../LikeButton';
import MyPopup from "../../util/MyPopup";
import {Image} from 'cloudinary-react';
import { useQuery } from "@apollo/react-hooks";
import { FETCH_USER } from "../../util/GraphQL";
import './User.css'

const UserItem = ({User:{id,phone,address,email,website,image,date,gas,water,paper,username,name,electricity}}) => {
    const context = useContext(AuthContext);

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
                        <a>
                            <Icon name='home' />
                            {address}
                        </a>
                        </Card.Content>
                    </Card>
                
                    
                    
    

        

                    </li>

      );
}
 
export default UserItem;