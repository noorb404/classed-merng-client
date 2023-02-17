import {useQuery} from '@apollo/react-hooks';
import school1 from '../images/school1.jpeg';
import school2 from '../images/school2.jpeg';
import egod from '../images/egod.jpeg';
import '../css/Home.css';
import '../css/Header.css';
import PostList from '../components/Posts/PostList';
import PostUpload from '../components/Posts/PostUpload';
import  {FETCH_POSTS_QUERY , FETCH_USER, FETCH_USERS_QUERY} from '../util/GraphQL';
import {AuthContext} from '../context/auth';
import { useContext } from 'react';
import { Icon, Loader } from 'semantic-ui-react';
import {Image} from 'cloudinary-react';
import UserList from '../components/Users/UserList';





const Home = () => {
   
    const date = new Date().getMonth();
    const auth = useContext(AuthContext);
    const {loading , data} = useQuery(FETCH_USERS_QUERY);
    
    
    return ( 

        <div>
                <div  className="content">
                    <div id="background" className="wrapper">
 
                    { loading? <Loader active inline='centered' /> : (
                                <>
                                {data &&
                                    <>



                                <div>
                                    { data && <UserList items={data.getUsers} />}
                                </div>
                            

              
                   
 
                        </>
                    }
                 </> )
                 }
                        










                    </div>
                </div>   
















         </div>

    
    );
}


export default Home;