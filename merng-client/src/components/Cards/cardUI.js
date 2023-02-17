import React from'react';

import ImageGallery from 'react-image-gallery';
import GoogleMap from './Maps';
 
const images = [
  {
    original: 'https://www.tokeep.co.il/images/tokeep/gallery/_i_eooZu_ie__uou.jpg',
    thumbnail: 'https://www.tokeep.co.il/images/tokeep/gallery/_i_eooZu_ie__uou.jpg',
  },
  {
    original: 'https://aus.co.il/wp-content/uploads/2016/05/Picture3.jpg',
    thumbnail: 'https://aus.co.il/wp-content/uploads/2016/05/Picture3.jpg',
  },
  {
    original: 'https://www.tokeep.co.il/images/article-pictures/487/1280px-PikiWiki_Israel_10615_technion_ecological_garden.jpg',
    thumbnail: 'https://www.tokeep.co.il/images/article-pictures/487/1280px-PikiWiki_Israel_10615_technion_ecological_garden.jpg',
  },
];
 
const Card = props => {
    
return (

    <div className="card text-center shadow">
    <div className="overflow">
    <img src={props.imgsrc} alt="Image1" className="card-img-top"/>
    </div>
    <div className="card-body text-dark">
        <h4 className="card-title"> {props.title} </h4>
        <p className="card-text text-secondary">
      {props.text}
        </p>
        <a href="#popup1" className="btn btn-outline-success">     צור קשר    </a>  &nbsp;
        <a  href="#popup3"className="btn btn-outline-success" > עוד תמונות </a>  
        &nbsp;
        <a href="#popup2" className="btn btn-outline-success">  יותר פרטים </a>   &nbsp; 
        <a href="#popupMap" className="btn btn-outline-success">    מיקום על המפה    </a> &nbsp;
        <a href={props.URL} className="btn btn-outline-success"> אתר הארגון </a> &nbsp;  
    </div>

        <div id="popupMap" className="popup">
        <a href="#1" className="close">&times;</a>
          <GoogleMap />
        </div>

        <div id="popup1" className="popup">
              <a href="#1" className="close">&times;</a>
              <h2>:ניתן ליצור קשר בדרכים הבאות</h2> 
              <h3>משרד הגן טל- 077-8872838 </h3>
              <h3>פקס – 04-8320317 </h3>
              <h3> ecotechnion@gmail.com : מייל הגן 
            </h3>
              <h3> מנהל הגן: חנוך רפפורט, 052-4869865</h3>
              <p>ניתן להתעדכן באתר הפייסבוק של הגן: הגן האקולוגי בטכניון בפייסבוק </p>             
            <a href="#1" className="close-popup">&times;</a>

        </div>

        <div id="popup2" className="popup">
      <a href="#1" className="close">&times;</a>
    <p className="tit2"> הגן הבוטני – אקולוגי</p>
    <p>
    הגן בטכניון משתרע על פני כ-20 דונם בתוך קריית הטכניון, בגן קיימים מערכות אקולוגיות שונות, סביבות חיים ובתי גידול. המבקר המסייר בין שבילי הגן ואזורי ההדגמה שלו פוגש תופעות טבע ונחשף לרעיונות סביבתיים ומדעיים.
    </p>
    <p> הגן הוקם בשנת 1982 ביוזמתו של פרופ' זאב נאווה מהפקולטה לחקלאות, ובתמיכתו של נשיא הטכניון דאז מר עמוס חורב, פרופ' רון לובינגר, אדריכל נוף נודע מאוניברסיטת יוג'ין באורגון, אשר הרבה ללמד כמרצה אורח בפקולטה לארכיטקטורה ובינוי ערים, תכנן את שיקומו של השטח בגן נחקרה ונבחנה התאמת צמחים מהארץ ומהעולם לשמש בשיקום נופי, על פי עקרונות אקולוגיים. תוך מתן מענה לשתי בעיות סביבתיות מרכזיות במדינת ישראל מחסור במים וצמצום השטחים הפתוחים.
          </p>
          <p>
          החל משנת 2012 הגן קיבל הכרה כגן בוטני ושייך לאחד מ 11 הגנים הבוטניים בארץ.
          </p>
          <p>
          תפקידי הגן: מפגש בין האדם לטבע, הדגמה של תועלת הרמונית של האדם והטבע, הנגשה של האקולוגיה, מקום בילוי לסטודנטים, נופש ומנוחה מהלימודים.  ערך חינוכי לימודי. חיבור לטבע. מפגש בין אנשים, קהילות, פקולטות… שימור מאגר בוטני.
          </p>
          <p> :צוות הגן </p>
          <p> <strong className="Tit">- חנוך רפפורט </strong>
          מנהל הגן משנת 2014 בעל תואר שני בלימודי ארץ ישראל ומורה דרך.
          </p>
    <p> <strong className="Tit"> -אורן אזארי   </strong>
    אגרונום הגן משנת 2012, בעל תואר ראשון במדעי הצומח בחקלאות ותואר שני בניהול משאבי טבע וסביבה
    </p>
    <p> <strong className="Tit"> -בשמת סגל    </strong>
    אוצרת ובוטנאית הגן משנת 2012, בעלת תואר ראשון בביולוגיה ותואר שני במדעי הנדסה חקלאית התמחות באקולוגיה של הצומח
    </p>
    <a href="#1" className="close-popup">&times;</a>
        </div>

        <div id="popup3" className="popup">
      <a href="#1" className="close">&times;</a>
      <ImageGallery items={images} />;
      <a href="#1" className="close-popup">&times;</a>



        </div>
      
        
    </div>


 
);

}
export default Card;

