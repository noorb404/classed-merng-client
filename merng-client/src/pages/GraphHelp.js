import {FETCH_USERS_QUERY} from '../util/GraphQL';
import { useQuery } from '@apollo/react-hooks';
import GarphStatistics from './GarphStatistics';

const GraphHelp = () => {

    const {loading , data} = useQuery(FETCH_USERS_QUERY);


    return ( 
            <div>
                    {
                        
                        loading? <div className='text-center'><p>Loading..</p> </div>: (
                            <>
                           
                           
                            {   data && 
                                   
                                   <GarphStatistics users={data.getUsers} />
                            }

                            </>
                        )
                        
                        
                    }
            </div> 
    );
}
 
export default GraphHelp;