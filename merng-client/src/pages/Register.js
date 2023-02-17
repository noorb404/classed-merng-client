import gql from 'graphql-tag';
import { useState } from 'react';
import {Container, Button, Form, Grid, Header, Segment ,Select} from 'semantic-ui-react';
import {useMutation} from '@apollo/react-hooks';
import useForm from '../util/hooks';
import {Navbar , Nav } from 'react-bootstrap';

const Register = () => {
    const [errors,setErrors] =useState({});
    const {onChange , onSubmit , values } = useForm(registerUser,{
        username: '',
        password: '',
        confirmPassword: '',
        type:0
    });
    const [show,setShow] = useState(false);

    const options = [
        { key: '1', text: 'School', value: '1' },
        { key: '2', text: 'Organization', value: '2' }
      ]
    const [addUser , {loading}] = useMutation(REGISTER_USER,{

        onError(err){
            setErrors(err && err.graphQLErrors[0]?err.graphQLErrors[0].extensions.exception.errors: {});
        },
        variables: {
            username:values.username,
            password:values.password,
            confirmPassword:values.confirmPassword,
            type:values.type
        }
    })

    function registerUser(){
        setErrors({});
        addUser();
        if(values.username!=='' && values.password!=='' && values.confirmPassword!=='' && values.type!=='')
            setShow(true);
    }




    return ( 
        <Container>
         <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='green' textAlign='center'>
                Register to GreenIT
            </Header>
            <Form onSubmit={onSubmit} size='large' className={loading? 'loading' : ''}>
                <Segment stacked>
                <Form.Input error={errors.username ? true : false}  fluid name='username' onChange={onChange}  values={values.username} icon='user' iconPosition='left' placeholder='User Name' />
                <Form.Field error={errors.username ? true : false}  fluid name='type'   control={Select} value={values.type}  options={options} placeholder='User Type' onChange={(_, { value }) => onChange({ target: { name: 'type', value } })} />
               
                <Form.Input
                    values={values.password}
                    error={errors.password ? true : false}
                    onChange={onChange} 
                    fluid
                    icon='lock'
                    name='password'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                />
               <Form.Input
                    values={values.confirmPassword}
                    error={errors.confirmPassword ? true : false}
                    onChange={onChange} 
                    fluid
                    icon='lock'
                    iconPosition='left'
                    name='confirmPassword'
                    placeholder='Confirm Password'
                    type='password'
                />
           {show && Object.keys(errors).length === 0? 
                <Button  color='gray' fluid size='medium'>        
                    <Nav.Link id="register"  href={`/login`}>Let's Login</Nav.Link>
                </Button>
                :
                <Button type="submit" color='green' fluid size='large'>
                    Sign Up
                </Button> 
            }

                </Segment>
            {!show && Object.keys(errors).length === 0?
                <Button  color='gray' fluid size='medium'>        
                    <Nav.Link id="register"  href={`/login`}>Already registered?</Nav.Link>
                </Button>:null

            }
            </Form>
            {Object.keys(errors).length > 0 ? 
             <div className="ui error message">
                <ul className='list'>
                    {Object.values(errors).map(value => (
                        <li key={value}>{value}</li>
                    ))}
                </ul>
              </div> 
            : null}
            </Grid.Column>
            </Grid>
        </Container>

     );
}
 

const REGISTER_USER = gql`

    mutation register(
        $username: String!
        $password: String!
        $confirmPassword: String!
        $type: String!
    ){
        register(
            registerInput:{
                username: $username
                password: $password
                confirmPassword: $confirmPassword
                type: $type
            }
        ){
            id  username token
        }
    }
`
export default Register;