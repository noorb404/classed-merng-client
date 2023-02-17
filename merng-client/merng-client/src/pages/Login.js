import gql from 'graphql-tag';
import { useContext, useState } from 'react';
import {Container, Button, Form, Grid, Header,  Segment } from 'semantic-ui-react';
import {useMutation} from '@apollo/react-hooks';
import useForm from '../util/hooks';
import {AuthContext} from '../context/auth';
import {Navbar , Nav } from 'react-bootstrap';


const Login = props => {
    const context = useContext(AuthContext);
    const [errors,setErrors] =useState({});
   

    const {onChange , onSubmit , values } = useForm(Signin,{
        username: '',
        password: ''
    });

    const [loginUser , {loading}] = useMutation(LOGIN_USER,{
        update(_,result){
            context.login(result.data.login);
            props.history.push('/');
        },
        onError(err){
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: {
            username:values.username,
            password:values.password,
        }
    })

    function Signin(){
        loginUser();
    }

   




    return ( 
        <Container>
         <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='green' textAlign='center'>
                Login to GreenIT
            </Header>
            <Form onSubmit={onSubmit} size='large' className={loading? 'loading' : ''}>
                <Segment stacked>
                <Form.Input required error={errors.username ? true : false}  fluid name='username' onChange={onChange}  values={values.username} icon='user' iconPosition='left' placeholder='User Name' />
                <Form.Input
                    values={values.password}
                    error={errors.password ? true : false}
                    onChange={onChange} 
                    fluid
                    required
                    icon='lock'
                    name='password'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                />        
                <Button type="submit" color='green' fluid size='large'>
                    Login
                </Button>
                </Segment>
                <Button  color='gray' fluid size='medium'>        
                    <Nav.Link id="register"  href={`/Secret-Backdoor-Register`}>New User?</Nav.Link>
                </Button>

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
 

const LOGIN_USER = gql`

    mutation login(
        $username: String!
        $password: String!
    ){
        login(
                username: $username
                password: $password
        ){
            id phone address email website image date gas water paper electricity username token name type
        }
    }
`
export default Login;