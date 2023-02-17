import {useQuery} from '@apollo/react-hooks';
import '../css/Home.css';
import '../css/Header.css';
import  { FETCH_USERS_QUERY} from '../util/GraphQL';
import { Loader } from 'semantic-ui-react';
import UserList from '../components/Users/UserList';





const Home = () => {
   
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