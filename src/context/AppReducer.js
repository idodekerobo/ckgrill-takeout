import * as Actions from './Actions';

export const Reducer = (state, action) => {
   switch (action.type) {
      case Actions.LOAD_MENU: 
         // console.log(action.payload);
         return {
            // do stuff w/ state
            ...state,
            menuCategories: action.payload
         }
      case Actions.GET_ACTIVE_CATEGORY:
         // console.log(action.payload);
         return {
            ...state, 
            activeCategory: action.payload
         }
      case Actions.GET_ITEM_CARDS:
         // console.log(action.payload);
         return {
            ...state, 
            visibleItemCards: action.payload
         }
      case Actions.ADD_TO_CART: 
         return {
            ...state, 
            cart: action.payload
         }
      case Actions.REMOVE_FROM_CART: 
         return {
            ...state, 
            cart: action.payload
         }
      case Actions.SELECT_ITEM: 
         return {
            ...state,
            selectedItem: action.payload
         }
      case Actions.CLEAR_CART:
         return {
            cart: []
         }
      default: 
         return state;
   }
}