import React, { useEffect, useState } from 'react'
import { Button } from "@mui/material";
import "./Basket.css"
import "./Finalea.css"
import { useNavigate } from 'react-router-dom';

function Finalea({userPhone, newStart}) {
  const [orders,setOrders] = useState([]);
  const navigate = useNavigate();
  const backToHome = () => {
    newStart();
    navigate('/');
  };

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/orders/?phone=${userPhone}`)
    .then((res) => res.json())
    .then((data) => setOrders(data[data.length -1]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    console.log(orders)
  },[]);

  return (
    <div id='finalea'>
    
      <main className='container-fluid' id="finaleaCard">
        <div className="row">
        <div className="col">
        <div className="card w-50" style= {{width: "40rem", height: "18rem"}} id="orderCard">
        <div className="card-body" id="orderCardBody">
        <h5 className="card-title" id='orderCardHeader'>הזמנה מספר: {orders.id}</h5>
        <p className="card-text">כתובת לשליח {orders.address}</p>
        <h5 className="card-title" id='orderCardHeader'>תודה על תרומתך לכיסי</h5>
        <div>
        <Button id="finito" onClick={backToHome}> סיום וחזרה למסך ראשי</Button>  
        </div>
        </div>
        </div>
        </div>
        </div>
      </main>
    </div>
  )
}

export default Finalea