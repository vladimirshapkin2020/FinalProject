import React, { useState } from 'react';
import { BrowserRouter,Routes,Route,useNavigate, Navigate } from 'react-router-dom';
import { Outlet, Link } from 'react-router-dom';
import Home from './pages/Home.js';
import Order from './pages/Order.js';
import Finalea from './pages/Finalea.js';
import Customer from './pages/Customer.js';
import Basket from './pages/Basket.js';


function App() {
  const [dishId, setDishId] = useState([]);
  const [orderDishes,setOrderDishes] = useState([]);
  const [total,setTotal] = useState(0);
  const [userPhone,setUserPhone] = useState("");
  


  // functions

  const addPhone = (phone) => {
    setUserPhone(phone);
  };

  const newStart = () => {
    setTotal(0)
    setOrderDishes([]);
  };

  const removeDish = (dish) => {
    setTotal((prevTotal) => {
      return prevTotal - dish.price;
    });

    setOrderDishes((prevState) => 
      prevState.filter((orderDishes) => {
        return orderDishes.key !== dish.key;
      })
    );
    setDishId((prevState) => 
      prevState.filter((dishId) => {
        return dishId !== dish.id;
      })
    )
  };

  const addToOrder = (dish) => {
    const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    function generateString(length) {
    let result = " ";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  
    return result;
  }  
    let newDish = {
      key : generateString(9),
      id : dish.id,
      name: dish.name,
      price: dish.price,
      description: dish.description,
      imageUrl: dish.imageUrl,
      isGlutenFree: dish.isGlutenFree,
      isVegeterian: dish.isVegeterian,
      category: dish.category,
    };
    setOrderDishes((prevlist) => {
      return[...prevlist,newDish];
    });
    setTotal((prevTotal) => {
      return prevTotal + dish.price
    });
    setDishId((prevState) => {
      return [...prevState,dish.id]
    });
  };

  


  return (
    <div className="App">
      
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />

          <Route path="Basket" element={orderDishes.length > 0 ? (<Basket total={total} orderDishes={orderDishes} removeDish={removeDish}/>) : (<Navigate replace to ="/Order"/>)}/>
          <Route path="Customer" element={orderDishes.length > 0 ? (<Customer orderDishes={dishId} setUserPhone={addPhone} />) : (<Navigate replace to ="/Order"/>)}/> 
          <Route path="Finalea" element={<Finalea userPhone={userPhone} newStart={newStart}/>}/>
          <Route path="Order" element={<Order addToOrder={addToOrder} total={total} orderDishes={orderDishes} />}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
