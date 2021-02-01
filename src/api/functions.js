export const calcPrice = (item) => {
   if (!item) return; // don't do anything if item is null/undefined/falsey
   let price = item.price; // base item price
   const config = item.config // sides/add-ons to item
   const keys = Object.keys(config); // keys to config object showing all sides/add-ons

   // loop through each key in the config object
   for (let i = 0; i < keys.length; i++) {
      // dot notation to acces the object doesn't work.. not exactly sure why
      let currentKey = keys[i];
      let currentObj = config[currentKey];

      // check if this key has an element that is an array of objects
      if (keys[i] === 'specialInstructions') {
      } else if (Array.isArray(currentObj)) {
         // check deeper because it is an array, loop through each element of array
         for (let u = 0; u < currentObj.length; u++) {
            let element = currentObj[u];
            price += element.price;
         }
      } else {
         // not an arr, no need to go any deeper
         price += currentObj.price;
      }
   }
   return price; // return final price
}

export const returnConfig = (configObject) => {
   const keys = Object.keys(configObject);
   let returnArr = [];
   for (let i = 0; i < keys.length; i++) {
      let currentKey = keys[i];
      if (currentKey === 'specialInstructions') {
         // adds key value pair of specialInstructions and text to the array
         returnArr.push({ specialInstructions: configObject[currentKey] });
      } else if (Array.isArray(configObject[currentKey])) {
         // check if its an arr then go deeper. loop thru each element of array. for choose multiple options
         const currentObj = configObject[currentKey]
         // console.log(currentObj);

         // creates a string of i.e., "Peppers: $0.50, Mushrooms: $1.00, Spinach"
         let checkboxString = '';
         for (let u = 0; u < currentObj.length; u++) {
            let element = currentObj[u];
            checkboxString += `${element['name']}${(element['price'] !== 0) ? (': + $' + element['price'].toFixed(2)) : ''}`;
            if (u !== (currentObj.length - 1)) checkboxString += ', ';
         }
         returnArr.push(checkboxString);
      } else {
         // not an arr
         // adds to array: "Steak, +$1.00"
         let currentKey = keys[i];
         let currentObj = configObject[currentKey];
         returnArr.push(`${currentObj['name']}${(currentObj['price'] !== 0) ? (': +$' + currentObj['price'].toFixed(2)) : ''}`);
      }
   }
   return returnArr;
}