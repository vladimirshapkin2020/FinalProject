import React from 'react';
import { Link } from 'react-router-dom';
import "./Home.css";
import Order from './Order';
import { Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import "./Order.css"



function Home() {
  const navigate = useNavigate();
  const navigateToOrder = () => {
    navigate('/Order');
  };
  return (
    <div className="container-fluid" id='Home'>

      <div className='card-header' id="homeCardHeader">
       <h1>ברוכים הבאים למזנון</h1>
      </div>

      <div className='card-body' id="homeCardBody">
        <h4>הכל בפיתה הכל טעים</h4>
      </div>
        
     

      <div className='card-bottom' id="homeCardBottom">       
      <Button variant="contained" color="success" size="large" onClick={navigateToOrder}>
         להזמנה לחצו עלי
      </Button>
      </div>  
    </div>
  )
}

export default Home