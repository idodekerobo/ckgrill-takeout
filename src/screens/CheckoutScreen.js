import React, { useContext } from 'react';
import CheckoutForm from '../containers/CheckoutForm';
import '../styles/CheckoutScreen.css';
import { GlobalContext } from '../context/GlobalState';
import { Container, Row, Col, ListGroup, ListGroupItem } from 'shards-react';
import "shards-ui/dist/css/shards.min.css"
import "bootstrap/dist/css/bootstrap.min.css";
import ListItem from '../components/ListItem';
import * as Actions from '../context/Actions';
import TAX_RATE from '../api/constants';
import { calcPrice } from '../api/functions';
// import { STRIPE_TEST_PUBLISHABLE_KEY, STRIPE_CONNECT_ACCT_ID } from '../credentials';

// Stripe
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
// const stripePromise = loadStripe(STRIPE_TEST_PUBLISHABLE_KEY, {stripeAccount: STRIPE_CONNECT_ACCT_ID});
// const stripePromise = loadStripe(`${process.env.REACT_APP_TEST_STRIPE_TEST_PUBLISHABLE_KEY}`, {stripeAccount: `${process.env.REACT_APP_STRIPE_CONNECT_ACCT_ID}`});
const stripePromise = loadStripe(`${process.env.REACT_APP_PROD_STRIPE_LIVE_PUBLISHABLE_KEY}`, {stripeAccount: `${process.env.REACT_APP_CK_PRODUCTION_STRIPE_CONNECT_ACCT_ID}`});

const CheckoutScreen = (props) => {
   const { state, dispatch } = useContext(GlobalContext);

   const handleRemoveFromCart = (id) => {
      let removeIndex = state.cart.findIndex( (item) => item._id === id);
      let cartCopy = JSON.parse(JSON.stringify(state.cart)); // why do i stringify then parse this again?
      cartCopy.splice(removeIndex, 1);
      dispatch({type: Actions.REMOVE_FROM_CART, payload: cartCopy});
   }

   const cart = state.cart.map( (itemObj, i) => {
      return <ListItem item={itemObj} i={i} key={i} handleRemoveFromCart={handleRemoveFromCart} />
   });

   const subtotal = state.cart.slice().reduce((acc, obj) => (acc += calcPrice(obj)), 0).toFixed(2);
   const tax = (subtotal * TAX_RATE).toFixed(2);
   const total = (parseFloat(subtotal) + parseFloat(tax)).toFixed(2);

   return (
      <div className="checkout-screen">
         <Container>
            <Row>
               <Col lg="6" md="12" className="columns">
                  <div className="items">
                     <ListGroup>
                        {cart}
                     </ListGroup>

                     <ListGroup>
                        <ListGroupItem>
                           Subtotal: ${subtotal}
                        </ListGroupItem>
                        <ListGroupItem>
                           Tax: ${tax}
                        </ListGroupItem>
                        <ListGroupItem>
                           Total: ${total}
                        </ListGroupItem>
                     </ListGroup>
                  </div>
               </Col>

               <Col lg="6" md="12" className="columns">
                  <Elements stripe={stripePromise}>
                     <CheckoutForm/>
                  </Elements>
               </Col>
            </Row>
         </Container>
      </div>
   );
}
export default CheckoutScreen;