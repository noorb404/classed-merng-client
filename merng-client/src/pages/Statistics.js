import ChartistGraph from 'react-chartist';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/auth';
import { Card, Container, Dropdown, Icon } from 'semantic-ui-react';
import { Row , Col } from 'react-bootstrap';

const options = [
    { key: 'Paper', text: 'דפים', value: 'Paper' },
    { key: 'Water', text: 'מים', value: 'Water' },
    { key: 'Gas', text: 'גז', value: 'Gas' },
    { key: 'Electricity', text: 'חשמל', value: 'Electricity' },
  ];

const Statistic = () => {

    const auth = useContext(AuthContext);
    const [Madad, setMadad] = useState();

    const  handleSelectChange = (e, data) =>{
        setMadad(data.value);
    };

    let dataSales = {
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
        series:[ Madad==='Paper' ? auth.user.paper : Madad==='Water'? auth.user.water : Madad==='Gas'? auth.user.gas : auth.user.electricity ]

      }
      
      return (
         <Container> 
           <div className="content">
           <div  id="test" className="rightfixed">

              <div className="sidebarright">

                {Madad === 'Gas' ?

                        <div>
                          <div className='text-center pb-4'><Icon size='big' name='hotjar'></Icon> </div>
                          <p style={{fontFamily:'Calibri',letterSpacing:'1.2px'}}><strong>טיפ ראשון לחיסכון </strong>  – תשלום גז בהוראת קבע חברת הגז מספקת הנחה משמעותית למשלמים בהוראת קבע – נצלו את זה. במידה שהחלטתם לשלם את חשבון הגז בהוראת קבע, בצעו את ההוראה דרך כרטיס האשראי. זאת משום שעל ביצוע הוראת קבע דרך הבנק תצטרכו לשלם עמלה.</p>
                          <p style={{fontFamily:'Calibri',letterSpacing:'1.2px'}}>  <strong>טיפ שני לחיסכון </strong>  – איום בהתנתקות לאחר שבדקתם כמה אתם משלמים לחברת הגז, תוכלו לקיים משא ומתן עם חברת הגז הנוכחית שמספקת לכם את הגז להורדת המחיר, ואף להחליט לסיים את חוזה ההתקשרות עמה ולעור לספקית גז אחרת</p>
                        </div>

                        :   
                Madad === 'Water'?

                        <div>
                            <div className='text-center pb-4'><Icon size='big' name='shower'></Icon> </div>
                            <p style={{fontFamily:'Calibri',letterSpacing:'1.2px'}}><strong>טיפ ראשון לחיסכון </strong>תיקונם של כלל הברזים ומערכות השקייה בבית הספר יכול לחסוך כ-60 ליטר ביום</p>
                            <p style={{fontFamily:'Calibri',letterSpacing:'1.2px'}}>  <strong>טיפ שני לחיסכון </strong>השקיה בשעות הלילה אחרי שהשמש שוקעת תקטין את התאיידות המים</p>
                            <p style={{fontFamily:'Calibri',letterSpacing:'1.2px'}}>  <strong>טיפ שלישי לחיסכון </strong>ככל שכץ גדול יותר הוא צורך יותר מים דך שגיזום של העיצים שיחים וכיסוח דשא יצמצם את צריכת המים</p>
                        </div>
                        :
                        
                Madad === 'Paper'?
                                
                        <div>
                            <div className='text-center pb-4'><Icon size='big' name='sticky note'></Icon> </div>

                            <p style={{fontFamily:'Calibri',letterSpacing:'1.2px'}}><strong>טיפ ראשון לחיסכון </strong>  העדיפו דואר אלקטרוני במקום משלוח מכתב כתוב על נייר.  </p>
                            <p style={{fontFamily:'Calibri',letterSpacing:'1.2px'}}>  <strong>טיפ שני לחיסכון </strong> לעובדים או שוהים לאורך זמן במקום קבוע (כמו משרד או חדר מורים) הביאו אתכם כוס מזכוכית או קרמיקה והימנעו משימוש בכוסות חד-פעמיות </p>
                            <p style={{fontFamily:'Calibri',letterSpacing:'1.2px'}}>  <strong>טיפ שלישי לחיסכון </strong>החליפו מגבות נייר במגבות בד הניתנות לשימוש חוזר ולכביסה.  במקומות ציבוריים – העדיפו ייבוש ידיים בזרם אוויר חם במקום במגבות נייר או ניירות טואלט שיש במקום </p>
                        </div>

                        :





                                      
                        <div>
                            <div className='text-center pb-4'><Icon size='big' name='plug'></Icon> </div>
                            <p style={{fontFamily:'Calibri',letterSpacing:'1.2px'}}><strong>טיפ ראשון לחיסכון </strong>מזגן הוא המכשיר צורך האנרגיה העיקרי בבית הספר, לכן נסו לצמצם בהפעלתו בימים שלא צריך בהן מזגן.</p>
                            <p style={{fontFamily:'Calibri',letterSpacing:'1.2px'}}>  <strong>טיפ שני לחיסכון </strong> מכשירי חשמל יעילים אנרגטית: לכל מכשיר חשמל יש דירוג יעילות. הדירוג מבטא את יעילות תפוקת האנרגיה ובעצם כמה טוב וחסכוני המכשיר. הדירוג הוא בין האותיות  G-  לא יעיל ועד A- יעיל ביותר. מקרר בדירוג A יחסוך בצריכה שנתית 396 קילוואט יחסית למקרר באותו נפח מדירוג G.</p>
                        </div>

                }


              </div>

          </div>

          <Container>
            <Row >
  
              
              <Col>
                      <Dropdown         placeholder="חשמל"
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
                   <ChartistGraph data={dataSales} type="Line" />
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
 
export default Statistic;