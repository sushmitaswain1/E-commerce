import React from "react";
import "./header.styles.scss";
import { connect } from "react-redux";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../card-dropdown/card-dropdown.component";
import { ReactComponent as Logo } from "../../assets/crown.svg";

import { auth } from "../../firebase/firebase.utils";
import {createStructuredSelector} from 'reselect';
import {selectCartHidden} from '../../redux/cart/cart.selectors.js';
import {selectCurrentUser} from '../../redux/user/user.selectors';
import {HeaderContainer, LogoContainer,  OptionLink, OptionsContainer} from './header.styles';


const Header = ({ currentUser, hidden }) => (
  <HeaderContainer>
    <LogoContainer to="/">
      <Logo className="logo" />
    </LogoContainer>

    <OptionsContainer>
      <OptionLink to="/shop">
        SHOP
      </OptionLink>
      <OptionLink className="option" to="/shop">
        CONTACT
      </OptionLink>
      {currentUser ? (
        <OptionLink as ='div' onClick={() => auth.signOut()}>
          {" "}
          SIGN OUT
        </OptionLink>
      ) : (
        <OptionLink to="/signin">
          SIGN IN
        </OptionLink>
      )}
      <CartIcon/>
    </OptionsContainer>
    {
      hidden ? null : <CartDropdown />
    }
   
  </HeaderContainer>
);

const mapStateToProps =  createStructuredSelector ({
  currentUser : selectCurrentUser,
  hidden : selectCartHidden
});

export default connect(mapStateToProps)(Header); //connect is the higher order function
