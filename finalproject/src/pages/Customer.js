import React, { useState } from 'react'
import { Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import "./Customer.css"

function Customer({orderDishes,setUserPhone }) {
  const navigate = useNavigate();
  const navigateToOrder = () => {
    navigate('/Order');
  };
  const navigateToFinalea = () => {
    if (customerForm.first_name !== ""){
      if(customerForm.last_name !== ""){
        if (customerForm.phone !== ""){
          if(customerForm.address !== ""){
            fetch("http://127.0.0.1:8000/orders/", {
              method: "POST",
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify(customerForm),
            })
            .then((res) => res.json())
            .then((data) => console.log(data));
          setUserPhone(customerForm.phone);
          navigate('/Finalea');
          }else{
            window.alert("חובה למלא כתובת!")
          }
        }else{
          window.alert("חובה למלא מספר פלאפון!")
        }
      }else{
        window.alert("חובה למלא שם משפחה!")
      }
    }else{
      window.alert("חובה למלא שם פרטי!")
    }  
  };

  const [customerForm,setCustomerForm] = useState({
    dishes:orderDishes,
    first_name:'',
    last_name:'',
    address:'',
    phone:'',
  });
  const handleForm = (event) => {
    setCustomerForm((prevForm) => {
      return { ...prevForm, [event.target.name]: event.target.value};
    });
  };


  return (
    
   <div id='basketFluid'>
    <center>
      <main className='container-fluid' id='basketFluidCard'>
        <div className="row">
          <div className="col">
            <div className="card" style= {{width: "50rem", height: "23rem"}} id="basketCard">
              <div className='card-header' id="basketCardHeader">
                <h4>עוד קצת ואנחנו בדרך אליכם</h4>
              </div>
              

              <div className="card-body" id="basketCardBody">           
              <form action="">
              {/* firstname */}
              <div className="input-group mb-3">
                <input type="text" className="form-control" aria-label="firstName" placeholder='שם פרטי' id='placeHolderBasket' name="first_name" onChange={handleForm}/>                
              </div>
                
                {/* lastname  */}
              <div className="input-group mb-3">
                <input type="text" className="form-control" aria-label="lastName" placeholder='שם משפחה' id='placeHolderBasket'name="last_name" onChange={handleForm}/>               
              </div>

                {/* address */}
              <div className="input-group mb-3">
                <input type="text" className="form-control" aria-label="address" placeholder='כתובת' id='placeHolderBasket'name="address" onChange={handleForm}/>
              </div>

                {/* phone */}
              <div className="input-group mb-3">
                <input type="text" className="form-control" aria-label="phone" placeholder='טלפון לשליח' id='placeHolderBasket'name="phone" onChange={handleForm}/>
              </div>

                <Button id='basketContinue' onClick={navigateToFinalea}>המשך</Button>
              </form>  
              </div>
              <Button id='backToOrder' onClick={navigateToOrder}>חזרה לתפריט</Button> 
            </div>
          </div>
        </div>      
      </main>
      </center>
    </div>
  )
}

export default Customer

