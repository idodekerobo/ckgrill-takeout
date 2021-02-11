import React from 'react';
import { ListGroup, ListGroupItem, Button } from 'shards-react';
import "shards-ui/dist/css/shards.min.css"
import "bootstrap/dist/css/bootstrap.min.css";
import '../styles/ListItem.css';
import { calcPrice, returnConfig } from '../api/functions';

const ListItem = ({ item, index, handleRemoveFromCart }) => {

   const itemDetails = (item) => {
      return (
         returnConfig(item.config).map( (el, i) => {
            // make sure only special instructions is italic
            if (typeof el === 'object' && el !== null && el.specialInstructions !== (null || undefined)) return (<p className="cart-item-details cart-item-spec-instructions" key={i}>{el.specialInstructions}</p>)
            return (<p className="cart-item-details" key={i}>{el}</p>)
         })
      )
   }

   return (
      <ListGroup key={`${item._id}${index}`}>
         <ListGroupItem className="cart-list-group">
            <div className="cart-item-header">
               <h5 className="cart-item-name">{item.name}</h5>
               <Button className="remove-button" onClick={handleRemoveFromCart.bind(this, item._id)} size="sm" theme="dark">Remove</Button>
            </div>
            {itemDetails(item)}
            <h5 className="cart-item-price">Item Total: ${(calcPrice(item)).toFixed(2)}</h5>
         </ListGroupItem>
      </ListGroup>
   )
}
export default ListItem;