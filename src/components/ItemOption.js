import React from 'react';
import '../styles/ItemOption.css';
import "shards-ui/dist/css/shards.min.css"
import "bootstrap/dist/css/bootstrap.min.css";

const ItemOption = ({ options, checked, radioChange, checkboxChange }) => {
   const { name, chooseNum, availChoices } = options;
   const radioInput = availChoices.map( (c, i) => <RadioButtons el={c} key={i} name={name} label={c.name} price={c.price} onChange={radioChange}/>)
   const checkboxInput = availChoices.map( (c, i) => <Checkboxes el={c} key={i} name={name} label={c.name} price={c.price} num={chooseNum} onChange={checkboxChange} />)
   
   // useEffect( () => {
      // console.log(option);
   // }, [option])

   return (
      <div className="item-opt-container">
         <p className="item-name">{name}, Choose {chooseNum}:</p>
         <div className="item-opt-choices-container">
            <div className="inner-item-opt-choices-container">
            {(chooseNum === 1) ? (
               radioInput
            ) : (
                  checkboxInput
            )}
            </div>
         </div>
      </div>
   )
}

export default ItemOption;

const RadioButtons = ({ el, name, label, price, checked, onChange }) => {
   return (
      // <FormRadio>{label}, ${price}</FormRadio>
      <div className="input-container">
         <label className="input-label">
            <input className="input radio-input" type="radio" required name={name} value={label} onChange={e => onChange(e, el)} />
            {label}{(price !== 0) ? `, +$${price.toFixed(2)}` : ""}
         </label>
      </div>
   )
}

const Checkboxes = ({ el, name, label, price, checked, num, onChange }) => {
   return (
      // <FormCheckbox>{label}, ${price}</FormCheckbox>
      <div className="input-container">
         <label className="input-label">
            <input className="input checkbox-input" type="checkbox" name={name} value={label} onChange={e => onChange(e, el, num)} />
            {label}{(price !== 0) ? `, $${price.toFixed(2)}` : ""}
         </label>
      </div>
   )
}