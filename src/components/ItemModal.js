import React, { useState, useContext } from 'react';
import '../styles/ItemModal.css';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormInput } from 'shards-react';
import "shards-ui/dist/css/shards.min.css"
import "bootstrap/dist/css/bootstrap.min.css";
import { GlobalContext } from '../context/GlobalState';
import * as Actions from '../context/Actions';
import ItemOption from './ItemOption';

const ItemModal = ({selectedItem, open, toggle}) => {
   const { state, dispatch } = useContext(GlobalContext);
   const [ selectedOptions, selectOptions ] = useState( { } );
   const [ specialInstructions, setSpecialInstructions ] = useState('');

   const handleAddToOrderClick = (e) => {
      e.preventDefault();
      // making a new deep copy solves the issue i had w/ overwriting of the same type of item (diff add-ons/sides). i *THINK* due to making a new deep copy vs a shallow copy previously w/ the universal state
      
      let newItem = Object.assign({}, selectedItem);
      newItem = {...newItem, config: selectedOptions} // config doesn't need to be a computed property
      dispatch({type: Actions.ADD_TO_CART, payload: [...state.cart, newItem]});
      toggle();
   }

   const handleCheckboxChange = (e, el, num) => {
      // e.target.checked returns a boolean on whether or not it is checked
      // e.target.name is the name of the section (ex. meat or veggies)
      // e.target.value is the label/name of the option (for meat: i.e., chicken, pork, beef)

      if (e.target.checked && !(selectedOptions[e.target.name]) ) {
         // first time clicking choose multiple checkbox
         // adding first box checked to the local state option arr
         selectOptions({...selectedOptions, [e.target.name]: [ {name: e.target.value, price: el.price} ] });
      } else if (e.target.checked) {
         // adding new checkbox choice to the local state of options
         let currentValue = selectedOptions[e.target.name]
         selectOptions({...selectedOptions, [e.target.name]: [...currentValue, { name: e.target.value, price: el.price } ] });
      } else if (!e.target.checked) {
         // removing what was unchecked from the local state
         let currentValue = selectedOptions[e.target.name];
         const index = currentValue.indexOf(e.target.value);
         currentValue.splice(index, 1); // returns the element that was removed if u need it
         selectOptions({...selectedOptions, [e.target.name]: currentValue});
      }
      
   }

   const handleRadioChange = (e, el) => {
      if (e.target.checked) {
         selectOptions({...selectedOptions, [e.target.name]: {name: e.target.value, price: el.price} });
      }
   }

   const handleInputChange = (e) => {
      setSpecialInstructions(e.target.value);
      selectOptions({...selectedOptions, [e.target.name]: e.target.value});
   }
   
   let renderItemOptions;
   if (selectedItem !== (null && undefined)) {
      renderItemOptions = selectedItem.options.map( (opt, i) => {
         return <ItemOption key={i} options={opt} checked={true} radioChange={handleRadioChange} checkboxChange={handleCheckboxChange} />
      });
   } else {
      renderItemOptions = [];
   }

   const renderSpecialInstructionsText = <div className="spec-instructions"><p className="spec-instructions-label">Special Instructions</p><FormInput name="specialInstructions" value={specialInstructions} onChange={e => handleInputChange(e)} placeholder="Give us any special instructions here." /></div>

   return (
      <Modal className="modal-container" open={open} toggle={toggle} fade={true}>
         <form onSubmit={e => handleAddToOrderClick(e)}>
            <ModalHeader className="modal-header">{selectedItem.name} <p className="modal-close" onClick={toggle}>X</p></ModalHeader>
            <ModalBody className="modal-body-container" style={{'maxHeight': 'calc(100vh - 210px)', 'overflowY': 'auto'}}>
               <p>{selectedItem.description}</p>
               {renderItemOptions}
               {renderSpecialInstructionsText}
            </ModalBody>
         
            <ModalFooter className="modal-footer">
               <input className="modal-order-button" type="submit" value="Add To Order"/>
            </ModalFooter>
         </form>
      </Modal>
   );
}

export default ItemModal;