import CartActionTypes from './cart.types';
import {addItemToCart, removeItemFromCart} from './cart.utilis';



const INITIAL_STATE = {
    hidden : true, // dropdown should be invisible as the user should not see when they visit the site
    cartItems : []
}

const cartReducer = (state = INITIAL_STATE, action) =>{
    switch(action.type) {
        case CartActionTypes.TOGGLE_CART_HIDDEN: 
        return {
            ...state,
            hidden : !state.hidden //no payload 
        }
        case CartActionTypes.ADD_ITEM:
            return{
                ...state,
                cartItems : addItemToCart(state.cartItems, action.payload)
            }
        case CartActionTypes.REMOVE_ITEM:
            return {
                ...state,
                cartItems: removeItemFromCart(state.cartItems, action.payload)
            }
        case CartActionTypes.CLEAR_ITEM_FROM_CART:
            return{
                ...state,
                cartItems : state.cartItems.filter(cartItem => cartItem.id !== action.payload.id)
            }
        
        default:
            return state
    }
}

export default cartReducer;