import React, { useContext } from 'react';
import { ListGroup, ListGroupItem, Button } from 'shards-react';
import './Cart.css';
import "shards-ui/dist/css/shards.min.css"
import "bootstrap/dist/css/bootstrap.min.css";
import { GlobalContext } from './context/GlobalState';

// subtotal in constructor would be 0, wouldn't put that in render() cus its being run all the time. making program way less efficient
const TAX_RATE = 0.1;

const Cart = (props) =>  {
   const { state } = useContext(GlobalContext);
   const currentCart = state.cart.slice().map( (item) => {
      return   <ListGroupItem key={item._id}>{item.name}: ${(item.price).toFixed(2)} <Button onClick={props.handleRemoveFromCart.bind(this, item._id)} size="sm" theme="dark">Remove</Button>
               </ListGroupItem>
   });

   const subtotal = state.cart.slice().reduce( (acc, obj) => (acc += obj.price), 0).toFixed(2);
   const tax = (subtotal*TAX_RATE).toFixed(2);
   const total = (parseFloat(subtotal)+parseFloat(tax)).toFixed(2);

   return (
      <div className="cart-wrapper">
         <ListGroup>
            {currentCart}
         </ListGroup>

         <ListGroup>
            {/* <ListGroupItem>Subtotal: ${props.subtotal} </ListGroupItem> */}
            <ListGroupItem>Subtotal: ${subtotal}</ListGroupItem>
            <ListGroupItem>Tax: ${tax}</ListGroupItem>
            <ListGroupItem>Total: ${total}</ListGroupItem>
         </ListGroup>
      </div>
   );
}
export default Cart;