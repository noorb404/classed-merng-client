
import React, { useState } from 'react'
import {  Container, Dropdown, Table } from 'semantic-ui-react';
import '../components/Cards/card-style.css';
import PostUpload from '../components/Posts/PostUpload';
const options = [
    { key: 'Paper', text: 'דפים', value: 'Paper' },
    { key: 'Water', text: 'מים', value: 'Water' },
    { key: 'Gas', text: 'גז', value: 'Gas' },
    { key: 'Electricity', text: 'חשמל', value: 'Electricity' },
  ];
const CompareTable = props => {
    const month = new Date().getMonth();
    const prevMonth = new Date();
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    const [Choosen , setChoosen] = useState();





    const  displayChoosen = (e, data) =>{
        setChoosen(data.value);
    };
    function calc(user){
        return ((user[prevMonth.getMonth()] / user[month] ) * 100).toFixed(1);
    }



    return ( 
            <Container className="p-5">
             <h2 style={{padding:'0' , paddingTop:'20px' , paddingBottom:'30px'}}>בחר מדד להשוות</h2>
             <div className="text-center pt-5">
             <Dropdown        placeholder="חשמל"
                                        onChange={displayChoosen}
                                        fluid
                                        search
                                        selection
                                        defaultValue={1}
                                        style={{marginBottom:'20px' , textAlign:'right'}}
                                        options={options}/>

            </div>
            
             <Table textAlign='right' color='green' key='green'>
                <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>יצירת פוסט</Table.HeaderCell>
                    <Table.HeaderCell>אחוז</Table.HeaderCell>
                    <Table.HeaderCell>חודש שעבר</Table.HeaderCell>
                    <Table.HeaderCell>חודש זה</Table.HeaderCell>
                    <Table.HeaderCell>מדד</Table.HeaderCell>
                    <Table.HeaderCell>בית ספר</Table.HeaderCell>
                </Table.Row>
                </Table.Header>

                <Table.Body>
               {    props.users.map( user => ( user.username.charAt(0) !== 'E' &&

                    <Table.Row>
                        <Table.Cell> <a href="#popup2" className="btn btn-outline-success"> יצירת פוסט </a> </Table.Cell>
                    
                        <Table.Cell>{Choosen==='Paper'? calc(user.paper) : Choosen==='Water'? calc(user.water) : Choosen==='Gas'? calc(user.gas) : calc(user.electricity)}%</Table.Cell>
                        <Table.Cell>{Choosen==='Paper'? user.paper[prevMonth.getMonth()] : Choosen==='Water'? user.water[prevMonth.getMonth()] : Choosen==='Gas'? user.gas[prevMonth.getMonth()] : user.electricity[prevMonth.getMonth()]}</Table.Cell>
                        <Table.Cell>{Choosen==='Paper'? user.paper[month] : Choosen==='Water'? user.water[month] : Choosen==='Gas'? user.gas[month] : user.electricity[month]}</Table.Cell>
                        <Table.Cell>{Choosen==='Paper'? 'דפים' : Choosen==='Water'? 'מים' : Choosen==='Gas'? 'גז' : 'חשמל'}</Table.Cell>
                        <Table.Cell>{user.name}</Table.Cell>
                    </Table.Row>

               ))}
                </Table.Body>
            </Table>
            <div style={{width:'50vw',height:'50vh'}} id="popup2" className="popup">
                <a href="#1" className="close">&times;</a>  
                            <p className="mr-5"> אחרי כתיבת פוסט ללחוץ פעם אחת על פרסם </p>
                            <PostUpload />
            </div>
            </Container > 
    );
}
 
export default CompareTable;