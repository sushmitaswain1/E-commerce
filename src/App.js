import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/homepage/homepage.components";
import ShopPage from "./Pages/shop/shop.component";
import SignInAndSignUpPage from "./Pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import CheckoutPage from './Pages/checkout/checkout.component';
import Header from "./Components/Header/header-component";
import { auth , createUserProfileDocument} from "./firebase/firebase.utils";
import {connect} from 'react-redux';
import { setCurrentUser } from './redux/user/user-action';
import {selectCurrentUser} from './redux/user/user.selectors';
import {createStructuredSelector} from 'reselect';


class App extends React.Component {
  
   unsubscribeFromAuth = null;

  componentDidMount() {

    const {setCurrentUser}  = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
      // createUserProfileDocument(user); //storing the data of the user into the firestore
      // //next is to think about storing data into the state of the component of our app
      

      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => { //listens to the userRef and get the first state of the userRef
          setCurrentUser({ //setState is asynchronous
            
              id : snapShot.id,
              ...snapShot.data()
              
          })
          
        })  ;       
      }
      else {
        setCurrentUser(userAuth);
      }


    }
    )
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth ();
  }

  render() {
    return (
      <div className="App">
        <Header  />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route  path="/shop" component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage}/>
          <Route exact path="/signin"  render ={() => this.props.currentUser ? <Redirect to ='/'></Redirect> : (<SignInAndSignUpPage/>)} />

        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser : selectCurrentUser,
  
})

const mapDispatchToProps = dispatch  => ({
  setCurrentUser : user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
