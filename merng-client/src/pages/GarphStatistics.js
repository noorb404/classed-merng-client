import {useState } from 'react';
import { Container, Dropdown, Grid } from 'semantic-ui-react';
import GraphStatisticsFinish from './GraphStatisticsFinish';



const GarphStatistics = props => {

    let tempUser = [];


    let options = [];
    let userOb = {
        text:'',
        key:'',
        value:'' 
    };
    const [Madad, setMadad] = useState(null);

    const  handleSelectChange = (e, data) =>{
        setMadad(data.value);
    };


    async function test (user) {
        await options.push({
            text:user.text,
            key:user.key,
            value:user.value
        });
    }

        
    props.users.forEach(user => {
        userOb.key = user.username;
        userOb.text=user.name; 
        userOb.value= user.username;
        if(user.username === Madad)
                tempUser=user;
        if(user.username.charAt(0) !== 'E')
        test(userOb);
    });





    return ( 
        <Container>
            <Grid>
                <Grid.Row className="pt-5">
                    <Container className='p-5'>
                    <h3 style={{textAlign:'center' , color:'gray' , fontFamily:'Calibri'}}>נא לבחור בית ספר</h3>
                    <Dropdown       placeholder="לבחור בית ספר"
                                    onChange={handleSelectChange}
                                    fluid
                                    search
                                    selection
                                    style={{marginBottom:'20px' , textAlign:'right' , maxWidth:'1100px'}}
                                    options={options}
                                    />
                    <hr />

                    </Container>
                    { tempUser && Madad && <GraphStatisticsFinish user={tempUser}/>}
                </Grid.Row>
            </Grid>

        </Container>
     );
}
 
export default GarphStatistics;