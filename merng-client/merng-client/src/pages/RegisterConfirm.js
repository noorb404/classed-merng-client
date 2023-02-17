import { useState } from 'react';
import {Container, Form, Grid, Header, Segment } from 'semantic-ui-react';
import Register from './Register';


const RegisterConfirm = () => {

    const DUMMY_SECRET = 'PASSWORD';
    const [show,setShow] = useState(false);
    const handleChange = e => {
        if(e.target.value === DUMMY_SECRET)
            setShow(true);
        else
            setShow(false);
    }

    return ( 
        <Container>
            <Register />
        </Container>

     );
}
 
export default RegisterConfirm;