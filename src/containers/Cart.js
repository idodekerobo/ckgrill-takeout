import React, { useContext,  useEffect } from 'react';
import { ListGroup, ListGroupItem, Button } from 'shards-react';
import '../styles/Cart.css';
import "shards-ui/dist/css/shards.min.css"
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';
import { calcPrice } from '../api/functions';
import TAX_RATE from '../api/constants';
import ListItem from '../components/ListItem';

const Cart = (props) => {
   const { state } = useContext(GlobalContext);

   const currentCart = state.cart.slice().map((item, i) => {
      return ( <ListItem item={item} key={i} handleRemoveFromCart={props.handleRemoveFromCart} /> )
   });

   const handleOrderClick = (e) => {
      // don't go to checkout and pass feedback saying that you need to order an item
      if (state.cart.length > 0) return "/checkout"
   }

   const buttonClick = (e) => {
   }

   const subtotal = state.cart.slice().reduce((acc, obj) => (acc += calcPrice(obj)), 0).toFixed(2);
   const tax = (subtotal * TAX_RATE).toFixed(2);
   const total = (parseFloat(subtotal) + parseFloat(tax)).toFixed(2);

   useEffect( () => {
   })

   return (
      <div className="cart-wrapper">
         <ListGroup>
            {currentCart}
         </ListGroup>

         <ListGroup>
            <ListGroupItem>Subtotal: ${subtotal}</ListGroupItem>
            <ListGroupItem>Tax: ${tax}</ListGroupItem>
            <ListGroupItem>Total: ${total}</ListGroupItem>
         </ListGroup>

         <Link to={handleOrderClick} className="router-link">
            <Button onClick={buttonClick} theme="danger" className="order-button" block>Order</Button>
         </Link>

      </div>
   );
}
export default Cart;