import React, { useEffect, useState } from 'react'
import { Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';


function Order({addToOrder,total,orderDishes}) {
  const navigate = useNavigate();
  const navigateToBasket = () => {
    if(orderDishes.length === 0){
      window.alert("  עומרי, יש להוסיף מנה לסל קודם");
    } else{
      navigate("/Basket")
    }   
  };

  const [dishes,setDishes] = useState([]);
  const [searchDish, setSearchDish] = useState('');
  const [category,setCategory] = useState([]);

  // Functions!
  const getOneCategory = (category_id) => {
    fetch(`http://127.0.0.1:8000/dish/?category=${category_id}`)
    .then((res) => res.json())
    .then((data) => setDishes(data));
  };

  const searchForOrder = () => {
    fetch(`http://127.0.0.1:8000/dish/?search=${searchDish}`)
    .then((res) => res.json())
    .then((data) => setDishes(data));
  };

  const moveToCart = (dish_id) => {
    fetch(`http://127.0.0.1:8000/dish/${dish_id}`)
    .then((res) => res.json())
    .then((data) => addToOrder(data));
  };

  // Effects
  useEffect(() => {
    fetch("http://127.0.0.1:8000/category/")
    .then((res) => res.json())
    .then((data) => setCategory(data));

    fetch("http://127.0.0.1:8000/dish/")
    .then((res) => res.json())
    .then((data) => setDishes(data));
  },[])

  return (
<div>
  <nav className="navbar navbar-light bg-light" >
    <div className="container-fluid" id='Order'>

    <span className="navbar-item" id='hoverFinish'><Button id='finishOrder' onClick={navigateToBasket}>סיום הזמנה</Button></span>

    
    

    <span className="navbar-item" id='priceSpan'><big>₪{total} סה"כ</big></span>
    


    <ul className="navbar-nav ms-auto">
      <li className="navbar-brand mb-0 h1 d-flex">
       
        <Button variant="contained" color="success" size="small" onClick={searchForOrder}>
        חפש מנה
        </Button>
          <input className="form-control me-2" type="search" placeholder="הקלידו את שם המנה" aria-label="Search" onChange={(e) => setSearchDish(e.target.value)}/>
        
      </li>
    </ul>


      {category.map((categorylist) => {
        return (
        <span key={categorylist.id} className="navbar-item" id='hoverColor'  onClick={() => getOneCategory(categorylist.id)}><Button><img id='categoryimg' src={categorylist.imageUrl}></img>{categorylist.name}</Button></span> 
        )
      })};

    
      <span className="navbar-brand mb-0 h1" id='menu'>המזנון</span>
    </div>    
  </nav>

<main className='container-fluid'>
    <div className="row">
      {dishes.map((dish) => {
        return(
          <div className="col" key={dish.id}>
      <div className="card" style= {{width: "18rem"}} id="orderCard">
  <img  style = {{maxWidth: '18rem', height:'200px' }}src={dish.imageUrl} className="card-img-top"/>
  <div className="card-body" id="orderCardBody">
    <div id="vegen">{dish.isVegeterian && " צמחוני🥦"} {dish.isGlutenFree && " ללא גלוטן🌾"}</div>
    <h5 className="card-title" id='orderCardHeader'>{dish.name}</h5>
    <p className="card-text">{dish.description}</p>
    <Button id='addToBasket' onClick ={() => moveToCart(dish.id)}>הוסף מנה לסל</Button>
    <div>₪{(dish.price)}</div>
  </div>
</div>
      </div>
        )
      })}
    </div>
</main>


</div>

  )
}

export default Order


