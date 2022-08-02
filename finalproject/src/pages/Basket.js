import React from 'react'
import { Button } from "@mui/material";
import "./Basket.css"
import { useNavigate } from 'react-router-dom';


function Basket({orderDishes, total,removeDish}) {
  const navigate = useNavigate();
  const navigateToOrder = () => {
  navigate('/Order')
};
  const navigateToCustomer = () => {
    navigate('/Customer')
  }

  return (
    <div id="basketbackground">
    <nav className="navbar navbar-light bg-light">    
        <Button id="continueToCustomer" onClick={navigateToCustomer}>המשך</Button>    
        <div>סה"כ לתשלום: ₪{total}</div>
        {/* <div>סה"כ פריטים: {orderDishes.length}</div> */}
        <Button id="buttonBackToOrder" onClick={navigateToOrder}>חזור לתפריט</Button>     
    </nav>  

    <div className="scroller">
      <main className='container-fluid'>
          {orderDishes.map((d) => {
            return (
        <div className="row" key={d.key}>
        <div className="card" style= {{width: "18rem"}} id="orderCard" >
        
        <div className="card-body" id="orderCardBody">
        <h5 className="card-title" id='orderCardHeader'>{d.name}</h5>
        <p className="card-text">{d.description}</p>
        <Button id='removeMeal' onClick={() => removeDish(d) }>הסר מנה</Button>
        <p>₪{(d.price)}</p>
        </div>
        </div>
        </div>
            )
          })}
        
      </main>
    </div>
    </div>
  )
}

export default Basket

