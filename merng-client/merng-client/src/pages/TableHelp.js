import {FETCH_USERS_QUERY} from '../util/GraphQL';
import { useQuery } from '@apollo/react-hooks';
import CompareTable from './CompareTable';

const TableHelp = () => {

    const {loading , data} = useQuery(FETCH_USERS_QUERY);


    return ( 
            <div>
                    {
                        
                        loading? <div className='text-center'><p>Loading..</p> </div>: (
                            <>
                           
                           
                            {   data && 
                                   
                                   <CompareTable users={data.getUsers} />
                            }

                            </>
                        )
                        
                        
                    }
            </div> 
    );
}
 
export default TableHelp;