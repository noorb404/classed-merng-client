import ChartistGraph from 'react-chartist';
import React, { useState } from 'react';
import { Card, Container, Dropdown } from 'semantic-ui-react';
import { Row , Col } from 'react-bootstrap';

const options = [
    { key: 'Paper', text: 'דפים', value: 'Paper' },
    { key: 'Water', text: 'מים', value: 'Water' },
    { key: 'Gas', text: 'גז', value: 'Gas' },
    { key: 'Electricity', text: 'חשמל', value: 'Electricity' },
  ];

const GraphStatisticsFinish = props => {

    const [Madad, setMadad] = useState();
    const [ok,setOk] = useState();
    const {paper} = props.user;
    const {water} = props.user;
    const {gas} = props.user;
    const {electricity} = props.user;
    
    const  handleSelectChange = (e, data) =>{
        setMadad(data.value);
        setOk(true);
    };


    const dataSales = {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "June",
          "July",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ],
        series:[ Madad==='Paper' ? paper : Madad==='Water'? water : Madad==='Gas'? gas : electricity ]

    }
console.log(dataSales);
      
      
      return (
         <Container> 
           <div className="content">
          <Container>
            <Row >
  
         
              <Col>
                      <Dropdown         placeholder="לבחור סוג"
                                        onChange={handleSelectChange}
                                        fluid
                                        search
                                        selection
                                        defaultValue={1}
                                        style={{marginBottom:'20px' , textAlign:'right'}}
                                        options={options}/>
                    <Card style={{width:'1100px'}}>
                      <div className="card-header ">
                        <h4 className="card-title" style={{textAlign:'right' , fontFamily:'Calibri'}}>תשלומי {Madad==='Paper' ? 'דפים' : Madad==='Water'? 'מים' : Madad==='Gas'? 'גז' : 'חשמל'} </h4>
                        <p className="card-category" style={{textAlign:'right' , fontFamily:'Calibri'}}>שנה אחרונה</p>
                      </div>
                      <div className="card-body ">
                       {ok && <ChartistGraph data={dataSales} type="Line" />}
                      </div>
                      <div className="card-footer ">
                        <hr />
                        <div className="stats" style={{textAlign:'right' , fontFamily:'Calibri'}}>
                          <i className="fa fa-history" ></i> עודכן בחודש זה
                        </div>
                      </div>
                    </Card>
              </Col>
  
            </Row>
          </Container>
        </div>
        </Container>
      )
}
 
export default GraphStatisticsFinish;