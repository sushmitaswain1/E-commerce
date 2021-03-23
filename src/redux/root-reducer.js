import {combineReducers} from 'redux';

import userReducer from './user/user-reducer';
import cartReducer from './cart/cart.reducer';
import {persistReducer} from 'redux-persist'; 
import storage from 'redux-persist/lib/storage';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';

const persitConfig = {
    key : 'root',
    storage,
    whitelist : ['cart'] //persit only cart reducer state as user's state is taken care by firebase

}

const rootReducer = combineReducers ({
    user : userReducer,
    cart :  cartReducer,
    directory : directoryReducer,
    shop : shopReducer,
});

export default  persistReducer(persitConfig, rootReducer);